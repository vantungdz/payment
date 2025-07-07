const express = require('express');
const { body, validationResult } = require('express-validator');
const PaymentRequest = require('../models/PaymentRequest');
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// @route   POST /api/payments
// @desc    Create a new payment request (admin only)
// @access  Private/Admin
router.post('/', [
  adminAuth,
  body('title')
    .notEmpty()
    .isLength({ max: 200 })
    .withMessage('Title is required and must not exceed 200 characters'),
  body('totalAmount')
    .isNumeric()
    .isFloat({ min: 1 })
    .withMessage('Total amount must be a positive number'),
  body('participants')
    .isArray({ min: 1 })
    .withMessage('At least one participant is required'),
  body('participants.*.name')
    .notEmpty()
    .withMessage('Participant name is required'),
  body('participants.*.phone')
    .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/)
    .withMessage('Invalid phone number'),
  body('participants.*.amount')
    .isNumeric()
    .isFloat({ min: 1 })
    .withMessage('Participant amount must be positive')
], validateRequest, async (req, res) => {
  try {
    const { title, description, totalAmount, participants, dueDate } = req.body;

    // Find users by phone numbers and create participants array
    const processedParticipants = [];
    
    for (const participant of participants) {
      const user = await User.findOne({ phone: participant.phone });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: `User with phone ${participant.phone} not found`
        });
      }

      processedParticipants.push({
        user: user._id,
        name: participant.name,
        phone: participant.phone,
        amount: participant.amount
      });
    }

    const paymentRequest = new PaymentRequest({
      title,
      description,
      totalAmount,
      createdBy: req.user._id,
      participants: processedParticipants,
      dueDate: dueDate ? new Date(dueDate) : null
    });

    await paymentRequest.save();

    // Populate the created payment request
    await paymentRequest.populate([
      { path: 'createdBy', select: 'username fullName' },
      { path: 'participants.user', select: 'username fullName' }
    ]);

    // Send real-time notifications to participants
    const io = req.app.get('io');
    processedParticipants.forEach(participant => {
      io.to(`user_${participant.user}`).emit('new_payment_request', {
        id: paymentRequest._id,
        title: paymentRequest.title,
        amount: participant.amount,
        from: req.user.fullName
      });
    });

    res.status(201).json({
      success: true,
      message: 'Payment request created successfully',
      paymentRequest
    });

  } catch (error) {
    console.error('Create payment request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/payments
// @desc    Get payment requests (admins see all, users see their own)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status = '', search = '' } = req.query;
    
    let query = {};
    
    // If user is not admin, only show their payment requests
    if (req.user.role !== 'admin') {
      query['participants.user'] = req.user._id;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const paymentRequests = await PaymentRequest.find(query)
      .populate('createdBy', 'username fullName phone')
      .populate('participants.user', 'username fullName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await PaymentRequest.countDocuments(query);

    res.json({
      success: true,
      paymentRequests,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get payment requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/payments/:id
// @desc    Get single payment request
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const paymentRequest = await PaymentRequest.findById(req.params.id)
      .populate('createdBy', 'username fullName phone')
      .populate('participants.user', 'username fullName');

    if (!paymentRequest) {
      return res.status(404).json({
        success: false,
        message: 'Payment request not found'
      });
    }

    // Check if user has access to this payment request
    const isAdmin = req.user.role === 'admin';
    const isCreator = paymentRequest.createdBy._id.toString() === req.user._id.toString();
    const isParticipant = paymentRequest.participants.some(
      p => p.user._id.toString() === req.user._id.toString()
    );

    if (!isAdmin && !isCreator && !isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      paymentRequest
    });

  } catch (error) {
    console.error('Get payment request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/payments/:id/send
// @desc    Send payment request to participants
// @access  Private/Admin
router.put('/:id/send', adminAuth, async (req, res) => {
  try {
    const paymentRequest = await PaymentRequest.findById(req.params.id)
      .populate('participants.user', 'username fullName');

    if (!paymentRequest) {
      return res.status(404).json({
        success: false,
        message: 'Payment request not found'
      });
    }

    if (paymentRequest.status !== 'draft') {
      return res.status(400).json({
        success: false,
        message: 'Payment request has already been sent'
      });
    }

    paymentRequest.status = 'sent';
    paymentRequest.sentAt = new Date();
    await paymentRequest.save();

    // Send real-time notifications
    const io = req.app.get('io');
    paymentRequest.participants.forEach(participant => {
      io.to(`user_${participant.user._id}`).emit('payment_request_sent', {
        id: paymentRequest._id,
        title: paymentRequest.title,
        amount: participant.amount,
        from: req.user.fullName
      });
    });

    res.json({
      success: true,
      message: 'Payment request sent successfully',
      paymentRequest
    });

  } catch (error) {
    console.error('Send payment request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/payments/:id/pay/:participantId
// @desc    Mark participant payment as paid
// @access  Private
router.put('/:id/pay/:participantId', auth, async (req, res) => {
  try {
    const { momoTransactionId } = req.body;
    
    const paymentRequest = await PaymentRequest.findById(req.params.id);

    if (!paymentRequest) {
      return res.status(404).json({
        success: false,
        message: 'Payment request not found'
      });
    }

    const participant = paymentRequest.participants.id(req.params.participantId);
    
    if (!participant) {
      return res.status(404).json({
        success: false,
        message: 'Participant not found'
      });
    }

    // Check if user has permission to mark this payment
    const isAdmin = req.user.role === 'admin';
    const isParticipant = participant.user.toString() === req.user._id.toString();

    if (!isAdmin && !isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    participant.status = 'paid';
    participant.paidAt = new Date();
    if (momoTransactionId) {
      participant.momoTransactionId = momoTransactionId;
    }

    // Check if all participants have paid
    const allPaid = paymentRequest.participants.every(p => p.status === 'paid');
    if (allPaid) {
      paymentRequest.status = 'completed';
      paymentRequest.completedAt = new Date();
    }

    await paymentRequest.save();

    // Notify admin about payment
    const io = req.app.get('io');
    io.to(`user_${paymentRequest.createdBy}`).emit('payment_received', {
      paymentRequestId: paymentRequest._id,
      participantName: participant.name,
      amount: participant.amount
    });

    res.json({
      success: true,
      message: 'Payment marked as paid successfully',
      paymentRequest
    });

  } catch (error) {
    console.error('Mark payment as paid error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/payments/:id
// @desc    Delete payment request (admin only)
// @access  Private/Admin
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const paymentRequest = await PaymentRequest.findById(req.params.id);

    if (!paymentRequest) {
      return res.status(404).json({
        success: false,
        message: 'Payment request not found'
      });
    }

    await PaymentRequest.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Payment request deleted successfully'
    });

  } catch (error) {
    console.error('Delete payment request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/payments/stats/dashboard
// @desc    Get dashboard statistics
// @access  Private
router.get('/stats/dashboard', auth, async (req, res) => {
  try {
    let stats = {};

    if (req.user.role === 'admin') {
      // Admin statistics
      const totalRequests = await PaymentRequest.countDocuments({ createdBy: req.user._id });
      const completedRequests = await PaymentRequest.countDocuments({ 
        createdBy: req.user._id, 
        status: 'completed' 
      });
      const pendingRequests = await PaymentRequest.countDocuments({ 
        createdBy: req.user._id, 
        status: { $in: ['draft', 'sent'] }
      });

      // Total amount statistics
      const amountStats = await PaymentRequest.aggregate([
        { $match: { createdBy: req.user._id } },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$totalAmount' },
            completedAmount: {
              $sum: {
                $cond: [
                  { $eq: ['$status', 'completed'] },
                  '$totalAmount',
                  0
                ]
              }
            }
          }
        }
      ]);

      stats = {
        totalRequests,
        completedRequests,
        pendingRequests,
        totalAmount: amountStats[0]?.totalAmount || 0,
        completedAmount: amountStats[0]?.completedAmount || 0
      };

    } else {
      // User statistics
      const userPayments = await PaymentRequest.find({
        'participants.user': req.user._id
      });

      let totalOwed = 0;
      let totalPaid = 0;
      let pendingPayments = 0;

      userPayments.forEach(payment => {
        const userParticipant = payment.participants.find(
          p => p.user.toString() === req.user._id.toString()
        );
        if (userParticipant) {
          if (userParticipant.status === 'paid') {
            totalPaid += userParticipant.amount;
          } else {
            totalOwed += userParticipant.amount;
            pendingPayments++;
          }
        }
      });

      stats = {
        totalOwed,
        totalPaid,
        pendingPayments,
        completedPayments: userPayments.length - pendingPayments
      };
    }

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

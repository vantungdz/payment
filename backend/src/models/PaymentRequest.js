const mongoose = require('mongoose');

const paymentRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Payment title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [1, 'Amount must be greater than 0']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      match: [/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Invalid phone number']
    },
    amount: {
      type: Number,
      required: true,
      min: [1, 'Amount must be greater than 0']
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'cancelled'],
      default: 'pending'
    },
    paidAt: {
      type: Date
    },
    momoTransactionId: {
      type: String
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'sent', 'completed', 'cancelled'],
    default: 'draft'
  },
  dueDate: {
    type: Date
  },
  sentAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt field before saving
paymentRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for total paid amount
paymentRequestSchema.virtual('totalPaid').get(function() {
  return this.participants.reduce((sum, participant) => {
    return participant.status === 'paid' ? sum + participant.amount : sum;
  }, 0);
});

// Virtual for completion percentage
paymentRequestSchema.virtual('completionPercentage').get(function() {
  const totalParticipants = this.participants.length;
  const paidParticipants = this.participants.filter(p => p.status === 'paid').length;
  return totalParticipants > 0 ? Math.round((paidParticipants / totalParticipants) * 100) : 0;
});

// Index for better query performance
paymentRequestSchema.index({ createdBy: 1, createdAt: -1 });
paymentRequestSchema.index({ 'participants.user': 1, status: 1 });
paymentRequestSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('PaymentRequest', paymentRequestSchema);

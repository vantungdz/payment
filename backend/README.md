# PaySplit Backend API

Backend API cho ứng dụng chia tiền PaySplit.

## 🚀 Features

- **Authentication**: JWT-based login/register
- **User Management**: CRUD operations, search users
- **Payment Requests**: Tạo, quản lý, theo dõi thanh toán
- **Real-time Notifications**: Socket.IO cho thông báo real-time
- **Role-based Access**: Admin và User permissions
- **Security**: Helmet, rate limiting, input validation

## 📋 Prerequisites

- Node.js >= 16.x
- MongoDB >= 4.x (local hoặc Atlas)
- npm hoặc yarn

## 🛠️ Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Setup environment variables:**
```bash
cp .env.example .env
# Chỉnh sửa file .env với thông tin của bạn
```

3. **Start MongoDB:**
```bash
# Nếu dùng local MongoDB
mongod

# Hoặc dùng MongoDB Atlas (chỉnh sửa MONGODB_URI trong .env)
```

4. **Run the server:**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại
- `POST /api/auth/logout` - Đăng xuất

### Users
- `GET /api/users` - Lấy danh sách users (Admin only)
- `GET /api/users/search` - Tìm kiếm users
- `GET /api/users/:id` - Lấy thông tin user
- `PUT /api/users/:id` - Cập nhật thông tin user
- `DELETE /api/users/:id` - Deactivate user (Admin only)

### Payment Requests
- `POST /api/payments` - Tạo payment request (Admin only)
- `GET /api/payments` - Lấy danh sách payments
- `GET /api/payments/:id` - Lấy chi tiết payment
- `PUT /api/payments/:id/send` - Gửi payment request (Admin only)
- `PUT /api/payments/:id/pay/:participantId` - Đánh dấu đã thanh toán
- `DELETE /api/payments/:id` - Xóa payment request (Admin only)
- `GET /api/payments/stats/dashboard` - Dashboard statistics

## 🔧 Environment Variables

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
MONGODB_URI=mongodb://localhost:27017/paysplit
FRONTEND_URL=http://localhost:8081
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📊 Database Models

### User
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  phone: String (unique),
  fullName: String,
  role: ['admin', 'user'],
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### PaymentRequest
```javascript
{
  title: String,
  description: String,
  totalAmount: Number,
  createdBy: ObjectId (User),
  participants: [{
    user: ObjectId (User),
    name: String,
    phone: String,
    amount: Number,
    status: ['pending', 'paid', 'cancelled'],
    paidAt: Date,
    momoTransactionId: String
  }],
  status: ['draft', 'sent', 'completed', 'cancelled'],
  dueDate: Date,
  sentAt: Date,
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Socket.IO Events

### Client -> Server
- `join` - Join user room for notifications

### Server -> Client
- `new_payment_request` - Thông báo payment request mới
- `payment_request_sent` - Payment request đã được gửi
- `payment_received` - Admin nhận thông báo khi có payment

## 🔒 Security Features

- **JWT Authentication** với expire time
- **Password hashing** với bcrypt
- **Rate limiting** để chống spam
- **Input validation** với express-validator
- **CORS** configuration
- **Helmet** cho security headers

## 🧪 Testing

```bash
npm test
```

## 🚀 Deployment

### Railway
1. Push code lên GitHub
2. Connect Railway với GitHub repo
3. Set environment variables
4. Deploy

### Heroku
1. `heroku create your-app-name`
2. `heroku config:set NODE_ENV=production`
3. Set các environment variables khác
4. `git push heroku main`

## 📝 Sample Data

Để test, bạn có thể tạo admin user:

```bash
POST /api/auth/register
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "admin123",
  "phone": "0123456789",
  "fullName": "Administrator",
  "role": "admin"
}
```

## 🤝 Contributing

1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

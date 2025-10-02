# PaySplit - Ứng Dụng Chia Tiền Thông Minh

## 📱 Tổng Quan Dự Án

**PaySplit** là một ứng dụng di động được phát triển bằng React Native (Expo) với backend Node.js, giúp người dùng dễ dàng chia tiền và quản lý các khoản thanh toán nhóm. Ứng dụng hỗ trợ tích hợp với MoMo để thanh toán nhanh chóng và tiện lợi.

### 🎯 Mục Đích Chính

- **Admin**: Tạo và quản lý các yêu cầu thanh toán, chia tiền cho nhiều người
- **User**: Xem và thanh toán các khoản tiền được yêu cầu
- **Tích hợp MoMo**: Hỗ trợ thanh toán qua ví điện tử MoMo
- **Real-time**: Thông báo tức thời khi có yêu cầu thanh toán mới

---

## 🏗️ Kiến Trúc Dự Án

### Frontend (React Native + Expo)

```
app/                    # Expo Router - Điều hướng ứng dụng
├── _layout.tsx        # Layout chính với AuthProvider, ThemeProvider
├── (tabs)/            # Tab navigation
│   ├── _layout.tsx    # Tab layout configuration
│   ├── index.tsx      # Màn hình chính - phân quyền Admin/User
│   └── explore.tsx    # Màn hình khám phá (chưa sử dụng)
└── +not-found.tsx     # Màn hình 404

components/             # Các component UI
├── AdminDashboard.tsx     # Dashboard cho Admin - quản lý payments
├── UserDashboard_New.tsx  # Dashboard cho User - xem và thanh toán
├── LoginScreen.tsx        # Màn hình đăng nhập/đăng ký
├── SplashScreen.tsx       # Màn hình chào mừng với animation
├── PaymentPopup.tsx       # Popup thanh toán MoMo với QR code
├── AdminPopup.tsx         # Popup xác nhận actions cho Admin
├── BeautifulAlert.tsx     # Hệ thống alert đẹp với animations
└── ui/                    # UI components cơ bản
    ├── ThemedText.tsx     # Text component với theme
    ├── ThemedView.tsx     # View component với theme
    └── IconSymbol.tsx     # Icon component

contexts/
└── AuthContext.tsx    # Context quản lý authentication state

services/              # API services
├── apiService.ts      # Base API service với token management
├── authService.ts     # Authentication APIs
├── paymentService.ts  # Payment management APIs
├── userService.ts     # User management APIs
└── config.ts          # API configuration
```

### Backend (Node.js + Express + MongoDB)

```
backend/src/
├── server.js          # Entry point - Express server + Socket.IO
├── models/            # MongoDB models
│   ├── User.js        # User schema với role-based access
│   └── PaymentRequest.js # Payment request schema
├── routes/            # API routes
│   ├── auth.js        # Authentication endpoints
│   ├── users.js       # User management endpoints
│   └── payments.js    # Payment management endpoints
└── middleware/        # Express middleware
    ├── auth.js        # JWT authentication middleware
    └── errorHandler.js # Global error handling
```

---

## 🔧 Chi Tiết Chức Năng Các File

### 📱 Frontend Components

#### **app/\_layout.tsx**

- **Chức năng**: Root layout của ứng dụng
- **Tính năng**:
  - Khởi tạo AuthProvider cho quản lý authentication
  - Theme provider cho dark/light mode
  - SplashScreen animation khi khởi động
  - Font loading (SpaceMono)

#### **app/(tabs)/index.tsx**

- **Chức năng**: Màn hình chính với logic phân quyền
- **Logic**:
  - Kiểm tra authentication status
  - Hiển thị LoginScreen nếu chưa đăng nhập
  - Phân quyền: Admin → AdminDashboard, User → UserDashboard

#### **components/AdminDashboard.tsx**

- **Chức năng**: Dashboard quản lý cho Admin
- **Tính năng chính**:
  - Tạo payment request mới
  - Tự động chia tiền đều cho nhiều người
  - Quản lý danh sách users
  - Gửi payment requests
  - Xem trạng thái thanh toán của từng user
  - Popup xác nhận các actions quan trọng

#### **components/UserDashboard_New.tsx**

- **Chức năng**: Dashboard cho người dùng thường
- **Tính năng chính**:
  - Xem danh sách payment requests được gửi đến
  - Phân loại: Cần thanh toán / Đã thanh toán
  - Tính tổng số tiền cần thanh toán
  - Nút thanh toán nhanh qua MoMo
  - Lịch sử thanh toán

#### **components/PaymentPopup.tsx**

- **Chức năng**: Popup thanh toán MoMo với nhiều options
- **Tính năng**:
  - Hiển thị thông tin thanh toán (số điện thoại, số tiền, nội dung)
  - QR code MoMo tự động generate
  - Nút mở app MoMo trực tiếp
  - Copy thông tin thanh toán
  - Hướng dẫn thanh toán từng bước
  - Animation chuyển đổi giữa các màn hình

#### **components/LoginScreen.tsx**

- **Chức năng**: Màn hình đăng nhập và đăng ký
- **Tính năng**:
  - Form đăng nhập với validation
  - Form đăng ký với đầy đủ thông tin
  - Toggle giữa login/register mode
  - Beautiful UI với gradient background
  - Error handling và success notifications

#### **components/BeautifulAlert.tsx**

- **Chức năng**: Hệ thống thông báo đẹp
- **Các loại alert**:
  - Success, Error, Warning, Info
  - Copy success với preview text
  - Confirmation dialogs
  - Custom animations và styling

#### **contexts/AuthContext.tsx**

- **Chức năng**: Quản lý authentication state toàn ứng dụng
- **Tính năng**:
  - Login/logout/register functions
  - Persistent authentication với AsyncStorage
  - Auto-check auth status khi app khởi động
  - User state management

### 🔧 Services Layer

#### **services/apiService.ts**

- **Chức năng**: Base service cho tất cả API calls
- **Tính năng**:
  - Automatic token attachment
  - Request/response interceptors
  - Error handling
  - Token storage management
  - Logging cho debugging

#### **services/paymentService.ts**

- **Chức năng**: Quản lý tất cả payment-related APIs
- **Methods**:
  - `createPaymentRequest()` - Tạo payment request mới
  - `getPaymentRequests()` - Lấy danh sách payments với pagination
  - `sendPaymentRequest()` - Gửi payment request đến users
  - `markPaymentAsPaid()` - Đánh dấu đã thanh toán
  - `getDashboardStats()` - Thống kê dashboard

#### **services/authService.ts**

- **Chức năng**: Authentication APIs
- **Methods**:
  - `login()` - Đăng nhập
  - `register()` - Đăng ký tài khoản
  - `logout()` - Đăng xuất
  - `checkAuthStatus()` - Kiểm tra trạng thái đăng nhập

### 🗄️ Backend Architecture

#### **backend/src/server.js**

- **Chức năng**: Main server file
- **Tính năng**:
  - Express server setup với middleware
  - Socket.IO cho real-time notifications
  - MongoDB connection
  - Rate limiting và security (Helmet)
  - CORS configuration
  - Health check endpoint
  - Graceful shutdown handling

#### **backend/src/models/User.js**

- **Chức năng**: User data model
- **Schema**:
  - Basic info: username, email, phone, fullName
  - Security: hashed password, role (admin/user)
  - Status: isActive, lastLogin
  - Timestamps: createdAt, updatedAt
- **Features**:
  - Password hashing middleware
  - Unique constraints
  - Validation rules

#### **backend/src/models/PaymentRequest.js**

- **Chức năng**: Payment request data model
- **Schema**:
  - Basic info: title, description, totalAmount
  - Relationships: createdBy (User), participants array
  - Status tracking: draft → sent → completed
  - Participant details: amount, status, paidAt, momoTransactionId
- **Features**:
  - Auto-update timestamps
  - Virtual fields (totalPaid)
  - Validation rules

#### **backend/src/routes/payments.js**

- **Chức năng**: Payment management endpoints
- **Endpoints**:
  - `POST /api/payments` - Tạo payment request (Admin only)
  - `GET /api/payments` - Lấy danh sách (Admin: all, User: own)
  - `PUT /api/payments/:id/send` - Gửi payment request
  - `PUT /api/payments/:id/pay/:participantId` - Đánh dấu đã thanh toán
  - `GET /api/payments/stats/dashboard` - Dashboard statistics
- **Features**:
  - Role-based access control
  - Real-time notifications via Socket.IO
  - Input validation
  - Pagination support

#### **backend/src/routes/auth.js**

- **Chức năng**: Authentication endpoints
- **Endpoints**:
  - `POST /api/auth/register` - Đăng ký
  - `POST /api/auth/login` - Đăng nhập
  - `GET /api/auth/me` - Lấy thông tin user hiện tại
  - `POST /api/auth/logout` - Đăng xuất
- **Features**:
  - JWT token generation
  - Password hashing với bcrypt
  - Input validation
  - Rate limiting

#### **backend/src/middleware/auth.js**

- **Chức năng**: JWT authentication middleware
- **Features**:
  - Token verification
  - User attachment to request
  - Role-based access control
  - Error handling cho invalid tokens

---

## 🚀 Tính Năng Nổi Bật

### 1. **Real-time Notifications**

- Socket.IO integration
- Thông báo tức thời khi có payment request mới
- Admin nhận thông báo khi user thanh toán

### 2. **MoMo Integration**

- Tự động generate QR code thanh toán
- Deep link mở app MoMo
- Copy thông tin thanh toán nhanh chóng
- Hướng dẫn thanh toán chi tiết

### 3. **Beautiful UI/UX**

- Modern design với gradient backgrounds
- Smooth animations và transitions
- Custom alert system
- Responsive design
- Dark/Light theme support

### 4. **Security & Performance**

- JWT authentication
- Password hashing
- Rate limiting
- Input validation
- Error handling
- Helmet security headers

### 5. **Role-based Access Control**

- Admin: Tạo, quản lý, gửi payment requests
- User: Xem và thanh toán các requests được gửi đến
- Middleware protection cho sensitive endpoints

---

## 📦 Dependencies

### Frontend

- **React Native**: Framework chính
- **Expo**: Development platform
- **React Navigation**: Navigation system
- **AsyncStorage**: Local storage
- **React Native SVG**: QR code generation
- **Expo Linear Gradient**: Gradient backgrounds

### Backend

- **Express**: Web framework
- **MongoDB + Mongoose**: Database
- **Socket.IO**: Real-time communication
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **Helmet**: Security middleware
- **CORS**: Cross-origin requests

---

## 🔄 Workflow Chính

### Admin Workflow:

1. Đăng nhập → AdminDashboard
2. Tạo payment request mới
3. Chọn users và chia tiền
4. Gửi payment request
5. Theo dõi trạng thái thanh toán
6. Nhận thông báo khi user thanh toán

### User Workflow:

1. Đăng nhập → UserDashboard
2. Xem danh sách payment requests
3. Click "Thanh toán ngay"
4. Chọn phương thức thanh toán (MoMo)
5. Hoàn tất thanh toán
6. Trạng thái được cập nhật tự động

---

## 🛠️ Setup & Installation

### Prerequisites

- Node.js >= 16.x
- MongoDB >= 4.x
- Expo CLI
- React Native development environment

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm run dev
```

### Frontend Setup

```bash
npm install
expo start
```

### Environment Variables

```env
# Backend (.env)
PORT=3000
MONGODB_URI=mongodb://localhost:27017/paysplit
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:8081
```

---

## 📈 Tương Lai Phát Triển

- [ ] Push notifications
- [ ] Báo cáo chi tiết và analytics
- [ ] Tích hợp thêm ví điện tử (ZaloPay, ViettelPay)
- [ ] Export dữ liệu Excel/PDF
- [ ] Multi-language support
- [ ] Offline mode support
- [ ] Advanced user management
- [ ] Payment reminders
- [ ] Group management features

---

**PaySplit** - Giải pháp chia tiền thông minh, thanh toán dễ dàng! 💰✨

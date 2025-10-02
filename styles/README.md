# Styles Architecture

Hệ thống styles đã được tổ chức lại để dễ bảo trì và tái sử dụng.

## Cấu trúc thư mục

```
styles/
├── theme/                 # Theme system
│   ├── colors.ts         # Color palette
│   ├── spacing.ts        # Spacing system
│   ├── typography.ts     # Typography system
│   ├── shadows.ts        # Shadow system
│   └── index.ts          # Theme exports
├── components/           # Component-specific styles
│   ├── AdminDashboard.styles.ts
│   ├── LoginScreen.styles.ts
│   ├── CustomModal.styles.ts
│   └── ...
├── common.ts            # Common/shared styles
├── index.ts             # Main exports
└── README.md           # This file
```

## Theme System

### Colors (`theme/colors.ts`)

- **Primary colors**: Brand colors
- **Semantic colors**: Success, error, warning, info
- **Neutral colors**: Gray scale
- **Background colors**: Different background levels
- **Text colors**: Text hierarchy
- **Border colors**: Border variations

### Spacing (`theme/spacing.ts`)

- **Base spacing**: xs, sm, md, lg, xl, xxl, xxxl
- **Layout spacing**: Screen padding, section margins
- **Component spacing**: Button heights, input padding

### Typography (`theme/typography.ts`)

- **Font sizes**: xs to huge
- **Font weights**: light to extrabold
- **Text styles**: Headings, body text, buttons, captions

### Shadows (`theme/shadows.ts`)

- **Basic shadows**: sm, md, lg, xl
- **Component shadows**: Button, card, modal, dropdown

## Common Styles (`common.ts`)

Chứa các styles được sử dụng chung:

- Container styles
- Flex utilities
- Text styles
- Button styles
- Input styles
- Card styles
- Modal styles
- Spacing utilities

## Component Styles

Mỗi component có file styles riêng trong `components/`:

- `AdminDashboard.styles.ts`
- `LoginScreen.styles.ts`
- `CustomModal.styles.ts`

## Cách sử dụng

### Import theme

```typescript
import { Colors, Spacing, Typography, Shadows } from "../styles/theme";
```

### Import common styles

```typescript
import { CommonStyles } from "../styles/common";
```

### Import component styles

```typescript
import { AdminDashboardStyles as styles } from "../styles/components/AdminDashboard.styles";
```

### Import tất cả

```typescript
import { Colors, Spacing, Typography, Shadows, CommonStyles } from "../styles";
```

## Lợi ích

1. **Tái sử dụng**: Theme và common styles có thể dùng chung
2. **Consistency**: Đảm bảo tính nhất quán trong design
3. **Maintainability**: Dễ bảo trì và cập nhật
4. **Scalability**: Dễ mở rộng khi thêm components mới
5. **Type Safety**: TypeScript support cho tất cả styles

## Best Practices

1. **Sử dụng theme values**: Luôn sử dụng values từ theme thay vì hardcode
2. **Component-specific styles**: Chỉ đặt styles riêng trong component files
3. **Common patterns**: Đưa patterns lặp lại vào common styles
4. **Naming convention**: Sử dụng tên mô tả rõ ràng
5. **Documentation**: Comment cho các styles phức tạp

## Migration từ inline styles

Các components đã được refactor:

- ✅ AdminDashboard.tsx
- ✅ LoginScreen.tsx
- ✅ CustomModal.tsx

Các components khác sẽ được refactor dần theo cùng pattern này.

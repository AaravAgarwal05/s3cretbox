# S3cretBox 🔐

## 👨‍💻 Created by Aarav Agarwal

Your encrypted S3-powered cloud vault - A secure, privacy-first AWS S3 file manager that runs entirely in your browser.

## 🎯 About This Project

S3cretBox is a modern, secure web application that provides a user-friendly interface for managing AWS S3 storage buckets. Built with a privacy-first approach, this application ensures that your AWS credentials never leave your device while providing a powerful file management experience.

**Key Highlights:**

- 🛡️ **Privacy-First**: No backend servers, no data collection, everything runs in your browser
- 🔐 **Secure by Design**: PIN-based local encryption for AWS credentials
- 🎨 **Modern UX**: Intuitive drag-and-drop interface with dark/light mode support
- 📱 **Responsive**: Works seamlessly across desktop, tablet, and mobile devices
- ⚡ **Performance**: Built with Next.js 15 and optimized for speed

## ✨ Features

### 🔐 Security & Privacy

- **Local PIN Encryption**: Your AWS credentials are encrypted with your personal PIN and stored only in your browser
- **Zero Backend Dependencies**: No servers, no databases, no data collection
- **Client-Side Only**: All operations happen in your browser for maximum privacy
- **Secure Authentication**: Passwordless login powered by Clerk

### 📁 File Management

- **Multi-Bucket Support**: Manage multiple S3 buckets from one interface
- **Visual File Explorer**: Navigate through folders with an intuitive, modern interface
- **Drag & Drop Upload**: Easy file uploads with visual feedback
- **File Preview**: Preview images directly in the browser
- **Bulk Operations**: Select and manage multiple files at once
- **Search & Filter**: Find files quickly with built-in search functionality

### 🎨 User Experience

- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Responsive Design**: Mobile-first design that works on all devices
- **Loading States**: Smooth loading indicators and progress feedback
- **Error Handling**: Clear error messages and graceful failure handling

## 🚀 Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Authentication**: Clerk
- **Icons**: Lucide React
- **Color Scheme**: Zinc (neutral, Gen Z-friendly)

## 🛡️ Security Features

- Local PIN-based encryption of AWS IAM credentials
- No backend storage of secrets or user data
- Client-side only operations
- Zero data collection or tracking

## ⚠️ AWS Pricing Notice

While S3cretBox is free to use, AWS S3 is a paid service. You may incur AWS charges for storage, downloads, or requests if you exceed the free tier limits.

## 🏃‍♂️ Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd s3cretbox
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Add your Clerk configuration
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How It Works

1. **Login via Clerk**: Secure, passwordless authentication
2. **Enter & Encrypt AWS Credentials**: Input your AWS credentials and create a secret PIN - everything is encrypted locally
3. **Manage Files Visually**: Upload, download, delete, and organize your S3 files through an intuitive interface

## 🛠️ Development

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Adding UI Components

This project uses shadcn/ui. To add new components:

```bash
npx shadcn@latest add [component-name]
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support or questions, please open an issue on GitHub.

---

Built with ❤️ by **Aarav Agarwal** for secure cloud storage management.

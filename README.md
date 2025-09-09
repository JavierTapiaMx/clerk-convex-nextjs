# Task Management App

A modern task management application built with Next.js, Clerk for authentication, and Convex for real-time backend functionality.

## 🚀 Tech Stack

- **Frontend**: Next.js 14+ with App Router
- **Authentication**: Clerk
- **Backend**: Convex (real-time database)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (shadcn/ui)
- **Language**: TypeScript

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx          # Home page
│   └── tasks/            # Tasks-related pages
├── components/            # Reusable React components
│   ├── ConvexClientProvider.tsx  # Convex client setup
│   ├── ErrorBoundary.tsx        # Error handling
│   ├── NavBar.tsx              # Navigation component
│   ├── Tasks/                  # Task-related components
│   └── ui/                     # UI component library
├── convex/               # Convex backend functions
│   ├── auth.config.ts    # Authentication configuration
│   ├── schema.ts         # Database schema
│   └── ...
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/              # Static assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd clerk-convex-nextjs
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.local` and configure your environment variables
   - Add your Clerk and Convex API keys

4. Set up Convex:

```bash
npx convex dev
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Authentication

This project uses [Clerk](https://clerk.com/) for authentication. The authentication is configured in [convex/auth.config.ts](convex/auth.config.ts) and integrated through the [`ConvexClientProvider`](components/ConvexClientProvider.tsx).

## 📊 Database

The project uses [Convex](https://convex.dev/) for real-time database functionality. Database schema is defined in [convex/schema.ts](convex/schema.ts).

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **shadcn/ui** components for consistent UI elements
- Global styles defined in [app/globals.css](app/globals.css)

## 📱 Features

- User authentication with Clerk
- Real-time task management
- Responsive design
- Error boundary for graceful error handling
- Type-safe with TypeScript

## 🚀 Deployment

This project can be deployed on platforms like:

- Vercel (recommended for Next.js)
- Netlify
- Railway

Make sure to configure your environment variables on your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

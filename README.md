#  Unity - Streaming Platform

Unity is a modern streaming platform developed with Next.js that allows users to broadcast live content, interact through chat, and follow other creators. Think of it as your own personal streaming service! 🚀

![Unity Platform](https://img.shields.io/badge/Unity-Streaming_Platform-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ What is Unity?

Unity brings creators and viewers together in one place:
- 📹 **Stream live content** to your audience
- 💬 **Chat in real-time** with your viewers
- 👥 **Build a community** by following other creators
- 🔒 **Manage your experience** with user blocking features

## 🛠️ Technologies Used

### 🖥️ Frontend
- **Next.js 14** 🔄 - React framework with server-side rendering (SSR) and static generation
- **React 18** ⚛️ - Library for building user interfaces
- **TypeScript** 📘 - Typed superset of JavaScript for safer development
- **TailwindCSS** 🎨 - Utility-first CSS framework for rapid and responsive design
- **Shadcn/UI** 🧩 - Reusable and accessible UI components
- **Radix UI** 🧰 - Unstyled, accessible UI primitives
- **Zustand** 🐻 - Lightweight state management library
- **Clerk** 🔐 - Authentication and user management
- **Sonner** 🔔 - Elegant notifications for the application

### ⚙️ Backend
- **Prisma** 🗃️ - ORM for interacting with PostgreSQL database
- **PostgreSQL** 🐘 - Relational database for storing user and stream data
- **LiveKit** 📡 - SDK for real-time video streaming
- **UploadThing** 📤 - Service for file uploads

## 📂 Project Structure

```
unity/
├── actions/            # 🔄 Server actions for data operations
├── app/                # 📱 Application routes and pages
│   ├── (auth)/         # 🔑 Authentication-related routes
│   ├── (browse)/       # 🔍 Routes for exploring streams
│   ├── (dashboard)/    # 📊 User control panel
│   └── api/            # 🔌 API endpoints
├── assets/             # 🖼️ Static resources (images, icons)
├── components/         # 🧩 Reusable components
├── hooks/              # 🪝 Custom React hooks
├── lib/                # 🔧 Utilities and configurations
├── prisma/             # 💾 Database schema and migrations
│   └── schema.prisma   # 📝 Data model definitions
├── public/             # 📂 Directly accessible public files
└── store/              # 🏪 Global state storage (Zustand)
```

## 📊 Data Models

The application uses these main data models:

- **User** 👤 - User information, following and blocking relationships
- **Stream** 📺 - Configuration and status of live streams
- **Follow** 👥 - Following relationships between users
- **Block** 🚫 - Blocking relationships between users

## 🚀 Getting Started

### 📋 Prerequisites
- Node.js (v16+)
- PostgreSQL database
- Clerk account
- LiveKit account
- UploadThing account

### 🔧 Installation and Setup

#### 1️⃣ Clone the repository:
```bash
git clone https://github.com/agusgrance/Unity
cd unity
```

#### 2️⃣ Install dependencies:
```bash
npm install
# or
yarn install
```

#### 3️⃣ Configure environment variables:
Create a `.env` file with the following variables:
```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/unity"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# LiveKit
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret

# UploadThing
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

#### 4️⃣ Run Prisma migrations:
```bash
npx prisma migrate dev
```

#### 5️⃣ Start the development server:
```bash
npm run dev
# or
yarn dev
```

#### 6️⃣ View your application:
Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

## ✅ Main Features

- 🔐 **User authentication** with Clerk
- 📹 **Real-time video streaming** with LiveKit
- 💬 **Live chat** during broadcasts
- 👥 **User following system** to build your community
- 🚫 **User blocking system** for content moderation
- 📊 **Control panel** for managing streams
- 🔍 **Stream discovery** to find new content

## 🚢 Deployment

The application is configured to be deployed on Vercel:

```bash
npm run build
# or
vercel deploy
```


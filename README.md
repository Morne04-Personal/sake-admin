
# SAKEwinkel Admin Dashboard

A modern admin dashboard for managing users, products, and events in the SAKEwinkel ecosystem.

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Based on Radix UI primitives)
- **Form Management**: React Hook Form with Zod validation
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Recharts
- **Toast Notifications**: Sonner
- **Date Handling**: date-fns

## Features

- 🔐 User Authentication
- 👥 User Management (CRUD operations)
- 📦 Product Management
- 📅 Event Management
- 📊 Dashboard Analytics
- 🎨 Modern, Responsive UI
- 🌙 Light/Dark Mode Support
- 🚀 Fast Development with Hot Module Replacement

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd sake-admin-dashboard
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── forms/         # Form components
│   ├── layout/        # Layout components
│   └── ui/           # UI primitives
├── hooks/             # Custom React hooks
├── lib/              # Utilities and helpers
├── pages/            # Page components
└── App.tsx           # Root component
```

## UI Components

The project uses shadcn/ui, which provides a collection of customizable, accessible, and type-safe UI components built on top of Radix UI primitives.

Key components include:
- Dialog
- Toast notifications
- Tables
- Forms
- Buttons
- Input fields
- and more...

## Development

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting

### Best Practices

- Component-based architecture
- Type-safe development with TypeScript
- Responsive design using Tailwind CSS
- Modular and reusable components
- Proper state management
- Form validation with Zod

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com) for the UI component system
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com) for accessible UI primitives
- [Lucide](https://lucide.dev) for beautiful icons


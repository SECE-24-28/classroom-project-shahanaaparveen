# Mobile Recharge Application

A modern, responsive mobile recharge web application built with React, Vite, Tailwind CSS, and JavaScript.

## Features

- **Landing Page**: Attractive hero section with features showcase
- **Authentication**: Login and Signup with form validation
- **Dashboard**: User dashboard with quick actions and transaction history
- **Mobile Recharge**: Complete recharge flow with plan selection
- **Responsive Design**: Works on all screen sizes
- **Form Validation**: Client-side validation for all forms
- **API Integration**: MockAPI.io integration for recharge plans
- **State Management**: Context API for authentication
- **Routing**: React Router v6 for navigation

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **API**: MockAPI.io (dummy REST API)
- **Validation**: Custom JavaScript validation utilities

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mobile-recharge-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation component
│   └── ProtectedRoute.jsx # Route protection
├── pages/              # Page components
│   ├── Landing.jsx     # Landing page
│   ├── Login.jsx       # Login page
│   ├── Signup.jsx      # Signup page
│   ├── Dashboard.jsx   # User dashboard
│   └── Recharge.jsx    # Recharge page
├── context/            # Context providers
│   └── AuthContext.jsx # Authentication context
├── utils/              # Utility functions
│   ├── validation.js   # Form validation
│   └── api.js         # API utilities
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Features Overview

### Authentication
- User registration with validation
- Login functionality
- Protected routes
- Persistent login state

### Mobile Recharge
- Phone number validation
- Operator selection
- Plan type selection (Prepaid/Postpaid)
- Dynamic plan loading from API
- Transaction processing
- Transaction history

### Validation
- Email validation
- Phone number validation (10-digit Indian numbers)
- Password strength validation
- Real-time form validation
- Error handling and display

### Responsive Design
- Mobile-first approach
- Tailwind CSS utility classes
- Consistent design system
- Cross-browser compatibility

## API Integration

The application uses MockAPI.io for dummy data. The API endpoints include:
- GET `/plans` - Fetch recharge plans
- Fallback data is provided if API is unavailable

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
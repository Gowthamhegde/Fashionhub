# Fashion Store - Online Clothing Marketplace

A modern e-commerce platform for clothing and fashion items, inspired by Bewakoof.com.

## Features

- User authentication and authorization
- Product browsing and search
- Shopping cart functionality
- Order management
- Responsive design
- Admin dashboard
- Product categories and filters

## Tech Stack

- Frontend: React.js, Redux, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

## Project Structure

```
fashion-store/
├── client/             # Frontend React application
├── server/             # Backend Node.js/Express application
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create `.env` file in the server directory
   - Add necessary environment variables (see .env.example)

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd client
   npm start
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. 
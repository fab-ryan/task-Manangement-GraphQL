# Task Management GraphQL

A modern task management application built with GraphQL, TypeScript, and PostgreSQL. This application helps users organize tasks, set priorities, and track progress effectively.

## 🚀 Features

- User authentication and authorization
- Task creation, updating, and deletion
- Task prioritization and status tracking
- User role management (Admin/User)
- Real-time updates
- Modern GraphQL API

## 🛠️ Tech Stack

- **Backend:**
  - Node.js
  - TypeScript
  - GraphQL (Apollo Server)
  - Nexus (GraphQL Schema)
  - Prisma (ORM)
  - PostgreSQL (Database)

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fab-ryan/task-Manangement-GraphQL.git
   cd task-Manangement-GraphQL
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/task_management"
   PORT=4000
   ```

4. Run database migrations:
   ```bash
   npm run migrate
   ```

5. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```

## 🚀 Running the Application

Development mode:
```bash
npm run dev
```

Build the application:
```bash
npm run build
```

## 📚 API Documentation

### Queries

#### Get All Users
```graphql
query {
  allUsers {
    id
    name
    email
    role
    status
    createdAt
    updatedAt
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- **fab-ryan** - *Initial work* - [GitHub](https://github.com/fab-ryan)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the GraphQL and Prisma communities for their excellent documentation and support 
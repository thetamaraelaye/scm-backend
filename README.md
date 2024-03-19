## SCM Backend (TypeScript, Node.js, ExpressJS, MongoDB, Mongoose)

This repository contains the backend code for an e-commerce platform built with TypeScript, Node.js, and
Mongoose.

**Getting Started**

**Prerequisites:**

- Node.js and npm (Node Package Manager) installed on your system. You can download them from the official
  Node.js website: [https://nodejs.org/en](https://nodejs.org/en)
- A code editor or IDE of your choice (e.g., Visual Studio Code, Atom, WebStorm) with TypeScript support.

**Installation:**

1. Clone this repository.
2. Navigate to the project directory:

```bash
cd scm-backend
```

3. Install dependencies:

```bash
yarn install
```

**Configuration:**

- A sample configuration file (`db.config.ts`) is provided in the `src/configs` directory. Replace the
  placeholder values with your actual database connection details (e.g., MongoDB URI, username, password).

**Running the Application:**

1. Compile the TypeScript code to JavaScript:

```bash
yarn build
```

2. Start the server:

```bash
node dist/app.js
```

**Project Structure:**

```
scm-backend/
├── package.json
├── tsconfig.json
|-- dist
└── src/
    ├── configs/
    │   └── db.config.ts  // Database configuration
    ├── controllers/
    │   ├── user.controller.ts
    │   ├── product.controller.ts
    │   └── ...          // Controllers for different functionalities
    ├── models/
    │   ├── User.ts
    │   ├── Product.ts
    │   └── ...          // Models for your data entities
    ├── routes/
    │   ├── user.routes.ts
    │   ├── product.routes.ts
    │   └── ...          // Routes for different functionalities
    ├── services/
    │   ├── user.service.ts  // Business logic for users
    │   ├── product.service.ts // Business logic for products
    │   └── ...              // Services for specific functionalities
    ├── utils/
    │   ├── logger.ts       // Utility for logging
    │   └── ...             // Other utility functions
    └── app.ts            // Main application entry point
```

**Additional Notes:**

- This is a basic structure to get you started. You can customize and extend it as your project grows.
- Refer to the code comments within the files for further details on specific functionalities.

**License:**

This project is licensed under the MIT License:
[https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT).

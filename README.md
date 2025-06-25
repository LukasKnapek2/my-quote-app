# Chuck Norris Wisdom App

## Project Overview

This is a modern web application built with **Next.js 14 (App Router)** and **TypeScript** that delivers daily doses of Chuck Norris wisdom. It demonstrates robust frontend development practices, seamless API integration, serverless function utilization, and a clean, responsive user interface.

## 🚀 Live Demo

Experience the application live here:
[Netlify Demo](https://my-quote-app-chucknorris.netlify.app)


## ✨ Features

* **Dynamic Quote Display:** Fetches and presents random Chuck Norris jokes via an external API.
* **Interactive UI:** A user-friendly button to request new quotes, with clear loading and error states.
* **Visitor Counter (Full-Stack):**
    * Implements a custom Next.js API Route to track unique page visits.
    * Persists visitor data using **Prisma ORM** and a **PostgreSQL database (Neon)**.
* **Responsive Design:** Ensures optimal viewing and interaction across various devices (mobile, tablet, desktop) using **Tailwind CSS**.
* **Modern Web Stack:** Leverages the latest features of Next.js 14, React, and TypeScript for a scalable and maintainable codebase.
* **Component-Based Architecture:** Organized into reusable React components for modularity and ease of development.

## 🛠️ Technologies Used

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **State Management:** React `useState` and `useEffect` hooks
* **Database ORM:** [Prisma](https://www.prisma.io/)
* **Database:** [PostgreSQL](https://www.postgresql.org/) (hosted on [Neon](https://neon.tech/))
* **API Integration:** Native `fetch` API
* **Deployment:** [Netlify](https://www.netlify.com/)

## 🏗️ Project Structure

```
├── public/                 # Static assets like images (e.g., chucknorris.png)
├── src/
│   ├── app/                # Next.js App Router root
│   │   ├── api/            # API Routes (e.g., visitor-count for backend logic)
│   │   ├── components/     # UI Components (e.g., Footer, WSLogo)
│   │   ├── page.tsx        # Main application page
│   │   └── layout.tsx      # Root layout, common UI across pages
│   ├── utils/              # Utility functions (e.g., quotes for API calls)
│   └── lib/                # Backend utilities (e.g., Prisma client instance)
├── prisma/                 # Prisma schema and migrations
│   └── schema.prisma       # Database schema definition
├── .env.example            # Example for environment variables
├── package.json            # Project dependencies and scripts
└── README.md               # This file
```

## 🚀 Getting Started (Local Development)

Follow these steps to set up and run the project locally.

### Prerequisites

* Node.js (v18.x or higher recommended)
* npm (or yarn/pnpm/bun)
* A PostgreSQL database (You can use a local one or a cloud service like Neon for development).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[YOUR-GITHUB-USERNAME]/[YOUR-REPOSITORY-NAME].git
    cd [your-repository-name]
    ```
    *(Replace `[YOUR-GITHUB-USERNAME]` and `[YOUR-REPOSITORY-NAME]`)*

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root of your project based on `.env.example`.
    You'll need at least `DATABASE_URL`. For local development, this can point to your local PostgreSQL instance:
    ```dotenv
    DATABASE_URL="postgresql://[USER]:[PASSWORD]@localhost:5432/[DATABASE_NAME]?schema=public"
    # Example: DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/myquotedb?schema=public"
    ```
    *(If you're using Neon for local development as well, paste your Neon connection string here.)*

4.  **Prisma Setup:**
    * **Push your schema to the database:**
        ```bash
        npx prisma migrate dev --name init
        ```
        This command creates your database tables based on `prisma/schema.prisma`.
    * **Generate Prisma Client:**
        ```bash
        npx prisma generate
        ```
        This ensures your application can interact with the database.

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

Open http://localhost:3000 with your browser to see the result. The page auto-updates as you edit the file.

🌐 Deployment
This application is deployed on Netlify for continuous integration and delivery.

Deployment Configuration
Build Command: next build

Publish Directory: .next

Netlify Plugin: Uses @netlify/plugin-nextjs for full Next.js feature support (API Routes, Image Optimization, etc.).

Environment Variables on Netlify:
The DATABASE_URL environment variable must be set in your Netlify site settings (Site settings > Build & deploy > Environment variables). This should be the production-ready connection string for your PostgreSQL database (e.g., from Neon).

Learn More
Next.js Documentation - learn about Next.js features and API.

Learn Next.js - an interactive Next.js tutorial.
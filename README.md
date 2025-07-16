# Reservation Web App

## Overview
This is a [Next.js](https://nextjs.org) web application originally developed for a center that provides educational courses and the ability to reserve a room for general purpose. All copyright contents have been removed.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **[Node.js](https://nodejs.org/en)** installed on your machine.
- **[Git](https://git-scm.com/)** installed for version control.
- **[Mongodb](https://www.mongodb.com/)** database installed.

## Installation
Follow these steps to set up the project on your local machine.

### 1. Clone the Repository
First, clone the repository from GitHub to your local machine using `git`:

```
git clone 
```

### 2. Move to the directory of the project

### 3. Install dependencies
Install the dependencies required for the project:
```
npm i
```

### 4. Create an `.env` file
Create an `.env` file to store the following variables:
```
MONGODB_URI="mongodb://127.0.0.1:27017/lll"
AUTH_SECRET='ABCD' # Added by `npx auth`. Read more: https://cli.authjs.dev
AUTH_GOOGLE_ID=''
AUTH_GOOGLE_SECRET=''
AUTH_TRUST_HOST=true
AUTHJS_SECRET_1=''
AUTH_URL="http://localhost:3000"
```

### 5. Run the project
To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Get Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Credits
- **[kbits000](https://github.com/kbits000)** - Project development and code implementation.
# Reservation Web App

![Status](https://img.shields.io/badge/status-unfinished-red)

## Overview
This is a [Next.js](https://nextjs.org) web application originally developed for a center that provides educational courses and the ability to reserve a room for general purpose. All copyright contents have been removed.

[//]: # (<!-- Screenshots -->)

[//]: # (## Screenshots)

[//]: # ()
[//]: # (<div style="align-content: center"> )

[//]: # (  <img src="https://placehold.co/600x400?text=Your+Screenshot+here" alt="screenshot" />)

[//]: # (</div>)

<!-- TechStack -->
##  Tech Stack
### Client Side
<ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://nextjs.org/">Next.js</a></li>
    <li><a href="https://react.dev/">React</a></li>
    <li><a href="https://tailwindcss.com/">TailwindCSS</a></li>
    <li><a href="https://ant.design/">Ant Design</a></li>
</ul>

### Server Side
<ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://nextjs.org/">Next.js</a></li>
    <li><a href="https://authjs.dev/">Auth.js</a></li>
</ul>

### Database
<ul>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
</ul>

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
```
cd reservation_webapp
```

### 3. Install dependencies
Install the dependencies required for the project:
```
npm i
```

### 4. Create an `.env` file
Create an `.env` file to store the following variables:
```
MONGODB_URI="mongodb://127.0.0.1:27017/MONGODB_DATABASE_NAME" # MONGODB_DATABASE_NAME is your Mongodb database name.
AUTH_SECRET='YOUR_SECRET' # Added by `npx auth`. Read more: https://cli.authjs.dev The Secret should be HARD to guess.
AUTH_GOOGLE_ID='GOOGLE_OAUTH_CLIENT_ID'   # This is an OAuth 2.0 client id you get from Google. Read more: https://developers.google.com/identity/protocols/oauth2
AUTH_GOOGLE_SECRET='GOOGLE_OAUTH_CLIENT_SECRET' # This is an OAuth 2.0 client secret you get from Google. Read more: https://developers.google.com/identity/protocols/oauth2
AUTH_TRUST_HOST=true
AUTHJS_SECRET_1='' # This is a random string (i.e., secret) used to hash tokens, sign cookies and generate cryptographic keys. Read more: https://authjs.dev/reference/core#secret
AUTH_URL="http://localhost:3000"
```

### 5. Run the project
To run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 6. Register a User
After visiting the webpage, register a new user. By default, the new user will have 'user' as a role. This means it is a normal user, not an admin. To change the role to admin, change the role field of the user document in the database to admin.
The user now can visit [Admin Page](http://localhost:3000/admin) without any problem.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


## Deployment

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Credits
- **[kbits000](https://github.com/kbits000)** - Project development and code implementation.
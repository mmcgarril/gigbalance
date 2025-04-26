# GigBalance
GigBalance is a full-stack expense tracker built for freelance musicians. It lets users log, categorize, and visualize business expenses for tax season.

## Tech Stack
- **Frontend**: React, Vite 
- **Backend**: Node, Express, MongoDB, Mongoose
- **Auth**: JWT (cookie-based)

## Features
- Secure login system
- Add, view, update and delete expenses
- Tips on categorizing based on current tax software
- Running totals and category breakdowns
- Mobile-responsive layout

Features still to add:
- Pagination
- Filter expenses by date range, cost, category, etc
- Settings page to let user change login credentials

This is my first full-stack project! I wanted to build a fully functioning CRUD application relevant to my current career as a musician (as opposed to the typical Todo app). I have previous knowledge using React (state, hooks, modals, etc) but my goals were to learn about authentication (using bcrypt to hash passwords, and JWT tokens), backend architecture (models, routes, middleware, controllers), using MongoDB, and more. Ultimately, I'd like to get friends and colleagues to use this tool to help with their bookkeeping and tax prep.

## Getting Started Locally
>Vite is used as the React build tool and dev server. It will be installed automatically with `npm install` for the client.

1. Clone the repo
```
git clone https://github.com/mmcgarril/gigbalance.git
cd gigbalance
```
2. Install dependencies
```
npm install --prefix client
npm install --prefix server
```
3. Add .env files
/server/.env
```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```
/client/.env
```
VITE_API_URL=http://localhost:3000
```
4. Run client and server
```
cd client
npm run dev
```
```
cd server
npm run dev
```

## Author

Built by Michael McGarril, freelance saxophonist and web developer 🎷💻
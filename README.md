
BookNook is a community library web app. Readers can add books, browse the shelf, borrow a book and return it when they are done.

**Live site:** https://booknook-client-eta.vercel.app/

This repository is the **client** (frontend). It talks to the BookNook Express API, which lives in a separate repository.

## Features

- **Home page** with a 3-slide Swiper banner, a "New Arrivals" section (latest 6 books, newest first), "How Borrowing Works" and "Top Categories" sections
- **Authentication** with BetterAuth: email and password registration, login, Google sign-in, and logout
- **Password rules** on registration: at least 6 characters, one uppercase and one lowercase letter
- **Private routes**: Add Book, My Books, My Borrows, Book Details and Profile. Logged-out visitors are sent to Login and returned to the page they wanted afterwards
- **Add Book** with image upload to imgbb and a Total Copies field
- **All Books** grid with search by title or author and a category filter
- **Book Details** with the full information, who added the book and the available copies
- **My Books**: edit a book in a pre-filled form, or delete it after a confirm modal
- **Borrow system**: borrow from the Book Details page, view your borrows in a table, and return a book
- **Available copies**: the Borrow button is disabled and shows "Not Available" when no copies are left
- **No double borrow**: borrowing the same book twice at the same time shows an error toast
- **JWT-protected API calls**: the client sends the BetterAuth JWT as a Bearer token
- **Dark and light theme** toggle in the navbar
- **Animations** with Framer Motion
- Loading spinners, toast messages for every success and error, a custom 404 page, and a page title for each route
- Fully responsive for mobile, tablet and desktop

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 and DaisyUI |
| Authentication | BetterAuth with the MongoDB adapter and JWT plugin |
| Slider | Swiper |
| Animation | Framer Motion |
| Notifications | react-hot-toast |
| Icons | react-icons |
| Image hosting | imgbb |

## Project Structure

```
client/
  app/                  Pages (App Router) and the BetterAuth API route
    api/auth/[...all]/  BetterAuth handler
    books/              All Books and Book Details
    add-book/  my-books/  my-borrows/  login/  register/  profile/
  components/           Navbar, Footer, Hero, BookCard, forms, modals
  lib/                  auth, auth-client, api helpers, utilities
  types/                Shared TypeScript types
  middleware.ts         Protects private routes
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- A MongoDB database (MongoDB Atlas free tier works)
- The BookNook server running (see the server repository)
- A free [imgbb](https://api.imgbb.com/) API key
- Optional: Google OAuth credentials for Google sign-in

### Installation

```bash
git clone <your-client-repo-url>
cd <client-folder>
npm install
```

### Environment variables

Create a file named `.env.local` in the project root:

```env
# BetterAuth
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-long-random-secret
MONGODB_URI=your-mongodb-connection-string
DB_NAME=booknook

# Google sign-in (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# BookNook API (Express server)
NEXT_PUBLIC_API_URL=http://localhost:5000

# imgbb image upload
NEXT_PUBLIC_IMGBB_KEY=your-imgbb-key
```

Notes:
- Use the **same** `MONGODB_URI` and `DB_NAME` as the server.
- For Google sign-in, add `<BETTER_AUTH_URL>/api/auth/callback/google` as an authorized redirect URI in Google Cloud Console.
- Generate a secret with `openssl rand -base64 32`.
- Never commit `.env.local`.

### Run the app

```bash
npm run dev
```

Open http://localhost:3000.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Run the production build |
| `npm run typecheck` | Check the TypeScript types |

## Deployment

In the Vercel project settings, add the production environment variables before deploying:

- `BETTER_AUTH_URL`: the canonical client origin that serves `/api/auth` (for example, `https://booknook-client-eta.vercel.app`, with no trailing slash). Do not use the local `.env` value `http://localhost:3000`.
- `NEXT_PUBLIC_API_URL`: the API server origin (for example, `https://your-api.vercel.app`, with no trailing slash).
- `BETTER_AUTH_SECRET`, `MONGODB_URI`, and `DB_NAME`: the production auth secret and database settings.
- `NEXT_PUBLIC_IMGBB_KEY`: the imgbb key used by the Add Book image upload.
- For Google sign-in, set the Google credentials and allow `<BETTER_AUTH_URL>/api/auth/callback/google` in Google Cloud Console.

In the **server's** Vercel project, set `AUTH_JWKS_URL` to the client's JWKS endpoint, for example `https://booknook-client-eta.vercel.app/api/auth/jwks`. The server uses this URL to verify every protected API request; if it is missing, incorrect, or belongs to a different Better Auth deployment, requests fail with `401 Unauthorized: invalid or expired token`.

`NEXT_PUBLIC_API_URL` is embedded into the client bundle at build time. After changing environment variables in Vercel, redeploy the client; redeploy the server too if you changed `AUTH_JWKS_URL`. Then sign in again and retry the book detail and upload actions.

## How Authentication and the API Work Together

1. BetterAuth, running inside Next.js, handles register, login and Google sign-in, and stores users and sessions in MongoDB.
2. Its JWT plugin signs short-lived tokens and publishes its public keys at `/api/auth/jwks`.
3. For every protected request, the client gets a token and sends it to the Express server as `Authorization: Bearer <token>`.
4. The server verifies the token against those public keys.

## Related

- **Server repository:** the BookNook Express API https://booknook-client-eta.vercel.app
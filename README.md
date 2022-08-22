# Notes app

_We might come up with a better name, but for now it's the Notes App_

This is a simple note taking app that makes the most of crypto wallets to anonymously store notes. 

You can connect your wallet, and then sign two simple strings - the first will function as your unique identifier, the second as your decryption key.

The notes are encrypted and stored on Supabase (we know, it's not decentralised, making this a web2.5 app, I guess).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), and uses tailwind.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

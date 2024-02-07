<div align="center">
   <img src="./packages/client/public/icon.svg" alt="Gistbin Logo">
    <h1>Gistbin</h1>
    <p align="center">
        Gistbin is a <a href="https://gist.github.com">Github gist</a> like pastebin where you can store markdown text online for a set period of time.
    </p>
</div>
<br/>

# Getting Started

Make sure you have set the required environment variables in `.env` (see [`.env.example`](./packages/client/.env.example)):

```sh
# URL to display on the editor URL bar
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# DB
UPSTASH_REDIS_REST_URL="https://<your-upstash-redis-instance-url>.upstash.io"
UPSTASH_REDIS_REST_TOKEN="<upstash token>"
```

To run it locally simply install all dependencies and run `pnpm dev`.

```bash
# clone the repo
git clone https://github.com/schardev/gistbin

pnpm dev
```

The app is now running on `localhost:3000`.

## Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Upstash](https://upstash.com/)
- [Vercel](https://vercel.com/)

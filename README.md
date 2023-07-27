# Renderwhere

## About

Renderwhere is a small app I wrote to explore SSR and CSR while at the [Recurse Center](https://recurse.com).

## Tech

This is an Express/TS app. To run in dev:

1. add an `.env` file at root. Add this to it:

```
ENV="development"
PORT="3000"
```

2. `npm run dev`

3. update the js pages in `public/views` for client-side code, or `server.ts` for server-side code.

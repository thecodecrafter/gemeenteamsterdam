This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Gemeente Amsterdam - Technical assessment

The main purpose of this repository is to show a simple application that shows you the list of areas and neighboorhoods of different districts of Amsterdam, adhering the corporate identity of the municipality of Amsterdam as much as possible.

## Pre-requisites

To build and run this app locally you need:

- Install Node.js

## Getting started

- Clone the repository

```bash
git clone https://github.com/thecodecrafter/gemeenteamsterdam.git
```

- Install dependencies

```bash
npm i
```

- Create a .env file and add the API url

```bash
NEXT_PUBLIC_API_URL=https://api.data.amsterdam.nl/v1/
```

- Build and run the application

```bash
npm run build
npm run start
```

Or, `npm run dev` for development mode

Finally, navigate to http://localhost:3000 and you should see the list of districts of Amsterdam!

### Nice to haves

- Interactive map of the municipality where you can see a delineation of the district or area.
- Search feature with auto-complete

### Author

Hamza Bouchefra

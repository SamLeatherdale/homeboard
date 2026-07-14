# Homeboard

## Components

This repo uses the following third party components:

- [Clock Weather Card](https://github.com/pkissling/clock-weather-card)
- [Lovelace Horizon Card](https://github.com/rejuvenate/lovelace-horizon-card)

## Setup

Requires [pnpm](https://pnpm.io/) (see `packageManager` in `package.json`).

1. Initialize git submodules
   ```bash
   pnpm run git:submodule
   ```
2. Install root dependencies
   ```bash
   pnpm install
   ```
3. Install submodule dependencies
   ```bash
   pnpm run install:all
   ```
4. Copy the `.env.example` file to `.env.local` and fill in values
   ```bash
   cp .env.example .env.local
   ```
5. Start the development server
   ```bash
   pnpm start
   ```

## Deployment

Don't deploy from local development, as we don't want to include the `.env.local` file in the deployment. Instead, deploy from the CI/CD pipeline.

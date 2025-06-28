# Homeboard

## Components

This repo uses the following third party components:

- [Clock Weather Card](https://github.com/pkissling/clock-weather-card)
- [Lovelace Horizon Card](https://github.com/rejuvenate/lovelace-horizon-card)

## Setup

1. Initialize git submodules
   ```bash
   npm run git:submodule
   ```
2. Install dependencies (parent and submodules)
   ```bash
   npm run install:all
   ```
3. Copy the `.env.example` file to `.env.local` and fill in values
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server
   ```bash
   npm run dev
   ```

## Deployment

Don't deploy from local development, as we don't want to include the `.env.local` file in the deployment. Instead, deploy from the CI/CD pipeline.

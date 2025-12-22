# Personal chatbot

AI-powered browser chat bot with some
context information specific to author (Jukka Keinänen).

Since large language models are not familiar with person specific information,
instruction file is used to comprehend this functionality.

Application uses Bun as a runtime and provides both
frontend and backend solution separated in individual workspaces.

Backend is built with Express.js and TypeScript and OpenAI API is used to generate responses.

Frontend is built with React, Tailwind and shadcn/ui.

## How to:

### Install dependencies:

```bash
bun install
```

### Run frontend and backend concurrently:

Define ENV variables:

- BACKEND_PORT
- FRONTEND_PORT
- OPENAI_API_KEY

```bash
bun run index.ts
```

# Claude Code Guide

## Project

This repository is a TypeScript and Express QA pipeline. The server in `app/server.ts` serves `app/public` and exposes `GET /health`. The `qa` directory is reserved for QA runs and evidence.

## Commands

- `npm run dev` starts the local server on port 3000. Set `PORT` to use another port.
- `npm run typecheck` checks the TypeScript project.
- `npm run env:check` verifies required local tools, including Claude Code and Playwright.

## Working agreements

- Run `npm run typecheck` after changing TypeScript.
- The repository does not yet have an automated test suite. Do not report tests as passing unless they have been added and run.
- Keep generated QA runs and evidence under `qa/`; those paths are git-ignored.
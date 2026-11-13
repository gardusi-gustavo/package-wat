#!/usr/bin/env bash
# Repository test entrypoint used by the shared CI workflow.
set -euo pipefail

npm install --no-audit --no-fund
npm run build
npm test

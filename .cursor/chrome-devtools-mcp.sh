#!/usr/bin/env bash
# Connect chrome-devtools-mcp to the already-running Chromium kiosk
# (remote debugging enabled via chrome://inspect/#remote-debugging).
set -euo pipefail

export PATH="$HOME/.local/share/fnm/aliases/default/bin:$PATH"

ACTIVE_PORT_FILE="${CHROME_USER_DATA_DIR:-$HOME/.config/chromium}/DevToolsActivePort"
if [[ ! -f "$ACTIVE_PORT_FILE" ]]; then
  echo "DevToolsActivePort not found at $ACTIVE_PORT_FILE" >&2
  echo "Enable remote debugging in Chromium: chrome://inspect/#remote-debugging" >&2
  exit 1
fi

PORT="$(sed -n '1p' "$ACTIVE_PORT_FILE" | tr -d '\r')"
WS_PATH="$(sed -n '2p' "$ACTIVE_PORT_FILE" | tr -d '\r')"
WS_ENDPOINT="ws://127.0.0.1:${PORT}${WS_PATH}"

# Globally installed to avoid a resident npm parent per instance; install or
# upgrade with `npm install -g chrome-devtools-mcp@latest`.
exec chrome-devtools-mcp \
  --wsEndpoint="$WS_ENDPOINT" \
  --no-usage-statistics \
  "$@"

#!/bin/bash

# Check if astro.config.mjs exists
if [ ! -f "astro.config.mjs" ]; then
  echo "FAIL: astro.config.mjs does not exist."
  exit 1
fi

# Check if src/pages/index.astro exists
if [ ! -f "src/pages/index.astro" ]; then
  echo "FAIL: src/pages/index.astro does not exist."
  exit 1
fi

# Check if React is installed in package.json
if ! grep -q "\"@astrojs/react\"" package.json; then
  echo "FAIL: @astrojs/react not found in package.json"
  exit 1
fi

echo "PASS: Astro project initialized with React."
exit 0

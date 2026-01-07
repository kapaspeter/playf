#!/bin/bash

# Check if docker-compose.yml exists
if [ ! -f "docker-compose.yml" ]; then
  echo "FAIL: docker-compose.yml does not exist."
  exit 1
fi

# Check if Dockerfile exists
if [ ! -f "Dockerfile" ]; then
  echo "FAIL: Dockerfile does not exist."
  exit 1
fi

# Check for required volume mounts in docker-compose.yml
if ! grep -q "\./src:" docker-compose.yml; then
  echo "FAIL: ./src volume mount missing in docker-compose.yml"
  exit 1
fi

if ! grep -q "\./content:" docker-compose.yml; then
  echo "FAIL: ./content volume mount missing in docker-compose.yml"
  exit 1
fi

if ! grep -q "\./db:" docker-compose.yml; then
  echo "FAIL: ./db volume mount missing in docker-compose.yml"
  exit 1
fi

echo "PASS: Docker configuration files present and volumes configured."
exit 0

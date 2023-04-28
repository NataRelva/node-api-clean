#!/bin/sh

set -e

# echo "Environment: $NODE_ENV"

echo "Gerando prisma client..."
npx prisma generate

echo "Executando migrations..."
npx prisma migrate deploy

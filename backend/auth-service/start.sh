#!/bin/bash
set -e

echo ">>> [auth-service] Waiting for database..."
MAX_RETRIES=30
RETRY_COUNT=0

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\q' 2>/dev/null; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
    echo "Database not available after $MAX_RETRIES attempts"
    exit 1
  fi
  echo "Waiting for database... ($RETRY_COUNT/$MAX_RETRIES)"
  sleep 1
done

echo ">>> [auth-service] Database available"

if [ "$SEED_DB" = "1" ] || [ -z "$(PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -t -c 'SELECT COUNT(*) FROM users' 2>/dev/null)" ]; then
  echo ">>> [auth-service] Running seed..."
fi

echo ">>> [auth-service] Starting service..."
exec node dist/main.js
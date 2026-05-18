#!/bin/bash
set -e

echo ">>> [notification-service] Waiting for Redis and database..."
MAX_RETRIES=30
RETRY_COUNT=0

until redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" ping 2>/dev/null; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
    echo "Redis not available after $MAX_RETRIES attempts"
    exit 1
  fi
  echo "Waiting for Redis... ($RETRY_COUNT/$MAX_RETRIES)"
  sleep 1
done

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\q' 2>/dev/null; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
    echo "Database not available after $MAX_RETRIES attempts"
    exit 1
  fi
  echo "Waiting for database... ($RETRY_COUNT/$MAX_RETRIES)"
  sleep 1
done

echo ">>> [notification-service] Redis and database available"

if [ "$SEED_DB" = "1" ]; then
  echo ">>> [notification-service] Running seed..."
fi

echo ">>> [notification-service] Starting service..."
exec node dist/main.js
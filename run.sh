#!/bin/bash
set -e

echo ">>> Starting plant management system..."

docker-compose down 2>/dev/null || true

echo ">>> Building and starting services..."
docker-compose up --build -d

echo ">>> Waiting for services to be healthy..."
sleep 10

echo ">>> Services started:"
echo "  - Auth Service:      http://localhost:23001"
echo "  - Plant Service:     http://localhost:23002"
echo "  - Notification:      http://localhost:23003"
echo "  - Report Service:   http://localhost:23004"
echo "  - PostgreSQL:        localhost:25432"
echo "  - Redis:            localhost:26379"

echo ">>> To view logs: docker-compose logs -f"
echo ">>> To stop: ./run.sh stop"
#!/bin/sh
echo "$0: Start: $(date)"
echo "Viewing the PostgreSQL Client Version"
psql -Version
echo "Viewing the PostgreSQL Server Version"
export PGPASSWORD='123456'
psql -h 192.168.0.123 -p 5433 -U postgres -d postgres -c 'select version();'
echo "$0: End: $(date)"
echo "Starting the Next.js Development Server"

pnpm dev

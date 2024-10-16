@echo off
:: Start Redis server and redis-cli in WSL
wsl -d Ubuntu-22.04 -- /home/okadmin/start_redis.sh

:: Wait for a few seconds to ensure Redis starts
timeout /t 10 /nobreak

:check_redis
wsl -d Ubuntu-22.04 -- redis-cli ping >nul 2>&1
if errorlevel 1 (
    echo Waiting for Redis to start...
    timeout /t 5 /nobreak
    goto check_redis
)

:: Start Node.js app
cd "C:\Users\dell\Desktop\okProjectSetup\TSC-Barcode-Label-Printing-Node.js"
npm run pm2-start
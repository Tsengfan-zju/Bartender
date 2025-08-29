@echo off
REM Build the project first
npm run build

REM Check if build was successful
if %errorlevel% neq 0 (
    echo Build failed, aborting deployment
    exit /b %errorlevel%
)

REM Run gh-pages directly to deploy the dist folder (Vite's default build output)
npx gh-pages -d dist

REM Check if deployment was successful
if %errorlevel% neq 0 (
    echo Deployment failed
    exit /b %errorlevel%
) else (
    echo Deployment successful!
)
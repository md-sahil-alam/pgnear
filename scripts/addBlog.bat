@echo off
REM Test if API is working and add a blog post
REM Make sure pnpm dev is running first!

echo.
echo 📝 Testing PG Near Blog API...
echo.

REM Test with a simple GET request
echo 🔍 Checking if server is running...
curl -s http://localhost:3000/api/blog > nul
if errorlevel 1 (
    echo  Cannot connect to http://localhost:3000
    echo  Make sure your dev server is running: pnpm dev
    pause
    exit /b 1
)
echo ✓ Server is running!
echo.

REM Add blog post
echo  Adding blog post...
curl -X POST http://localhost:3000/api/blog ^
  -H "Content-Type: application/json" ^
  -d "{ ^
    \"title\": \"Single Room PG Near Presidency University - Complete Guide\", ^
    \"slug\": \"single-room-pg-near-presidency-university\", ^
    \"excerpt\": \"Complete information about single room (1-sharing) PGs near Presidency University - pricing, amenities, best areas\", ^
    \"content\": \"<h2>Why Single Room?</h2><p>A single room PG provides ultimate privacy and focus for your studies.</p><h2>Pricing</h2><p>Dibbur: ₹18,000-25,000/month. Rajanakunte: ₹12,000-18,000/month. Whitefield: ₹15,000-20,000/month.</p>\", ^
    \"category\": \"guide\", ^
    \"tags\": [\"1-sharing\", \"single room\", \"privacy\", \"student accommodation\"], ^
    \"author\": \"PG Near Team\", ^
    \"published\": true ^
  }"

echo.
echo.
echo 🎉 Done! Visit http://localhost:3000/blog to see your posts
pause

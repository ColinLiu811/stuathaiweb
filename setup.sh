#!/bin/bash

# StuAth.ai Setup Script
echo "🏆 Setting up StuAth.ai development environment..."

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 and try again."
    exit 1
fi

# Check if Node.js is installed (optional)
if command -v node &> /dev/null; then
    echo "✅ Node.js found - installing optional dependencies..."
    npm install
else
    echo "ℹ️  Node.js not found - using Python server only"
fi

# Create a simple start script
cat > start.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting StuAth.ai development server..."
echo "📱 Open your browser and go to: http://localhost:8000"
echo "🌙 Dark mode is enabled by default"
echo "⏹️  Press Ctrl+C to stop the server"
echo ""

# Try to use serve (Node.js) first, fallback to Python
if command -v npx &> /dev/null; then
    npx serve . -p 8000
else
    python3 -m http.server 8000
fi
EOF

chmod +x start.sh

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the development server, run:"
echo "   ./start.sh"
echo ""
echo "📖 Or manually:"
echo "   python3 -m http.server 8000"
echo "   # or"
echo "   npx serve ."
echo ""
echo "🌐 Then open: http://localhost:8000"
echo ""
echo "📚 For more information, see README.md"

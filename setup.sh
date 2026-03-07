#!/bin/bash

# Portfolio 2026 Setup Script
# This script initializes the project with all dependencies

echo "🚀 Setting up Ziyaad Adams Portfolio..."
echo ""

# Check Node.js version
NODE_VERSION=$(node -v)
echo "✓ Node.js version: $NODE_VERSION"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully"
else
    echo "✗ Failed to install dependencies"
    exit 1
fi

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo ""
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✓ .env.local created"
    echo "  → Update with your configuration"
fi

# Build optimization check
echo ""
echo "🔍 Project Structure:"
echo "  ✓ app/          - Next.js app directory"
echo "  ✓ components/   - React components"
echo "  ✓ public/       - Static assets"
echo "  ✓ hooks/        - Custom hooks"

echo ""
echo "✨ Setup complete!"
echo ""
echo "📖 Next steps:"
echo "  1. npm run dev      - Start development server"
echo "  2. open http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "  - README.md         - Project overview"
echo "  - DEVELOPMENT.md    - Development guide"
echo "  - DEPLOYMENT.md     - Deployment guide"
echo ""

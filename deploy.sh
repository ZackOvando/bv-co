#!/bin/bash

# Brightview Site Deployment Script
# This script handles git commit and deployment workflow

echo "🚀 Brightview Site Deployment Script"
echo "=================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository. Please run this script from the project root."
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Found uncommitted changes:"
    git status --short
    echo ""
    
    # Prompt for commit message
    echo "💬 Enter your commit message:"
    read -r commit_message
    
    # Validate commit message
    if [ -z "$commit_message" ]; then
        echo "❌ Error: Commit message cannot be empty."
        exit 1
    fi
    
    # Add all changes
    echo "📦 Adding all changes..."
    git add .
    
    # Commit with the provided message
    echo "💾 Committing changes..."
    git commit -m "$commit_message"
    
    if [ $? -eq 0 ]; then
        echo "✅ Changes committed successfully!"
    else
        echo "❌ Error: Failed to commit changes."
        exit 1
    fi
else
    echo "ℹ️  No uncommitted changes found."
fi

# Check if we're on main branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "⚠️  Warning: You're not on the main branch (currently on: $current_branch)"
    echo "Do you want to continue? (y/n)"
    read -r continue_deploy
    if [ "$continue_deploy" != "y" ] && [ "$continue_deploy" != "Y" ]; then
        echo "❌ Deployment cancelled."
        exit 1
    fi
fi

# Push to remote
echo "🚀 Pushing to remote repository..."
git push origin "$current_branch"

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to remote!"
    echo ""
    echo "🎉 Deployment complete!"
    echo "Your changes have been committed and pushed to the repository."
else
    echo "❌ Error: Failed to push to remote repository."
    echo "Please check your git configuration and try again."
    exit 1
fi

# Optional: Check if this is a Vercel/Netlify deployment
if command -v vercel &> /dev/null; then
    echo ""
    echo "🔍 Vercel CLI detected. Would you like to trigger a deployment? (y/n)"
    read -r trigger_deploy
    if [ "$trigger_deploy" = "y" ] || [ "$trigger_deploy" = "Y" ]; then
        echo "🚀 Triggering Vercel deployment..."
        vercel --prod
    fi
fi

echo ""
echo "✨ All done! Your site should be updating shortly."

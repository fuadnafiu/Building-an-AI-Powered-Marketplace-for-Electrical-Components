# Deployment Guide for current nai

## 🚀 Deploy to Render (Free)

### Step 1: Prepare Your Project

1. Create a GitHub account at https://github.com if you don't have one
2. Install Git: https://git-scm.com/downloads

### Step 2: Push to GitHub

Run these commands in your terminal:

```bash
cd "F:\New folder"
git init
git add .
git commit -m "Initial commit: current nai AI website"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 3: Deploy on Render

1. Go to https://render.com and sign up (free)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: current-nai
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn api_server:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: Free

5. Add Environment Variables (if needed):
   - Click "Environment" tab
   - Add any secrets/keys

6. Click "Create Web Service"

Your site will be live at: `https://current-nai.onrender.com` (or similar)

## ⚡ Alternative: Deploy to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Python and deploys!

Your site: `https://your-app.railway.app`

## 📦 What's Included

- ✅ All HTML/CSS/JS files
- ✅ Trained AI model (electronics_best_model.pth)
- ✅ Database with 41 products
- ✅ Complete API backend
- ✅ Real component images

## 🔒 Note

The AI model file is large (49MB). GitHub has a 100MB limit, so it should upload fine. If you get errors, use Git LFS:

```bash
git lfs install
git lfs track "*.pth"
git add .gitattributes
git commit -m "Add LFS for model files"
```

## 🌐 Your Website Will Be Live!

Anyone can access your site with the deployment URL! 🎉

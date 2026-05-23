# How to Deploy Your Origami Game to the Web

Here are the best options to publish your web-based Origami Fold Game:

## Quick Start - Local Development

First, set up your local environment:

```bash
cd web
npm install
npm run dev
```

This runs at `http://localhost:5173`

## Option 1: GitHub Pages (FREE ⭐ RECOMMENDED)

**Best for:** Free hosting, easy setup, automatic updates

### Setup:

1. **Update `vite.config.ts`** to add base path:
```typescript
export default defineConfig({
  base: '/Origami/',  // Replace with your repo name
  // ... rest of config
})
```

2. **Create GitHub Actions workflow** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install and Build
        run: |
          cd web
          npm install
          npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./web/dist
```

3. **Enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Set source to `gh-pages` branch
   - Save

4. **Your game will be live at:** `https://jwdsalah.github.io/Origami/`

---

## Option 2: Vercel (FREE with Pro features)

**Best for:** Fast, serverless, automatic deployments

### Steps:

1. Push code to GitHub
2. Visit https://vercel.com
3. Click "New Project"
4. Import your GitHub repo
5. Configure:
   - Framework: Vite
   - Root Directory: `web`
   - Build Command: `npm run build`
6. Click Deploy

**Your game will be live at:** `https://origami-[random].vercel.app/`

---

## Option 3: Netlify (FREE)

**Best for:** Easy deployment, great UI

### Steps:

1. Visit https://netlify.com
2. Click "New site from Git"
3. Connect GitHub
4. Select your Origami repo
5. Configure:
   - Build command: `cd web && npm run build`
   - Publish directory: `web/dist`
6. Deploy

**Your game will be live at:** `https://origami-yourname.netlify.app/`

---

## Option 4: AWS S3 + CloudFront

**Best for:** Scalability, global CDN

### Steps:

1. Build your app:
```bash
cd web
npm run build
```

2. Create S3 bucket
3. Upload `web/dist` contents to S3
4. Enable static website hosting
5. (Optional) Set up CloudFront for CDN

---

## Option 5: Firebase Hosting (FREE tier available)

**Best for:** Real-time features, Firebase integration

### Steps:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Select your project
# Set public directory to web/dist
firebase deploy
```

---

## Recommended: GitHub Pages (Start Here)

### Why GitHub Pages?
✅ Completely FREE  
✅ Automatic deployments  
✅ GitHub integrated  
✅ Perfect for portfolios  
✅ No credit card needed  

### Complete Setup Command:

```bash
# 1. Update vite config
# 2. Create .github/workflows/deploy.yml (see above)
# 3. Push to GitHub
git add .
git commit -m "Add GitHub Pages deployment workflow"
git push origin main

# 4. Enable in GitHub repo settings
# Settings → Pages → Source: gh-pages
```

### Result:
- Game available at: `https://jwdsalah.github.io/Origami/`
- Updates automatically when you push to main
- Free forever

---

## Build Command Reference

```bash
# Development
npm run dev          # Run locally with hot reload

# Production
npm run build        # Build optimized version
npm run preview      # Preview production build locally
```

## Performance Tips

1. **Minification**: Automatically done by Vite
2. **Code splitting**: Three.js is split into chunks
3. **Lazy loading**: Components load on demand
4. **Image optimization**: Use WebP for images
5. **Caching**: Set headers for static assets

## Monitoring

- **GitHub Pages**: No setup needed, built-in analytics
- **Vercel**: Dashboard with analytics included
- **Netlify**: Full analytics in dashboard

---

## Next Steps After Deployment

1. **Share your link** on GitHub, social media, portfolio
2. **Add to README**: Update project README with live link
3. **Mobile testing**: Test on actual devices
4. **Collect feedback**: Share with friends/family
5. **Iterate**: Deploy updates automatically

---

## Troubleshooting

**Blank page after deploy?**
- Check browser console for errors
- Verify base path in vite.config.ts
- Clear cache (Ctrl+Shift+R)

**Assets 404 errors?**
- Ensure base path matches repo name
- Check file paths are relative

**Build fails?**
- Run `npm install` in web directory
- Check Node version: `node --version` (should be 16+)

---

## Cost Comparison

| Platform | Cost | Features |
|----------|------|----------|
| GitHub Pages | FREE | Basic, good for projects |
| Vercel | FREE | Generous free tier, analytics |
| Netlify | FREE | Good free tier, drag & drop |
| Firebase | FREE tier | Generous, serverless functions |
| AWS S3 | ~$0.50/month | Scalable, CDN extra |

**Recommendation: Start with GitHub Pages, upgrade to Vercel if needed.**

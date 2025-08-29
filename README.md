# STUDL.IO Landing Page

A beautiful, responsive landing page for the STUDL.IO learning app, designed to be deployed on GitHub Pages.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Custom Typography**: Uses Sanger font for titles and Cartograph font for body text
- **Modern UI**: Clean, professional design with smooth animations
- **Fast Loading**: Optimized for performance with preloaded fonts
- **Accessibility**: Includes proper focus states and semantic HTML

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── Assets/             # Brand assets
│   ├── Sanger.ttf     # Title font
│   ├── Cartograph-Sans-Light.ttf  # Body font
│   ├── Website-Favicon-Color.svg  # Favicon
│   ├── Title-Only-Transparent.png # Navigation logo
│   └── Logo-Only-Transparent.png  # Hero section logo
└── README.md           # This file
```

## Deployment to GitHub Pages

### Step 1: Create a GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `studl-landing-page` or `studl.io-landing`
3. Make it public (required for free GitHub Pages)

### Step 2: Upload Your Files
1. Clone the repository to your computer:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Copy all the files from this project into the repository folder:
   - `index.html`
   - `styles.css`
   - `Assets/` folder (with all its contents)

3. Commit and push the files:
   ```bash
   git add .
   git commit -m "Initial commit: STUDL.IO landing page"
   git push origin main
   ```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/(root)** folder
6. Click **Save**

### Step 4: Access Your Site
- Your site will be available at: `https://yourusername.github.io/your-repo-name`
- It may take a few minutes for the first deployment to complete

## Customization

### Colors
The current color scheme uses:
- Background: `#ffffff` (white)
- Text: `#333941` (dark gray)
- Accent: Various shades of gray

### Fonts
- **Titles**: Sanger font (loaded from `Assets/Sanger.ttf`)
- **Body Text**: Cartograph Sans Light (loaded from `Assets/Cartograph-Sans-Light.ttf`)

### Content
To update the content:
1. Edit `index.html` to change text, links, and structure
2. Edit `styles.css` to modify colors, spacing, and layout
3. Replace images in the `Assets/` folder with your own (keep the same filenames)

## Browser Support

This landing page works on all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Tips

- The fonts are preloaded for faster rendering
- Images are optimized for web use
- CSS includes efficient animations and transitions
- The page is lightweight and loads quickly

## Troubleshooting

### Fonts Not Loading
- Make sure the font files are in the correct `Assets/` folder
- Check that the file paths in `styles.css` match your actual file structure

### Images Not Showing
- Verify that all image files are in the `Assets/` folder
- Check that the file paths in `index.html` are correct

### GitHub Pages Not Working
- Ensure your repository is public
- Check that you've enabled GitHub Pages in the repository settings
- Wait a few minutes for the initial deployment to complete

## Support

If you need help with deployment or customization, please check the GitHub Pages documentation or create an issue in your repository.

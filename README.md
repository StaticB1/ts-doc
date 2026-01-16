# ToraShaout Document Generator

A professional letter and document generator for [ToraShaout](https://www.torashaout.com) - Zimbabwe's celebrity video messaging platform.

## Features

- **6 Pre-built Templates** - Welcome, Talent Onboard, Partnership, Invoice, Thank You, Custom
- **Auto-save** - Form data automatically saved to browser localStorage
- **Multiple Export Options**
  - Direct PDF download (via jsPDF)
  - Print to physical printer
  - Download as editable HTML
  - Copy plain text to clipboard
- **Form Validation** - Required field highlighting with error messages
- **Accessibility** - ARIA labels, keyboard navigation, skip links, screen reader support
- **Responsive Design** - Works on desktop, tablet, and mobile

## Usage

1. Select a template or start with Custom
2. Fill in recipient and sender details
3. Edit the letter content as needed
4. Export using your preferred method:
   - **Download PDF** - Direct PDF file download
   - **Print** - Opens browser print dialog
   - **HTML** - Downloads editable HTML file
   - **Copy** - Copies plain text to clipboard
   - **Clear** - Resets the form

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript (ES6+)
- [jsPDF](https://github.com/parallax/jsPDF) for PDF generation
- [Inter](https://fonts.google.com/specimen/Inter) font from Google Fonts
- No build process required - deploy as static files

## Files

```
ts-doc/
├── index.html    # Main HTML structure
├── styles.css    # All styling
├── app.js        # Application logic
└── README.md     # This file
```

## Brand Configuration

Edit the `BRAND` object in `app.js` to customize:

```javascript
const BRAND = {
  tagline: 'Your Favorite Stars, Delivered Anywhere in the World',
  email: 'info@torashaout.com',
  whatsapp: '+82 10 4837 0343',
  website: 'www.torashaout.com',
  address: 'Harare, Zimbabwe'
};
```

## Deployment

Simply upload the files to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Any web server

## License

Copyright ToraShaout. All rights reserved.

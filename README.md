# LegacyParts AI - Aftermarket AI Spare Parts Hub

A comprehensive web application for finding legacy and obsolete machine parts using AI-powered identification and predictive pricing.

## 🎯 Project Overview

LegacyParts AI is a specialized marketplace that solves the challenge of sourcing parts for legacy industrial equipment (10-20 years old). The platform uses artificial intelligence to identify parts from photos or manual scans and connects buyers with verified vendors while providing predictive pricing insights.

## ✨ Key Features

### For Buyers
- **AI Part Identification**: Upload photos of broken parts or scan old manuals - AI identifies the part instantly
- **Predictive Pricing**: Historical price trends and smart alerts (e.g., "Usually 30% cheaper in March")
- **3D Printable Alternatives**: Access to verified 3D-printable models for non-critical components
- **Verified Vendors**: Curated marketplace with rated and reviewed sellers
- **Price Alerts**: Set target prices and get notified when parts drop in price

### For Vendors
- **Targeted Marketplace**: Direct access to buyers actively searching for legacy parts
- **AI-Powered Matching**: Automatic matching with buyer searches
- **Flexible Pricing**: Listing fees + transaction-based monetization
- **Bulk Upload Tools**: Efficiently manage large inventories
- **Real-Time Analytics**: Track views, conversions, and optimize listings

### Monetization Model
- **Vendor Listing Fees**: $3-5 per part/month depending on plan
- **Transaction Fees**: 6-8% per sale
- **Pro Subscription**: $49/month for buyers (unlimited AI identifications, price history, alerts)
- **Enterprise Plans**: Custom pricing for large organizations

## 📁 Project Structure

```
LegacyParts-AI/
├── index.html                      # Homepage with value proposition
├── identify.html                   # AI part identification interface
├── marketplace.html                # Parts catalog with filters
├── pricing.html                    # Subscription plans & pricing
├── vendors.html                    # Vendor onboarding page
├── README.md                       # This file
├── DATASET_INTEGRATION.md          # Complete AI implementation guide
├── requirements.txt                # Python backend dependencies
├── .env.example                    # Environment configuration template
├── css/
│   ├── styles.css                  # Global styles & components
│   ├── identify.css                # Identification page styles
│   ├── marketplace.css             # Marketplace page styles
│   ├── pricing.css                 # Pricing page styles
│   └── vendors.css                 # Vendors page styles
└── js/
    ├── main.js                     # Global JavaScript
    ├── identify.js                 # Part identification logic
    ├── marketplace.js              # Marketplace filtering & search
    ├── pricing.js                  # Pricing page & chart rendering
    └── vendors.js                  # Vendor page interactions
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required - pure HTML/CSS/JavaScript

### Installation

1. **Clone or download the project files**
   ```bash
   cd "f:\New folder"
   ```

2. **Open in a web browser**
   - Simply double-click `index.html` to open in your default browser
   - Or use a local server for best experience:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (with npx)
     npx http-server
     ```

3. **Access the website**
   - If using a local server: http://localhost:8000
   - Direct file: Open index.html in your browser

## 📄 Pages Overview

### 1. Homepage (index.html)
- Hero section with value proposition
- Pain points section
- How it works (3-step process)
- Key features showcase
- Social proof & testimonials
- CTA sections

### 2. AI Identification (identify.html)
- Photo/manual upload interface
- Drag & drop functionality
- Part description form
- Results display with:
  - AI confidence score
  - Part details & specifications
  - Available vendors
  - Predictive pricing insights
  - Price alerts

### 3. Marketplace (marketplace.html)
- Advanced search functionality
- Comprehensive filters:
  - Category
  - Manufacturer
  - Condition
  - Price range
  - Availability
  - Vendor rating
- Grid/list view toggle
- Sorting options
- Part cards with:
  - Images
  - Pricing
  - Vendor info
  - Stock status
  - Price trends

### 4. Pricing (pricing.html)
- Three subscription tiers (Free, Pro, Enterprise)
- Monthly/annual billing toggle
- Feature comparison table
- Predictive pricing feature spotlight with interactive chart
- FAQ section

### 5. Vendors (vendors.html)
- Vendor value proposition
- Benefits of selling on platform
- 3-step onboarding process
- Success stories with metrics
- Vendor pricing plans
- Feature showcase

## 🎨 Design System

### Color Palette
- Primary Blue: `#2563eb`
- Secondary Green: `#10b981`
- Accent Orange: `#f59e0b`
- Dark Background: `#0f172a`
- Light Background: `#f8fafc`

### Typography
- Font Family: Inter, System Fonts
- Headings: 800 weight
- Body: 400 weight
- UI Elements: 600 weight

### Components
- Buttons: Primary, Secondary, Large variants
- Cards: Shadow-based elevation
- Forms: Consistent input styling
- Navigation: Sticky navbar with mobile menu

## 🔧 Technical Implementation

### AI Implementation with SIP-17 Dataset

**Dataset:** [Synthetic Industrial Parts Dataset (SIP-17)](https://www.kaggle.com/datasets/mandymm/synthetic-industrial-parts-dataset-sip-17/data)

The project uses the SIP-17 dataset from Kaggle, which includes:
- **33,000 synthetic training images** for 17 industrial part categories
- **566 real-world test images** from actual industrial scenarios
- **Benchmarked models**: ResNet, EfficientNet, ConvNext, ViT, DINO
- **Expected accuracy**: 75-90% on real-world images

Currently simulated in frontend. For production deployment:
1. Download SIP-17 dataset from Kaggle
2. Train model using provided architecture (see `DATASET_INTEGRATION.md`)
3. Deploy FastAPI backend with model inference
4. Connect frontend to API endpoints

**Implementation Guide:** See [DATASET_INTEGRATION.md](DATASET_INTEGRATION.md) for complete setup

### Predictive Pricing
- Chart.js library for price history visualization
- Sample data demonstrates seasonal pricing trends
- Production would integrate with real market data

### Responsive Design
- Mobile-first approach
- Breakpoints at 640px, 768px, 968px
- Collapsible mobile navigation
- Flexible grid layouts

## 🌟 Features to Implement in Production

### Backend Requirements
1. **User Authentication**
   - Buyer & vendor login systems
   - OAuth integration
   - Role-based access control

2. **AI Integration**
   - Computer vision API for part identification
   - Image processing pipeline
   - OCR for manual scanning

3. **Database**
   - Parts catalog with specifications
   - Vendor profiles & inventory
   - Historical pricing data
   - User accounts & preferences

4. **Payment Processing**
   - Stripe/PayPal integration
   - Subscription management
   - Vendor payout system

5. **Messaging System**
   - Buyer-vendor communication
   - Order notifications
   - Price alert emails

6. **Analytics**
   - User behavior tracking
   - Conversion metrics
   - Vendor performance dashboard

### Advanced Features
- Real-time inventory updates
- API for enterprise customers
- Mobile apps (iOS/Android)
- Advanced search with NLP
- Machine learning for better part matching
- Automated pricing recommendations for vendors

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Target Audience

### Buyers
- Manufacturing plant managers
- Maintenance engineers
- Equipment technicians
- Procurement specialists

### Vendors
- Industrial parts suppliers
- Equipment refurbishers
- OEM parts distributors
- 3D printing services

## 💼 Business Model

### Revenue Streams
1. **Vendor Fees**
   - Listing fees: $3-5/part/month
   - Transaction fees: 6-8% per sale
   - Featured placement options

2. **Subscriptions**
   - Pro: $49/month (buyers)
   - Enterprise: Custom pricing
   - API access fees

3. **Additional Services**
   - Priority sourcing service
   - Vendor advertising
   - White-label solutions

## 📊 Success Metrics (Hypothetical)

- 10,000+ monthly active buyers
- 500+ verified vendors
- 50,000+ parts listed
- $2.4M monthly GMV
- 94% AI identification accuracy
- Average $2,400/year savings for Pro users

## 🔐 Security Considerations

For production deployment:
- HTTPS encryption
- Secure payment processing (PCI compliance)
- Data encryption at rest
- Regular security audits
- GDPR compliance for EU users
- Vendor verification process

## 🚀 Deployment

### Quick Deploy Options
1. **GitHub Pages**: Free static hosting
2. **Netlify**: Automatic deployments from Git
3. **Vercel**: Optimized for modern web apps
4. **AWS S3 + CloudFront**: Scalable CDN hosting

### Production Deployment
- Add backend API (Node.js, Python, etc.)
- Database (PostgreSQL, MongoDB)
- Cloud hosting (AWS, Google Cloud, Azure)
- CDN for assets
- Monitoring & logging

## 📞 Contact & Support

This is a demonstration project showcasing the concept of an AI-powered aftermarket parts marketplace.

For implementation or questions about the concept:
- Review the code structure
- Check inline comments for functionality explanations
- Examine the mobile responsiveness approach

## 📜 License

This project is provided as-is for demonstration purposes.

## 🎓 Learning Resources

Technologies used in this project:
- HTML5 semantic elements
- CSS3 Grid & Flexbox
- Vanilla JavaScript (ES6+)
- Chart.js for data visualization
- Font Awesome icons
- Responsive design principles

---

**Built with ❤️ for the manufacturing industry**

*Helping factories keep their legacy equipment running with modern AI technology*

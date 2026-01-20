# current nai - AI-Powered Electronic Component Identification & Marketplace

An intelligent web application that uses deep learning to identify electronic components from images and connects buyers with verified vendors in Bangladesh.

## 🎯 Project Overview

**current nai** is an AI-powered platform designed for electronics enthusiasts, hobbyists, engineers, and professionals in Bangladesh. The platform uses a trained EfficientNet-B0 deep learning model to identify 36 different types of electronic components from uploaded images and provides a comprehensive marketplace to purchase these components from local verified vendors.

## ✨ Key Features

### 🤖 AI Component Identification
- **Deep Learning Model**: EfficientNet-B0 trained on 10,990 images across 36 component categories
- **52.18% Validation Accuracy**: Identifies components including capacitors, resistors, transistors, LEDs, ICs, relays, and more
- **Instant Recognition**: Upload component images and get immediate identification results
- **Confidence Scoring**: AI provides confidence percentages for each prediction

### 🛒 Live Marketplace
- **41 Real Products**: Database-driven marketplace with authentic electronic components
- **Bangladesh-Focused**: Prices in Bangladesh Taka (৳), local vendors, verified manufacturers
- **Advanced Search**: Real-time filtering by name, description, category, and manufacturer
- **Category Filters**: Browse by component type (capacitors, transistors, ICs, LEDs, etc.)
- **Vendor Ratings**: 5 verified vendors with customer ratings and reviews

### 🎨 Modern Dark Theme
- **Electrified Design**: Neon cyan, purple, and pink accents on dark backgrounds
- **Microchip Icons**: Circuit-themed visual elements throughout
- **Responsive Layout**: Fully optimized for desktop, tablet, and mobile devices
- **Background Images**: Custom hero and marketplace backgrounds

## 🧠 AI Model Details

### Training Specifications
- **Architecture**: EfficientNet-B0 (PyTorch)
- **Dataset**: 10,990 electronic component images
- **Categories**: 36 component types
- **Training Duration**: ~3.5 hours
- **Validation Accuracy**: 52.18%
- **Model Size**: 49.1 MB (electronics_best_model.pth)

### Supported Component Categories
Bypass-capacitor, Ceramic-capacitor, Diode, Electrolytic-capacitor, Film-capacitor, IC-EEPROM, Inductor, Integrated-micro-circuit, LCD-1602, LCD-2004, LCD-Nokia-5110, LED, Op-amp, PNP-transistor, Photoresistor, Piezo, Potentiometer, Push-buttons, Terminal, TO-220, USB-micro, USB-mini, Voltage-regulator-78xx, Voltage-regulator-79xx, barrel-jack, capacitor, micro-SD, micro-switch, passive-buzzer, relay, resistor, transistor, transformer, trimmer, trim-pot, varistor

## 📁 Project Structure

```
current-nai/
├── index.html                      # Homepage with hero section
├── identify.html                   # AI component identification page
├── marketplace.html                # Product marketplace with search
├── pricing.html                    # Pricing plans page
├── vendors.html                    # Vendor information page
├── api_server.py                   # FastAPI backend server
├── database.py                     # SQLAlchemy models & seed data
├── requirements.txt                # Python dependencies
├── Procfile                        # Render deployment config
├── runtime.txt                     # Python version specification
├── README.md                       # This file
├── DEPLOYMENT.md                   # Deployment instructions
├── models/
│   └── electronics_best_model.pth  # Trained AI model (49.1 MB)
├── css/
│   ├── styles.css                  # Global styles with dark theme
│   ├── identify.css                # Identification page styles
│   ├── marketplace.css             # Marketplace styles
│   ├── pricing.css                 # Pricing page styles
│   └── vendors.css                 # Vendors page styles
├── js/
│   ├── main.js                     # Global JavaScript & navigation
│   ├── identify.js                 # AI identification interface
│   ├── marketplace.js              # Marketplace search & filters
│   ├── pricing.js                  # Pricing page interactions
│   └── vendors.js                  # Vendor page logic
└── images/
    ├── hero-background.png         # Homepage background image
    └── marketplace-background.png  # Marketplace background image
```

## 🚀 Getting Started

### Prerequisites
- Python 3.10.0
- pip (Python package manager)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fuadnafiu/Building-an-AI-Powered-Marketplace-for-Electrical-Components.git
   cd Building-an-AI-Powered-Marketplace-for-Electrical-Components
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Initialize the database** (creates marketplace.db with sample products)
   ```bash
   python database.py
   ```

4. **Start the FastAPI server**
   ```bash
   python api_server.py
   ```
   Or using uvicorn:
   ```bash
   uvicorn api_server:app --host 0.0.0.0 --port 8000
   ```

5. **Access the website**
   - Local: http://localhost:8000
   - Network: http://192.168.0.XXX:8000 (replace XXX with your local IP)

## 🔌 API Endpoints

### Component Identification
```
POST /api/identify-part
Content-Type: multipart/form-data
Body: { "file": <image_file> }
Response: { "category": "LED", "confidence": 0.89, "all_predictions": [...] }
```

### Marketplace APIs
```
GET /api/products              # Get all products with optional filters
GET /api/products/{id}         # Get specific product details
GET /api/categories            # Get all product categories
```

### Query Parameters for /api/products
- `category`: Filter by component category
- `min_price`: Minimum price filter
- `max_price`: Maximum price filter
- `search`: Search in name, description, category, manufacturer

## 📄 Pages Overview

### 1. Homepage ([index.html](index.html))
- Dark electrified hero section with neon accents
- Project introduction and value proposition
- Feature highlights with microchip icons
- Call-to-action buttons

### 2. AI Identification ([identify.html](identify.html))
- Drag & drop image upload interface
- Real-time AI component identification
- Confidence scores and top-5 predictions
- Results display with category information

### 3. Marketplace ([marketplace.html](marketplace.html))
- 41 real products from SQLite database
- Live search functionality (name, description, category, manufacturer)
- Category filters with checkboxes
- Product cards with images, pricing, ratings
- Real manufacturers: Murata, Nichicon, Texas Instruments, Microchip, etc.
- Grid/list view options
- Bangladesh Taka (৳) pricing

### 4. Pricing ([pricing.html](pricing.html))
- Three subscription tiers (Free, Pro, Enterprise)
- Feature comparison
- Bangladesh-focused pricing

### 5. Vendors ([vendors.html](vendors.html))
- Vendor information and benefits
- Bangladesh vendor showcase
- 5 verified vendors with ratings
## 🎨 Design System

### Color Palette
- Background: `#0a0a0a` (Pure black)
- Secondary Background: `#1a1a1a`
- Primary Cyan: `#00d4ff` (Neon accents)
- Purple: `#a855f7` (Secondary accents)
- Pink: `#ec4899` (Tertiary accents)
- Text: `#ffffff`, `#e5e5e5`, `#9ca3af`

### Typography
- Font Family: Inter, system-ui, sans-serif
- Headings: 700-900 weight
- Body: 400 weight
- UI Elements: 500-600 weight

### Theme
- **Dark Mode**: Pure black backgrounds with neon accents
- **Electrified Style**: Cyan/purple/pink neon glows
- **Microchip Icons**: Circuit-themed iconography
- **Gradient Effects**: Multi-color gradients on headings

## 🛠️ Technology Stack

### Frontend
- HTML5 with semantic elements
- CSS3 (Grid, Flexbox, animations)
- Vanilla JavaScript (ES6+)
- Font Awesome icons
- Responsive design (mobile-first)

### Backend
- **Framework**: FastAPI 0.104.1
- **Server**: Uvicorn 0.24.0
- **Database**: SQLite with SQLAlchemy 2.0.23
- **AI/ML**: PyTorch 2.1.0, torchvision 0.16.0
- **Image Processing**: Pillow 10.1.0

### AI Model
- **Architecture**: EfficientNet-B0
- **Framework**: PyTorch
- **Training**: Custom training pipeline
- **Inference**: Real-time prediction API

## 🗄️ Database Schema

### Products Table
- id, name, description, category, price (৳)
- stock_quantity, image_url, manufacturer
- vendor_id (foreign key), ratings, created_at

### Vendors Table
- id, name, description, location (Bangladesh)
- rating, contact_email, phone, website
- verified, created_at

### Sample Vendors
1. **Techshop BD** - Dhaka (4.8★)
2. **Ryans Computers** - Dhaka (4.7★)
3. **Circuit Valley** - Chittagong (4.6★)
4. **RoboMart BD** - Sylhet (4.9★)
5. **DIY Electronics BD** - Dhaka (4.5★)

## ☁️ Deployment

### Render Deployment (Recommended)

1. **Sign up at [Render](https://render.com)**
2. **Connect GitHub repository**
3. **Configure Web Service:**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn api_server:app --host 0.0.0.0 --port $PORT`
   - Instance Type: Free
4. **Deploy** (takes 5-10 minutes)

### Railway Deployment (Alternative)

1. Sign up at [Railway](https://railway.app)
2. New Project → Deploy from GitHub
3. Select repository
4. Railway auto-detects Python and uses Procfile
5. Deploy automatically

### Environment Variables (Optional)
```
PYTHON_VERSION=3.10.0
PORT=8000
```

### Deployment Files Included
- `Procfile`: Uvicorn start command
- `runtime.txt`: Python 3.10.0 specification
- `requirements.txt`: All dependencies

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🌟 Future Enhancements

### Planned Features
- User authentication & accounts
- Shopping cart & checkout
- Order tracking system
- Vendor dashboard
- Payment gateway integration (bKash, Nagad, card payments)
- Email notifications
- Product reviews & ratings
- Advanced AI features (component defect detection)
- Mobile application (Android/iOS)
- Multi-language support (Bengali, English)

### AI Model Improvements
- Increase training dataset size
- Fine-tune for higher accuracy
- Add more component categories
- Implement object detection (multiple components in one image)
- Component specifications extraction

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Target Audience

- **Electronics Hobbyists**: DIY project builders
- **Students**: Engineering and robotics students
- **Professionals**: Electronics engineers and technicians
- **Makers**: Arduino, Raspberry Pi, IoT enthusiasts
- **Repair Technicians**: Device repair professionals
- **Educators**: Electronics instructors and trainers

## 📊 Project Statistics

- **AI Model**: 36 categories, 52.18% accuracy
- **Dataset**: 10,990 training images
- **Products**: 41 real components in marketplace
- **Vendors**: 5 verified Bangladesh vendors
- **Codebase**: 36 files, 232 MB deployed
- **Technologies**: FastAPI, PyTorch, SQLite, Vanilla JS

## 📞 Contact & Support

**Project Repository**: [GitHub](https://github.com/fuadnafiu/Building-an-AI-Powered-Marketplace-for-Electrical-Components)

For questions, issues, or contributions:
- Open an issue on GitHub
- Submit a pull request
- Check documentation files

## 📜 License

This project is provided as-is for educational and demonstration purposes.

## 🙏 Acknowledgments

- PyTorch team for the excellent deep learning framework
- EfficientNet authors for the model architecture
- Bangladesh electronics community
- All verified vendors and manufacturers

## 🎓 Learning Resources

### Technologies Used
- **Backend**: FastAPI, Uvicorn, SQLAlchemy
- **AI/ML**: PyTorch, torchvision, EfficientNet
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Database**: SQLite
- **Deployment**: Render, Railway
- **Version Control**: Git, GitHub

### Key Concepts Demonstrated
- Deep learning image classification
- REST API development with FastAPI
- Database design with SQLAlchemy ORM
- Responsive web design
- Real-time search and filtering
- Modern dark UI/UX design

---

**Built with ❤️ for the electronics community in Bangladesh**

*Empowering makers, students, and professionals with AI-powered component identification*

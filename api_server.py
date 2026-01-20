"""
Electronic Components AI - API Server
FastAPI backend serving trained EfficientNet model for 36 electronic components
"""
from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
from PIL import Image
import io
import torch
import torchvision.transforms as transforms
from torchvision import models
import torch.nn as nn
import os
from typing import Optional, List
from database import SessionLocal, Product, Vendor

app = FastAPI(title="current nai API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files
if os.path.exists("css"):
    app.mount("/css", StaticFiles(directory="css"), name="css")
if os.path.exists("js"):
    app.mount("/js", StaticFiles(directory="js"), name="js")
if os.path.exists("images"):
    app.mount("/images", StaticFiles(directory="images"), name="images")
if os.path.exists("dataset"):
    app.mount("/dataset", StaticFiles(directory="dataset"), name="dataset")

# Load model
print("Loading Electronic Components AI Model...")

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
MODEL_PATH = "./models/electronics_best_model.pth"

checkpoint = torch.load(MODEL_PATH, map_location=device)
class_names = checkpoint['class_names']
num_classes = len(class_names)

print(f"✅ Found {num_classes} categories")

# Create model
model = models.efficientnet_b0(pretrained=False)
model.classifier[1] = nn.Linear(model.classifier[1].in_features, num_classes)
model.load_state_dict(checkpoint['model_state_dict'])
model = model.to(device)
model.eval()

print(f"✅ Model loaded! Accuracy: {checkpoint['val_acc']:.2f}%")

# Image preprocessing
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# Routes
@app.get("/")
async def root():
    return FileResponse("index.html")

@app.get("/index.html")
async def index_page():
    return FileResponse("index.html")

@app.get("/identify")
async def identify_page():
    return FileResponse("identify.html")

@app.get("/identify.html")
async def identify_html_page():
    return FileResponse("identify.html")

@app.get("/marketplace.html")
async def marketplace_page():
    return FileResponse("marketplace.html")

@app.get("/vendors.html")
async def vendors_page():
    return FileResponse("vendors.html")

@app.get("/pricing.html")
async def pricing_page():
    return FileResponse("pricing.html")

@app.post("/api/identify-part")
async def identify_part(file: UploadFile = File(...)):
    try:
        # Read image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        
        # Preprocess
        input_tensor = preprocess(image).unsqueeze(0).to(device)
        
        # Inference
        with torch.no_grad():
            outputs = model(input_tensor)
            probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
            confidence, predicted_idx = torch.max(probabilities, 0)
        
        # Get prediction
        predicted_class = class_names[predicted_idx.item()]
        confidence_pct = confidence.item() * 100
        
        # Build response
        response = {
            'success': True,
            'part': {
                'name': predicted_class.replace('-', ' ').title(),
                'category': 'Electronic Component',
                'confidence': round(confidence_pct, 2),
                'detected_type': predicted_class
            },
            'specifications': {'Type': 'Electronic Component'},
            'applications': ['Various electronic applications'],
            'pricing': {
                'estimated_range': '100-5000 BDT',
                'currency': 'BDT'
            },
            'vendors': [
                {'name': 'Electronics BD', 'location': 'Dhaka', 'rating': 4.7},
                {'name': 'Component House', 'location': 'Chittagong', 'rating': 4.5}
            ],
            'method': 'EfficientNet-B0',
            'note': f'AI Confidence: {confidence_pct:.1f}%'
        }
        
        return response
        
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# MARKETPLACE APIs
# ============================================

@app.get("/api/products")
async def get_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = Query(50, le=100)
):
    """Get products from marketplace with optional filtering"""
    db = SessionLocal()
    try:
        query = db.query(Product).join(Vendor)
        
        if category:
            query = query.filter(Product.category == category)
        
        if search:
            query = query.filter(
                (Product.name.contains(search)) | 
                (Product.description.contains(search))
            )
        
        products = query.limit(limit).all()
        
        result = []
        for product in products:
            result.append({
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'category': product.category,
                'price': product.price,
                'stock': product.stock,
                'manufacturer': product.manufacturer,
                'image_url': product.image_url,
                'vendor': {
                    'name': product.vendor.name,
                    'location': product.vendor.location,
                    'rating': product.vendor.rating
                }
            })
        
        return {'success': True, 'count': len(result), 'products': result}
    
    finally:
        db.close()

@app.get("/api/products/{product_id}")
async def get_product(product_id: int):
    """Get single product details"""
    db = SessionLocal()
    try:
        product = db.query(Product).filter(Product.id == product_id).first()
        
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        return {
            'success': True,
            'product': {
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'category': product.category,
                'price': product.price,
                'stock': product.stock,
                'manufacturer': product.manufacturer,
                'vendor': {
                    'name': product.vendor.name,
                    'location': product.vendor.location,
                    'rating': product.vendor.rating,
                    'email': product.vendor.email
                }
            }
        }
    finally:
        db.close()

@app.get("/api/categories")
async def get_categories():
    """Get all product categories"""
    db = SessionLocal()
    try:
        categories = db.query(Product.category).distinct().all()
        return {
            'success': True,
            'categories': [cat[0] for cat in categories if cat[0]]
        }
    finally:
        db.close()

if __name__ == "__main__":
    print("\n" + "="*70)
    print("🔌 current nai API Server")
    print(f"📋 Components: {num_classes}")
    print(f"🎯 Accuracy: {checkpoint['val_acc']:.2f}%")
    print("🌐 http://0.0.0.0:8000")
    print("="*70 + "\n")
    uvicorn.run(app, host="0.0.0.0", port=8000)
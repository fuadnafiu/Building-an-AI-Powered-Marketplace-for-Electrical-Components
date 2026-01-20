# 🚀 Deployment Guide - LegacyParts AI
## Bangladesh Market | RTX 4060 Optimized

Complete guide to deploy your full-stack AI marketplace locally and to production.

---

## 📋 Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [YOLO Model Setup](#yolo-model-setup)
3. [Database Setup (PostgreSQL + pgvector)](#database-setup)
4. [Backend Setup (FastAPI)](#backend-setup)
5. [Frontend Setup (Next.js)](#frontend-setup)
6. [Payment Integration (SSLCommerz)](#payment-integration)
7. [Production Deployment](#production-deployment)

---

## 🖥️ Local Development Setup

### Prerequisites
- **Python 3.10+** installed
- **Node.js 18+** and npm/yarn
- **NVIDIA RTX 4060** with latest drivers
- **CUDA 11.8** installed
- **Docker Desktop** (for PostgreSQL)
- **10GB+ free space**

### Verify RTX 4060 Setup
```powershell
# Check NVIDIA driver
nvidia-smi

# Should show RTX 4060 Ti/4060
```

---

## 🤖 YOLO Model Setup

### Option 1: Train Custom YOLOv11 Model (Recommended)

```powershell
# Install Ultralytics
pip install ultralytics

# Train on your spare parts dataset
python train_yolo.py --data spare_parts.yaml --epochs 100 --imgsz 640

# Export trained model
python export_yolo.py --weights ./runs/train/exp/weights/best.pt
```

### Option 2: Use Pre-trained YOLO + Fine-tune

```powershell
# Download YOLOv11n (nano - fastest on RTX 4060)
yolo download model=yolov11n.pt

# Fine-tune on industrial parts
yolo train model=yolov11n.pt data=industrial_parts.yaml epochs=50
```

### Option 3: Start with Generic YOLOv8

```powershell
# Download pre-trained YOLOv8
mkdir weights
cd weights
# Download from: https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8n.pt
```

**Place model weights in:**
```
F:\New folder\backend\weights\yolov11_parts.pt
```

---

## 🗄️ Database Setup (PostgreSQL + pgvector)

### Step 1: Start PostgreSQL with Docker

```powershell
cd "F:\New folder"

# Start PostgreSQL with pgvector
docker-compose up -d postgres redis

# Wait for startup (30 seconds)
Start-Sleep -Seconds 30

# Verify running
docker ps
```

### Step 2: Create Database Schema

```powershell
# Install Alembic for migrations
pip install alembic

# Initialize database
cd backend
python -c "from database.db import init_db; init_db()"

# Run migrations
alembic upgrade head
```

### Step 3: Seed Initial Data (Optional)

```powershell
# Create seed data script
python scripts/seed_database.py
```

---

## ⚡ Backend Setup (FastAPI)

### Step 1: Install Python Dependencies

```powershell
cd "F:\New folder"

# Create virtual environment
python -m venv venv

# Activate
.\venv\Scripts\Activate.ps1

# Install dependencies (RTX 4060 optimized)
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
pip install -r requirements.txt
```

### Step 2: Configure Environment

```powershell
# Copy environment template
copy .env.example .env

# Edit .env with your settings
notepad .env
```

**Required settings in .env:**
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/legacyparts
REDIS_URL=redis://localhost:6379/0
SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_PASSWORD=your_password
SSLCOMMERZ_SANDBOX=True
```

### Step 3: Start Backend Server

```powershell
cd backend

# Start with Uvicorn (development)
python main.py

# Or with hot-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Backend will run at:** `http://localhost:8000`

**Test endpoints:**
```powershell
# Health check
curl http://localhost:8000/api/health

# Should return GPU info and model status
```

---

## 🎨 Frontend Setup (Next.js)

### Create Next.js App with App Router

```powershell
# Create Next.js project
npx create-next-app@latest frontend --typescript --app --tailwind

cd frontend

# Install additional dependencies
npm install axios swr recharts lucide-react
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install framer-motion
```

### Project Structure

```
frontend/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── identify/
│   │   └── page.tsx             # AI identification
│   ├── marketplace/
│   │   └── page.tsx             # Parts catalog
│   ├── pricing/
│   │   └── page.tsx             # Pricing plans
│   ├── vendors/
│   │   └── page.tsx             # Vendor portal
│   └── layout.tsx
├── components/
│   ├── PartCard.tsx
│   ├── UploadZone.tsx
│   ├── PriceChart.tsx
│   └── PaymentModal.tsx
├── lib/
│   ├── api.ts                   # API client
│   └── utils.ts
└── public/
    └── images/
```

### Configure API Client

Create `frontend/lib/api.ts`:
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const identifyPart = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/api/identify-part', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  return response.data;
};

export const searchParts = async (query: string, filters: any) => {
  const response = await api.get('/api/parts/search', {
    params: { query, ...filters },
  });
  return response.data;
};

export default api;
```

### Start Frontend

```powershell
cd frontend

# Development server
npm run dev

# Opens at http://localhost:3000
```

---

## 💳 Payment Integration (SSLCommerz)

### Step 1: Get SSLCommerz Credentials

1. **Sign up at:** https://developer.sslcommerz.com/registration/
2. **Get Sandbox credentials:**
   - Store ID
   - Store Password
3. **Add to `.env`:**
   ```env
   SSLCOMMERZ_STORE_ID=your_store_id_here
   SSLCOMMERZ_PASSWORD=your_password_here
   SSLCOMMERZ_SANDBOX=True
   ```

### Step 2: Test Payment Flow

```powershell
# Start backend
cd backend
python main.py

# In another terminal, test payment
curl -X POST http://localhost:8000/api/orders/create \
  -H "Content-Type: application/json" \
  -d '{
    "part_id": 1,
    "vendor_id": 1,
    "quantity": 1,
    "customer_name": "Test User",
    "customer_email": "test@example.com",
    "customer_phone": "01712345678",
    "delivery_address": "Dhaka, Bangladesh"
  }'
```

### Step 3: Implement Payment Callbacks

Backend already has callbacks at:
- Success: `/api/payment/callback`
- Webhook: `/api/payment/webhook`

Frontend should redirect to SSLCommerz gateway URL returned in response.

---

## 🌐 Production Deployment

### Option 1: Cloud Deployment (Recommended)

**Backend (FastAPI + GPU):**
- **Railway** or **Render** (support GPU)
- **AWS EC2** with G4dn instance (NVIDIA T4)
- **Google Cloud** with T4 or A100

**Database:**
- **Supabase** (PostgreSQL with pgvector)
- **Neon** (Serverless Postgres)
- **AWS RDS** (PostgreSQL 15+)

**Frontend (Next.js):**
- **Vercel** (recommended, free tier)
- **Netlify**
- **AWS Amplify**

### Option 2: VPS Deployment

**Requirements:**
- Ubuntu 22.04 Server
- NVIDIA GPU (RTX 3060+)
- 16GB+ RAM
- 50GB+ SSD

**Setup:**
```bash
# Install CUDA
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.0-1_all.deb
sudo dpkg -i cuda-keyring_1.0-1_all.deb
sudo apt-get update
sudo apt-get install cuda

# Install Docker with NVIDIA runtime
sudo apt-get install docker.io
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
sudo apt-get update
sudo apt-get install -y nvidia-docker2
sudo systemctl restart docker

# Deploy with Docker Compose
docker-compose up -d
```

### SSL Certificate (Production)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d api.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## 🔧 Performance Optimization

### Backend (RTX 4060)

1. **Enable TensorRT for faster inference:**
   ```python
   # In yolo_detector.py
   model.export(format='engine', half=True)  # FP16 for 2x speedup
   ```

2. **Batch processing:**
   ```python
   # Process multiple images at once
   results = model.predict(image_batch, batch=8)
   ```

3. **Model quantization:**
   ```python
   # Reduce model size + faster inference
   model.quantize(precision='int8')
   ```

### Database

1. **Create indexes:**
   ```sql
   CREATE INDEX idx_parts_embedding ON parts USING ivfflat (embedding vector_cosine_ops);
   CREATE INDEX idx_parts_category ON parts(category);
   CREATE INDEX idx_vendors_city ON vendors(city);
   ```

2. **Enable connection pooling** (already in code)

### Frontend

1. **Image optimization:**
   ```typescript
   // next.config.js
   module.exports = {
     images: {
       domains: ['yourdomain.com'],
       formats: ['image/avif', 'image/webp'],
     },
   }
   ```

2. **API caching with SWR:**
   ```typescript
   import useSWR from 'swr';
   
   const { data, error } = useSWR('/api/parts/search', fetcher, {
     refreshInterval: 30000,  // 30 seconds
   });
   ```

---

## 📊 Monitoring & Logging

### Application Monitoring

```powershell
# Install Sentry for error tracking
pip install sentry-sdk

# Add to main.py
import sentry_sdk
sentry_sdk.init(dsn="your-sentry-dsn")
```

### GPU Monitoring

```powershell
# Real-time GPU usage
nvidia-smi -l 1

# GPU metrics in FastAPI
@app.get("/api/gpu-stats")
def get_gpu_stats():
    return {
        "utilization": torch.cuda.utilization(),
        "memory_used": torch.cuda.memory_allocated(),
        "memory_total": torch.cuda.get_device_properties(0).total_memory
    }
```

---

## ✅ Launch Checklist

- [ ] PostgreSQL running with pgvector enabled
- [ ] Redis running for caching
- [ ] YOLO model weights downloaded/trained
- [ ] Backend server running on port 8000
- [ ] Frontend server running on port 3000
- [ ] SSLCommerz credentials configured
- [ ] Database seeded with initial data
- [ ] GPU detected and model loaded
- [ ] Payment flow tested in sandbox
- [ ] All API endpoints returning 200

---

## 🆘 Troubleshooting

### CUDA Out of Memory
```powershell
# Reduce batch size
# In yolo_detector.py, set batch=1
```

### PostgreSQL Connection Failed
```powershell
# Restart containers
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

### YOLO Model Not Loading
```powershell
# Download correct weights
cd backend/weights
# Get from: https://github.com/ultralytics/assets/releases
```

---

**Next Steps:**
1. Train/download YOLO model
2. Start PostgreSQL
3. Run backend server
4. Test API endpoints
5. Build frontend UI
6. Integrate SSLCommerz

**Questions?** Check the full guides:
- [QUICKSTART.md](QUICKSTART.md)
- [DATASET_INTEGRATION.md](DATASET_INTEGRATION.md)

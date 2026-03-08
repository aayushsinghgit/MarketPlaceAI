# AgentForge - AI Agents Platform

A production-ready platform for buying and selling AI agents, automation tools, and intelligent solutions.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python
- **AI Service**: Hugging Face Transformers
- **Database**: PostgreSQL
- **Cache**: Redis
- **Payments**: Stripe

## Features

- User authentication (Email/Password, Google OAuth)
- Seller onboarding with payment setup
- AI agent listing and discovery
- AI-powered product categorization
- Secure payment processing
- Automated invoice generation
- Admin dashboard

## Quick Start

### Using Docker Compose

```bash
# Clone and navigate to project
cd AIMarketPlace

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# AI Service: http://localhost:8001
```

### Manual Setup

#### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### AI Service
```bash
cd ai-service
pip install -r requirements.txt
python main.py
```

#### Database
```bash
psql -U admin -d agentforge -f database/schema.sql
```

## Environment Variables

Copy `.env.example` to `.env` and update with your credentials:

```bash
cp .env.example .env
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Sellers
- `POST /api/sellers/onboard` - Onboard new seller

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create new product

### AI Service
- `POST /classify` - Classify product category
- `POST /generate-tags` - Generate product tags

## Project Structure

```
AIMarketPlace/
├── frontend/          # Next.js application
├── backend/           # FastAPI backend
├── ai-service/        # AI classification service
├── database/          # Database schemas
└── docker-compose.yml # Docker orchestration
```

## License

MIT

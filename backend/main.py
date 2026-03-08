from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta
import uuid

app = FastAPI(title="AgentForge API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "your-secret-key-change-in-production"

# Models
class UserRegister(BaseModel):
    email: str
    password: str
    name: str

class UserLogin(BaseModel):
    email: str
    password: str

class SellerOnboard(BaseModel):
    name: str
    email: str
    country: Optional[str] = None
    company: Optional[str] = None
    paymentProvider: Optional[str] = None
    phone: Optional[str] = None
    website: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip: Optional[str] = None

class Product(BaseModel):
    name: str
    description: str
    price: float
    category: str

class CartItem(BaseModel):
    productId: int
    quantity: int = 1

class CheckoutRequest(BaseModel):
    items: List[dict]
    totalAmount: float
    cardNumber: str
    name: str
    email: str

# In-memory storage
users_db = {}
sellers_db = {}
products_db = []
carts_db = {}
orders_db = []

def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload["email"]
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/")
def root():
    return {"message": "AgentForge API"}

@app.post("/api/auth/register")
def register(user: UserRegister):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_password = pwd_context.hash(user.password)
    users_db[user.email] = {
        "email": user.email,
        "password": hashed_password,
        "name": user.name,
        "isSeller": False
    }
    carts_db[user.email] = []
    return {"message": "User created successfully"}

@app.post("/api/auth/login")
def login(user: UserLogin):
    if user.email not in users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    stored_user = users_db[user.email]
    if not pwd_context.verify(user.password, stored_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = jwt.encode(
        {"email": user.email, "exp": datetime.utcnow() + timedelta(days=7)},
        SECRET_KEY,
        algorithm="HS256"
    )
    return {"token": token, "user": {"email": user.email, "name": stored_user["name"], "isSeller": stored_user.get("isSeller", False)}}

@app.post("/api/sellers/onboard")
def onboard_seller(seller: SellerOnboard, email: str = Depends(get_current_user)):
    sellers_db[email] = seller.dict()
    if email in users_db:
        users_db[email]["isSeller"] = True
    return {"message": "Seller onboarded successfully"}

@app.get("/api/products")
def get_products():
    return products_db

@app.post("/api/products")
def create_product(product: Product, email: str = Depends(get_current_user)):
    if email not in sellers_db:
        raise HTTPException(status_code=403, detail="Only sellers can create products")
    product_dict = product.dict()
    product_dict["id"] = len(products_db) + 1
    product_dict["sellerId"] = email
    product_dict["createdAt"] = datetime.utcnow().isoformat()
    products_db.append(product_dict)
    return product_dict

@app.get("/api/cart")
def get_cart(email: str = Depends(get_current_user)):
    return carts_db.get(email, [])

@app.post("/api/cart/add")
def add_to_cart(item: CartItem, email: str = Depends(get_current_user)):
    if email not in carts_db:
        carts_db[email] = []
    
    product = next((p for p in products_db if p["id"] == item.productId), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    existing = next((i for i in carts_db[email] if i["productId"] == item.productId), None)
    if existing:
        existing["quantity"] += item.quantity
    else:
        carts_db[email].append({"productId": item.productId, "quantity": item.quantity, "product": product})
    
    return {"message": "Added to cart", "cart": carts_db[email]}

@app.delete("/api/cart/remove/{product_id}")
def remove_from_cart(product_id: int, email: str = Depends(get_current_user)):
    if email in carts_db:
        carts_db[email] = [item for item in carts_db[email] if item["productId"] != product_id]
    return {"message": "Removed from cart", "cart": carts_db.get(email, [])}

@app.post("/api/checkout")
def checkout(request: CheckoutRequest, email: str = Depends(get_current_user)):
    order_id = str(uuid.uuid4())
    order = {
        "orderId": order_id,
        "buyerEmail": email,
        "items": request.items,
        "totalAmount": request.totalAmount,
        "status": "completed",
        "createdAt": datetime.utcnow().isoformat()
    }
    orders_db.append(order)
    
    # Update seller revenue
    for item in request.items:
        product = next((p for p in products_db if p["id"] == item["id"]), None)
        if product and "sellerId" in product:
            seller_email = product["sellerId"]
            if seller_email not in sellers_db:
                sellers_db[seller_email] = {}
            if "revenue" not in sellers_db[seller_email]:
                sellers_db[seller_email]["revenue"] = 0
                sellers_db[seller_email]["sales"] = 0
            sellers_db[seller_email]["revenue"] += item["price"] * item.get("quantity", 1)
            sellers_db[seller_email]["sales"] += item.get("quantity", 1)
    
    # Clear cart
    carts_db[email] = []
    
    return {"success": True, "orderId": order_id, "message": "Payment successful"}

@app.get("/api/dashboard")
def get_dashboard(email: str = Depends(get_current_user)):
    user = users_db.get(email, {})
    is_seller = user.get("isSeller", False)
    
    # Buyer stats
    buyer_orders = [o for o in orders_db if o["buyerEmail"] == email]
    total_spent = sum(o["totalAmount"] for o in buyer_orders)
    total_purchases = len(buyer_orders)
    
    # Seller stats
    seller_products = [p for p in products_db if p.get("sellerId") == email]
    seller_info = sellers_db.get(email, {})
    total_revenue = seller_info.get("revenue", 0)
    total_sales = seller_info.get("sales", 0)
    
    return {
        "isSeller": is_seller,
        "buyer": {
            "totalSpent": total_spent,
            "totalPurchases": total_purchases,
            "orders": buyer_orders
        },
        "seller": {
            "totalRevenue": total_revenue,
            "totalSales": total_sales,
            "productsListed": len(seller_products),
            "products": seller_products
        } if is_seller else None
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

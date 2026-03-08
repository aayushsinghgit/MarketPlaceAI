from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI(title="AI Service")

classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

class ProductClassifyRequest(BaseModel):
    name: str
    description: str

@app.post("/classify")
def classify_product(request: ProductClassifyRequest):
    text = f"{request.name}. {request.description}"
    categories = ["Automation AI", "Analytics AI", "Content Generation", "Data Processing", "Customer Service"]
    
    result = classifier(text, categories)
    
    return {
        "category": result["labels"][0],
        "confidence": result["scores"][0],
        "tags": result["labels"][:3]
    }

@app.post("/generate-tags")
def generate_tags(request: ProductClassifyRequest):
    text = f"{request.name}. {request.description}"
    result = classifier(text, ["automation", "AI", "productivity", "analytics", "workflow", "integration"])
    
    return {
        "tags": [label for label, score in zip(result["labels"], result["scores"]) if score > 0.3]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Jay Profile AI backend is running!"} 
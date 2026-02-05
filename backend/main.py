from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
from engine import process_uploaded_csv

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_csv(
    file: UploadFile = File(...), 
    feature_col: str = Form(...), 
    target_col: str = Form(...)
):
    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
        
        result = process_uploaded_csv(df, feature_col, target_col)
        
        if isinstance(result, dict) and result.get("type") == "categorical_group":
            return {
                "dataType": "categorical",
                "chartData": result["chartData"],
                "summary": result["summary"],
                "message": "Categorical aggregation successful."
            }
        
        return {
            "dataType": "numerical",
            "statistics": result["stats"],
            "chartData": result["chartData"],
            "lineData": result["lineData"],
            "message": "Neural regression successful."
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
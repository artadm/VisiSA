import torch
import torch.nn as nn
import pandas as pd
from sklearn.preprocessing import StandardScaler
from model import DynamicRegressor
import numpy as np

def process_uploaded_csv(df, feature_col, target_col):
    df.columns = df.columns.str.strip()

    cols_map = {c.lower(): c for c in df.columns}
    
    f_clean = feature_col.lower().strip()
    t_clean = target_col.lower().strip()

    actual_f = cols_map.get(f_clean)
    actual_t = cols_map.get(t_clean)

    if not actual_f or not actual_t:
        available = ", ".join(df.columns)
        raise ValueError(f"Column mismatch. You sent '{feature_col}' and '{target_col}'. "
                         f"Available columns are: {available}")
    
    is_f_numeric = pd.api.types.is_numeric_dtype(df[actual_f])
    is_t_numeric = pd.api.types.is_numeric_dtype(df[actual_t])

    if is_f_numeric and is_t_numeric:
        return handle_numerical_regression(df, actual_f, actual_t)

    elif not is_f_numeric and is_t_numeric:
        return handle_categorical_grouping(df, actual_f, actual_t)

    else:
        raise ValueError("This combination (Categorical Target) requires a Classification model.")



def handle_numerical_regression(df, actual_f, actual_t):
    stats = {
        "mean": float(df[actual_f].mean()),
        "std": float(df[actual_f].std()),
        "skew": float(df[actual_f].skew()),
        "count": int(len(df))
    }

    scaler_x = StandardScaler()
    scaler_y = StandardScaler()
    
    X = torch.tensor(scaler_x.fit_transform(df[[actual_f]].values), dtype=torch.float32)
    y = torch.tensor(scaler_y.fit_transform(df[[actual_t]].values), dtype=torch.float32)

    model = DynamicRegressor(1)
    optimizer = torch.optim.SGD(model.parameters(), lr=0.01)
    criterion = nn.MSELoss()

    for _ in range(50):
        pred = model(X)
        loss = criterion(pred, y)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

  
    x_range = np.linspace(df[actual_f].min(), df[actual_f].max(), 100).reshape(-1, 1)
    x_scaled = torch.tensor(scaler_x.transform(x_range), dtype=torch.float32)
    
    with torch.no_grad():
        y_scaled_pred = model(x_scaled)
        y_pred = scaler_y.inverse_transform(y_scaled_pred.numpy())

    raw_data = [
        {"x": float(row[actual_f]), "y": float(row[actual_t])} 
        for _, row in df.iterrows()
    ]

    regression_line = [
        {"x": float(x_range[i]), "y": float(y_pred[i])} 
        for i in range(len(x_range))
    ]

    return {
        "type": "numerical",
        "stats": {
            "mean": float(df[actual_f].mean()),
            "std": float(df[actual_f].std()),
            "skew": float(df[actual_f].skew()),
            "correlation": float(df[actual_f].corr(df[actual_t]))
        },
        "chartData": raw_data,
        "lineData": regression_line
    }

def handle_categorical_grouping(df, cat_col, num_col):
    df[num_col] = pd.to_numeric(df[num_col], errors='coerce')
    clean_df = df.dropna(subset=[cat_col, num_col])
    
    grouped = clean_df.groupby(cat_col)[num_col].mean().reset_index()
    
    chart_data = [
        {"category": str(row[cat_col]), "value": float(row[num_col])} 
        for _, row in grouped.iterrows()
    ]
    
    summary = {
        "unique_categories": int(clean_df[cat_col].nunique()),
        "total_observations": int(len(clean_df))
    }
    
    return {
        "type": "categorical_group",
        "chartData": chart_data,
        "summary": summary
    }
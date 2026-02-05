import torch
import torch.nn as nn
import pandas as pd

class DynamicRegressor(nn.Module):
    def __init__(self, input_size):
        super(DynamicRegressor, self).__init__()
        self.linear = nn.Linear(input_size, 1)
        
    def forward(self, x):
        return self.linear(x)
    


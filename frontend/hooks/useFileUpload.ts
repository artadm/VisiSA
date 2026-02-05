import { useState } from 'react';

export interface StatsResult {
  dataType: "numerical" | "categorical";
  statistics?: Record<string, number>; // For Numerical
  chartData?: any[];                   // For both (Scatter or Bar)
  lineData?: any[];                    // For Numerical (AI line)
  summary?: {                          // For Categorical
    unique_categories: number;
    total_observations: number;
  };
  message: string;
}

export const useFileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StatsResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadData = async (file: File, featureCol: string, targetCol: string) => {
    setLoading(true);
    setError(null);
    setResult(null); // Clear previous results

    const formData = new FormData();
    formData.append("file", file);
    formData.append("feature_col", featureCol.trim());
    formData.append("target_col", targetCol.trim());

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Engine Error: Check your column names.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { uploadData, result, loading, error };
};
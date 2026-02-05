"use client";

import { useState } from 'react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, Database, BarChart3 } from "lucide-react";
import { NumericalResults } from "@/components/myUi/NumericalResults";
import { CategoricalResults } from "@/components/myUi/CategoricalResults";
import MyHeader from '@/components/myUi/MyHeader'
import MyFooter from '@/components/myUi/MyFooter'

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [featureCol, setFeatureCol] = useState("");
  const [targetCol, setTargetCol] = useState("");
  
  const { uploadData, result, loading, error } = useFileUpload();

  const handleProcess = () => {
    if (file && featureCol && targetCol) {
      uploadData(file, featureCol, targetCol);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl space-y-12">
      <MyHeader/>

      {/* Configuration Card */}
      <Card className="max-w-2xl mx-auto border-none shadow-2xl bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-500" />
            Analysis Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="csv">Upload Dataset (CSV)</Label>
            <Input 
              id="csv" 
              type="file" 
              accept=".csv" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="feature">Independent Var (X)</Label>
              <Input 
                id="feature" 
                placeholder="e.g., Marketing Spend" 
                value={featureCol} 
                onChange={(e) => setFeatureCol(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target">Dependent Var (Y)</Label>
              <Input 
                id="target" 
                placeholder="e.g., Profit" 
                value={targetCol} 
                onChange={(e) => setTargetCol(e.target.value)} 
              />
            </div>
          </div>

          <Button 
            onClick={handleProcess} 
            disabled={loading || !file || !featureCol || !targetCol} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Training Neural Model...
              </>
            ) : (
              "Generate Insights"
            )}
          </Button>

          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conditional Result Rendering */}
      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="flex items-center gap-2 border-b pb-4">
             <BarChart3 className="h-6 w-6 text-slate-400" />
             <h2 className="text-2xl font-bold text-slate-800">
               {result.dataType === 'numerical' ? 'Neural Regression Analysis' : 'Categorical Distribution'}
             </h2>
          </div>

          {result.dataType === "numerical" ? (
            <NumericalResults 
              result={result} 
              featureName={featureCol} 
              targetName={targetCol} 
            />
          ) : (
            <CategoricalResults 
              chartData={result.chartData} 
              summary={result.summary} 
              targetName={targetCol}
            />
          )}
        </div>
      )}
      <MyFooter/>
    </div>
  );
}
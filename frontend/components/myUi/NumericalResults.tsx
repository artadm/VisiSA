import { 
  ComposedChart, Scatter, Line, XAxis, YAxis, 
  ZAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "./StatCard";

export function NumericalResults({ result, featureName, targetName }: any) {
  const { statistics, chartData, lineData } = result;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* 1. Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Mean (X)" value={statistics.mean} />
        <StatCard label="Std Dev" value={statistics.std} />
        <StatCard label="Skewness" value={statistics.skew} />
        <StatCard label="Correlation" value={statistics.correlation || "N/A"} />
      </div>

      {/* 2. AI Regression Chart */}
      <Card className="p-6 border-none shadow-xl bg-white">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            Neural Regression Analysis
            <span className="text-sm font-normal text-slate-400">({targetName} vs {featureName})</span>
          </CardTitle>
        </CardHeader>
        <div className="h-[450px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                type="number" 
                dataKey="x" 
                name={featureName} 
                label={{ value: featureName, position: 'insideBottom', offset: -10 }} 
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name={targetName} 
                label={{ value: targetName, angle: -90, position: 'insideLeft' }} 
              />
              <ZAxis range={[50, 50]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              
              {/* Actual Data Points */}
              <Scatter name="Actual Data" data={chartData} fill="#3b82f6" fillOpacity={0.5} />
              
              {/* AI Prediction Line */}
              <Line 
                name="AI Prediction" 
                data={lineData} 
                type="monotone" 
                dataKey="y" 
                stroke="#ef4444" 
                strokeWidth={4} 
                dot={false} 
                activeDot={false}
                animationDuration={2000}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
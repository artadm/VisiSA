import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "./StatCard";

const BAR_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981'];

export function CategoricalResults({ chartData, summary, targetName }: any) {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Unique Categories" value={summary.unique_categories} />
        <StatCard label="Sample Count" value={summary.total_observations} />
      </div>

      <Card className="p-6 border-none shadow-xl bg-white">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl font-bold">Average {targetName} by Group</CardTitle>
        </CardHeader>
        <div className="h-[400px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={1500}>
                {chartData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
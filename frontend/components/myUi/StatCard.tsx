import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string | number;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <Card className="bg-slate-50/50 border-none shadow-sm">
      <CardContent className="pt-6">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-2xl font-mono font-bold text-slate-900">
          {typeof value === 'number' ? value.toLocaleString(undefined, { maximumFractionDigits: 3 }) : value}
        </p>
      </CardContent>
    </Card>
  );
}
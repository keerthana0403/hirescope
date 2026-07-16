import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: number;
  icon: LucideIcon;
};

export function StatsCard({ title, value, icon: Icon }: StatsCardProps) {
  return (
    <Card className="border-border bg-card shadow-none transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_24px_-8px_var(--primary)]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h2 className="text-4xl font-mono font-semibold mt-2 tabular-nums text-foreground">
              {value}
            </h2>
          </div>

          <div className="bg-primary/10 p-2 rounded-lg">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

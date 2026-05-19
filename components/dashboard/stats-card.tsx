import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { LucideIcon } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: number;
  icon: LucideIcon;
};

export function StatsCard({ title, value, icon: Icon }: StatsCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>

            <h2 className="text-4xl font-bold mt-2">{value}</h2>
          </div>

          <div className="bg-muted p-2 rounded-lg">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

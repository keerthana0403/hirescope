import { Briefcase } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex items-center gap-3">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-md bg-primary">
        <span className="absolute inset-0 rounded-md bg-primary blur-md opacity-50 -z-10" />
        <Briefcase className="w-4 h-4 text-primary-foreground" />
      </span>
      <div>
        <h1 className="text-base font-semibold leading-none text-foreground">
          HireScope
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Track your applications intelligently
        </p>
      </div>
    </div>
  );
}

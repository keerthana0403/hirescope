import { DashboardAnalytics } from "@/types/analytics";

const METRICS = (analytics: DashboardAnalytics) => [
  { label: "Weekly Applications", value: analytics.weeklyApplications },
  { label: "Response Rate", value: `${analytics.responseRate}%` },
  { label: "Average Match Score", value: `${analytics.averageMatchScore}%` },
  { label: "Most Missing Skill", value: analytics.mostMissingSkill },
];

const AnalyticsCard = ({ analytics }: { analytics: DashboardAnalytics }) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 mb-8">
      <p className="font-mono text-xs uppercase tracking-widest text-primary mb-1">
        This week
      </p>
      <h2 className="text-xl font-semibold mb-4 text-foreground">
        Weekly Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS(analytics).map((metric) => (
          <div key={metric.label}>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="text-2xl font-mono font-semibold tabular-nums text-foreground">
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsCard;

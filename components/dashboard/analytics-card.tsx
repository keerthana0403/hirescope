import React from "react";

const AnalyticsCard = ({ analytics }: { analytics: any }) => {
  return (
    <div className="rounded-lg border p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Weekly Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Weekly Applications</p>
          <p className="text-2xl font-bold">{analytics.weeklyApplications}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Response Rate</p>
          <p className="text-2xl font-bold">{analytics.responseRate}%</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Average Match Score</p>
          <p className="text-2xl font-bold">{analytics.averageMatchScore}%</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Most Missing Skill</p>
          <p className="text-2xl font-bold">{analytics.mostMissingSkill}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;

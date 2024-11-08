export interface EngagementMetric {
  metric: string;
  value: number;
}

export interface ChartTheme {
  background: string;
  textColor: string;
  fontSize: number;
  axis: {
    domain: {
      line: {
        stroke: string;
        strokeWidth: number;
      };
    };
    ticks: {
      line: {
        stroke: string;
        strokeWidth: number;
      };
    };
  };
  grid: {
    line: {
      stroke: string;
      strokeWidth: number;
    };
  };
  tooltip: {
    container: {
      background: string;
      color: string;
      fontSize: string;
      borderRadius: string;
      boxShadow: string;
    };
  };
}
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, Lightbulb, Target, Download, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SummaryData {
  keyInsights: string[];
  recommendations: string[];
  dataPoints: { label: string; value: string; trend?: 'up' | 'down' | 'stable' }[];
  confidence: number;
  processingTime: string;
}

interface SummaryPanelProps {
  summaryData: SummaryData | null;
  layout: 'vertical' | 'split' | 'cards';
}

export function SummaryPanel({ summaryData, layout }: SummaryPanelProps) {
  if (!summaryData) {
    return (
      <div className="panel-container p-6 h-full">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Final Summary</h2>
        </div>
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Summary will appear here once the workflow completes...</p>
        </div>
      </div>
    );
  }

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-destructive rotate-180" />;
      default: return <div className="w-4 h-4 rounded-full bg-muted-foreground/30" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-success';
    if (confidence >= 70) return 'text-accent';
    return 'text-destructive';
  };

  return (
    <div className={`panel-container p-6 ${layout === 'vertical' ? 'h-full' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Final Summary</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Confidence & Processing Time */}
        <div className="flex gap-4">
          <Card className="flex-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Confidence</span>
                <Badge className={`${getConfidenceColor(summaryData.confidence)}`}>
                  {summaryData.confidence}%
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Processing Time</span>
                <Badge variant="secondary">{summaryData.processingTime}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Insights */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="w-5 h-5 text-accent" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {summaryData.keyInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent/5">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-accent">{index + 1}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{insight}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Data Points */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
              Key Data Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {summaryData.dataPoints.map((point, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <div>
                    <p className="text-sm font-medium text-foreground">{point.label}</p>
                    <p className="text-lg font-semibold text-primary">{point.value}</p>
                  </div>
                  {getTrendIcon(point.trend)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-success" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {summaryData.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/10">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Target className="w-3 h-3 text-success" />
                </div>
                <p className="text-sm text-foreground leading-relaxed">{recommendation}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
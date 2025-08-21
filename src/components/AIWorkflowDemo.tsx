import { useState, useEffect } from "react";
import { UserInputPanel } from "./UserInputPanel";
import { WorkflowStreamPanel, StreamMessage } from "./WorkflowStreamPanel";
import { SummaryPanel } from "./SummaryPanel";
import { ThemeSelector, Theme } from "./ThemeSelector";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layout, LayoutGrid, Layers } from "lucide-react";

export function AIWorkflowDemo() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('professional');
  const [currentLayout, setCurrentLayout] = useState<'vertical' | 'split' | 'cards'>('vertical');
  const [messages, setMessages] = useState<StreamMessage[]>([]);
  const [isWorkflowActive, setIsWorkflowActive] = useState(false);
  const [isWaitingForApproval, setIsWaitingForApproval] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Apply theme to body
  useEffect(() => {
    const body = document.body;
    body.className = body.className.replace(/theme-\w+/g, '');
    
    if (currentTheme === 'vibrant') {
      body.classList.add('theme-vibrant');
    } else if (currentTheme === 'minimal') {
      body.classList.add('theme-minimal');
    }
  }, [currentTheme]);

  const simulateWorkflow = async (input: string) => {
    setIsLoading(true);
    setIsWorkflowActive(true);
    setMessages([]);
    setSummaryData(null);
    setIsWaitingForApproval(false);

    const agents = [
      { name: 'PlannerAgent', output: `Analyzing input: "${input.substring(0, 50)}...". Creating analysis plan with 4 phases: data validation, pattern recognition, insight extraction, and recommendation generation.` },
      { name: 'AnalystAgent', output: 'Performing statistical analysis. Identified 3 key data patterns and 2 anomalies. Computing correlation matrices and trend analysis.' },
      { name: 'ResearcherAgent', output: 'Cross-referencing with external data sources. Found 15 relevant studies and 8 industry benchmarks that support our preliminary findings.' },
      { name: 'WriterAgent', output: 'Synthesizing findings into actionable insights. Preparing executive summary with confidence scores and priority recommendations.' }
    ];

    // Simulate streaming messages
    for (let i = 0; i < agents.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newMessage: StreamMessage = {
        source: 'bot',
        agent_name: agents[i].name,
        agent_output: agents[i].output,
        time: `${Math.floor((i + 1) * 1.5)},${((i + 1) * 1.5 % 1 * 60).toFixed(0)}`,
        id: `msg-${Date.now()}-${i}`
      };
      setMessages(prev => [...prev, newMessage]);
    }

    setIsLoading(false);
    
    // Wait a moment then show approval buttons
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsWaitingForApproval(true);
  };

  const handleApproval = async () => {
    setIsWaitingForApproval(false);
    
    // Simulate final processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSummaryData({
      keyInsights: [
        "Data shows a strong correlation (0.87) between user engagement and content quality metrics",
        "Peak performance periods align with seasonal trends, suggesting optimization opportunities",
        "Three distinct user segments identified with different behavioral patterns and preferences"
      ],
      recommendations: [
        "Implement content quality scoring to improve engagement by an estimated 25%",
        "Develop seasonal campaigns targeting identified peak periods for maximum ROI",
        "Create personalized user journeys for each of the three identified segments"
      ],
      dataPoints: [
        { label: "Engagement Rate", value: "67.3%", trend: 'up' },
        { label: "Conversion Score", value: "8.4/10", trend: 'stable' },
        { label: "Quality Index", value: "92.1", trend: 'up' },
        { label: "User Satisfaction", value: "4.7/5", trend: 'up' }
      ],
      confidence: 89,
      processingTime: "2m 34s"
    });
  };

  const handleRejection = (reason: string) => {
    setMessages([]);
    setIsWaitingForApproval(false);
    setIsWorkflowActive(false);
    setSummaryData(null);
  };

  const layouts = [
    { id: 'vertical' as const, name: 'Stacked', icon: Layers, description: 'Panels stacked vertically' },
    { id: 'split' as const, name: 'Split Screen', icon: Layout, description: 'Side-by-side layout' },
    { id: 'cards' as const, name: 'Card Layout', icon: LayoutGrid, description: 'Clean card design' }
  ];

  const getLayoutClass = () => {
    switch (currentLayout) {
      case 'split':
        return 'grid grid-cols-1 lg:grid-cols-2 gap-6';
      case 'cards':
        return 'space-y-6';
      default:
        return 'space-y-6';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            AI Workflow Design Concepts
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore three distinct design themes and layouts for AI-powered data analysis workflows
          </p>
        </div>

        {/* Theme Selector */}
        <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />

        {/* Layout Selector */}
        <div className="panel-container p-4 mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Layout Style</h3>
          <div className="flex gap-2 flex-wrap">
            {layouts.map((layout) => {
              const Icon = layout.icon;
              const isActive = currentLayout === layout.id;
              
              return (
                <Button
                  key={layout.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentLayout(layout.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {layout.name}
                  {isActive && <Badge variant="secondary" className="ml-2 text-xs">Active</Badge>}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Current Theme & Layout Display */}
        <div className="text-center mb-6">
          <Badge variant="outline" className="text-sm">
            Current: {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} Theme • {layouts.find(l => l.id === currentLayout)?.name} Layout
          </Badge>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6">
          {/* Panel 1: User Input - Always fixed position */}
          <div>
            <UserInputPanel 
              onStartWorkflow={simulateWorkflow}
              isLoading={isLoading}
            />
          </div>

          {/* Panels 2 & 3: Workflow & Summary - Dynamic layout */}
          <div className={getLayoutClass()}>
            <div className={currentLayout === 'split' ? 'lg:col-span-1' : ''}>
              <WorkflowStreamPanel
                messages={messages}
                isWaitingForApproval={isWaitingForApproval}
                onApprove={handleApproval}
                onReject={handleRejection}
                layout={currentLayout}
              />
            </div>

            <div className={currentLayout === 'split' ? 'lg:col-span-1' : ''}>
              <SummaryPanel 
                summaryData={summaryData}
                layout={currentLayout}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Interactive demo showcasing three design concepts for AI workflow interfaces
          </p>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { WorkflowStreamPanel, StreamMessage } from "./WorkflowStreamPanel";
import { SummaryPanel } from "./SummaryPanel";
import { ThemeSelector, Theme } from "./ThemeSelector";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layout, LayoutGrid, Layers } from "lucide-react";

export function AIWorkflowDemo() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('professional');
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


  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background transition-colors duration-300">
        <AppSidebar onStartWorkflow={simulateWorkflow} isLoading={isLoading} />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center px-4 lg:px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    AI Workflow Demo
                  </h1>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    Explore AI-powered data analysis workflows
                  </p>
                </div>
              </div>
              <div className="ml-auto">
                <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
              </div>
            </div>
          </header>

          {/* Main Content - 3 Vertical Panels */}
          <main className="flex-1 p-4 lg:p-6 space-y-6">
            {/* Current Theme Display */}
            <div className="text-center">
              <Badge variant="outline" className="text-sm">
                Current Theme: {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
              </Badge>
            </div>

            {/* Panel 1: Workflow Stream */}
            <div className="panel-container">
              <WorkflowStreamPanel
                messages={messages}
                isWaitingForApproval={isWaitingForApproval}
                onApprove={handleApproval}
                onReject={handleRejection}
                layout="vertical"
              />
            </div>

            {/* Panel 2: Summary */}
            <div className="panel-container">
              <SummaryPanel 
                summaryData={summaryData}
                layout="vertical"
              />
            </div>

            {/* Footer */}
            <div className="text-center py-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                AI Workflow Interface with collapsible sidebar controls
              </p>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
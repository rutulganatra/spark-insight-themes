import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Sparkles, RotateCcw } from "lucide-react";

interface UserInputPanelProps {
  onStartWorkflow: (input: string) => void;
  isLoading: boolean;
}

export function UserInputPanel({ onStartWorkflow, isLoading }: UserInputPanelProps) {
  const [useCase, setUseCase] = useState("4Q Report");
  const [incidentNumber, setIncidentNumber] = useState("123");
  const [autonomousMode, setAutonomousMode] = useState(true);

  const handleSubmit = () => {
    if (useCase && incidentNumber && !isLoading) {
      const workflowData = `Use Case: ${useCase}, Incident Number: ${incidentNumber}, Autonomous Mode: ${autonomousMode ? 'Enabled' : 'Disabled'}`;
      onStartWorkflow(workflowData);
    }
  };

  const handleReset = () => {
    setUseCase("4Q Report");
    setIncidentNumber("123");
    setAutonomousMode(true);
  };

  const useCaseOptions = [
    "4Q Report",
    "Security Incident Analysis",
    "Performance Review",
    "Compliance Audit",
    "Risk Assessment",
    "Data Quality Review"
  ];

  return (
    <div className="panel-container p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Workflow Controls</h2>
      </div>
      
      <div className="space-y-4">
        {/* Use Case Dropdown */}
        <div className="space-y-2">
          <Label htmlFor="use-case" className="text-sm font-medium text-foreground">
            Use Case
          </Label>
          <Select value={useCase} onValueChange={setUseCase} disabled={isLoading}>
            <SelectTrigger className="w-full bg-background border-border">
              <SelectValue placeholder="Select a use case" />
            </SelectTrigger>
            <SelectContent>
              {useCaseOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Incident Number */}
        <div className="space-y-2">
          <Label htmlFor="incident-number" className="text-sm font-medium text-foreground">
            Incident Number
          </Label>
          <Input
            id="incident-number"
            type="text"
            placeholder="Enter incident number"
            value={incidentNumber}
            onChange={(e) => setIncidentNumber(e.target.value)}
            className="bg-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
            disabled={isLoading}
          />
        </div>

        {/* Autonomous Mode Toggle */}
        <div className="panel-container p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="autonomous-mode" className="text-base font-medium text-foreground">
                Autonomous Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Run without manual approvals
              </p>
            </div>
            <Switch
              id="autonomous-mode"
              checked={autonomousMode}
              onCheckedChange={setAutonomousMode}
              disabled={isLoading}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleSubmit}
          disabled={!useCase || !incidentNumber || isLoading}
          className="btn-spark w-full group"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Processing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
              Spark some insights
            </>
          )}
        </Button>

        <Button
          onClick={handleReset}
          variant="outline"
          className="w-full"
          disabled={isLoading}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
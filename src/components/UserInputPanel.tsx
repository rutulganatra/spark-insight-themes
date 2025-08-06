import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Send } from "lucide-react";

interface UserInputPanelProps {
  onStartWorkflow: (input: string) => void;
  isLoading: boolean;
}

export function UserInputPanel({ onStartWorkflow, isLoading }: UserInputPanelProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onStartWorkflow(input.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="panel-container p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Data Input</h2>
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="data-input" className="text-sm font-medium text-foreground">
          Enter your data for AI analysis
        </Label>
        <Textarea
          id="data-input"
          placeholder="Describe your data, ask questions, or provide context for AI analysis..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[120px] resize-none bg-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          Tip: Press Ctrl+Enter to submit
        </p>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!input.trim() || isLoading}
        className="btn-spark w-full group"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            Processing...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
            Spark Some Insight
          </>
        )}
      </Button>
    </div>
  );
}
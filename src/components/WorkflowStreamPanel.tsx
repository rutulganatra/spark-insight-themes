import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Bot, User } from "lucide-react";

export interface StreamMessage {
  source: 'bot' | 'user';
  agent_name: string;
  agent_output: string;
  time: string;
  id: string;
}

interface WorkflowStreamPanelProps {
  messages: StreamMessage[];
  isWaitingForApproval: boolean;
  onApprove: () => void;
  onReject: () => void;
  layout: 'vertical' | 'split' | 'cards';
}

export function WorkflowStreamPanel({ 
  messages, 
  isWaitingForApproval, 
  onApprove, 
  onReject, 
  layout 
}: WorkflowStreamPanelProps) {
  const getAgentIcon = (agentName: string) => {
    const icons = {
      'PlannerAgent': '🎯',
      'AnalystAgent': '📊',
      'ResearcherAgent': '🔍',
      'WriterAgent': '✍️'
    };
    return icons[agentName as keyof typeof icons] || '🤖';
  };

  const getAgentClass = (agentName: string) => {
    const classes = {
      'PlannerAgent': 'agent-planner',
      'AnalystAgent': 'agent-analyst',
      'ResearcherAgent': 'agent-researcher',
      'WriterAgent': 'agent-writer'
    };
    return classes[agentName as keyof typeof classes] || 'agent-planner';
  };

  const formatTime = (time: string) => {
    const [minutes, seconds] = time.split(',');
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  const renderMessage = (message: StreamMessage, index: number) => (
    <div 
      key={message.id} 
      className={`stream-item stream-in ${layout === 'cards' ? 'mb-3' : 'mb-4'}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {message.source === 'bot' ? (
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <User className="w-4 h-4 text-accent" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={`agent-badge ${getAgentClass(message.agent_name)}`}>
              <span className="mr-1">{getAgentIcon(message.agent_name)}</span>
              {message.agent_name}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {formatTime(message.time)}
            </div>
          </div>
          
          <div className="text-sm text-foreground leading-relaxed">
            {message.agent_output}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`panel-container p-6 ${layout === 'vertical' ? 'h-full' : ''}`}>
      <div className="flex items-center gap-2 mb-6">
        <Bot className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">AI Workflow Stream</h2>
        {messages.length > 0 && (
          <Badge variant="secondary" className="ml-auto">
            {messages.length} agent{messages.length !== 1 ? 's' : ''} active
          </Badge>
        )}
      </div>

      <div className={`space-y-0 ${layout === 'vertical' ? 'max-h-[60vh] overflow-y-auto' : ''}`}>
        {messages.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Waiting for workflow to start...</p>
          </div>
        ) : (
          messages.map((message, index) => renderMessage(message, index))
        )}

        {messages.length > 0 && messages[messages.length - 1]?.source === 'bot' && !isWaitingForApproval && (
          <div className="stream-item typing-animation">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm">AI agents are processing...</span>
            </div>
          </div>
        )}

        {isWaitingForApproval && (
          <div className="stream-item border-2 border-primary/20 pulse-glow mt-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-medium text-foreground">Workflow Paused - Approval Required</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                The AI workflow has reached a checkpoint. Review the analysis above and choose whether to continue or restart.
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={onApprove} className="btn-approve">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve & Continue
                </Button>
                <Button onClick={onReject} className="btn-reject">
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject & Restart
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
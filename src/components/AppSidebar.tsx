import { useState } from "react";
import { Settings, Menu, X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserInputPanel } from "./UserInputPanel";
import { Button } from "@/components/ui/button";

interface AppSidebarProps {
  onStartWorkflow: (input: string) => void;
  isLoading: boolean;
}

export function AppSidebar({ onStartWorkflow, isLoading }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar 
      className="border-r border-border" 
      collapsible="icon"
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-icon": "3.5rem",
        } as React.CSSProperties
      }
    >
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Controls</span>
            </div>
          )}
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-0">
        {!isCollapsed && (
          <div className="p-4">
            <UserInputPanel onStartWorkflow={onStartWorkflow} isLoading={isLoading} />
          </div>
        )}
        {isCollapsed && (
          <div className="flex flex-col items-center p-2 space-y-4">
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10"
              disabled={isLoading}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
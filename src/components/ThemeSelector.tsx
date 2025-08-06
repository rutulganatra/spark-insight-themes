import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Monitor, Palette, Minimize } from "lucide-react";

export type Theme = 'professional' | 'vibrant' | 'minimal';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const themes = [
    {
      id: 'professional' as Theme,
      name: 'Professional Dark',
      description: 'Dark mode with elegant blues and purples',
      icon: Monitor,
      preview: 'from-blue-600 to-purple-600'
    },
    {
      id: 'vibrant' as Theme,
      name: 'Vibrant Light',
      description: 'Bright and energetic color palette',
      icon: Palette,
      preview: 'from-purple-500 to-green-500'
    },
    {
      id: 'minimal' as Theme,
      name: 'Minimal Contrast',
      description: 'Clean black and white design',
      icon: Minimize,
      preview: 'from-gray-900 to-gray-600'
    }
  ];

  return (
    <div className="panel-container p-4 mb-6">
      <h3 className="text-sm font-medium text-foreground mb-3">Design Theme</h3>
      <div className="flex gap-2 flex-wrap">
        {themes.map((theme) => {
          const Icon = theme.icon;
          const isActive = currentTheme === theme.id;
          
          return (
            <Button
              key={theme.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onThemeChange(theme.id)}
              className="flex items-center gap-2 h-auto p-3"
            >
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.preview}`} />
              <div className="text-left">
                <div className="font-medium text-xs">{theme.name}</div>
                <div className="text-[10px] text-muted-foreground hidden sm:block">
                  {theme.description}
                </div>
              </div>
              {isActive && <Badge variant="secondary" className="ml-2 text-[10px]">Active</Badge>}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
import { LucideIcon } from "lucide-react";

export type TabsData = {
  key: string;
  title: string;
  content: React.ReactElement;
  disabled?: boolean;
  hidden?: boolean;
  forceRender?: boolean;
  icon?: LucideIcon;
};

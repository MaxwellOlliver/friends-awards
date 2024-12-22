import { useEffect, useRef, useState } from "react";
import { TabsData } from "./types";
import { VerticalList } from "../_internal/VerticalList";
import { cn } from "@/utils/cn";

interface TabsProps {
  items: TabsData[];
  activeTabKey?: string;
  defaultActiveTabKey?: string;
  onTabChange?: (key: string) => void;
}

export const Tabs = ({
  items,
  activeTabKey,
  onTabChange,
  defaultActiveTabKey,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    activeTabKey ?? defaultActiveTabKey ?? items[0].key
  );
  const tabsRendered = useRef<string[]>([]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    onTabChange?.(key);
  };

  useEffect(() => {
    if (activeTabKey) {
      setActiveTab(activeTabKey);
    }
  }, [activeTabKey]);

  const renderTabsPanel = () => {
    const validTabs = items.filter((tab) => !tab.hidden);

    return validTabs.map((tab) => {
      const renderStrategy = tab.forceRender ? "always" : "active";

      if (
        tab.hidden ||
        (!tabsRendered.current.includes(tab.key) &&
          renderStrategy === "active" &&
          activeTab !== tab.key)
      ) {
        return null;
      }

      tabsRendered.current.push(tab.key);

      return (
        <div
          key={tab.key}
          className={cn("w-full", activeTab === tab.key ? "block" : "hidden")}
        >
          {tab.content}
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col">
      <VerticalList>
        <div className="w-full flex">
          {items.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabChange(tab.key)}
              disabled={tab.disabled}
              data-hidden={tab.hidden}
              className={cn(
                "px-4",
                "py-3",
                "text-sm",
                "ring-b-primary",
                "relative",
                "font-normal",
                "text-gray-400",
                "focus-visible:outline-none",
                "focus-visible:shadow-border-primary",
                "transition-colors",
                "font-normal",
                'data-[hidden="true"]:hidden',
                "disabled:opacity-50",
                "disabled:cursor-not-allowed",
                "flex",
                "items-center",
                "gap-1",
                activeTab === tab.key && "text-primary-500"
              )}
            >
              {tab.icon && <tab.icon className="size-4" />}
              <span className="whitespace-nowrap">{tab.title}</span>
              {activeTab === tab.key && (
                <div className="h-[3px] bg-primary w-full absolute bottom-0 left-0"></div>
              )}
            </button>
          ))}
        </div>
      </VerticalList>
      <div className="w-full py-4">{renderTabsPanel()}</div>
    </div>
  );
};

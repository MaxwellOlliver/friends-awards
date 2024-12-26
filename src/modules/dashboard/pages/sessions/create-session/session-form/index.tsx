import { TabsData } from "@/components/Tabs/types";
import { Gamepad2, Medal, Plus, Save } from "lucide-react";
import { SessionTab } from "./tabs/session-tab";
import { Tabs } from "@/components/Tabs";
import { LayoutPage } from "@/layout/components/LayoutPage";
import { Button } from "@/components/Button";
import { CategoriesTab } from "./tabs/categories-tab";

export const SessionForm = () => {
  const tabs: TabsData[] = [
    {
      key: "session",
      title: "Sessão",
      icon: Gamepad2,
      content: <SessionTab />,
    },
    {
      key: "categories",
      title: "Categorias",
      icon: Medal,
      content: <CategoriesTab />,
    },
  ];

  return (
    <div className="max-w-[1000px] w-full flex flex-col">
      <div className="w-full flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Criar nova sessão</h1>
        <Tabs items={tabs} />
        <footer className="flex">
          <Button type="submit" iconLeft={Plus}>
            Criar
          </Button>
        </footer>
      </div>
    </div>
  );
};

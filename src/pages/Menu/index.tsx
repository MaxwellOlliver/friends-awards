import { Tabs } from "@/components/Tabs";
import { MainLayout } from "@/layout/components/MainLayout";
import { Gamepad2, ListTree } from "lucide-react";
import { MySessions } from "./tabs/my-sessions";

export const Menu = () => {
  return (
    <MainLayout>
      <Tabs
        items={[
          {
            title: "Minhas sessões",
            content: <MySessions />,
            key: "my-sessions",
            icon: Gamepad2,
          },
          {
            title: "Minhas categorias",
            content: <div>Tab 2 content</div>,
            key: "tab2",
            icon: ListTree,
          },
        ]}
      />
    </MainLayout>
  );
};

import { Button } from "@/components/Button";

interface TabLayoutProps {
  actions?: React.ComponentProps<typeof Button>[];
  children: React.ReactNode;
}

export const TabLayout = ({ children, actions }: TabLayoutProps) => {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        {actions &&
          actions.map((action, index) => <Button key={index} {...action} />)}
      </header>
      <main className="flex flex-col w-full">{children}</main>
    </div>
  );
};

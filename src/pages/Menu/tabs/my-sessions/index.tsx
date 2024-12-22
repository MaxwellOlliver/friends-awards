import { Plus } from "lucide-react";
import { TabLayout } from "../tab-layout";
import { Session } from "./session";

export const MySessions = () => {
  return (
    <TabLayout
      actions={[
        {
          children: "Nova sessão",
          color: "primary",
          iconLeft: Plus,
          size: "sm",
        },
      ]}
    >
      <div className="w-full grid grid-cols-2 gap-4">
        {new Array(10).fill(0).map((_, index) => (
          <Session key={index} />
        ))}
      </div>
    </TabLayout>
  );
};

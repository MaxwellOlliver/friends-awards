import { LogOut, User } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-end w-full h-16 px-4 ">
      <div className="flex items-center gap-4">
        <span>Noobmaster69</span>
        <div className="flex items-center justify-center border border-white rounded-full p-1.5">
          <User className="size-5" />
        </div>
        <LogOut className="size-5 text-error" />
      </div>
    </div>
  );
};

import { useAuthStore } from "@/store/auth-store";
import { Link, useRouter } from "@tanstack/react-router";
import { Gamepad2, Home, LogOut } from "lucide-react";

import DefaultAvatar from "@/assets/images/default-avatar.jpg";

const menuItems = [
  {
    label: "Início",
    icon: Home,
    path: "/dashboard/home",
  },
  {
    label: "Minhas sessões",
    icon: Gamepad2,
    path: "/dashboard/my-sessions",
  },
];

export const Sidebar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.invalidate();
  };

  return (
    <div className="w-full h-full sticky top-0">
      <header className="p-4 w-full flex items-center justify-between bg-[#41414127] rounded-md">
        <div className="flex items-center gap-4">
          <img
            src={DefaultAvatar}
            alt="Avatar"
            className="size-10 rounded-full"
            about="Avatar - credits to https://www.freepik.com/author/catalyststuff"
          />
          <span>{user?.username}</span>
        </div>
        <button onClick={handleLogout} aria-label="Sair">
          <LogOut className="size-5 text-error cursor-pointer" />
        </button>
      </header>
      <div className="flex flex-col gap-2 mt-8">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            resetScroll={false}
            className="flex items-center gap-4 p-4 hover:bg-[#41414140] active:hover:bg-[#41414140] transition-colors rounded-md"
          >
            <item.icon className="size-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

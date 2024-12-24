import { useAuthStore } from "@/store/auth-store";
import { Link, useRouter } from "@tanstack/react-router";
import { Gamepad2, Home, LogOut, X } from "lucide-react";

import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/utils/cn";

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
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.invalidate();
  };

  return (
    <>
      <div
        role="overlay"
        className={cn(
          "fixed inset-0 size-full bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm opacity-0 transition-opacity duration-300",
          {
            hidden: !isSidebarOpen,
            "opacity-100": isSidebarOpen,
          }
        )}
        onClick={toggleSidebar}
      ></div>
      <div
        className={cn(
          "w-full max-w-[264px] h-full fixed top-0 p-4 lg:top-8 lg:pt-0 lg:sticky self-start bg-[#1d1d1d] z-50 left-[-264px] transition-all duration-300",
          {
            "left-0": isSidebarOpen,
          }
        )}
      >
        <div className="lg:hidden flex justify-end mb-4">
          <button onClick={toggleSidebar} aria-label="Fechar menu">
            <X className="size-8" />
          </button>
        </div>
        <header className="p-4 w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={DefaultAvatar}
              alt="Avatar"
              className="size-10 rounded-full"
              about="Avatar - credits to https://www.freepik.com/author/catalyststuff"
            />
            <span>{user?.name}</span>
          </div>
          <button onClick={handleLogout} aria-label="Sair">
            <LogOut className="size-4 text-error cursor-pointer" />
          </button>
        </header>
        <div className="flex flex-col gap-2 mt-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() =>
                window.matchMedia("(max-width: 1024px)").matches &&
                toggleSidebar()
              }
              className="flex items-center gap-4 p-4 hover:bg-[#41414140] [&.active]:text-primary-400 [&.active]:bg-primary [&.active]:bg-opacity-20 transition-colors rounded-md"
            >
              <item.icon className="size-4" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

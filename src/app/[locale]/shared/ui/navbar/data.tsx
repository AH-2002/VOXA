import { navLinkType } from "./types";
import { Home, Users, LogIn, UserPlus } from "lucide-react";

export const navLinks: navLinkType[] = [
  {
    label: "home",
    href: "/",
    icon: Home,
  },

  {
    label: "users",
    href: "/users",
    icon: Users,
  },
];
export const authLinks: navLinkType[] = [
  {
    label: "login",
    href: "/login",
    icon: LogIn,
  },
  {
    label: "register",
    href: "/register",
    icon: UserPlus,
  },
];

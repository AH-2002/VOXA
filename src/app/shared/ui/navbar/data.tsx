import { navLinkType } from "./types";
import { Home, Users, LogIn, UserPlus } from "lucide-react";

export const navLinks: navLinkType[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },

  {
    label: "Users",
    href: "/users",
    icon: Users,
  },
];
export const authLinks: navLinkType[] = [
  {
    label: "Login",
    href: "/login",
    icon: LogIn,
  },
  {
    label: "Register",
    href: "/register",
    icon: UserPlus,
  },
];

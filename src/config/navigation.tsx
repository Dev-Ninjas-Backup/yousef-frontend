import { CreditCard, MessageCircleQuestionMark } from "lucide-react";
import {
  LuChartColumn,
  LuFileText,
  LuLayoutDashboard,
  LuSettings,
  LuShield,
  LuShip,
  LuStar,
  LuUsers,
  LuPackage,
  LuShoppingCart,
  LuHeart,
  LuMessageSquare,
  LuStore,
  LuBox,
  LuDollarSign,
} from "react-icons/lu";

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

// Admin navigation items
export const adminNavItems: NavItem[] = [
  {
    label: "Overview",
    path: "/admin/dashboard",
    icon: <LuLayoutDashboard className="text-lg" />,
  },
  {
    label: "Garages",
    path: "/admin/garages",
    icon: <LuStore className="text-lg" />,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: <LuUsers className="text-lg" />,
  },
  {
    label: "Spare Parts",
    path: "/admin/spareparts",
    icon: <LuBox className="text-lg" />,
  },
  {
    label: "Financials",
    path: "/admin/financials",
    icon: <LuDollarSign className="text-lg" />,
  },
  {
    label: "Messages",
    path: "/admin/messages",
    icon: <LuMessageSquare className="text-lg" />,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: <LuSettings className="text-lg" />,
  },
];

// Garage admin navigation items
export const garageAdminNavItems: NavItem[] = [
  {
    label: "Dashboard",
    path: "/garage-admin/dashboard",
    icon: <LuLayoutDashboard className="text-lg" />,
  },
  {
    label: "My Garage",
    path: "/garage-admin/my-garage",
    icon: <LuShip className="text-lg" />,
  },
  {
    label: "My Products",
    path: "/garage-admin/my-products",
    icon: <LuPackage className="text-lg" />,
  },
  {
    label: "Inquiries",
    path: "/garage-admin/inquiries",
    icon: <LuShoppingCart className="text-lg" />,
  },
  {
    label: "Messages",
    path: "/garage-admin/messages",
    icon: <LuMessageSquare className="text-lg" />,
  },
  {
    label: "Subscription",
    path: "/garage-admin/subscription",
    icon: <CreditCard className="text-lg" />,
  },
  {
    label: "Ad & Promotion",
    path: "/garage-admin/ad-promotion",
    icon: <LuChartColumn className="text-lg" />,
  },
  {
    label: "Profile & Settings",
    path: "/garage-admin/profile-settings",
    icon: <LuSettings className="text-lg" />,
  },
  {
    label: "Support & Help",
    path: "/garage-admin/support-help",
    icon: <LuSettings className="text-lg" />,
  },
  {
    label: "Support & Help",
    path: "/garage-admin/support",
    icon: <MessageCircleQuestionMark className="text-lg" />,
  },
];

// User/Customer navigation items
export const userNavItems: NavItem[] = [
  {
    label: "Dashboard",
    path: "/user/dashboard",
    icon: <LuLayoutDashboard className="text-lg" />,
  },
  {
    label: "Browse Yachts",
    path: "/user/browse",
    icon: <LuShip className="text-lg" />,
  },
  {
    label: "My Favorites",
    path: "/user/favorites",
    icon: <LuHeart className="text-lg" />,
  },
  {
    label: "My Orders",
    path: "/user/orders",
    icon: <LuShoppingCart className="text-lg" />,
  },
  {
    label: "Messages",
    path: "/user/messages",
    icon: <LuMessageSquare className="text-lg" />,
  },
  {
    label: "Settings",
    path: "/user/settings",
    icon: <LuSettings className="text-lg" />,
  },
];

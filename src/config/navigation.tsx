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

// Seller navigation items
export const sellerNavItems: NavItem[] = [
  {
    label: "Dashboard",
    path: "/seller/dashboard",
    icon: <LuLayoutDashboard className="text-lg" />,
  },
  {
    label: "My Listings",
    path: "/seller/listings",
    icon: <LuShip className="text-lg" />,
  },
  {
    label: "Add New Listing",
    path: "/seller/listings/new",
    icon: <LuPackage className="text-lg" />,
  },
  {
    label: "Orders",
    path: "/seller/orders",
    icon: <LuShoppingCart className="text-lg" />,
  },
  {
    label: "Messages",
    path: "/seller/messages",
    icon: <LuMessageSquare className="text-lg" />,
  },
  {
    label: "Analytics",
    path: "/seller/analytics",
    icon: <LuChartColumn className="text-lg" />,
  },
  {
    label: "Settings",
    path: "/seller/settings",
    icon: <LuSettings className="text-lg" />,
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

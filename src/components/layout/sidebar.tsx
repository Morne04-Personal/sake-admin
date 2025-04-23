
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ColorfulDivider } from "../ui/colorful-divider";
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Package, 
  Briefcase, 
  Calendar, 
  Users,
  ShoppingCart
} from "lucide-react";
import { useUserContext } from "@/lib/auth-context";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useUserContext();
  
  // Define which roles can access which routes
  const canAccessUsers = user?.roleId && [1, 2, 3].includes(user.roleId);
  
  const navItems = [
    { 
      name: "Dashboard", 
      icon: <LayoutDashboard size={20} />, 
      path: "/dashboard",
      allowed: true 
    },
    { 
      name: "Products", 
      icon: <Package size={20} />, 
      path: "/products",
      allowed: true 
    },
    { 
      name: "Suppliers", 
      icon: <Briefcase size={20} />, 
      path: "/suppliers",
      allowed: true 
    },
    { 
      name: "Events", 
      icon: <Calendar size={20} />, 
      path: "/events",
      allowed: true 
    },
    { 
      name: "Users", 
      icon: <Users size={20} />, 
      path: "/users",
      allowed: canAccessUsers
    },
    { 
      name: "Orders", 
      icon: <ShoppingCart size={20} />, 
      path: "/orders",
      allowed: false,
      disabled: true
    }
  ];
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col h-screen",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="p-4 flex justify-between items-center">
        {!isCollapsed && <div className="text-xl font-bold text-sake-deep-navy">SAKEwinkel</div>}
        <button 
          onClick={toggleCollapse} 
          className="p-1 rounded-full hover:bg-gray-100"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <ColorfulDivider />
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            if (!item.allowed) return null;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md font-medium transition-colors",
                    location.pathname === item.path 
                      ? "bg-sake-deep-navy text-white" 
                      : "text-gray-700 hover:bg-gray-100",
                    item.disabled && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={e => {
                    if (item.disabled) e.preventDefault();
                  }}
                >
                  <div className="mr-3">{item.icon}</div>
                  {!isCollapsed && <span>{item.name}</span>}
                  {isCollapsed && <span className="sr-only">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <ColorfulDivider />
      <div className="p-4 text-center text-xs text-gray-500">
        {!isCollapsed && <div>&copy; {new Date().getFullYear()} SAKEwinkel</div>}
      </div>
    </aside>
  );
}

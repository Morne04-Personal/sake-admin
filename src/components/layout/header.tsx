
import { useUserContext } from "@/lib/auth-context";
import { ColorfulDivider } from "@/components/ui/colorful-divider";
import { UserMenu } from "@/components/layout/user-menu";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { user } = useUserContext();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Define which roles can access which routes
  const canAccessUsers = user?.roleId && [1, 2, 3].includes(user.roleId);
  
  const navItems = [
    { name: "Dashboard", path: "/dashboard", allowed: true },
    { name: "Products", path: "/products", allowed: true },
    { name: "Suppliers", path: "/suppliers", allowed: true },
    { name: "Events", path: "/events", allowed: true },
    { name: "Users", path: "/users", allowed: canAccessUsers },
    { name: "Orders", path: "/orders", allowed: false, disabled: true }
  ];
  
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  
  return (
    <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <header className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={onMenuToggle}
              className="p-2 lg:hidden rounded-md hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
            <div className="ml-4 lg:hidden text-xl font-bold text-sake-deep-navy">SAKEwinkel</div>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.filter(item => item.allowed).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sake-slate-gray hover:text-sake-deep-navy font-medium ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={e => {
                  if (item.disabled) e.preventDefault();
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button 
              className="lg:hidden mr-4 p-2 rounded-md hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              <Menu size={20} />
            </button>
            
            <UserMenu />
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-white border-b border-gray-200">
          <nav className="px-4 py-2">
            <ul className="space-y-2">
              {navItems.filter(item => item.allowed).map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`block py-2 font-medium text-sake-slate-gray hover:text-sake-deep-navy ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={e => {
                      if (item.disabled) e.preventDefault();
                      setShowMobileMenu(false);
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      
      <ColorfulDivider />
    </div>
  );
}

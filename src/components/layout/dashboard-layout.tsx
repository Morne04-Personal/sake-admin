
import { PropsWithChildren, useState } from "react";
import { Sidebar } from "./sidebar";
import { ColorfulDivider } from "../ui/colorful-divider";

export function DashboardLayout({ children }: PropsWithChildren) {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - hidden on mobile unless toggled */}
      <div className={`fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition duration-300 ease-in-out ${
        showMobileSidebar ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar className="h-full" />
      </div>

      {/* Sidebar overlay */}
      {showMobileSidebar && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* No Header, just optional ColorfulDivider */}
        <div className="block lg:hidden">
          <ColorfulDivider />
        </div>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 py-4">
          <ColorfulDivider />
          <div className="px-4 py-3 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SAKEwinkel. All rights reserved. | Version 1.0.0
          </div>
        </footer>
      </div>
    </div>
  );
}

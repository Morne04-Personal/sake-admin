
import { ColorfulDivider } from "@/components/ui/colorful-divider";
import { PropsWithChildren } from "react";

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-auto">
              <h1 className="text-2xl font-bold text-sake-deep-navy">SAKEwinkel</h1>
            </div>
          </div>
          <ColorfulDivider className="mb-6" />
          {children}
          <ColorfulDivider className="mt-6" />
          <div className="text-center text-sm text-gray-500 mt-4">
            &copy; {new Date().getFullYear()} SAKEwinkel. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

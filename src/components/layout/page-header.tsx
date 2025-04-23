
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-sake-deep-navy">{title}</h1>
        {description && <p className="text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

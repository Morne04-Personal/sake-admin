
import { cn } from "@/lib/utils";

export function ColorfulDivider({ className }: { className?: string }) {
  return (
    <div className={cn("sake-colorful-divider", className)}>
      <div className="bg-sake-deep-navy"></div>
      <div className="bg-sake-teal-blue"></div>
      <div className="bg-sake-white"></div>
      <div className="bg-sake-purple"></div>
      <div className="bg-sake-olive-green"></div>
      <div className="bg-sake-white"></div>
      <div className="bg-sake-pink"></div>
      <div className="bg-sake-light-blue"></div>
      <div className="bg-sake-white"></div>
      <div className="bg-sake-yellow"></div>
      <div className="bg-sake-red"></div>
      <div className="bg-sake-sage-green"></div>
    </div>
  );
}

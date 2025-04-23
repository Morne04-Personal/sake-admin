
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldOff, ArrowLeft, Home } from "lucide-react";
import { useUserContext } from "@/lib/auth-context";
import { AuthLayout } from "@/components/layout/auth-layout";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  
  return (
    <AuthLayout>
      <div className="text-center flex flex-col items-center py-8">
        <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <ShieldOff size={48} className="text-sake-red" />
        </div>
        
        <h1 className="text-2xl font-bold text-sake-deep-navy mb-2">
          Access Denied
        </h1>
        
        <p className="text-gray-600 mb-6">
          You do not have permission to access this page.
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} className="mr-2" />
            Go Back
          </Button>
          
          <Button
            className="sake-button-primary flex items-center"
            onClick={() => navigate("/dashboard")}
          >
            <Home size={16} className="mr-2" />
            Dashboard
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Unauthorized;

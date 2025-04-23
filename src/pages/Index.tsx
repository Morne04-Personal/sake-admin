
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/lib/auth-context";

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUserContext();
  
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }
  }, [user, isLoading, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 text-sake-deep-navy">SAKEwinkel Admin</h1>
        <p className="text-xl text-gray-600">Redirecting to the appropriate page...</p>
      </div>
    </div>
  );
};

export default Index;

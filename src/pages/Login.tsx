
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useUserContext } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  
  const navigate = useNavigate();
  const { user, login } = useUserContext();
  const { toast } = useToast();

  // If already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const validate = () => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};
    
    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password, rememberMe);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to SAKEwinkel Admin.",
        });
        navigate("/dashboard");
      } else {
        setErrors({
          general: "Invalid email or password"
        });
      }
    } catch (error) {
      setErrors({
        general: "An unexpected error occurred"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-sake-deep-navy mb-6">
          Admin Login
        </h2>
        
        {errors.general && (
          <div className="bg-red-50 text-sake-red p-3 rounded-md text-sm">
            {errors.general}
          </div>
        )}
        
        <div className="space-y-4">
          <div className="sake-form-group">
            <Label htmlFor="email" className="sake-label">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`sake-input ${errors.email ? "border-sake-red" : ""}`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="sake-error">{errors.email}</p>}
          </div>
          
          <div className="sake-form-group">
            <Label htmlFor="password" className="sake-label">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`sake-input ${errors.password ? "border-sake-red" : ""}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
            {errors.password && <p className="sake-error">{errors.password}</p>}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label
                htmlFor="remember"
                className="text-sm font-medium leading-none cursor-pointer"
              >
                Remember me
              </Label>
            </div>
            <a
              href="#forgot-password"
              className="text-sm font-medium text-sake-teal-blue hover:text-sake-deep-navy"
            >
              Forgot password?
            </a>
          </div>
        </div>
        
        <Button
          type="submit"
          className="sake-button-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;

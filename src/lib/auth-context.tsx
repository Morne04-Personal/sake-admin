
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  roleId: number;
  avatar?: string;
  supplierId?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Mock users for authentication
const mockUsers = [
  { id: 1, name: 'John Admin', email: 'admin@example.com', password: 'password', roleId: 1 },
  { id: 2, name: 'Jane Manager', email: 'manager@example.com', password: 'password', roleId: 2 },
  { id: 3, name: 'Sam Supplier', email: 'supplier@example.com', password: 'password', roleId: 4, supplierId: 1 }
];

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('sakeUser');
    const sessionUser = sessionStorage.getItem('sakeUser');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
    
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
    // Simulate API call with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        
        if (foundUser) {
          // Remove password from user object
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          
          // Save user based on remember me option
          if (rememberMe) {
            localStorage.setItem('sakeUser', JSON.stringify(userWithoutPassword));
          } else {
            sessionStorage.setItem('sakeUser', JSON.stringify(userWithoutPassword));
          }
          
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('sakeUser');
    sessionStorage.removeItem('sakeUser');
    navigate('/login');
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useUserContext must be used within an AuthProvider');
  }
  
  return context;
}

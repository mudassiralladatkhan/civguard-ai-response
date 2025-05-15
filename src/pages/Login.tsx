
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isLoading, profile, getRedirectPath } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated and has a profile, redirect to their dashboard
    if (profile) {
      navigate(getRedirectPath());
    }
  }, [profile, navigate, getRedirectPath]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to CivGuard</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link to="/register" className="font-medium text-primary hover:text-primary/80">
              create a new account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm font-medium text-primary hover:text-primary/80">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
          
          <div className="relative my-4">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button type="button" variant="outline" className="w-full" disabled={isLoading}>
              Google
            </Button>
            <Button type="button" variant="outline" className="w-full" disabled={isLoading}>
              Facebook
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

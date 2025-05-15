
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "citizen", // Default role
  });
  const { signUp, isLoading, profile, getRedirectPath } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated and has a profile, redirect to their dashboard
    if (profile) {
      navigate(getRedirectPath());
    }
  }, [profile, navigate, getRedirectPath]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await signUp(formData.email, formData.password, formData.role, formData.name);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:text-primary/80">
              Sign in
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <Label>Account Type</Label>
              <RadioGroup 
                value={formData.role}
                onValueChange={(value) => setFormData({...formData, role: value})}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="citizen" id="citizen" disabled={isLoading} />
                  <Label htmlFor="citizen" className="cursor-pointer">Citizen</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="officer" id="officer" disabled={isLoading} />
                  <Label htmlFor="officer" className="cursor-pointer">Municipal Officer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" disabled={isLoading} />
                  <Label htmlFor="admin" className="cursor-pointer">Admin</Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-gray-500 mt-1">
                Note: Officer and Admin accounts require approval.
              </p>
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
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
          
          <p className="text-xs text-center text-gray-500 mt-4">
            By registering, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-gray-700">Terms of Service</Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline hover:text-gray-700">Privacy Policy</Link>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

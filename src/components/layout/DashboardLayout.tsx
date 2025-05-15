
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  BarChart, 
  Settings, 
  Users, 
  Bell, 
  LogOut, 
  Menu,
  X,
  Home,
  ChevronDown
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: "citizen" | "municipal" | "admin";
}

const DashboardLayout = ({ children, userRole = "citizen" }: DashboardLayoutProps) => {
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleLogout = () => {
    // This would use Supabase auth logout once integrated
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // Would redirect to home page
  };

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <Home size={18} />,
      roles: ["citizen", "municipal", "admin"],
    },
    {
      label: "Report Issue",
      path: "/report-issue",
      icon: <MapPin size={18} />,
      roles: ["citizen"],
    },
    {
      label: "My Reports",
      path: "/my-reports",
      icon: <MapPin size={18} />,
      roles: ["citizen"],
    },
    {
      label: "Assigned Issues",
      path: "/assigned-issues",
      icon: <MapPin size={18} />,
      roles: ["municipal"],
    },
    {
      label: "Live Map",
      path: "/live-map",
      icon: <MapPin size={18} />,
      roles: ["citizen", "municipal", "admin"],
    },
    {
      label: "Analytics",
      path: "/analytics",
      icon: <BarChart size={18} />,
      roles: ["admin", "municipal"],
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: <Bell size={18} />,
      roles: ["citizen", "municipal", "admin"],
    },
    {
      label: "User Management",
      path: "/users",
      icon: <Users size={18} />,
      roles: ["admin"],
    },
    {
      label: "Settings",
      path: "/settings",
      icon: <Settings size={18} />,
      roles: ["citizen", "municipal", "admin"],
    },
  ];

  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(userRole)
  );

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-primary mr-4">
            CivGuard
          </Link>
          
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="py-4">
                <div className="flex items-center justify-between mb-4">
                  <Link to="/" className="text-xl font-bold text-primary" onClick={() => setIsMobileNavOpen(false)}>
                    CivGuard
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileNavOpen(false)}>
                    <X size={18} />
                  </Button>
                </div>
                <Separator className="my-4" />
                <nav className="space-y-1">
                  {filteredNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive(item.path)
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </Link>
                  ))}
                </nav>
                <Separator className="my-4" />
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hidden md:flex gap-2">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                    {userRole === "admin" ? "A" : userRole === "municipal" ? "M" : "C"}
                  </div>
                  <span className="ml-2 font-medium">{userRole === "admin" ? "Admin" : userRole === "municipal" ? "Officer" : "Citizen"}</span>
                  <ChevronDown size={16} className="ml-2" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="relative"
            asChild
          >
            <Link to="/notifications">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Link>
          </Button>
        </div>
      </header>
      
      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 border-r border-gray-200 bg-white">
          <nav className="p-4 space-y-1">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
            
            <Separator className="my-4" />
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

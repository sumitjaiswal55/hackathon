import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Home, Bell, User, Menu, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

interface NavbarProps {
  isAuth: boolean;
  setIsAuth: (val: boolean) => void;
}

export function Navbar({ isAuth, setIsAuth }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [userName, setUserName] = useState("User");

  // Sync user name from localStorage
  useEffect(() => {
    if (isAuth) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserName(user.name.split(" ")[0]); // Only first name
      }
    }
  }, [isAuth]);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-lg">RentEase</span>
            </Link>

            {isAuth && (
              <div className="hidden md:flex items-center gap-1">
                {[
                  { name: "Dashboard", path: "/dashboard" },
                  { name: "Search", path: "/search" },
                  { name: "Payments", path: "/payments" },
                  { name: "Expenses", path: "/expenses" },
                  { name: "Mess", path: "/mess" },
                ].map((link) => (
                  <Button key={link.path} variant={currentPath === link.path ? "default" : "ghost"} size="sm" asChild>
                    <Link to={link.path}>{link.name}</Link>
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isAuth ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-red-500 text-[10px]">3</Badge>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2 px-2 hover:bg-purple-50">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold uppercase">
                        {userName[0]}
                      </div>
                      <span className="hidden sm:inline font-medium text-sm">{userName}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer"><User className="w-4 h-4 mr-2" /> Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer"><LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" asChild><Link to="/login">Sign In</Link></Button>
                <Button asChild><Link to="/login">Get Started</Link></Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
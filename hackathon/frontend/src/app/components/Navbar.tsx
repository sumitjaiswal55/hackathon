import { motion } from "motion/react";
import { Home, Bell, User, Menu } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Router hooks
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

// Props mein ab isAuth aayega
interface NavbarProps {
  isAuth: boolean;
  setIsAuth: (val: boolean) => void;
}

export function Navbar({ isAuth, setIsAuth }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Logout Function
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
          
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-lg">RentEase</span>
            </Link>

            {/* ✅ PROTECTED LINKS: Sirf login hone par dikhenge */}
            {isAuth && (
              <div className="hidden md:flex items-center gap-1">
                <Button variant={currentPath === "/dashboard" ? "default" : "ghost"} size="sm" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button variant={currentPath === "/search" ? "default" : "ghost"} size="sm" asChild>
                  <Link to="/search">Search</Link>
                </Button>
                <Button variant={currentPath === "/payments" ? "default" : "ghost"} size="sm" asChild>
                  <Link to="/payments">Payments</Link>
                </Button>
                <Button variant={currentPath === "/expenses" ? "default" : "ghost"} size="sm" asChild>
                  <Link to="/expenses">Expenses</Link>
                </Button>
                <Button variant={currentPath === "/mess" ? "default" : "ghost"} size="sm" asChild>
                  <Link to="/mess">Mess</Link>
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* ✅ USER SECTION: Login ke baad ye dikhega */}
            {isAuth ? (
              <>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                      3
                    </Badge>
                  </Button>
                </motion.div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="ghost" size="icon">
                        <User className="w-5 h-5" />
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild><Link to="/profile">Profile</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link to="/admin">Admin Dashboard</Link></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {/* Logout Trigger */}
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </>
            ) : (
              /* ❌ PUBLIC SECTION: Login nahi hai toh ye dikhega */
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/login">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
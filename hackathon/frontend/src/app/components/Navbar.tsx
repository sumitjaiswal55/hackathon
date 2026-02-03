import { motion } from "motion/react";
import { Home, Bell, User, Menu } from "lucide-react";
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
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onNavigate("landing")}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-lg">RentEase</span>
            </motion.div>

            {currentPage !== "landing" && currentPage !== "login" && (
              <div className="hidden md:flex items-center gap-1">
                <Button
                  variant={currentPage === "dashboard" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate("dashboard")}
                >
                  Dashboard
                </Button>
                <Button
                  variant={currentPage === "search" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate("search")}
                >
                  Search
                </Button>
                <Button
                  variant={currentPage === "payments" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate("payments")}
                >
                  Payments
                </Button>
                <Button
                  variant={currentPage === "expenses" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate("expenses")}
                >
                  Expenses
                </Button>
                <Button
                  variant={currentPage === "mess" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate("mess")}
                >
                  Mess
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentPage !== "landing" && currentPage !== "login" ? (
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
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onNavigate("admin")}>
                      Admin Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onNavigate("landing")}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => onNavigate("login")}>
                  Sign In
                </Button>
                <Button onClick={() => onNavigate("login")}>Get Started</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

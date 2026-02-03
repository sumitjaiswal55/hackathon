import { useState } from "react";
import { motion } from "motion/react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Hook import kiya
import { Home, Mail, Lock, User, Phone, Building } from "lucide-react";

// UI Components (Shadcn)
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

// Props interface update kiya
interface LoginPageProps {
  setIsAuth: (val: boolean) => void;
}

export function LoginPage({ setIsAuth }: LoginPageProps) {
  const navigate = useNavigate(); // Navigation hook initialize kiya
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<string>("Bachelor");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    college: "",
    password: "",
  });

  // --- LOGIN HANDLER ---
  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      return alert("Please enter both email and password.");
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email: loginData.email,
        password: loginData.password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        setIsAuth(true); // App state update kiya taaki Navbar change ho
        alert(`Welcome back, ${response.data.user.name}!`);
        navigate("/dashboard"); // React Router redirection
      }
    } catch (error: any) {
      alert(error.response?.data?.msg || "Login Failed. Check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- SIGNUP HANDLER ---
  const handleSignup = async () => {
    const { firstName, lastName, email, password, phone, college } = signupData;

    if (!firstName || !email || !password) {
      return alert("Please fill at least Name, Email, and Password.");
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", {
        name: `${firstName} ${lastName}`,
        email,
        password,
        role: userType,
        phoneNumber: phone,
        baseLocationName: college,
        baseCoordinates: { lat: 21.1458, lng: 79.0882 } 
      });

      if (response.data.success) {
        alert("Account Created! Now please Login.");
        // Reload ki jagah hum simply login tab par reh sakte hain ya state reset kar sakte hain
        window.location.reload(); 
      }
    } catch (error: any) {
      alert(error.response?.data?.error || "Signup Failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white">
              <Home className="w-7 h-7" />
            </div>
            <span className="font-bold text-2xl">RentEase</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Sign in to continue your rental journey</p>
        </div>

        <Card className="p-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="pl-10" 
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10" 
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  />
                </div>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleLogin} disabled={isLoading}>
                {isLoading ? "Validating..." : "Sign In"}
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input 
                    placeholder="John" 
                    value={signupData.firstName}
                    onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input 
                    placeholder="Doe" 
                    value={signupData.lastName}
                    onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                  value={signupData.email}
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>User Type</Label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Bachelor">Bachelor</SelectItem>
                    <SelectItem value="Owner">Owner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={signupData.password}
                  onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                />
              </div>

              <Button className="w-full bg-pink-600 hover:bg-pink-700" onClick={handleSignup} disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  );
}
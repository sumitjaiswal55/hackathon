import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios"; // API ke liye baad mein use kar sakte hain
import { motion } from "motion/react";
import { Sparkles, TrendingUp, Home, FileText, Calendar, Bell } from "lucide-react";

// UI Components
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { StatCard } from "@/app/components/StatCard";
import { PropertyCard } from "@/app/components/PropertyCard";
import { Progress } from "@/app/components/ui/progress";

export function DashboardPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Sumit"); // Default name setup

  // --- Static Data for Demo ---
  const aiRecommendations = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
      title: "Modern 2BHK Near IIT Delhi",
      location: "Hauz Khas, Delhi",
      price: 18000,
      rating: 4.8,
      trustScore: 92,
      safetyRating: 88,
      distance: "800m from campus",
      bedrooms: 2,
      type: "Apartment",
      aiRecommended: true,
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
      title: "Cozy Studio in Koramangala",
      location: "Koramangala, Bangalore",
      price: 15000,
      rating: 4.6,
      trustScore: 85,
      safetyRating: 90,
      distance: "1.2km from office hub",
      bedrooms: 1,
      type: "Studio",
      aiRecommended: true,
    }
  ];

  const recentActivity = [
    {
      title: "Viewing scheduled",
      description: "Sunset Apartments, tomorrow at 4 PM",
      time: "2 hours ago",
      icon: Calendar,
      color: "bg-blue-100",
    },
    {
      title: "Rent payment due",
      description: "Payment due in 5 days",
      time: "1 day ago",
      icon: Bell,
      color: "bg-orange-100",
    },
  ];

  useEffect(() => {
    // LocalStorage se real name nikalne ke liye
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name.split(" ")[0]); 
    }

    /* // --- Future API Integration ---
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/properties/all");
        if (res.data.success) { setProperties(res.data.data); }
      } catch (err) { console.error(err); }
    };
    fetchProperties();
    */
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
              <p className="text-gray-600">Here's what's happening with your rental search</p>
            </div>
            <Button onClick={() => navigate("/search")}>
              <Sparkles className="w-4 h-4 mr-2" />
              Find More Properties
            </Button>
          </div>

        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Home} label="Saved" value={12} trend="+3 new" bgColor="bg-blue-50" iconColor="text-blue-600" delay={0.1} />
          <StatCard icon={Calendar} label="Viewings" value={3} trend="Next: Tomorrow" bgColor="bg-purple-50" iconColor="text-purple-600" delay={0.2} />
          <StatCard icon={FileText} label="Applications" value={5} trend="2 pending" bgColor="bg-green-50" iconColor="text-green-600" delay={0.3} />
          <StatCard icon={Sparkles} label="AI Score" value="92%" trend="Excellent" bgColor="bg-orange-50" iconColor="text-orange-600" delay={0.4} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-purple-500" />
              AI Recommendations
            </h2>
            
            <div className="space-y-6">
              {aiRecommendations.map((prop) => (
                <PropertyCard 
                  key={prop.id}
                  {...prop}
                  onClick={() => navigate(`/property/${prop.id}`)}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/search")}><Home className="w-4 h-4 mr-2" />Browse</Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/expenses")}><Calendar className="w-4 h-4 mr-2" />Split Bills</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              {recentActivity.map((act, i) => (
                <div key={i} className="flex gap-3 mb-4 last:mb-0">
                  <div className={`p-2 ${act.color} rounded-lg h-fit`}><act.icon className="w-4 h-4" /></div>
                  <div>
                    <p className="font-medium text-sm">{act.title}</p>
                    <p className="text-xs text-gray-500">{act.time}</p>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
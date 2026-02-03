import { motion } from "motion/react";
import { Sparkles, TrendingUp, Home, FileText, Calendar, Bell } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { StatCard } from "@/app/components/StatCard";
import { PropertyCard } from "@/app/components/PropertyCard";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";

interface DashboardPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
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
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      title: "Spacious 3BHK in Powai",
      location: "Powai, Mumbai",
      price: 32000,
      rating: 4.9,
      trustScore: 95,
      safetyRating: 92,
      distance: "500m from IIT Bombay",
      bedrooms: 3,
      type: "Apartment",
      aiRecommended: true,
    },
  ];

  const recentActivity = [
    {
      title: "Viewing scheduled",
      description: "Sunset Apartments, tomorrow at 4 PM",
      time: "2 hours ago",
      icon: Calendar,
      color: "bg-[--pastel-blue]",
    },
    {
      title: "New property match",
      description: "3 new properties match your preferences",
      time: "5 hours ago",
      icon: Sparkles,
      color: "bg-[--pastel-purple]",
    },
    {
      title: "Rent payment due",
      description: "Payment due in 5 days",
      time: "1 day ago",
      icon: Bell,
      color: "bg-[--pastel-orange]",
    },
  ];

  const profileCompleteness = 85;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Arjun! 👋</h1>
              <p className="text-gray-600">Here's what's happening with your rental search</p>
            </div>
            <Button onClick={() => onNavigate("search")}>
              <Sparkles className="w-4 h-4 mr-2" />
              Find More Properties
            </Button>
          </div>

          {/* Profile Completeness */}
          {profileCompleteness < 100 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      Complete Your Profile
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Add more details to get better AI recommendations
                    </p>
                    <Progress value={profileCompleteness} className="mb-2" />
                    <p className="text-xs text-gray-500">{profileCompleteness}% complete</p>
                  </div>
                  <Button variant="outline" size="sm">Complete</Button>
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Home}
            label="Properties Saved"
            value={12}
            trend="+3 this week"
            bgColor="bg-[--pastel-blue]"
            iconColor="text-[--pastel-blue-dark]"
            delay={0.1}
          />
          <StatCard
            icon={Calendar}
            label="Scheduled Viewings"
            value={3}
            trend="Next: Tomorrow"
            bgColor="bg-[--pastel-purple]"
            iconColor="text-[--pastel-purple-dark]"
            delay={0.2}
          />
          <StatCard
            icon={FileText}
            label="Applications Sent"
            value={5}
            trend="2 pending"
            bgColor="bg-[--pastel-green]"
            iconColor="text-[--pastel-green-dark]"
            delay={0.3}
          />
          <StatCard
            icon={Sparkles}
            label="AI Match Score"
            value="92%"
            trend="Excellent"
            bgColor="bg-[--pastel-orange]"
            iconColor="text-[--pastel-orange-dark]"
            delay={0.4}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Recommendations */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    AI Recommendations
                  </h2>
                  <p className="text-gray-600 mt-1">Personalized picks based on your preferences</p>
                </div>
                <Button variant="ghost" onClick={() => onNavigate("search")}>
                  View All
                </Button>
              </div>

              <div className="space-y-6">
                {aiRecommendations.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <PropertyCard
                      {...property}
                      onClick={() => onNavigate("property-detail", property)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate("search")}>
                    <Home className="w-4 h-4 mr-2" />
                    Browse Properties
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate("payments")}>
                    <FileText className="w-4 h-4 mr-2" />
                    Manage Payments
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate("expenses")}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Split Expenses
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className={`p-2 ${activity.color} rounded-lg h-fit`}>
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-gray-600">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Tips Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="p-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Pro Tip</h3>
                    <p className="text-sm text-white/90">
                      Schedule property visits during peak hours to check noise levels and neighborhood activity
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

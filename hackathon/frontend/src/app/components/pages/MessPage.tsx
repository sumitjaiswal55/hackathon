import { useNavigate } from "react-router-dom"; // Navigation support
import { motion } from "motion/react";
import { Utensils, Calendar, Clock, Star, Plus, TrendingUp, Users, CheckCircle2 } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Separator } from "@/app/components/ui/separator";

interface MessPageProps {
  onNavigate: (page: string) => void;
}

export function MessPage({ onNavigate }: MessPageProps) {
  const navigate = useNavigate(); // Standard navigation hook

  const messServices = [
    {
      id: "1",
      name: "Annapurna Mess",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 156,
      price: 3500,
      distance: "500m",
      meals: "Breakfast, Lunch, Dinner",
      type: "Vegetarian",
      featured: true,
    },
    {
      id: "2",
      name: "Home Food Tiffin",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 98,
      price: 4000,
      distance: "800m",
      meals: "Lunch, Dinner",
      type: "Both",
      featured: false,
    },
    {
      id: "3",
      name: "South Indian Delights",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 124,
      price: 3200,
      distance: "1.2km",
      meals: "Breakfast, Lunch, Dinner",
      type: "Vegetarian",
      featured: false,
    },
  ];

  const currentSubscription = {
    mess: "Annapurna Mess",
    plan: "Monthly - Lunch & Dinner",
    startDate: "Feb 1, 2026",
    endDate: "Feb 28, 2026",
    price: 3500,
    mealsLeft: 42,
    totalMeals: 56,
  };

  const weekMenu = [
    {
      day: "Monday",
      breakfast: "Idli, Sambar, Chutney",
      lunch: "Rice, Dal, Sabzi, Roti",
      dinner: "Chapati, Paneer Curry, Rice",
    },
    {
      day: "Tuesday",
      breakfast: "Poha, Tea",
      lunch: "Rice, Rajma, Salad, Roti",
      dinner: "Rice, Mixed Veg, Dal",
    },
    {
      day: "Wednesday",
      breakfast: "Upma, Coffee",
      lunch: "Rice, Chole, Roti, Salad",
      dinner: "Chapati, Aloo Gobi, Dal",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Mess Services</h1>
          <p className="text-gray-600">Subscribe to affordable and hygienic meal services</p>
        </motion.div>

        {/* Current Subscription */}
        {currentSubscription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <h3 className="font-semibold text-lg">Active Subscription</h3>
                  </div>
                  <p className="text-2xl font-bold mb-1">{currentSubscription.mess}</p>
                  <p className="text-white/90 text-sm">{currentSubscription.plan}</p>
                  <div className="flex gap-4 mt-3 text-sm">
                    <div>
                      <span className="text-white/70">Valid till: </span>
                      <span className="font-semibold">{currentSubscription.endDate}</span>
                    </div>
                    <div>
                      <span className="text-white/70">Meals left: </span>
                      <span className="font-semibold">{currentSubscription.mealsLeft}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {/* ✅ Navigate to Menu Page */}
                  <Button variant="secondary" onClick={() => navigate("/mess-meal")}>
                    View Menu
                  </Button>
                  <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white">
                    Manage Subscription
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* ✅ FIXED SECTION: Summary Stats including Monthly Cost */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Monthly Cost</p>
                  <p className="text-2xl font-bold">₹{currentSubscription.price}</p>
                  <p className="text-xs text-gray-500 mt-1">Per person</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <Utensils className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Consumed</p>
                  <p className="text-2xl font-bold">{currentSubscription.totalMeals - currentSubscription.mealsLeft}</p>
                  <p className="text-xs text-green-600 mt-1">Meals this month</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg. Cost/Meal</p>
                  <p className="text-2xl font-bold">₹{Math.round(currentSubscription.price / currentSubscription.totalMeals)}</p>
                  <p className="text-xs text-purple-600 mt-1">Great savings!</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Trust Rating</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <p className="text-2xl font-bold">4.8</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">User satisfaction</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Available Mess Services</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>

              <div className="space-y-4">
                {messServices.map((mess, index) => (
                  <motion.div
                    key={mess.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-sm bg-white">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-48">
                          <img src={mess.image} alt={mess.name} className="w-full h-48 md:h-full object-cover" />
                        </div>
                        <div className="p-5 flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-bold text-lg">{mess.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {mess.rating} ({mess.reviews})
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-black text-slate-900">₹{mess.price}</p>
                              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">per month</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-6">
                            <Button variant="outline" className="flex-1 rounded-xl" onClick={() => navigate("/mess-meal")}>
                              View Menu
                            </Button>
                            <Button className="flex-1 rounded-xl bg-slate-900">Subscribe</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 rounded-2xl shadow-sm border-none bg-white">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-500" /> Weekly Menu
              </h3>
              <Tabs defaultValue={weekMenu[0].day}>
                <TabsList className="grid w-full grid-cols-3 bg-slate-50 p-1 rounded-xl">
                  {weekMenu.map((day) => (
                    <TabsTrigger key={day.day} value={day.day} className="text-xs font-bold">{day.day.slice(0, 3)}</TabsTrigger>
                  ))}
                </TabsList>
                {weekMenu.map((day) => (
                  <TabsContent key={day.day} value={day.day} className="space-y-4 mt-6">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] uppercase font-bold text-gray-400">Breakfast</p>
                      <p className="text-sm font-semibold">{day.breakfast}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] uppercase font-bold text-gray-400">Lunch</p>
                      <p className="text-sm font-semibold">{day.lunch}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] uppercase font-bold text-gray-400">Dinner</p>
                      <p className="text-sm font-semibold">{day.dinner}</p>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
              <Button 
                variant="ghost" 
                className="w-full mt-6 text-purple-600 font-bold hover:bg-purple-50 rounded-xl"
                onClick={() => navigate("/mess-meal")}
              >
                Full Nutrition Data &rarr;
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
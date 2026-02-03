import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Utensils, Clock, CheckCircle2, ArrowLeft, Leaf, Info, Flame, Scale } from "lucide-react";

// UI Components
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

export function MessMeal() {
  const navigate = useNavigate();

  // Dummy Detailed Menu Data
  const fullMenu = {
    Monday: {
      breakfast: { items: "Idli, Sambar, Coconut Chutney", cals: "350 kcal" },
      lunch: { items: "Steam Rice, Moong Dal, Aloo Gobi, Roti, Curd", cals: "750 kcal" },
      dinner: { items: "Chapati, Paneer Masala, Jeera Rice, Salad", cals: "680 kcal" }
    },
    Tuesday: {
      breakfast: { items: "Poha, Sev, Masala Tea", cals: "300 kcal" },
      lunch: { items: "Rajma, Rice, Mix Veg, Roti, Papad", cals: "720 kcal" },
      dinner: { items: "Plain Paratha, Mix Veg, Dal Fry, Rice", cals: "650 kcal" }
    },
    Wednesday: {
        breakfast: { items: "Aloo Paratha, Curd, Pickle", cals: "450 kcal" },
        lunch: { items: "Chole, Bhature (2), Rice, Boondi Raita", cals: "850 kcal" },
        dinner: { items: "Methi Thepla, Aloo Bhaji, Dal, Rice", cals: "600 kcal" }
      }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFE] pb-12">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        
        {/* BACK BUTTON */}
        <Button 
            variant="ghost" 
            className="mb-6 -ml-4 text-slate-500 hover:text-purple-600 transition-colors"
            onClick={() => navigate("/mess")}
        >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Mess Hub
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: Image & Overview */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="overflow-hidden border-none shadow-xl rounded-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600" 
                  alt="Annapurna Mess" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 bg-white">
                  <h1 className="text-2xl font-bold text-slate-900">Annapurna Mess</h1>
                  <p className="text-slate-500 text-sm mt-1">Homestyle North Indian & Maharashtrian Thali</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge className="bg-emerald-50 text-emerald-600 border-none flex items-center gap-1">
                      <Leaf className="w-3 h-3" /> Pure Veg
                    </Badge>
                    <Badge className="bg-blue-50 text-blue-600 border-none flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> FSSAI Certified
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>

            <Card className="p-6 border-none shadow-sm bg-purple-600 text-white rounded-3xl">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" /> Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="opacity-80">Monthly Plan</span>
                  <span className="font-bold">₹3,500</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="opacity-80">Daily (B+L+D)</span>
                  <span className="font-bold">₹150</span>
                </div>
                <Separator className="bg-white/20" />
                <p className="text-[10px] opacity-70 italic text-center">Prices inclusive of delivery to hostellers</p>
              </div>
            </Card>
          </div>

          {/* RIGHT: Detailed Menu Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="p-8 border-none shadow-sm bg-white rounded-3xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">Weekly Meal Chart</h2>
                        <p className="text-slate-500 text-sm">Detailed items and nutrition per meal</p>
                    </div>
                    <Utensils className="w-8 h-8 text-purple-200" />
                </div>

                <Tabs defaultValue="Monday" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 rounded-2xl h-12 mb-8">
                    <TabsTrigger value="Monday" className="rounded-xl font-bold">Mon</TabsTrigger>
                    <TabsTrigger value="Tuesday" className="rounded-xl font-bold">Tue</TabsTrigger>
                    <TabsTrigger value="Wednesday" className="rounded-xl font-bold">Wed</TabsTrigger>
                  </TabsList>

                  {Object.entries(fullMenu).map(([day, meals]: any) => (
                    <TabsContent key={day} value={day} className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                      
                      {/* Breakfast Block */}
                      <div className="flex gap-6 items-start">
                        <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 shrink-0">
                          <Clock className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className="font-black text-slate-800 text-lg uppercase tracking-tight">Breakfast</h4>
                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                <Flame className="w-3 h-3" /> {meals.breakfast.cals}
                            </span>
                          </div>
                          <p className="text-slate-600 mt-1 leading-relaxed">{meals.breakfast.items}</p>
                        </div>
                      </div>

                      <Separator className="bg-slate-50" />

                      {/* Lunch Block */}
                      <div className="flex gap-6 items-start">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shrink-0">
                          <Utensils className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className="font-black text-slate-800 text-lg uppercase tracking-tight">Lunch (Heavy Thali)</h4>
                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                <Flame className="w-3 h-3" /> {meals.lunch.cals}
                            </span>
                          </div>
                          <p className="text-slate-600 mt-1 leading-relaxed">{meals.lunch.items}</p>
                        </div>
                      </div>

                      <Separator className="bg-slate-50" />

                      {/* Dinner Block */}
                      <div className="flex gap-6 items-start">
                        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 shrink-0">
                          <Scale className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className="font-black text-slate-800 text-lg uppercase tracking-tight">Dinner</h4>
                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                <Flame className="w-3 h-3" /> {meals.dinner.cals}
                            </span>
                          </div>
                          <p className="text-slate-600 mt-1 leading-relaxed">{meals.dinner.items}</p>
                        </div>
                      </div>

                    </TabsContent>
                  ))}
                </Tabs>

                <div className="mt-12 bg-slate-50 p-6 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3 text-slate-500">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm font-medium">Hygienic standard verified by RentEase AI</span>
                    </div>
                    <Button className="bg-slate-900 text-white rounded-xl px-8 h-12 font-bold hover:scale-105 transition-transform">
                        Subscribe Now
                    </Button>
                </div>
              </Card>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
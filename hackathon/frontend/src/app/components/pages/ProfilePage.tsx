import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { User, Mail, Shield, MapPin, Building, Calendar, PencilLine } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Button } from "@/app/components/ui/button";

export function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <div className="h-screen flex items-center justify-center text-slate-500">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <Card className="p-8 border-none shadow-sm bg-white rounded-3xl overflow-hidden relative mb-8">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-purple-600 to-pink-600" />
            
            <div className="relative mt-12 flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-xl">
                <div className="w-full h-full rounded-[20px] bg-purple-100 flex items-center justify-center text-4xl font-bold text-purple-700">
                  {user.name[0]}
                </div>
              </div>
              <div className="flex-1 text-center md:text-left mb-2">
                <h1 className="text-3xl font-extrabold text-slate-900">{user.name}</h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                  <Badge className="bg-purple-100 text-purple-700 border-none">{user.role}</Badge>
                  <Badge variant="outline" className="text-slate-500 border-slate-200">Nagpur, MH</Badge>
                </div>
              </div>
              <Button className="rounded-xl px-6 h-11"><PencilLine className="w-4 h-4 mr-2"/> Edit Profile</Button>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Account Details */}
            <div className="md:col-span-2 space-y-6">
              <Card className="p-8 border-none shadow-sm bg-white rounded-3xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-500" /> Profile Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase">Email Address</p>
                    <p className="font-medium text-slate-700 flex items-center gap-2"><Mail className="w-4 h-4"/> {user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase">College/Institution</p>
                    <p className="font-medium text-slate-700 flex items-center gap-2"><Building className="w-4 h-4"/> {user.baseLocationName || "BCA Student"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase">Verification Status</p>
                    <p className="text-emerald-600 font-bold flex items-center gap-2"><Shield className="w-4 h-4"/> Fully Verified</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase">Member Since</p>
                    <p className="font-medium text-slate-700 flex items-center gap-2"><Calendar className="w-4 h-4"/> Feb 2026</p>
                  </div>
                </div>
                
                <Separator className="my-8" />
                
                <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1"><MapPin className="w-3 h-3"/> Base Coordinates</p>
                    <code className="text-xs bg-slate-50 px-2 py-1 rounded">
                      lat: {user.baseCoordinates?.lat || "21.1458"}, lng: {user.baseCoordinates?.lng || "79.0882"}
                    </code>
                </div>
              </Card>
            </div>

            {/* Account Health */}
            <Card className="p-8 border-none shadow-sm bg-slate-900 text-white rounded-3xl h-fit">
              <h3 className="text-lg font-bold mb-4">Trust Analytics</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs opacity-60">Identity Score</span>
                    <span className="text-xs font-bold text-emerald-400">98%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[98%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs opacity-60">Payment Reliability</span>
                    <span className="text-xs font-bold text-purple-400">85%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-400 w-[85%]" />
                  </div>
                </div>
              </div>
              <p className="text-[10px] opacity-40 mt-8 text-center">Data strictly processed via RentEase Trust Engine</p>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
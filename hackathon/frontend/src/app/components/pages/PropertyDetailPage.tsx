import { useState } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Star,
  Shield,
  Heart,
  Share2,
  Wifi,
  Car,
  Dumbbell,
  Zap,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Separator } from "@/app/components/ui/separator";

interface PropertyDetailPageProps {
  property?: any;
  onNavigate: (page: string) => void;
}

export function PropertyDetailPage({ property, onNavigate }: PropertyDetailPageProps) {
  const [isSaved, setIsSaved] = useState(false);

  // Default property if none provided
  const propertyData = property || {
    id: "1",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    title: "Modern 2BHK Near IIT Delhi",
    location: "Hauz Khas, Delhi",
    price: 18000,
    rating: 4.8,
    trustScore: 92,
    safetyRating: 88,
    distance: "800m from campus",
    bedrooms: 2,
    type: "Apartment",
  };

  const images = [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
  ];

  const amenities = [
    { icon: Wifi, label: "High Speed WiFi" },
    { icon: Car, label: "Parking" },
    { icon: Dumbbell, label: "Gym" },
    { icon: Zap, label: "Power Backup" },
  ];

  const trustFactors = [
    { label: "Verified Owner", value: 100, color: "text-green-600" },
    { label: "Legal Documentation", value: 95, color: "text-green-600" },
    { label: "Maintenance Record", value: 88, color: "text-blue-600" },
    { label: "Previous Tenant Reviews", value: 90, color: "text-green-600" },
  ];

  const safetyFactors = [
    { label: "Neighborhood Safety", value: 92, icon: CheckCircle2 },
    { label: "24/7 Security", value: 85, icon: CheckCircle2 },
    { label: "CCTV Coverage", value: 90, icon: CheckCircle2 },
    { label: "Emergency Services", value: 88, icon: CheckCircle2 },
  ];

  const reviews = [
    {
      name: "Priya Sharma",
      avatar: "PS",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent property! The location is perfect and the landlord is very cooperative. Highly recommended for students.",
    },
    {
      name: "Rahul Kumar",
      avatar: "RK",
      rating: 4,
      date: "1 month ago",
      comment: "Good property with all basic amenities. The area is safe and well-connected.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button variant="ghost" onClick={() => onNavigate("search")}>
            ← Back to Search
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="overflow-hidden">
                <div className="relative">
                  <img
                    src={images[0]}
                    alt={propertyData.title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        size="icon"
                        variant={isSaved ? "default" : "secondary"}
                        onClick={() => setIsSaved(!isSaved)}
                      >
                        <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button size="icon" variant="secondary">
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </motion.div>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    AI Recommended
                  </Badge>
                </div>
                <div className="grid grid-cols-4 gap-2 p-2">
                  {images.slice(1, 4).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                  <div className="relative">
                    <img
                      src={images[0]}
                      alt="More"
                      className="w-full h-24 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black/60 rounded flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-black/70 transition-colors">
                      +5 More
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Property Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{propertyData.title}</h1>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {propertyData.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {propertyData.rating} (24 reviews)
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">₹{propertyData.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">/month</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Bedrooms</p>
                    <p className="text-xl font-semibold">{propertyData.bedrooms} BHK</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Distance</p>
                    <p className="text-xl font-semibold">{propertyData.distance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Type</p>
                    <p className="text-xl font-semibold">{propertyData.type}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-3 bg-[--pastel-blue] rounded-lg"
                    >
                      <amenity.icon className="w-5 h-5 text-[--pastel-blue-dark]" />
                      <span className="text-sm">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <Tabs defaultValue="description">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="trust">Trust Score</TabsTrigger>
                    <TabsTrigger value="safety">Safety</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="space-y-4 mt-4">
                    <div>
                      <h3 className="font-semibold mb-2">About this property</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Beautiful and spacious 2BHK apartment located in the heart of Hauz Khas, just 800m from IIT Delhi campus. 
                        Perfect for students and young professionals looking for a comfortable living space with modern amenities. 
                        The property features well-ventilated rooms, a modular kitchen, and 24/7 power backup.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Nearby Places</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          IIT Delhi - 800m (10 min walk)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Green Park Metro - 1.2km
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Hauz Khas Village - 500m
                        </li>
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="trust" className="space-y-4 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Overall Trust Score</h3>
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        <span className="text-2xl font-bold text-green-600">{propertyData.trustScore}%</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {trustFactors.map((factor, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">{factor.label}</span>
                            <span className={`text-sm font-semibold ${factor.color}`}>
                              {factor.value}%
                            </span>
                          </div>
                          <Progress value={factor.value} />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="safety" className="space-y-4 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Safety Rating</h3>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-green-600" />
                        <span className="text-2xl font-bold text-green-600">{propertyData.safetyRating}%</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {safetyFactors.map((factor, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-[--pastel-green] rounded-lg">
                          <div className="flex items-center gap-3">
                            <factor.icon className="w-5 h-5 text-[--pastel-green-dark]" />
                            <span className="text-sm">{factor.label}</span>
                          </div>
                          <span className="font-semibold text-[--pastel-green-dark]">{factor.value}%</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="space-y-4 mt-4">
                    {reviews.map((review, idx) => (
                      <div key={idx} className="border-b pb-4 last:border-0">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback>{review.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold">{review.name}</h4>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">Load More Reviews</Button>
                  </TabsContent>
                </Tabs>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 sticky top-24">
                <div className="text-center mb-6">
                  <Avatar className="w-20 h-20 mx-auto mb-3">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-xl">RS</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">Raj Sharma</h3>
                  <p className="text-sm text-gray-600">Property Owner</p>
                  <Badge className="mt-2 bg-[--pastel-green] text-[--pastel-green-dark]">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified Owner
                  </Badge>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <Button className="w-full" onClick={() => onNavigate("payments")}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Visit
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-semibold">Within 2 hours</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Acceptance Rate</span>
                    <span className="font-semibold">95%</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">AI Insights</h3>
                    <p className="text-sm text-white/90">Why this property matches you</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Within your budget range (₹15k-20k)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Close to IIT Delhi (preferred location)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>High trust & safety scores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>All requested amenities available</span>
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

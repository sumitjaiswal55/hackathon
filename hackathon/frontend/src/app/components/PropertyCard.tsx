import { motion } from "motion/react";
import { MapPin, Star, Shield, TrendingUp } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  trustScore: number;
  safetyRating: number;
  distance: string;
  bedrooms: number;
  type: string;
  aiRecommended?: boolean;
  onClick?: () => void;
}

export function PropertyCard({
  image,
  title,
  location,
  price,
  rating,
  trustScore,
  safetyRating,
  distance,
  bedrooms,
  type,
  aiRecommended = false,
  onClick,
}: PropertyCardProps) {
  const getTrustColor = (score: number) => {
    if (score >= 80) return "bg-[--pastel-green] text-[--pastel-green-dark]";
    if (score >= 60) return "bg-[--pastel-yellow] text-orange-700";
    return "bg-[--pastel-orange] text-orange-800";
  };

  const getSafetyColor = (score: number) => {
    if (score >= 80) return "text-[--pastel-green-dark]";
    if (score >= 60) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
        <div className="relative">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          {aiRecommended && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
              <TrendingUp className="w-3 h-3 mr-1" />
              AI Recommended
            </Badge>
          )}
          <Badge className="absolute top-3 right-3 bg-white/95 text-gray-800">
            {type}
          </Badge>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold mb-1">{title}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              {location} • {distance}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={getTrustColor(trustScore)}>
              <Shield className="w-3 h-3 mr-1" />
              Trust: {trustScore}%
            </Badge>
            <Badge className="bg-[--pastel-blue] text-[--pastel-blue-dark]">
              <Star className={`w-3 h-3 mr-1 ${getSafetyColor(safetyRating)}`} />
              Safety: {safetyRating}%
            </Badge>
            <Badge variant="secondary">{bedrooms} BHK</Badge>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Starting from</p>
              <p className="text-xl font-semibold">₹{price.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{rating}</span>
            </div>
          </div>

          <Button className="w-full" variant="outline">View Details</Button>
        </div>
      </Card>
    </motion.div>
  );
}

import { useState } from "react";
import { motion } from "motion/react";
import { Search, SlidersHorizontal, MapPin, Home, IndianRupee, BedDouble, Sparkles } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { PropertyCard } from "@/app/components/PropertyCard";
import { Badge } from "@/app/components/ui/badge";
import { Slider } from "@/app/components/ui/slider";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";

interface SearchPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function SearchPage({ onNavigate }: SearchPageProps) {
  const [priceRange, setPriceRange] = useState([5000, 50000]);
  const [showFilters, setShowFilters] = useState(false);

  const properties = [
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
      aiRecommended: false,
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
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
      title: "Luxury 2BHK with Amenities",
      location: "Whitefield, Bangalore",
      price: 25000,
      rating: 4.7,
      trustScore: 88,
      safetyRating: 85,
      distance: "2km from tech parks",
      bedrooms: 2,
      type: "Apartment",
      aiRecommended: false,
    },
    {
      id: "5",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
      title: "Budget-Friendly 1BHK",
      location: "Malviya Nagar, Delhi",
      price: 12000,
      rating: 4.4,
      trustScore: 78,
      safetyRating: 80,
      distance: "1.5km from metro",
      bedrooms: 1,
      type: "Apartment",
      aiRecommended: false,
    },
    {
      id: "6",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
      title: "Premium 3BHK Penthouse",
      location: "Bandra, Mumbai",
      price: 45000,
      rating: 4.9,
      trustScore: 96,
      safetyRating: 94,
      distance: "1km from station",
      bedrooms: 3,
      type: "Penthouse",
      aiRecommended: true,
    },
  ];

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div className="space-y-3">
        <Label>Price Range (₹/month)</Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={5000}
          max={50000}
          step={1000}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Property Type */}
      <div className="space-y-3">
        <Label>Property Type</Label>
        <div className="space-y-2">
          {["Apartment", "Studio", "Penthouse", "Villa", "PG"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={type} />
              <label htmlFor={type} className="text-sm cursor-pointer">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div className="space-y-3">
        <Label>Bedrooms</Label>
        <div className="grid grid-cols-4 gap-2">
          {["1", "2", "3", "4+"].map((bed) => (
            <Button key={bed} variant="outline" size="sm">
              {bed}
            </Button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-3">
        <Label>Amenities</Label>
        <div className="space-y-2">
          {["WiFi", "Parking", "Gym", "Swimming Pool", "Security", "Power Backup"].map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox id={amenity} />
              <label htmlFor={amenity} className="text-sm cursor-pointer">
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Score */}
      <div className="space-y-3">
        <Label>Minimum Trust Score</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select minimum score" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="90">90% and above</SelectItem>
            <SelectItem value="80">80% and above</SelectItem>
            <SelectItem value="70">70% and above</SelectItem>
            <SelectItem value="60">60% and above</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* AI Recommended Only */}
      <div className="flex items-center space-x-2">
        <Checkbox id="ai-only" />
        <label htmlFor="ai-only" className="text-sm cursor-pointer flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          Show AI Recommended Only
        </label>
      </div>

      <Button className="w-full">Apply Filters</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Home</h1>
          <p className="text-gray-600">Discover verified properties with AI-powered recommendations</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by location, college, or area..."
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="pg">PG</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-15000">₹0 - ₹15,000</SelectItem>
                  <SelectItem value="15000-30000">₹15,000 - ₹30,000</SelectItem>
                  <SelectItem value="30000-50000">₹30,000 - ₹50,000</SelectItem>
                  <SelectItem value="50000+">₹50,000+</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Mobile Filter Button */}
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <SlidersHorizontal className="w-5 h-5 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSection />
                  </div>
                </SheetContent>
              </Sheet>

              <Button>
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Recommended
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
            High Trust Score
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
            Safe Neighborhoods
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
            Near Metro
          </Badge>
        </motion.div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden md:block w-80"
          >
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </h3>
                <Button variant="ghost" size="sm">Clear All</Button>
              </div>
              <FilterSection />
            </Card>
          </motion.div>

          {/* Property Grid */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between mb-6"
            >
              <p className="text-gray-600">
                <span className="font-semibold text-foreground">{properties.length} properties</span> found
              </p>
              <Select defaultValue="recommended">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">AI Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="trust">Trust Score</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
              {properties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <PropertyCard
                    {...property}
                    onClick={() => onNavigate("property-detail", property)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center"
            >
              <Button variant="outline" size="lg">
                Load More Properties
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

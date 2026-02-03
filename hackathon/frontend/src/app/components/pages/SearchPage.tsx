import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Search, SlidersHorizontal, MapPin, Sparkles } from "lucide-react";

// Shadcn UI Components
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

export function SearchPage() {
  const navigate = useNavigate();
  
  // States for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([5000, 60000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showAiOnly, setShowAiOnly] = useState(false);

  // --- Expanded Dummy Data with Unsplash Images ---
  const allProperties = [
    { id: "1", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070", title: "Modern 2BHK Near IIT Delhi", location: "Hauz Khas, Delhi", price: 18000, type: "Apartment", aiRecommended: true, rating: 4.8, distance: "800m from campus" },
    { id: "2", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2066", title: "Cozy Studio in Koramangala", location: "Koramangala, Bangalore", price: 15000, type: "Studio", aiRecommended: false, rating: 4.6, distance: "1.2km from office hub" },
    { id: "3", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070", title: "Spacious 3BHK in Powai", location: "Powai, Mumbai", price: 32000, type: "Apartment", aiRecommended: true, rating: 4.9, distance: "500m from IIT Bombay" },
    { id: "4", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070", title: "Minimalist PG for Students", location: "Civil Lines, Nagpur", price: 8500, type: "Studio", aiRecommended: true, rating: 4.5, distance: "200m from Metro" },
    { id: "5", image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070", title: "Luxury Penthouse Suite", location: "Bandra West, Mumbai", price: 55000, type: "Penthouse", aiRecommended: false, rating: 5.0, distance: "Ocean View" },
    { id: "6", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070", title: "Bachelors Pad Near IT Park", location: "Hinjewadi, Pune", price: 22000, type: "Apartment", aiRecommended: true, rating: 4.7, distance: "1km from Infosys" },
    { id: "7", image: "https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Single Room for Working Men", location: "Indiranagar, Bangalore", price: 12000, type: "Studio", aiRecommended: false, rating: 4.3, distance: "Near 100ft Road" },
    { id: "8", image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Student Shared Flat", location: "North Campus, Delhi", price: 7000, type: "Apartment", aiRecommended: true, rating: 4.2, distance: "5min from SRCC" },
    { id: "9", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071", title: "Industrial Style Loft", location: "Gachibowli, Hyderabad", price: 28000, type: "Studio", aiRecommended: false, rating: 4.8, distance: "Heart of Financial Dist" },
  ];

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    return allProperties.filter((property) => {
      const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            property.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(property.type);
      const matchesAi = !showAiOnly || property.aiRecommended;
      return matchesSearch && matchesPrice && matchesType && matchesAi;
    });
  }, [searchQuery, priceRange, selectedTypes, showAiOnly]);

  const FilterSection = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Price Range (₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()})</Label>
        <Slider value={priceRange} onValueChange={setPriceRange} min={5000} max={60000} step={1000} />
      </div>
      <div className="space-y-3">
        <Label className="text-base font-semibold">Property Type</Label>
        {["Apartment", "Studio", "Penthouse"].map((type) => (
          <div key={type} className="flex items-center space-x-2 py-1">
            <Checkbox 
                id={type} 
                checked={selectedTypes.includes(type)} 
                onCheckedChange={() => setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type])} 
            />
            <label htmlFor={type} className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{type}</label>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t">
        <div className="flex items-center space-x-2">
            <Checkbox id="ai-only" checked={showAiOnly} onCheckedChange={(checked) => setShowAiOnly(!!checked)} />
            <label htmlFor="ai-only" className="text-sm font-semibold flex items-center gap-2 cursor-pointer text-purple-700">
            <Sparkles className="w-4 h-4" /> AI Recommended Only
            </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Explore Properties</h1>
            <p className="text-muted-foreground text-lg">9 results matching your lifestyle preferences</p>
        </div>

        {/* Search Bar */}
        <Card className="p-4 mb-8 shadow-md border-none bg-white/60 backdrop-blur-md">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
              <Input 
                placeholder="Search by city, area or landmark..." 
                className="pl-10 h-12 bg-white/80 border-none shadow-sm" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
            </div>
            <Button className="h-12 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg transition-all">
              <Search className="w-5 h-5 mr-2" /> Search
            </Button>
          </div>
        </Card>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden md:block w-72">
            <Card className="p-6 sticky top-24 shadow-sm border-none bg-white/80">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" /> Filters
                </h3>
                <FilterSection />
            </Card>
          </aside>

          {/* Property Grid Content */}
          <main className="flex-1">
            {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProperties.map((prop, index) => (
                    <motion.div
                        key={prop.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <PropertyCard {...prop} onClick={() => navigate(`/property/${prop.id}`)} />
                    </motion.div>
                ))}
                </div>
            ) : (
                <Card className="p-12 text-center bg-white/40">
                    <div className="mb-4 flex justify-center text-gray-300">
                        <Search className="w-16 h-16" />
                    </div>
                    <h3 className="text-xl font-bold">No properties found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
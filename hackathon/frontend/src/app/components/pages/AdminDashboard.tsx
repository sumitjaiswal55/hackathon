import { motion } from "motion/react";
import { Home, Users, FileText, TrendingUp, DollarSign, Shield, Activity } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { StatCard } from "@/app/components/StatCard";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const monthlyData = [
    { month: "Jan", tenants: 120, properties: 85, revenue: 450000 },
    { month: "Feb", tenants: 145, properties: 92, revenue: 520000 },
    { month: "Mar", tenants: 168, properties: 98, revenue: 590000 },
    { month: "Apr", tenants: 192, properties: 105, revenue: 640000 },
    { month: "May", tenants: 215, properties: 112, revenue: 720000 },
    { month: "Jun", tenants: 238, properties: 118, revenue: 780000 },
  ];

  const propertyTypeData = [
    { name: "Apartment", value: 45, color: "#90CAF9" },
    { name: "Studio", value: 25, color: "#CE93D8" },
    { name: "PG", value: 20, color: "#81C784" },
    { name: "Villa", value: 10, color: "#FFB74D" },
  ];

  const recentTenants = [
    {
      id: "1",
      name: "Arjun Sharma",
      email: "arjun@example.com",
      property: "Modern 2BHK Near IIT",
      joinDate: "Feb 1, 2026",
      status: "active",
    },
    {
      id: "2",
      name: "Priya Verma",
      email: "priya@example.com",
      property: "Studio in Koramangala",
      joinDate: "Feb 3, 2026",
      status: "active",
    },
    {
      id: "3",
      name: "Rahul Kumar",
      email: "rahul@example.com",
      property: "3BHK in Powai",
      joinDate: "Feb 5, 2026",
      status: "pending",
    },
  ];

  const recentProperties = [
    {
      id: "1",
      title: "Luxury 2BHK Apartment",
      owner: "Raj Sharma",
      location: "Hauz Khas, Delhi",
      price: 25000,
      status: "approved",
    },
    {
      id: "2",
      title: "Budget-Friendly Studio",
      owner: "Meera Patel",
      location: "Malviya Nagar, Delhi",
      price: 12000,
      status: "pending",
    },
    {
      id: "3",
      title: "Premium 3BHK Penthouse",
      owner: "Amit Singh",
      location: "Bandra, Mumbai",
      price: 45000,
      status: "approved",
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Overview of platform performance and metrics</p>
            </div>
            <Button onClick={() => onNavigate("dashboard")}>
              Switch to Tenant View
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total Tenants"
            value="1,248"
            trend="+12.5% from last month"
            bgColor="bg-[--pastel-blue]"
            iconColor="text-[--pastel-blue-dark]"
            delay={0.1}
          />
          <StatCard
            icon={Home}
            label="Active Properties"
            value="856"
            trend="+8.3% from last month"
            bgColor="bg-[--pastel-purple]"
            iconColor="text-[--pastel-purple-dark]"
            delay={0.2}
          />
          <StatCard
            icon={DollarSign}
            label="Revenue (MTD)"
            value="₹78.5L"
            trend="+15.2% from last month"
            bgColor="bg-[--pastel-green]"
            iconColor="text-[--pastel-green-dark]"
            delay={0.3}
          />
          <StatCard
            icon={Activity}
            label="Platform Growth"
            value="23.4%"
            trend="Year over year"
            bgColor="bg-[--pastel-orange]"
            iconColor="text-[--pastel-orange-dark]"
            delay={0.4}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Revenue & Growth Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#CE93D8"
                    strokeWidth={3}
                    name="Revenue (₹)"
                  />
                  <Line
                    type="monotone"
                    dataKey="tenants"
                    stroke="#90CAF9"
                    strokeWidth={3}
                    name="Tenants"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Property Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Property Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={propertyTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {propertyTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Monthly Stats Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Monthly Statistics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="properties" fill="#81C784" name="Properties" />
                <Bar dataKey="tenants" fill="#90CAF9" name="Tenants" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Tenants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Tenants</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTenants.map((tenant) => (
                      <TableRow key={tenant.id}>
                        <TableCell>
                          <div>
                            <p className="font-semibold text-sm">{tenant.name}</p>
                            <p className="text-xs text-gray-600">{tenant.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{tenant.property}</TableCell>
                        <TableCell className="text-sm">{tenant.joinDate}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              tenant.status === "active"
                                ? "bg-[--pastel-green] text-[--pastel-green-dark]"
                                : "bg-[--pastel-orange] text-[--pastel-orange-dark]"
                            }
                          >
                            {tenant.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </motion.div>

          {/* Recent Properties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Properties</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell>
                          <div>
                            <p className="font-semibold text-sm">{property.title}</p>
                            <p className="text-xs text-gray-600">{property.location}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{property.owner}</TableCell>
                        <TableCell className="text-sm font-semibold">
                          ₹{property.price.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              property.status === "approved"
                                ? "bg-[--pastel-green] text-[--pastel-green-dark]"
                                : "bg-[--pastel-yellow] text-orange-700"
                            }
                          >
                            {property.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-8"
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Users className="w-6 h-6" />
                <span>Manage Tenants</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Home className="w-6 h-6" />
                <span>Approve Properties</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <FileText className="w-6 h-6" />
                <span>Review Applications</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Shield className="w-6 h-6" />
                <span>Verify Documents</span>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

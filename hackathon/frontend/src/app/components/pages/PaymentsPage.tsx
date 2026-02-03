import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CreditCard, FileText, Download, Clock, CheckCircle2, ShieldCheck, Wallet, ArrowRight } from "lucide-react";

// UI Components
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";

export function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("payments");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- Real State for Transactions ---
  const [payments, setPayments] = useState([
    { id: "1", date: "Feb 1, 2026", type: "Rent", amount: 18000, status: "paid", method: "UPI" },
    { id: "2", date: "Feb 5, 2026", type: "Maintenance", amount: 1500, status: "paid", method: "Credit Card" },
    { id: "3", date: "Mar 1, 2026", type: "Rent", amount: 18000, status: "pending", method: "-" },
  ]);

  // --- Payment Execution Logic ---
  const handlePayment = () => {
    setIsProcessing(true);
    // Simulating Razorpay / Gateway delay
    setTimeout(() => {
      const newPayment = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        type: "Rent",
        amount: 18000,
        status: "paid",
        method: "UPI (Simulated)"
      };
      
      setPayments([newPayment, ...payments.filter(p => p.id !== "3")]);
      setIsProcessing(false);
      setShowSuccess(true);
      setActiveTab("payments");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header with Trust Badge */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Financial Hub</h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <ShieldCheck className="w-4 h-4 text-green-600" /> Secure encrypted transactions
            </p>
          </motion.div>
          <Badge variant="outline" className="px-4 py-1 text-sm bg-white shadow-sm border-green-200 text-green-700">
            Wallet Balance: ₹0.00
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="p-6 border-none shadow-xl bg-gradient-to-br from-orange-500 to-pink-600 text-white relative overflow-hidden">
            <div className="relative z-10">
              <p className="opacity-80 text-sm font-medium">Next Due Amount</p>
              <h2 className="text-3xl font-bold mt-1">₹18,000</h2>
              <p className="text-xs mt-4 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Due in 26 Days (Mar 1)
              </p>
              <Button variant="secondary" className="w-full mt-6 bg-white text-orange-600 hover:bg-orange-50" onClick={() => setActiveTab("make-payment")}>
                Pay Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10"><Wallet className="w-32 h-32" /></div>
          </Card>

          <Card className="p-6 shadow-lg border-none bg-white">
            <p className="text-muted-foreground text-sm font-medium">Total Paid (2026)</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">₹37,500</h2>
            <div className="flex items-center gap-2 mt-4 text-green-600 text-sm">
              <CheckCircle2 className="w-4 h-4" /> 100% On-time Record
            </div>
          </Card>

          <Card className="p-6 shadow-lg border-none bg-white">
            <p className="text-muted-foreground text-sm font-medium">Security Deposit</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">₹36,000</h2>
            <p className="text-xs text-gray-500 mt-4 italic">Held by RentEase Trust Account</p>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card className="shadow-2xl border-none bg-white/80 backdrop-blur-md overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6 pt-6">
              <TabsList className="grid w-full grid-cols-3 h-12 bg-gray-100/50 p-1">
                <TabsTrigger value="payments" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">History</TabsTrigger>
                <TabsTrigger value="agreements" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Documents</TabsTrigger>
                <TabsTrigger value="make-payment" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-purple-600 font-bold">Checkout</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="payments" className="p-6">
              <div className="rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((p) => (
                      <TableRow key={p.id} className="hover:bg-gray-50/50 transition-colors">
                        <TableCell className="font-mono text-xs text-gray-500">#{p.id.toUpperCase()}</TableCell>
                        <TableCell className="font-medium">{p.type} - {p.date}</TableCell>
                        <TableCell className="font-bold">₹{p.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-sm">{p.method}</TableCell>
                        <TableCell>
                          <Badge className={p.status === "paid" ? "bg-green-100 text-green-700 border-none" : "bg-orange-100 text-orange-700 border-none"}>
                            {p.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {p.status === "paid" && <Button size="sm" variant="ghost" className="h-8"><Download className="w-4 h-4" /></Button>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="make-payment" className="p-10">
              <div className="max-w-md mx-auto space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold">Complete Payment</h3>
                  <p className="text-sm text-gray-500">Transaction ID: TXN_992100</p>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-purple-700">Monthly Rent (March)</span>
                      <span className="font-bold">₹18,000</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-purple-600">
                      <span>Convenience Fee</span>
                      <span>₹0.00 (Titan Plan)</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Label className="text-xs uppercase tracking-wider text-gray-500">Select Gateway</Label>
                    <div className="grid grid-cols-1 gap-3">
                      <Button variant="outline" className="h-16 justify-between px-6 border-2 hover:border-purple-500 group">
                        <div className="flex items-center gap-4">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo.png/800px-UPI-Logo.png" className="h-4" alt="UPI" />
                          <div className="text-left"><p className="font-bold">UPI Payment</p><p className="text-xs text-muted-foreground">Instant Settlement</p></div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-purple-600" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600" onClick={handlePayment} disabled={isProcessing}>
                  {isProcessing ? "Connecting to Bank..." : `Pay ₹18,000 Now`}
                </Button>
              </div>
            </TabsContent>

            {/* Agreements Content (Static PDF Cards) */}
            <TabsContent value="agreements" className="p-6">
               <Card className="p-6 border-dashed border-2 bg-gray-50/50 flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-red-500"><FileText /></div>
                    <div><p className="font-bold text-gray-900">Registered Rent Agreement.pdf</p><p className="text-xs text-gray-500">E-Signed on Jan 1, 2026</p></div>
                  </div>
                  <Button variant="outline">Download</Button>
               </Card>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Success Modal */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="sm:max-w-md">
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </motion.div>
              <h2 className="text-2xl font-bold">Payment Successful!</h2>
              <p className="text-gray-500 mt-2">Rent for March 2026 has been settled. Your receipt has been sent to your email.</p>
              <Button className="mt-8 w-full" onClick={() => setShowSuccess(false)}>Back to Dashboard</Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}
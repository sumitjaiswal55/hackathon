import { motion } from "motion/react";
import { CreditCard, FileText, Download, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

interface PaymentsPageProps {
  onNavigate: (page: string) => void;
}

export function PaymentsPage({ onNavigate }: PaymentsPageProps) {
  const payments = [
    {
      id: "1",
      date: "Feb 1, 2026",
      type: "Rent",
      amount: 18000,
      status: "paid",
      method: "UPI",
    },
    {
      id: "2",
      date: "Feb 5, 2026",
      type: "Maintenance",
      amount: 1500,
      status: "paid",
      method: "Credit Card",
    },
    {
      id: "3",
      date: "Mar 1, 2026",
      type: "Rent",
      amount: 18000,
      status: "pending",
      method: "-",
    },
    {
      id: "4",
      date: "Jan 1, 2026",
      type: "Rent",
      amount: 18000,
      status: "paid",
      method: "UPI",
    },
  ];

  const agreements = [
    {
      id: "1",
      property: "Modern 2BHK Near IIT Delhi",
      startDate: "Jan 1, 2026",
      endDate: "Dec 31, 2026",
      rent: 18000,
      deposit: 36000,
      status: "active",
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
          <h1 className="text-3xl font-bold mb-2">Payments & Agreements</h1>
          <p className="text-gray-600">Manage your rent payments and rental agreements</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-[--pastel-green]">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Next Payment Due</p>
                  <p className="text-2xl font-bold">₹18,000</p>
                  <p className="text-xs text-gray-600 mt-1">Due on Mar 1, 2026</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <Button className="w-full mt-4" size="sm">Pay Now</Button>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Paid</p>
                  <p className="text-2xl font-bold">₹37,500</p>
                  <p className="text-xs text-green-600 mt-1">This year</p>
                </div>
                <div className="p-3 bg-[--pastel-blue] rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-[--pastel-blue-dark]" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Security Deposit</p>
                  <p className="text-2xl font-bold">₹36,000</p>
                  <p className="text-xs text-gray-600 mt-1">Refundable</p>
                </div>
                <div className="p-3 bg-[--pastel-purple] rounded-lg">
                  <CreditCard className="w-6 h-6 text-[--pastel-purple-dark]" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <Tabs defaultValue="payments">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="payments">Payment History</TabsTrigger>
                <TabsTrigger value="agreements">Agreements</TabsTrigger>
                <TabsTrigger value="make-payment">Make Payment</TabsTrigger>
              </TabsList>

              <TabsContent value="payments" className="mt-6">
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.type}</TableCell>
                          <TableCell className="font-semibold">₹{payment.amount.toLocaleString()}</TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                payment.status === "paid"
                                  ? "bg-[--pastel-green] text-[--pastel-green-dark]"
                                  : "bg-[--pastel-orange] text-[--pastel-orange-dark]"
                              }
                            >
                              {payment.status === "paid" ? (
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                              ) : (
                                <Clock className="w-3 h-3 mr-1" />
                              )}
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {payment.status === "paid" ? (
                              <Button size="sm" variant="ghost">
                                <Download className="w-4 h-4 mr-1" />
                                Receipt
                              </Button>
                            ) : (
                              <Button size="sm">Pay Now</Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="agreements" className="mt-6 space-y-6">
                {agreements.map((agreement) => (
                  <Card key={agreement.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{agreement.property}</h3>
                        <Badge className="bg-[--pastel-green] text-[--pastel-green-dark]">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {agreement.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>

                    <Separator className="my-4" />

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Contract Period</p>
                          <p className="font-semibold">{agreement.startDate} - {agreement.endDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Monthly Rent</p>
                          <p className="font-semibold">₹{agreement.rent.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Security Deposit</p>
                          <p className="font-semibold">₹{agreement.deposit.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Agreement ID</p>
                          <p className="font-mono text-sm">#AGR-{agreement.id.padStart(6, '0')}</p>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">
                        <FileText className="w-4 h-4 mr-2" />
                        View Terms
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Request Renewal
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="make-payment" className="mt-6">
                <div className="max-w-2xl mx-auto">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="payment-type">Payment Type</Label>
                      <select
                        id="payment-type"
                        className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option>Monthly Rent</option>
                        <option>Maintenance</option>
                        <option>Utilities</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (₹)</Label>
                      <Input id="amount" type="number" placeholder="18000" defaultValue="18000" />
                    </div>

                    <Card className="p-6 bg-[--pastel-blue]">
                      <h3 className="font-semibold mb-4">Payment Method</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start bg-white">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="text-left">
                              <p className="font-semibold">UPI</p>
                              <p className="text-xs text-gray-600">Google Pay, PhonePe, Paytm</p>
                            </div>
                          </div>
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-white">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="text-left">
                              <p className="font-semibold">Credit/Debit Card</p>
                              <p className="text-xs text-gray-600">Visa, Mastercard, Rupay</p>
                            </div>
                          </div>
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-white">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="text-left">
                              <p className="font-semibold">Net Banking</p>
                              <p className="text-xs text-gray-600">All major banks</p>
                            </div>
                          </div>
                        </Button>
                      </div>
                    </Card>

                    <Button className="w-full" size="lg">
                      Proceed to Payment
                    </Button>

                    <p className="text-xs text-center text-gray-600">
                      Your payment is secured with 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, Plus, DollarSign, Receipt, TrendingUp, Calendar, ArrowUpRight, ArrowDownLeft } from "lucide-react";

// UI Components
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Progress } from "@/app/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

export function ExpensesPage() {
  // --- State Management ---
  const [expenses, setExpenses] = useState([
    { id: "1", title: "Electricity Bill", amount: 3200, date: "15 Feb 2026", paidBy: "You", status: "active", category: "Utilities" },
    { id: "2", title: "Internet & Fiber", amount: 1800, date: "10 Feb 2026", paidBy: "Priya", status: "active", category: "Utilities" },
    { id: "3", title: "Monthly Groceries", amount: 2500, date: "12 Feb 2026", paidBy: "You", status: "active", category: "Food" },
  ]);

  const [roommates, setRoommates] = useState([
    { id: "1", name: "You", avatar: "Y", paid: 5700, owed: 0, color: "bg-purple-100 text-purple-700" },
    { id: "2", name: "Priya", avatar: "P", paid: 1800, owed: 1200, color: "bg-blue-100 text-blue-700" },
    { id: "3", name: "Rahul", avatar: "R", paid: 0, owed: 2500, color: "bg-pink-100 text-pink-700" },
  ]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Utilities");
  const [isOpen, setIsOpen] = useState(false);

  // --- Dynamic Calculations ---
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const yourShare = Math.round(totalExpenses / 3);
  const totalYouAreOwed = roommates.reduce((sum, r) => sum + (r.name !== "You" ? r.owed : 0), 0);

  const handleAddExpense = () => {
    if (!title || !amount) return;

    const newExpense = {
      id: Math.random().toString(),
      title,
      amount: Number(amount),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      paidBy: "You",
      status: "active",
      category,
    };

    setExpenses([newExpense, ...expenses]);

    const perPerson = Math.round(Number(amount) / 3);
    setRoommates(prev => prev.map(r => 
      r.name !== "You" ? { ...r, owed: r.owed + perPerson } : { ...r, paid: r.paid + Number(amount) }
    ));

    setTitle(""); setAmount(""); setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      {/* Header Section */}
      <div className="bg-white border-b px-4 py-8 mb-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Expense Center</h1>
              <p className="text-slate-500 mt-1">Keep track of shared bills and roommate settlements</p>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200 py-6 px-6 rounded-xl transition-all active:scale-95">
                  <Plus className="w-5 h-5 mr-2" />
                  New Expense
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Add Expense</DialogTitle>
                </DialogHeader>
                <div className="space-y-5 mt-4">
                  <div className="space-y-2">
                    <Label className="text-slate-600">Title</Label>
                    <Input className="rounded-xl border-slate-200 h-12" placeholder="Electricity, Netflix, etc." value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600">Amount (₹)</Label>
                    <Input className="rounded-xl border-slate-200 h-12" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600">Category</Label>
                    <select className="w-full h-12 px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option>Utilities</option><option>Food</option><option>Rent</option><option>Other</option>
                    </select>
                  </div>
                  <Button className="w-full h-12 bg-purple-600 rounded-xl font-bold text-lg mt-2" onClick={handleAddExpense}>Add to Ledger</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="p-6 border-none shadow-sm bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Pool</p>
                <h2 className="text-3xl font-bold mt-1">₹{totalExpenses.toLocaleString()}</h2>
              </div>
              <div className="p-3 bg-white/10 rounded-2xl"><Receipt className="w-6 h-6" /></div>
            </div>
            <div className="mt-6 flex items-center text-slate-400 text-xs">
              <Calendar className="w-3 h-3 mr-1" /> Cycle: Feb 2026
            </div>
          </Card>

          <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm font-medium">Your Share</p>
                <h2 className="text-3xl font-bold mt-1 text-slate-900">₹{yourShare.toLocaleString()}</h2>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><ArrowDownLeft className="w-6 h-6" /></div>
            </div>
            <p className="mt-4 text-xs text-blue-600 font-semibold bg-blue-50 w-fit px-2 py-1 rounded-full">Automatically Calculated</p>
          </Card>

          <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm font-medium">You're Owed</p>
                <h2 className="text-3xl font-bold mt-1 text-emerald-600">₹{totalYouAreOwed.toLocaleString()}</h2>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600"><ArrowUpRight className="w-6 h-6" /></div>
            </div>
            <p className="mt-4 text-xs text-emerald-600 font-semibold bg-emerald-50 w-fit px-2 py-1 rounded-full">Pending Settlement</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              Transaction History
            </h3>
            <div className="grid gap-4">
              <AnimatePresence>
                {expenses.map((expense) => (
                  <motion.div key={expense.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} layout>
                    <Card className="p-5 border-none shadow-sm bg-white hover:shadow-md transition-all group rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-4 rounded-2xl transition-colors ${expense.category === 'Food' ? 'bg-orange-50 text-orange-500' : 'bg-purple-50 text-purple-500'}`}>
                            <Receipt className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors">{expense.title}</h4>
                            <p className="text-xs text-slate-400 mt-0.5">{expense.date} • Paid by {expense.paidBy}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-900">₹{expense.amount}</p>
                          <Badge variant="secondary" className="bg-slate-100 text-slate-500 text-[10px] uppercase font-bold border-none mt-1">
                            {expense.category}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              The Squad
            </h3>
            <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
              {roommates.map((r) => (
                <div key={r.id} className="mb-8 last:mb-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarFallback className={r.color}>{r.avatar}</AvatarFallback>
                      </Avatar>
                      <span className="font-bold text-slate-700">{r.name}</span>
                    </div>
                    <span className={`text-sm font-bold ${r.owed > 0 ? "text-orange-500" : "text-emerald-500"}`}>
                      {r.owed > 0 ? `₹${r.owed} due` : "Settled"}
                    </span>
                  </div>
                  <Progress value={r.owed === 0 ? 100 : 40} className="h-2 bg-slate-100 rounded-full" 
                    style={{'--progress-background': r.owed === 0 ? '#10B981' : '#F97316'} as any} 
                  />
                </div>
              ))}
              <Button variant="outline" className="w-full mt-6 border-slate-200 rounded-xl text-slate-600 font-semibold py-6">
                Send Reminders
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
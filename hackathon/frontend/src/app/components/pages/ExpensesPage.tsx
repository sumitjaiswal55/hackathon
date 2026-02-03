import { useState } from "motion/react";
import { motion } from "motion/react";
import { Users, Plus, DollarSign, Receipt, TrendingUp, X } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import { Progress } from "@/app/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

interface ExpensesPageProps {
  onNavigate: (page: string) => void;
}

export function ExpensesPage({ onNavigate }: ExpensesPageProps) {
  const roommates = [
    { id: "1", name: "You", avatar: "Y", paid: 4500, owed: 0, status: "paid" },
    { id: "2", name: "Priya", avatar: "P", paid: 3000, owed: 1500, status: "partial" },
    { id: "3", name: "Rahul", avatar: "R", paid: 0, owed: 4500, status: "pending" },
  ];

  const expenses = [
    {
      id: "1",
      title: "Electricity Bill",
      amount: 3200,
      date: "Feb 15, 2026",
      paidBy: "You",
      split: 3,
      status: "active",
      category: "Utilities",
    },
    {
      id: "2",
      title: "Internet & Cable",
      amount: 1800,
      date: "Feb 10, 2026",
      paidBy: "Priya",
      split: 3,
      status: "active",
      category: "Utilities",
    },
    {
      id: "3",
      title: "Groceries",
      amount: 2500,
      date: "Feb 12, 2026",
      paidBy: "You",
      split: 3,
      status: "active",
      category: "Food",
    },
    {
      id: "4",
      title: "House Cleaning",
      amount: 1500,
      date: "Feb 8, 2026",
      paidBy: "Rahul",
      split: 3,
      status: "settled",
      category: "Maintenance",
    },
  ];

  const totalExpenses = expenses
    .filter(e => e.status === "active")
    .reduce((sum, e) => sum + e.amount, 0);

  const yourShare = Math.round(totalExpenses / 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold mb-2">Expenses & Bill Split</h1>
              <p className="text-gray-600">Manage shared expenses with your roommates</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Expense</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="expense-title">Expense Title</Label>
                    <Input id="expense-title" placeholder="e.g., Electricity Bill" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expense-amount">Amount (₹)</Label>
                    <Input id="expense-amount" type="number" placeholder="1500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expense-category">Category</Label>
                    <select
                      id="expense-category"
                      className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option>Utilities</option>
                      <option>Food</option>
                      <option>Maintenance</option>
                      <option>Entertainment</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Split Between</Label>
                    <div className="space-y-2">
                      {roommates.map((roommate) => (
                        <div key={roommate.id} className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked id={`split-${roommate.id}`} />
                          <label htmlFor={`split-${roommate.id}`} className="flex items-center gap-2 cursor-pointer">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">{roommate.avatar}</AvatarFallback>
                            </Avatar>
                            {roommate.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full">Add Expense</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
                  <p className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</p>
                  <p className="text-xs text-gray-600 mt-1">This month</p>
                </div>
                <div className="p-3 bg-[--pastel-blue] rounded-lg">
                  <Receipt className="w-6 h-6 text-[--pastel-blue-dark]" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Your Share</p>
                  <p className="text-2xl font-bold">₹{yourShare.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">Fully paid</p>
                </div>
                <div className="p-3 bg-[--pastel-green] rounded-lg">
                  <DollarSign className="w-6 h-6 text-[--pastel-green-dark]" />
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
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">You're Owed</p>
                  <p className="text-2xl font-bold text-green-600">₹3,000</p>
                  <p className="text-xs text-gray-600 mt-1">From 2 people</p>
                </div>
                <div className="p-3 bg-[--pastel-purple] rounded-lg">
                  <TrendingUp className="w-6 h-6 text-[--pastel-purple-dark]" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Roommates</p>
                  <p className="text-2xl font-bold">{roommates.length}</p>
                  <p className="text-xs text-gray-600 mt-1">Active members</p>
                </div>
                <div className="p-3 bg-[--pastel-orange] rounded-lg">
                  <Users className="w-6 h-6 text-[--pastel-orange-dark]" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Expenses List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Recent Expenses</h2>
                <div className="space-y-4">
                  {expenses.map((expense, index) => (
                    <motion.div
                      key={expense.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 bg-[--pastel-blue] rounded-lg">
                                <Receipt className="w-4 h-4 text-[--pastel-blue-dark]" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{expense.title}</h3>
                                <p className="text-xs text-gray-600">{expense.date} • Paid by {expense.paidBy}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-11">
                              <Badge variant="secondary" className="text-xs">
                                {expense.category}
                              </Badge>
                              <Badge
                                className={
                                  expense.status === "settled"
                                    ? "bg-[--pastel-green] text-[--pastel-green-dark]"
                                    : "bg-[--pastel-orange] text-[--pastel-orange-dark]"
                                }
                              >
                                {expense.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold">₹{expense.amount.toLocaleString()}</p>
                            <p className="text-xs text-gray-600">
                              ₹{Math.round(expense.amount / expense.split)} per person
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Roommates & Settlement */}
          <div className="space-y-6">
            {/* Roommates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">Roommates</h3>
                  <Button size="sm" variant="ghost">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {roommates.map((roommate) => (
                    <div key={roommate.id}>
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar>
                          <AvatarFallback>{roommate.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{roommate.name}</p>
                          {roommate.owed > 0 ? (
                            <p className="text-xs text-orange-600">Owes you ₹{roommate.owed}</p>
                          ) : (
                            <p className="text-xs text-green-600">All settled</p>
                          )}
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            roommate.status === "paid"
                              ? "bg-[--pastel-green] text-[--pastel-green-dark]"
                              : roommate.status === "partial"
                              ? "bg-[--pastel-yellow] text-orange-700"
                              : "bg-[--pastel-orange] text-[--pastel-orange-dark]"
                          }
                        >
                          {roommate.status}
                        </Badge>
                      </div>
                      {roommate.owed > 0 && (
                        <div className="ml-11">
                          <Progress value={(roommate.paid / (roommate.paid + roommate.owed)) * 100} className="h-2" />
                          <p className="text-xs text-gray-600 mt-1">
                            Paid ₹{roommate.paid} of ₹{roommate.paid + roommate.owed}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Settlement Reminder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="p-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Settlement Reminder
                </h3>
                <p className="text-sm text-white/90 mb-4">
                  Send payment reminders to roommates who haven't settled their share
                </p>
                <Button variant="secondary" className="w-full">
                  Send Reminder
                </Button>
              </Card>
            </motion.div>

            {/* Expense Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Expense Breakdown</h3>
                <div className="space-y-3">
                  {[
                    { category: "Utilities", amount: 5000, color: "bg-blue-500" },
                    { category: "Food", amount: 2500, color: "bg-green-500" },
                    { category: "Maintenance", amount: 1500, color: "bg-purple-500" },
                  ].map((item) => (
                    <div key={item.category}>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{item.category}</span>
                        <span className="font-semibold">₹{item.amount.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color}`}
                          style={{ width: `${(item.amount / totalExpenses) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { motion } from "motion/react";
import { Card } from "@/app/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  bgColor?: string;
  iconColor?: string;
  delay?: number;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  bgColor = "bg-[--pastel-blue]",
  iconColor = "text-[--pastel-blue-dark]",
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.03 }}
    >
      <Card className="p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-semibold">{value}</p>
            {trend && (
              <p className="text-xs text-green-600">{trend}</p>
            )}
          </div>
          <div className={`p-3 rounded-xl ${bgColor}`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

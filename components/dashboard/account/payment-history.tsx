"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const payments = [
  { id: 1, date: "2024-03-20", amount: 20000, status: "Completed" },
  { id: 2, date: "2024-02-20", amount: 20000, status: "Completed" },
  { id: 3, date: "2024-01-20", amount: 20000, status: "Completed" },
];

export function PaymentHistory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-white">Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 transition-all duration-300 hover:bg-blue-500/10 hover:backdrop-blur-sm">
                <TableHead className="text-gray-200">Date</TableHead>
                <TableHead className="text-gray-200">Amount</TableHead>
                <TableHead className="text-gray-200">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <motion.tr
                  key={payment.id}
                  className="border-white/10 transition-all duration-300 hover:bg-blue-500/10 hover:backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <TableCell className="text-gray-300">{payment.date}</TableCell>
                  <TableCell className="text-gray-300">₹{payment.amount.toLocaleString('en-IN')}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className="bg-emerald-500/80 hover:bg-emerald-500/90 text-white border-emerald-400 backdrop-blur-sm"
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", requests: 1200 },
  { day: "Tue", requests: 1400 },
  { day: "Wed", requests: 1600 },
  { day: "Thu", requests: 1400 },
  { day: "Fri", requests: 1500 },
  { day: "Sat", requests: 1000 },
  { day: "Sun", requests: 800 },
];

export function UsageStatistics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="requests" fill="hsl(var(--chart-3))" name="API Requests" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
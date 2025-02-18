"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", accuracy: 85, latency: 120 },
  { name: "Feb", accuracy: 88, latency: 115 },
  { name: "Mar", accuracy: 92, latency: 110 },
  { name: "Apr", accuracy: 90, latency: 108 },
];

export function PerformanceMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--chart-1))" name="Accuracy %" />
              <Line type="monotone" dataKey="latency" stroke="hsl(var(--chart-2))" name="Latency (ms)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
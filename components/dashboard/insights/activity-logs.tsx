"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const logs = [
  { id: 1, timestamp: "2024-03-20 15:30:00", event: "Model Training", status: "success" },
  { id: 2, timestamp: "2024-03-20 15:15:00", event: "Data Preprocessing", status: "success" },
  { id: 3, timestamp: "2024-03-20 15:00:00", event: "API Request", status: "error" },
];

export function ActivityLogs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>{log.event}</TableCell>
                <TableCell>
                  <Badge variant={log.status === "success" ? "default" : "destructive"}>
                    {log.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
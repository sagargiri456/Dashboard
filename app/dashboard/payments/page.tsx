"use client"
import { useState } from "react"
import { Search, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const payments = [
    { id: 1, type: "Deposit", date: "June 14, 14:24", amount: "$250.00", status: "Completed" },
    { id: 2, type: "Withdrawal", date: "May 21, 13:15", amount: "$500.00", status: "Completed" },
    { id: 3, type: "Deposit", date: "May 20, 07:18", amount: "$325.00", status: "Failed" },
  ]

  const filteredPayments = payments.filter(payment =>
    payment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Payments</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-sm">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Reports
          </Button>
        </div>
      </div>
      <div className="rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.type}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      payment.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {payment.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
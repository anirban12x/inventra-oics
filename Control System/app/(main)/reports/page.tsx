"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { FileText, Download } from "lucide-react"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

export default function ReportsPage() {
  const [reportConfig, setReportConfig] = useState({
    reportType: "Inventory Status",
    startDate: "2025-09-01",
    endDate: "2025-10-31",
    format: "Excel",
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reportData, setReportData] = useState<any[]>([])
  const [reportStats, setReportStats] = useState<any>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setReportConfig((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // Fetch report data from API
  const fetchReportData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportType: reportConfig.reportType,
          startDate: reportConfig.startDate,
          endDate: reportConfig.endDate,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch report data")
      }

      const data = await response.json()
      setReportData(data)

      // Calculate statistics based on report type
      calculateStats(data, reportConfig.reportType)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (data: any[], reportType: string) => {
    switch (reportType) {
      case "Inventory Status":
        const totalProducts = data.length
        const lowStock = data.filter(p => p.quantity <= p.lowStockThreshold).length
        const outOfStock = data.filter(p => p.quantity === 0).length
        const totalValue = data.reduce((sum, p) => sum + (p.price * p.quantity), 0)
        setReportStats({ totalProducts, lowStock, outOfStock, totalValue })
        break
      case "Category Breakdown":
        const categories = data.length
        const totalItems = data.reduce((sum, c) => sum + c.count, 0)
        setReportStats({ categories, totalItems })
        break
      default:
        setReportStats(null)
    }
  }

  const downloadReport = () => {
    if (reportData.length === 0) {
      alert("No data to export. Please generate a report first.")
      return
    }

    const filename = `${reportConfig.reportType.replace(/\s+/g, '_')}_${reportConfig.startDate}_to_${reportConfig.endDate}`

    if (reportConfig.format === "CSV") {
      downloadCSV(reportData, filename)
    } else if (reportConfig.format === "Excel") {
      downloadExcel(reportData, filename)
    } else {
      // For PDF, we'll use CSV for now as PDF generation requires more complex setup
      downloadCSV(reportData, filename)
    }
  }

  const downloadCSV = (data: any[], filename: string) => {
    const csv = convertToCSV(data)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, `${filename}.csv`)
  }

  const downloadExcel = (data: any[], filename: string) => {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Report")

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    saveAs(blob, `${filename}.xlsx`)
  }

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return ""

    const headers = Object.keys(data[0]).join(",")
    const rows = data.map(row =>
      Object.values(row).map(value =>
        typeof value === "string" && value.includes(",")
          ? `"${value}"`
          : value
      ).join(",")
    )

    return [headers, ...rows].join("\n")
  }

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetchReportData()
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  // Auto-fetch data when report type or date range changes
  useEffect(() => {
    fetchReportData()
  }, [reportConfig.reportType, reportConfig.startDate, reportConfig.endDate])

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Stocks Reports</h1>
        <p className="text-muted-foreground">Generate and export   inventory reports</p>
      </div>

      {/* Report Generator */}
      <div className="glass p-6 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 text-white">
            <FileText size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold">Generate Report</h2>
            <p className="text-sm text-muted-foreground">Create customized reports for your inventory data</p>
          </div>
        </div>

        <form onSubmit={handleGenerateReport} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Report Type</label>
              <select
                name="reportType"
                value={reportConfig.reportType}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Inventory Status</option>
                <option>Transaction Log</option>
                <option>Low Stock Alerts</option>
                <option>Category Breakdown</option>
                <option>Monthly Summary</option>
              </select>
            </div>

            {/* Format */}
            <div>
              <label className="block text-sm font-medium mb-1">Export Format</label>
              <select
                name="format"
                value={reportConfig.format}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={reportConfig.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={reportConfig.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Generate Report
          </button>
        </form>

        {/* Success Message */}
        {showSuccess && (
          <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm animate-fade-in">
            <p className="font-medium">Report Generated Successfully!</p>
            <p>Ready to export {reportData.length} records as {reportConfig.format}</p>
            <button
              onClick={downloadReport}
              className="mt-2 px-3 py-1 rounded bg-green-600 text-white text-xs hover:bg-green-700 transition-colors"
            >
              Download Now
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <p className="font-medium">Error generating report:</p>
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Live Data Preview */}
      <div className="glass p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Live Data Preview</h2>
          <div className="flex gap-2">
            <button
              onClick={fetchReportData}
              disabled={loading}
              className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
            {reportData.length > 0 && (
              <button
                onClick={downloadReport}
                className="px-3 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-700 transition-colors flex items-center gap-1"
              >
                <Download size={14} />
                Export
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 rounded-full border-4 border-border border-t-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Generating report...</p>
          </div>
        ) : reportStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {reportConfig.reportType === "Inventory Status" && (
              <>
                <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-2xl font-bold text-blue-600">{reportStats.totalProducts}</p>
                  <p className="text-sm text-blue-500">Total Products</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p className="text-2xl font-bold text-yellow-600">{reportStats.lowStock}</p>
                  <p className="text-sm text-yellow-500">Low Stock</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-2xl font-bold text-red-600">{reportStats.outOfStock}</p>
                  <p className="text-sm text-red-500">Out of Stock</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-2xl font-bold text-green-600">₹{reportStats.totalValue?.toLocaleString()}</p>
                  <p className="text-sm text-green-500">Total Value</p>
                </div>
              </>
            )}
            {reportConfig.reportType === "Category Breakdown" && (
              <>
                <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-2xl font-bold text-blue-600">{reportStats.categories}</p>
                  <p className="text-sm text-blue-500">Categories</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-2xl font-bold text-green-600">{reportStats.totalItems}</p>
                  <p className="text-sm text-green-500">Total Items</p>
                </div>
              </>
            )}
          </div>
        )}

        {reportData.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {Object.keys(reportData[0]).slice(0, 6).map((key) => (
                    <th key={key} className="text-left p-2 font-medium">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportData.slice(0, 10).map((row, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-white/30">
                    {Object.values(row).slice(0, 6).map((value: any, i) => (
                      <td key={i} className="p-2">
                        {typeof value === 'object' && value !== null
                          ? JSON.stringify(value).slice(0, 50) + '...'
                          : String(value).slice(0, 50)
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {reportData.length > 10 && (
              <p className="text-center text-muted-foreground mt-2 text-sm">
                Showing 10 of {reportData.length} records. Export to view all data.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Inventory Status", desc: "Current stock levels across all categories" },
          { title: "Transaction Log", desc: "Complete history of stock movements" },
          { title: "Low Stock Alerts", desc: "Products below threshold quantities" },
        ].map((template, i) => (
          <div
            key={i}
            className="glass p-6 space-y-4 cursor-pointer hover:shadow-lg hover:shadow-purple-500/20 transition-all hover:scale-105"
            onClick={() => setReportConfig((prev) => ({ ...prev, reportType: template.title }))}
          >
            <div className="p-3 w-fit rounded-lg bg-linear-to-r from-blue-500/20 to-purple-500/20">
              <FileText className="text-primary" />
            </div>
            <h3 className="font-bold">{template.title}</h3>
            <p className="text-sm text-muted-foreground">{template.desc}</p>
            <button className="text-sm text-primary hover:underline font-medium">Use Template →</button>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="glass p-6 space-y-4">
        <h2 className="text-lg font-bold mb-4">Recent Reports</h2>
        <div className="space-y-2">
          {[
            { name: "January 2025 Inventory Status", date: "2025-01-06", format: "PDF" },
            { name: "December 2024 Transaction Log", date: "2024-12-31", format: "Excel" },
            { name: "Low Stock Alerts - Q4 2024", date: "2024-12-15", format: "CSV" },
          ].map((report, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-white/30 transition-all border border-white/10"
            >
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-primary" />
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {report.date} • {report.format}
                  </p>
                </div>
              </div>
              <button className="px-3 py-1 rounded-lg hover:bg-white/30 transition-all text-sm">
                <Download size={16} className="text-primary" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { useEffect, useState } from "react"
import { getSourceData } from "../data/sourceData"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function Report() {
  const [data, setData] = useState<any[]>([])
  const [timeRange, setTimeRange] = useState("24h")

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getSourceData()
      setData(fetchedData)
    }
    fetchData()
  }, [])

  // Get current values
  const currentValues = {
    humidity: data[data.length - 1]?.humidity || 0,
    temperature: data[data.length - 1]?.temperature || 0,
    moisture: data[data.length - 1]?.moisture || 0,
  }

  // Extract data for combined chart
  const labels = data.map((item) => item.timestamp)
  const chartData = {
    labels,
    datasets: [
      {
        label: "Humidity",
        data: data.map((item) => item.humidity),
        borderColor: "#818cf8",
        yAxisID: "y",
        tension: 0.4,
      },
      {
        label: "Temperature",
        data: data.map((item) => item.temperature),
        borderColor: "#4ade80",
        yAxisID: "y1",
        tension: 0.4,
      },
      {
        label: "Soil Moisture",
        data: data.map((item) => item.moisture),
        borderColor: "#fbbf24",
        yAxisID: "y",
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Percentage (%)",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Environmental Data Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Humidity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentValues.humidity}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentValues.temperature}°C</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Soil Moisture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentValues.moisture}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Environmental Data Over Time</CardTitle>
            <p className="text-sm text-muted-foreground">Combined view of humidity, temperature, and soil moisture</p>
          </div>
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Past 24 Hours</SelectItem>
              <SelectItem value="7d">Past 7 Days</SelectItem>
              <SelectItem value="30d">Past 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="h-[400px]">
          <Line options={chartOptions} data={chartData} />
        </CardContent>
      </Card>
    </div>
  )
}


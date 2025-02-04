import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function Dashboard() {
  const navigate = useNavigate()
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getSourceData()
      setData(fetchedData)
    }
    fetchData()
  }, [])

  // Get current values (last readings)
  const currentValues = {
    humidity: data[data.length - 1]?.humidity || 0,
    temperature: data[data.length - 1]?.temperature || 0,
    moisture: data[data.length - 1]?.moisture || 0,
  }

  // Extract timestamps and data points
  const labels = data.map((item) => item.timestamp)
  const datasets = {
    humidity: data.map((item) => item.humidity),
    temperature: data.map((item) => item.temperature),
    moisture: data.map((item) => item.moisture),
  }

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">IoT Environmental Dashboard</h1>
        <Button variant="default" onClick={() => navigate("/report")}>
          View Detailed Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Humidity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentValues.humidity}%</div>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentValues.temperature}°C</div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Soil Moisture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentValues.moisture}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Humidity</CardTitle>
            <p className="text-sm text-muted-foreground">24-hour humidity levels</p>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Line
              data={{
                labels,
                datasets: [
                  {
                    data: datasets.humidity,
                    borderColor: "#818cf8",
                    backgroundColor: "#818cf8",
                    tension: 0.4,
                  },
                ],
              }}
              options={chartOptions}
              id="humidity-chart"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Temperature</CardTitle>
            <p className="text-sm text-muted-foreground">24-hour temperature readings</p>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Line
              data={{
                labels,
                datasets: [
                  {
                    data: datasets.temperature,
                    borderColor: "#4ade80",
                    backgroundColor: "#4ade80",
                    tension: 0.4,
                  },
                ],
              }}
              options={chartOptions}
              id="temperature-chart"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Soil Moisture</CardTitle>
            <p className="text-sm text-muted-foreground">24-hour soil moisture levels</p>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Line
              data={{
                labels,
                datasets: [
                  {
                    data: datasets.moisture,
                    borderColor: "#fbbf24",
                    backgroundColor: "#fbbf24",
                    tension: 0.4,
                  },
                ],
              }}
              options={chartOptions}
              id="moisture-chart"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


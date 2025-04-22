import { Chart, registerables } from "chart.js"
import { Bar, Pie, Radar, Line } from "react-chartjs-2"

Chart.register(...registerables)

export const BarChart = ({ data, options }: { data: any; options: any }) => {
  return <Bar data={data} options={options} />
}

export const PieChart = ({ data, options }: { data: any; options: any }) => {
  return <Pie data={data} options={options} />
}

export const RadarChart = ({ data, options }: { data: any; options: any }) => {
  return <Radar data={data} options={options} />
}

export const LineChart = ({ data, options }: { data: any; options: any }) => {
  return <Line data={data} options={options} />
}

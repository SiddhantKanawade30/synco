"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", performance: 85, tasksCompleted: 12 },
  { date: "2024-04-02", performance: 78, tasksCompleted: 8 },
  { date: "2024-04-03", performance: 92, tasksCompleted: 15 },
  { date: "2024-04-04", performance: 88, tasksCompleted: 11 },
  { date: "2024-04-05", performance: 95, tasksCompleted: 18 },
  { date: "2024-04-06", performance: 82, tasksCompleted: 9 },
  { date: "2024-04-07", performance: 90, tasksCompleted: 14 },
  { date: "2024-04-08", performance: 87, tasksCompleted: 13 },
  { date: "2024-04-09", performance: 91, tasksCompleted: 16 },
  { date: "2024-04-10", performance: 84, tasksCompleted: 10 },
  { date: "2024-04-11", performance: 93, tasksCompleted: 17 },
  { date: "2024-04-12", performance: 89, tasksCompleted: 12 },
  { date: "2024-04-13", performance: 86, tasksCompleted: 11 },
  { date: "2024-04-14", performance: 94, tasksCompleted: 19 },
  { date: "2024-04-15", performance: 88, tasksCompleted: 14 },
  { date: "2024-04-16", performance: 91, tasksCompleted: 15 },
  { date: "2024-04-17", performance: 96, tasksCompleted: 20 },
  { date: "2024-04-18", performance: 83, tasksCompleted: 8 },
  { date: "2024-04-19", performance: 89, tasksCompleted: 13 },
  { date: "2024-04-20", performance: 92, tasksCompleted: 16 },
  { date: "2024-04-21", performance: 85, tasksCompleted: 10 },
  { date: "2024-04-22", performance: 90, tasksCompleted: 14 },
  { date: "2024-04-23", performance: 87, tasksCompleted: 12 },
  { date: "2024-04-24", performance: 93, tasksCompleted: 17 },
  { date: "2024-04-25", performance: 88, tasksCompleted: 13 },
  { date: "2024-04-26", performance: 91, tasksCompleted: 15 },
  { date: "2024-04-27", performance: 95, tasksCompleted: 18 },
  { date: "2024-04-28", performance: 86, tasksCompleted: 11 },
  { date: "2024-04-29", performance: 89, tasksCompleted: 14 },
  { date: "2024-04-30", performance: 92, tasksCompleted: 16 },
  { date: "2024-05-01", performance: 84, tasksCompleted: 9 },
  { date: "2024-05-02", performance: 90, tasksCompleted: 13 },
  { date: "2024-05-03", performance: 87, tasksCompleted: 12 },
  { date: "2024-05-04", performance: 93, tasksCompleted: 17 },
  { date: "2024-05-05", performance: 96, tasksCompleted: 19 },
  { date: "2024-05-06", performance: 98, tasksCompleted: 21 },
  { date: "2024-05-07", performance: 88, tasksCompleted: 14 },
  { date: "2024-05-08", performance: 85, tasksCompleted: 10 },
  { date: "2024-05-09", performance: 91, tasksCompleted: 15 },
  { date: "2024-05-10", performance: 89, tasksCompleted: 13 },
  { date: "2024-05-11", performance: 93, tasksCompleted: 16 },
  { date: "2024-05-12", performance: 87, tasksCompleted: 12 },
  { date: "2024-05-13", performance: 90, tasksCompleted: 14 },
  { date: "2024-05-14", performance: 94, tasksCompleted: 18 },
  { date: "2024-05-15", performance: 97, tasksCompleted: 20 },
  { date: "2024-05-16", performance: 91, tasksCompleted: 15 },
  { date: "2024-05-17", performance: 99, tasksCompleted: 22 },
  { date: "2024-05-18", performance: 85, tasksCompleted: 11 },
  { date: "2024-05-19", performance: 88, tasksCompleted: 13 },
  { date: "2024-05-20", performance: 92, tasksCompleted: 16 },
  { date: "2024-05-21", performance: 83, tasksCompleted: 8 },
  { date: "2024-05-22", performance: 86, tasksCompleted: 10 },
  { date: "2024-05-23", performance: 90, tasksCompleted: 14 },
  { date: "2024-05-24", performance: 89, tasksCompleted: 13 },
  { date: "2024-05-25", performance: 93, tasksCompleted: 17 },
  { date: "2024-05-26", performance: 87, tasksCompleted: 12 },
  { date: "2024-05-27", performance: 95, tasksCompleted: 19 },
  { date: "2024-05-28", performance: 88, tasksCompleted: 14 },
  { date: "2024-05-29", performance: 84, tasksCompleted: 9 },
  { date: "2024-05-30", performance: 91, tasksCompleted: 15 },
  { date: "2024-05-31", performance: 89, tasksCompleted: 13 },
  { date: "2024-06-01", performance: 90, tasksCompleted: 14 },
  { date: "2024-06-02", performance: 96, tasksCompleted: 20 },
  { date: "2024-06-03", performance: 82, tasksCompleted: 8 },
  { date: "2024-06-04", performance: 94, tasksCompleted: 18 },
  { date: "2024-06-05", performance: 85, tasksCompleted: 10 },
  { date: "2024-06-06", performance: 89, tasksCompleted: 13 },
  { date: "2024-06-07", performance: 92, tasksCompleted: 16 },
  { date: "2024-06-08", performance: 88, tasksCompleted: 14 },
  { date: "2024-06-09", performance: 93, tasksCompleted: 17 },
  { date: "2024-06-10", performance: 86, tasksCompleted: 11 },
  { date: "2024-06-11", performance: 83, tasksCompleted: 9 },
  { date: "2024-06-12", performance: 97, tasksCompleted: 21 },
  { date: "2024-06-13", performance: 84, tasksCompleted: 10 },
  { date: "2024-06-14", performance: 91, tasksCompleted: 15 },
  { date: "2024-06-15", performance: 89, tasksCompleted: 13 },
  { date: "2024-06-16", performance: 90, tasksCompleted: 14 },
  { date: "2024-06-17", performance: 95, tasksCompleted: 19 },
  { date: "2024-06-18", performance: 82, tasksCompleted: 8 },
  { date: "2024-06-19", performance: 88, tasksCompleted: 13 },
  { date: "2024-06-20", performance: 93, tasksCompleted: 17 },
  { date: "2024-06-21", performance: 86, tasksCompleted: 11 },
  { date: "2024-06-22", performance: 90, tasksCompleted: 14 },
  { date: "2024-06-23", performance: 96, tasksCompleted: 20 },
  { date: "2024-06-24", performance: 85, tasksCompleted: 10 },
  { date: "2024-06-25", performance: 87, tasksCompleted: 12 },
  { date: "2024-06-26", performance: 92, tasksCompleted: 16 },
  { date: "2024-06-27", performance: 94, tasksCompleted: 18 },
  { date: "2024-06-28", performance: 83, tasksCompleted: 9 },
  { date: "2024-06-29", performance: 86, tasksCompleted: 11 },
  { date: "2024-06-30", performance: 91, tasksCompleted: 15 },
]

const chartConfig = {
  performance: {
    label: "Performance",
    color: "var(--chart-1)",
  },
  tasksCompleted: {
    label: "Tasks Completed",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = React.useMemo(() => {
    return chartData.filter((item) => {
      const date = new Date(item.date)
      const referenceDate = new Date("2024-06-30")
      let daysToSubtract = 90
      if (timeRange === "30d") {
        daysToSubtract = 30
      } else if (timeRange === "7d") {
        daysToSubtract = 7
      }
      const startDate = new Date(referenceDate)
      startDate.setDate(startDate.getDate() - daysToSubtract)
      return date >= startDate
    })
  }, [timeRange])

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>User Performance & Tasks</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Your performance and tasks completed over time
          </span>
          <span className="@[540px]/card:hidden">Performance & Tasks</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillPerformance" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-performance)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-performance)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillTasksCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-tasksCompleted)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-tasksCompleted)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="tasksCompleted"
              type="natural"
              fill="url(#fillTasksCompleted)"
              stroke="var(--color-tasksCompleted)"
              stackId="a"
            />
            <Area
              dataKey="performance"
              type="natural"
              fill="url(#fillPerformance)"
              stroke="var(--color-performance)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

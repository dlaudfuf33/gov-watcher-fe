"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart } from "lucide-react"
import { useEffect, useRef } from "react"

export default function PoliticianActivityTrend() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 캔버스 크기 설정
    const setCanvasSize = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = 300
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // 더미 데이터 - 실제로는 API에서 가져올 수 있음
    const years = ["2020", "2021", "2022", "2023", "2024"]
    const billsData = [5, 12, 8, 15, 5]
    const speechesData = [8, 15, 10, 18, 7]

    // 차트 그리기
    const drawChart = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const width = canvas.width
      const height = canvas.height
      const padding = 40

      // 그리드 그리기
      ctx.strokeStyle = "#e5e7eb"
      ctx.lineWidth = 1

      // 수평선
      for (let i = 0; i <= 5; i++) {
        const y = padding + ((height - padding * 2) / 5) * i
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(width - padding, y)
        ctx.stroke()
      }

      // 수직선
      for (let i = 0; i < years.length; i++) {
        const x = padding + ((width - padding * 2) / (years.length - 1)) * i
        ctx.beginPath()
        ctx.moveTo(x, padding)
        ctx.lineTo(x, height - padding)
        ctx.stroke()
      }

      // 연도 레이블
      ctx.fillStyle = "#6b7280"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"

      for (let i = 0; i < years.length; i++) {
        const x = padding + ((width - padding * 2) / (years.length - 1)) * i
        ctx.fillText(years[i], x, height - padding / 2)
      }

      // 값 레이블
      ctx.textAlign = "right"
      const maxValue = Math.max(...billsData, ...speechesData)
      for (let i = 0; i <= 5; i++) {
        const y = padding + ((height - padding * 2) / 5) * i
        const value = Math.round(maxValue - (maxValue / 5) * i)
        ctx.fillText(value.toString(), padding - 5, y + 3)
      }

      // 법안 발의 데이터 그리기
      ctx.strokeStyle = "#3b82f6" // 파란색
      ctx.lineWidth = 2
      ctx.beginPath()

      for (let i = 0; i < billsData.length; i++) {
        const x = padding + ((width - padding * 2) / (billsData.length - 1)) * i
        const y = padding + (height - padding * 2) * (1 - billsData[i] / maxValue)
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      // 발언 데이터 그리기
      ctx.strokeStyle = "#10b981" // 초록색
      ctx.beginPath()

      for (let i = 0; i < speechesData.length; i++) {
        const x = padding + ((width - padding * 2) / (speechesData.length - 1)) * i
        const y = padding + (height - padding * 2) * (1 - speechesData[i] / maxValue)
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      // 범례
      const legendY = height - 15

      // 법안 발의 범례
      ctx.strokeStyle = "#3b82f6"
      ctx.beginPath()
      ctx.moveTo(width / 2 - 60, legendY)
      ctx.lineTo(width / 2 - 40, legendY)
      ctx.stroke()

      ctx.fillStyle = "#6b7280"
      ctx.textAlign = "left"
      ctx.fillText("법안 발의", width / 2 - 35, legendY + 3)

      // 발언 범례
      ctx.strokeStyle = "#10b981"
      ctx.beginPath()
      ctx.moveTo(width / 2 + 30, legendY)
      ctx.lineTo(width / 2 + 50, legendY)
      ctx.stroke()

      ctx.fillText("국회 발언", width / 2 + 55, legendY + 3)
    }

    drawChart()
    window.addEventListener("resize", drawChart)

    return () => {
      window.removeEventListener("resize", setCanvasSize)
      window.removeEventListener("resize", drawChart)
    }
  }, [])

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <LineChart className="h-5 w-5 mr-2 text-blue-500" />
          활동 기간 기반 분석
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-500 mb-4">연도별 법안 발의 및 국회 발언 추이를 보여줍니다.</div>
        <div className="relative h-[300px] w-full">
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>
      </CardContent>
    </Card>
  )
}

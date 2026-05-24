import type { DishRecord } from '../types'

export function exportRecordsToCSV(records: DishRecord[]): void {
  const headers = ['日期', '餐食类型', '菜品名称', '卡路里', '食材']
  const typeMap: Record<string, string> = {
    breakfast: '早餐',
    lunch: '午餐',
    dinner: '晚餐',
    snack: '加餐',
  }

  const rows = records.map(r => [
    new Date(r.createdAt).toLocaleDateString('zh-CN'),
    typeMap[r.mealType] || r.mealType,
    r.dishName,
    String(r.calories),
    r.ingredients.join('、'),
  ])

  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const BOM = '﻿'
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `饮食记录_${new Date().toLocaleDateString('zh-CN')}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

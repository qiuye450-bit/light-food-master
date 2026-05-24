import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Serve static frontend in production
const distPath = join(__dirname, '..', 'dist')
app.use(express.static(distPath))

// Claude API proxy
app.post('/api/generate-recipe', async (req, res) => {
  const { ingredients, mealType } = req.body

  if (!ingredients?.length) {
    return res.status(400).json({ error: '请提供食材列表' })
  }

  const apiKey = process.env.API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: '服务未配置 API Key' })
  }

  const apiBase = process.env.API_BASE || 'https://api.deepseek.com/anthropic'
  const model = process.env.MODEL || 'deepseek-chat'

  const mealTypeMap = {
    breakfast: '早餐',
    lunch: '午餐',
    dinner: '晚餐',
    snack: '加餐小食',
  }

  const prompt = `你是一位专业的营养师和轻食厨师，请根据以下食材为用户生成一道${mealTypeMap[mealType] || '菜品'}。

用户已有食材：${ingredients.join('、')}

要求：
1. 严格遵循211饮食法：蔬菜占50%、蛋白质占25%、主食占25%
2. 总卡路里控制在150-450之间（早餐150-350，午餐250-450，晚餐150-350，加餐80-180）
3. 做法步骤清晰简短（3-5步），每步一句话
4. 给出准确的卡路里估算和营养比例

请以JSON格式返回（只返回JSON，不要任何其他文字）：
{
  "name": "菜名",
  "calories": 热量数字,
  "ingredients": ["食材1", "食材2", "食材3"],
  "steps": ["步骤1", "步骤2", "步骤3"],
  "nutrition": {
    "vegetables": 蔬菜百分比数字,
    "protein": 蛋白质百分比数字,
    "carbs": 碳水百分比数字
  }
}

注意：vegetables + protein + carbs 必须等于 100。`

  try {
    const response = await fetch(`${apiBase}/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('Claude API error:', response.status, errText)
      return res.status(502).json({ error: 'AI 服务暂时不可用' })
    }

    const data = await response.json()
    const text = data.content[0]?.text || ''

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return res.status(502).json({ error: 'AI 返回格式异常' })
    }

    const recipe = JSON.parse(jsonMatch[0])
    res.json(recipe)
  } catch (err) {
    console.error('Proxy error:', err)
    res.status(502).json({ error: 'AI 服务暂时不可用，请稍后重试' })
  }
})

// SPA fallback — serve index.html for all non-API routes
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`🥗 轻食大师服务运行中 → http://localhost:${PORT}`)
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('⚠️  未设置 API_KEY 环境变量，AI 生成功能不可用')
  }
})

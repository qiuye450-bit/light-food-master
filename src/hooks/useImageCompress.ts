import { useState, useCallback } from 'react'

export function useImageCompress(maxWidth = 600, quality = 0.6) {
  const [compressing, setCompressing] = useState(false)

  const compress = useCallback(
    (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        setCompressing(true)
        const reader = new FileReader()
        reader.onload = (e) => {
          const img = new Image()
          img.onload = () => {
            const canvas = document.createElement('canvas')
            let { width, height } = img

            if (width > maxWidth) {
              height = (height * maxWidth) / width
              width = maxWidth
            }

            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')!
            ctx.drawImage(img, 0, 0, width, height)

            const dataUrl = canvas.toDataURL('image/jpeg', quality)
            setCompressing(false)
            resolve(dataUrl)
          }
          img.onerror = () => {
            setCompressing(false)
            reject(new Error('图片加载失败'))
          }
          img.src = e.target?.result as string
        }
        reader.onerror = () => {
          setCompressing(false)
          reject(new Error('文件读取失败'))
        }
        reader.readAsDataURL(file)
      })
    },
    [maxWidth, quality]
  )

  return { compress, compressing }
}

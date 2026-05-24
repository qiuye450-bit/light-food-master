import { useRef } from 'react'
import { useImageCompress } from '../../hooks/useImageCompress'

interface Props {
  value: string
  onChange: (base64: string) => void
}

export default function ImageUploader({ value, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const { compress, compressing } = useImageCompress(600, 0.6)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const dataUrl = await compress(file)
      onChange(dataUrl)
    } catch (err) {
      console.error('图片处理失败', err)
    }
  }

  const handleCamera = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.capture = 'environment'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      compress(file).then(onChange).catch(console.error)
    }
    input.click()
  }

  return (
    <div>
      {value ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden">
          <img src={value} alt="菜品照片" className="w-full h-full object-cover" />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            disabled={compressing}
            className="flex-1 flex items-center justify-center gap-2 py-4 border-2 border-dashed border-[var(--color-border)] rounded-xl hover:border-primary-300 transition-colors"
          >
            {compressing ? (
              <span className="text-gray-400">压缩中...</span>
            ) : (
              <>
                <span className="text-2xl">📷</span>
                <span className="text-sm text-gray-500">从相册选择</span>
              </>
            )}
          </button>
          <button
            onClick={handleCamera}
            disabled={compressing}
            className="flex-1 flex items-center justify-center gap-2 py-4 border-2 border-dashed border-[var(--color-border)] rounded-xl hover:border-primary-300 transition-colors"
          >
            <span className="text-2xl">🤳</span>
            <span className="text-sm text-gray-500">拍照</span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </div>
      )}
    </div>
  )
}

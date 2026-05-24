import { useState, useCallback } from 'react'
import { getItem, setItem } from '../utils/storage'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => getItem<T>(key, defaultValue))

  const update = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValue(prev => {
        const resolved = typeof newValue === 'function' ? (newValue as (prev: T) => T)(prev) : newValue
        setItem(key, resolved)
        return resolved
      })
    },
    [key]
  )

  return [value, update] as const
}

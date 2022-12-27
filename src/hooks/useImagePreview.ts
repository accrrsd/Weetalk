import { useEffect, useState } from 'react'

export default function useImagePreview(imageFile: File | null) {
  const [previewSrc, setPreviewSrc] = useState('')

  useEffect(() => {
    if (!imageFile) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewSrc(reader.result as string)
    }
    reader.readAsDataURL(imageFile)

    // Отключаем ридер при размонтировании
    return () => {
      reader.abort()
    }
  }, [imageFile])

  return previewSrc
}

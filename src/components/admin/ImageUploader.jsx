import { useState, useRef } from 'react'
import { Upload, X, ImagePlus, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'

// ── Upload a single file to Supabase Storage ─────────────────────
async function uploadImage(file) {
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const filePath = `listings/${fileName}`

  const { error } = await supabase.storage
    .from('property-images')
    .upload(filePath, file, { cacheControl: '3600', upsert: false })

  if (error) throw error

  // Get the public URL
  const { data } = supabase.storage
    .from('property-images')
    .getPublicUrl(filePath)

  return data.publicUrl
}

// ── Delete an image from Supabase Storage ────────────────────────
async function deleteImage(url) {
  // Extract the file path from the full URL
  const path = url.split('/property-images/')[1]
  if (!path) return

  await supabase.storage
    .from('property-images')
    .remove([path])
}

// ── Single image preview card ─────────────────────────────────────
function ImagePreview({ url, onRemove, isMain }) {
  return (
    <div className={`relative group rounded-xl overflow-hidden aspect-video border-2 transition-all ${isMain ? 'border-brand-green' : 'border-transparent'}`}>
      <img src={url} alt="" className="w-full h-full object-cover" />
      {/* Main badge */}
      {isMain && (
        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-brand-green text-white text-[10px] font-semibold">
          Main
        </span>
      )}
      {/* Remove button */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
      >
        <X size={13} />
      </button>
    </div>
  )
}

// ── Main uploader component ───────────────────────────────────────
export default function ImageUploader({ images = [], onChange }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef()

  const handleFiles = async (files) => {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'))
    if (validFiles.length === 0) return

    setUploading(true)
    setError('')

    try {
      const uploadedUrls = await Promise.all(validFiles.map(uploadImage))
      onChange([...images, ...uploadedUrls])
    } catch (err) {
      setError('Upload failed: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async (url, index) => {
    try {
      await deleteImage(url)
    } catch {
      // Silently fail on delete — still remove from UI
    }
    const updated = images.filter((_, i) => i !== index)
    onChange(updated)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
          dragOver
            ? 'border-brand-green bg-brand-green/5'
            : 'border-brand-gray-3 hover:border-brand-green/50 hover:bg-brand-gray'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {uploading ? (
          <>
            <Loader2 size={28} className="text-brand-green animate-spin" />
            <p className="text-sm text-brand-text-3">Uploading…</p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-brand-gray-3 flex items-center justify-center">
              <ImagePlus size={22} className="text-brand-text-3" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-brand-text">
                Drop images here or <span className="text-brand-green">browse</span>
              </p>
              <p className="text-xs text-brand-text-3 mt-1">PNG, JPG, WEBP up to 10MB each</p>
            </div>
          </>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {/* Image previews */}
      {images.length > 0 && (
        <div>
          <p className="text-xs text-brand-text-3 mb-2">
            {images.length} image{images.length > 1 ? 's' : ''} — first image is the main photo
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((url, i) => (
              <ImagePreview
                key={url}
                url={url}
                isMain={i === 0}
                onRemove={() => handleRemove(url, i)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

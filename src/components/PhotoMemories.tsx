import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";

interface PhotoMemory {
  id: string;
  url: string;
  caption: string;
  date: string;
  number: number;
  isDefault?: boolean;
}

interface PhotoMemoriesProps {
  onNext: () => void;
}

// Pre-seeded default photos (shown before user uploads)
const DEFAULT_PHOTOS: PhotoMemory[] = [
  {
    id: "default-1",
    url: "/photos/photo1.jpg",
    caption: "My little Keethi with her family 😍",
    date: "2015",
    number: 1,
    isDefault: true,
  },
  {
    id: "default-2",
    url: "/photos/photo2.jpg",
    caption: "Best friends forever ❤️",
    date: "2019",
    number: 2,
    isDefault: true,
  },
  {
    id: "default-3",
    url: "/photos/photo3.jpg",
    caption: "Looking gorgeous as always 😍",
    date: "2020",
    number: 3,
    isDefault: true,
  },
  {
    id: "default-4",
    url: "/photos/photo4.jpg",
    caption: "My butterfly girl 🦋❤️",
    date: "2023",
    number: 4,
    isDefault: true,
  },
  {
    id: "default-5",
    url: "/photos/photo5.jpg",
    caption: "A day I'll never forget ❤️",
    date: "Dec 11, 2023",
    number: 5,
    isDefault: true,
  },
];

// Stable tilt angles for each photo
const TILTS = [-2, 1.5, -1, 2.5, -1.8, 1, -2.2, 1.8, -0.5, 2];

function EditModal({
  photo,
  onSave,
  onClose,
}: {
  photo: PhotoMemory;
  onSave: (id: string, caption: string, date: string) => void;
  onClose: () => void;
}) {
  const [caption, setCaption] = useState(photo.caption);
  const [date, setDate] = useState(photo.date);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "oklch(0 0 0 / 70%)", backdropFilter: "blur(8px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-strong p-6 w-full max-w-sm"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Preview thumbnail */}
        <div className="w-20 h-20 rounded-xl overflow-hidden mx-auto mb-4 ring-2 ring-primary/40">
          <img
            src={photo.url}
            alt={photo.caption}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="font-display text-sm text-primary neon-text text-center mb-1">
          Photo #{photo.number}
        </p>
        <h3 className="font-display text-lg text-foreground text-center mb-5">
          Edit Details ✏️
        </h3>

        {/* Caption */}
        <label className="block text-muted-foreground text-xs mb-1 uppercase tracking-wider">
          Caption
        </label>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full bg-transparent border-b border-glass-border text-foreground placeholder-muted-foreground font-handwriting text-lg px-2 py-2 mb-4 outline-none focus:border-primary transition-colors"
          placeholder="Write a caption... ❤️"
          autoFocus
        />

        {/* Date */}
        <label className="block text-muted-foreground text-xs mb-1 uppercase tracking-wider">
          Date
        </label>
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-transparent border-b border-glass-border text-foreground placeholder-muted-foreground text-sm px-2 py-2 mb-6 outline-none focus:border-primary transition-colors"
          placeholder="e.g. Jan 15, 2024"
        />

        {/* Actions */}
        <div className="flex gap-3">
          <motion.button
            onClick={() => onSave(photo.id, caption, date)}
            className="flex-1 py-3 rounded-full font-display text-primary-foreground cursor-pointer text-sm"
            style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Save ❤️
          </motion.button>
          <motion.button
            onClick={onClose}
            className="py-3 px-5 rounded-full glass cursor-pointer text-muted-foreground text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PhotoMemories({ onNext }: PhotoMemoriesProps) {
  const [photos, setPhotos] = useState<PhotoMemory[]>(DEFAULT_PHOTOS);
  const [isAdding, setIsAdding] = useState(false);
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<PhotoMemory | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<PhotoMemory | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const pendingFile = useRef<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    pendingFile.current = file;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setIsAdding(true);
  };

  const handleAdd = () => {
    if (!previewUrl) return;
    const newNumber = photos.length + 1;
    setPhotos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        url: previewUrl,
        caption: caption || `A beautiful memory ❤️`,
        date: date || "A special day",
        number: newNumber,
      },
    ]);
    setCaption("");
    setDate("");
    setPreviewUrl(null);
    pendingFile.current = null;
    setIsAdding(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleCancel = () => {
    if (previewUrl && !previewUrl.startsWith("/")) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setCaption("");
    setDate("");
    setIsAdding(false);
    pendingFile.current = null;
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleEdit = useCallback((photo: PhotoMemory) => {
    setEditingPhoto(photo);
  }, []);

  const handleSaveEdit = useCallback(
    (id: string, newCaption: string, newDate: string) => {
      setPhotos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, caption: newCaption, date: newDate } : p
        )
      );
      setEditingPhoto(null);
    },
    []
  );

  const handleDelete = useCallback((id: string) => {
    setPhotos((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      // Re-number
      return filtered.map((p, i) => ({ ...p, number: i + 1 }));
    });
  }, []);

  return (
    <motion.div
      className="romantic-screen py-16"
      style={{ background: "var(--gradient-romantic)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Edit modal */}
      <AnimatePresence>
        {editingPhoto && (
          <EditModal
            photo={editingPhoto}
            onSave={handleSaveEdit}
            onClose={() => setEditingPhoto(null)}
          />
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "oklch(0 0 0 / 85%)", backdropFilter: "blur(10px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ type: "spring" }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-sm w-full"
            >
              <div
                className="p-3 pb-14 relative"
                style={{
                  background: "oklch(0.95 0.01 60)",
                  boxShadow: "0 20px 80px oklch(0 0 0 / 60%)",
                }}
              >
                <img
                  src={lightboxPhoto.url}
                  alt={lightboxPhoto.caption}
                  className="w-full rounded-sm"
                />
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <p
                    className="font-handwriting text-sm"
                    style={{ color: "oklch(0.3 0.05 300)" }}
                  >
                    {lightboxPhoto.caption}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "oklch(0.5 0.03 300)" }}>
                    {lightboxPhoto.date}
                  </p>
                </div>
              </div>
              <p className="text-center text-muted-foreground text-xs mt-4">
                Tap anywhere to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.h2
        className="font-display text-2xl md:text-4xl text-primary neon-text text-center mb-2 z-10 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Photo Memories 📸
      </motion.h2>
      <motion.p
        className="text-muted-foreground text-sm text-center mb-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Every picture tells our story ❤️
      </motion.p>

      {/* Gallery grid */}
      {photos.length > 0 && !isAdding && (
        <div className="z-10 w-full max-w-lg mx-auto px-4 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.08, 0.5) }}
                layout
              >
                {/* Polaroid */}
                <motion.div
                  className="p-2 pb-12 relative cursor-pointer"
                  style={{
                    background: "oklch(0.95 0.01 60)",
                    boxShadow: "0 8px 30px oklch(0 0 0 / 40%)",
                    transform: `rotate(${TILTS[i % TILTS.length]}deg)`,
                  }}
                  whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setLightboxPhoto(photo)}
                >
                  {/* Photo number badge */}
                  <div
                    className="absolute -top-2 -left-2 z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground"
                    style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
                  >
                    {photo.number}
                  </div>

                  <div className="aspect-square overflow-hidden rounded-sm">
                    <motion.img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      onError={(e) => {
                        // If default photo not found, show placeholder
                        (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><rect fill='%231a0a2e' width='200' height='200'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23d946ef' font-size='40'>❤️</text><text x='50%25' y='65%25' dominant-baseline='middle' text-anchor='middle' fill='%23888' font-size='12'>Photo ${photo.number}</text></svg>`;
                      }}
                    />
                  </div>

                  {/* Caption area */}
                  <div className="absolute bottom-2 left-2 right-2 text-center">
                    <p
                      className="font-handwriting text-xs leading-tight truncate"
                      style={{ color: "oklch(0.3 0.05 300)" }}
                    >
                      {photo.caption}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "oklch(0.55 0.03 300)" }}
                    >
                      {photo.date}
                    </p>
                  </div>
                </motion.div>

                {/* Action buttons — appear on hover */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20"
                  initial={{ opacity: 0, y: 4 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  style={{ opacity: 0 }}
                >
                  {/* Edit button */}
                  <motion.button
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs cursor-pointer"
                    style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(photo);
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    title="Edit caption"
                  >
                    ✏️
                  </motion.button>

                  {/* Delete button */}
                  <motion.button
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs cursor-pointer glass"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(photo.id);
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    title="Remove photo"
                  >
                    🗑️
                  </motion.button>
                </motion.div>

                {/* Heart particle */}
                <motion.div
                  className="absolute -top-1 -right-1 text-xs pointer-events-none"
                  animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  ❤️
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Photo count */}
          <motion.p
            className="text-center text-muted-foreground text-xs mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {photos.length} memories ✨ · Hover to edit · Tap to view
          </motion.p>
        </div>
      )}

      {/* Upload section */}
      {!isAdding ? (
        <motion.div
          className="z-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />

          <motion.button
            onClick={() => fileRef.current?.click()}
            className="glass px-8 py-5 cursor-pointer flex flex-col items-center gap-2 mx-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-3xl">📷</span>
            <span className="font-display text-base text-primary">
              Add Photo #{photos.length + 1}
            </span>
            <span className="text-muted-foreground text-xs">
              Upload to your memory gallery
            </span>
          </motion.button>

          <motion.button
            onClick={onNext}
            className="mt-6 px-8 py-3 rounded-full font-display text-primary-foreground cursor-pointer"
            style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Continue ❤️
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="z-10 w-full max-w-sm mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="glass p-6">
            {/* Number badge */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground"
                style={{ background: "var(--gradient-neon)" }}
              >
                {photos.length + 1}
              </div>
              <p className="font-display text-sm text-primary">
                Photo #{photos.length + 1}
              </p>
            </div>

            {/* Preview */}
            {previewUrl && (
              <div className="aspect-square rounded-xl overflow-hidden mb-4 ring-2 ring-primary/30">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Caption */}
            <input
              type="text"
              placeholder="Write a caption... ❤️"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-transparent border-b border-glass-border text-foreground placeholder-muted-foreground font-handwriting text-lg px-2 py-2 mb-3 outline-none focus:border-primary transition-colors"
              autoFocus
            />

            {/* Date */}
            <input
              type="text"
              placeholder="Date (e.g. Jan 15, 2024)"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent border-b border-glass-border text-foreground placeholder-muted-foreground text-sm px-2 py-2 mb-6 outline-none focus:border-primary transition-colors"
            />

            <div className="flex gap-3">
              <motion.button
                onClick={handleAdd}
                className="flex-1 py-3 rounded-full font-display text-primary-foreground cursor-pointer text-sm"
                style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Add Photo ❤️
              </motion.button>
              <motion.button
                onClick={handleCancel}
                className="py-3 px-5 rounded-full glass cursor-pointer text-muted-foreground text-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

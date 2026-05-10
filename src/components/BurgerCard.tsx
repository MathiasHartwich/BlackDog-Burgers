import { useState } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { BurgerItem, BurgerSize } from "@/types"

const SIZES: BurgerSize[] = ["simple", "doble", "triple"]

interface BurgerCardProps {
  burger: BurgerItem
  onAdd: (burger: BurgerItem, size: BurgerSize) => void
  index: number
}

export function BurgerCard({ burger, onAdd, index }: BurgerCardProps) {
  const [selectedSize, setSelectedSize] = useState<BurgerSize>("doble")

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="border border-white/10 overflow-hidden bg-black/40 flex flex-col group"
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={burger.image}
          alt={burger.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <p className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
              Smash Burger
            </p>
            <h3 className="text-2xl font-black text-white tracking-tight leading-none">
              {burger.name}
            </h3>
          </div>
        </div>

        <p className="text-white/55 text-sm mb-5 leading-relaxed">
          {burger.description}
        </p>

        {/* Size selector */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`flex flex-col items-center py-2.5 px-1 border text-center transition-all duration-200 ${
                selectedSize === size
                  ? "bg-white text-black border-white"
                  : "border-white/15 text-white/60 hover:border-white/40 hover:text-white/80"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest mb-0.5">
                {size}
              </span>
              <span className="text-sm font-black">
                ${burger.prices[size]}
              </span>
            </button>
          ))}
        </div>

        <Button
          onClick={() => onAdd(burger, selectedSize)}
          className="w-full bg-white text-black hover:bg-white/90 font-bold tracking-wide gap-2 mt-auto"
          size="lg"
        >
          <Plus size={16} />
          Agregar al pedido
        </Button>
      </div>
    </motion.div>
  )
}

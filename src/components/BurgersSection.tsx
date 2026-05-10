import { BurgerCard } from "@/components/BurgerCard"
import { burgers } from "@/data/burgers"
import type { BurgerItem, BurgerSize } from "@/types"

interface BurgersSectionProps {
  onAddToCart: (burger: BurgerItem, size: BurgerSize) => void
}

export function BurgersSection({ onAddToCart }: BurgersSectionProps) {
  return (
    <section id="menu" className="relative grid-bg">
      {/* fade top */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
      {/* fade bottom */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      {/* fade left/right */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

      <div className="relative z-20 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14 text-center">
            <p className="text-white/30 text-xs font-bold tracking-[0.35em] uppercase mb-4">
              Menú
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
              NUESTRAS BURGERS
            </h2>
            <p className="text-white/50 text-sm tracking-widest uppercase">
              Todas incluyen papas fritas · 10% de descuento con take away
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border border-white/10">
            {burgers.map((burger, index) => (
              <BurgerCard
                key={burger.id}
                burger={burger}
                onAdd={onAddToCart}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

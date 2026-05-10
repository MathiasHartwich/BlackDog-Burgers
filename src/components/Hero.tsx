import { motion } from "framer-motion"
import { ArrowDown, ShoppingBag } from "lucide-react"

interface HeroProps {
  onOrderClick: () => void
  onMenuClick: () => void
}

export function Hero({ onOrderClick, onMenuClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1920&q=80"
          alt="BlackDog Burger"
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="text-white/40 text-xs font-bold tracking-[0.35em] uppercase">
            Artesanal · Ciudad de la Costa
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tight text-white leading-none"
        >
          SMASH
          <br />
          <span className="text-white/90">BURGERS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-lg md:text-xl text-white/60 mb-14 max-w-xl mx-auto font-light tracking-wide"
        >
          Aplastadas a la perfección. Cada mordida cuenta una historia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary CTA — pulsing ring + bold */}
          <div className="relative">
            <span className="absolute inset-0 rounded-none animate-ping bg-white/20 duration-1000" />
            <button
              onClick={onOrderClick}
              className="relative flex items-center gap-3 bg-white text-black px-10 py-4 text-base font-black uppercase tracking-widest hover:bg-white/90 active:scale-95 transition-all duration-150 shadow-[0_0_40px_rgba(255,255,255,0.25)]"
            >
              <ShoppingBag size={18} />
              Pedir Ahora
            </button>
          </div>

          {/* Secondary CTA */}
          <button
            onClick={onMenuClick}
            className="flex items-center gap-2 border border-white/40 text-white/80 px-10 py-4 text-base font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white active:scale-95 transition-all duration-200"
          >
            <ArrowDown size={16} />
            Ver Menú
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8 text-white/30 text-xs tracking-widest uppercase"
        >
          Todas las hamburguesas incluyen papas fritas
        </motion.p>
      </div>
    </section>
  )
}

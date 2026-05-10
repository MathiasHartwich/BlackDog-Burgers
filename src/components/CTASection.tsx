import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"

interface CTASectionProps {
  onOrderClick: () => void
}

export function CTASection({ onOrderClick }: CTASectionProps) {
  return (
    <section className="py-28 px-6 bg-white text-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <p className="text-black/30 text-[10px] font-bold tracking-[0.35em] uppercase mb-4">
          ¿Listo para pedir?
        </p>
        <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-none">
          TU BLACKDOG
          <br />TE ESPERA
        </h2>
        <p className="text-black/50 text-base mb-10 max-w-sm mx-auto">
          Delivery o take away con 10% de descuento. Retiro en Ciudad de la Costa.
        </p>
        <button
          onClick={onOrderClick}
          className="inline-flex items-center gap-3 bg-black text-white px-12 py-5 text-sm font-black uppercase tracking-widest hover:bg-black/85 active:scale-95 transition-all duration-150 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
        >
          <ShoppingBag size={18} />
          Armar mi pedido
        </button>
      </motion.div>
    </section>
  )
}

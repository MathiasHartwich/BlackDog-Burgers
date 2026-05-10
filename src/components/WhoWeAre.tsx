import { motion } from "framer-motion"

export function WhoWeAre() {
  return (
    <section id="quienes-somos" className="py-28 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-white/30 text-xs font-bold tracking-[0.35em] uppercase mb-4">
              Quiénes Somos
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-8 leading-none">
              LA HISTORIA<br />DE BLACKDOG
            </h2>
            <div className="space-y-5 text-white/65 text-base leading-relaxed">
              <p>
                Nacidos de la pasión por las auténticas smash burgers, BlackDog Burger
                representa el matrimonio perfecto entre tradición e innovación.
              </p>
              <p>
                Creemos en ingredientes simples bien hechos: carne premium, pan fresco
                y esa técnica de aplastado que crea la costra perfecta en cada preparación.
              </p>
              <p>
                Nuestro compromiso con la calidad significa que nos proveemos localmente,
                cocinamos fresco y nunca comprometemos el sabor.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <div className="text-3xl font-black text-white mb-1">100%</div>
                <div className="text-white/40 text-xs uppercase tracking-widest">Carne Fresca</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">5★</div>
                <div className="text-white/40 text-xs uppercase tracking-widest">Calificación</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">2019</div>
                <div className="text-white/40 text-xs uppercase tracking-widest">Fundados</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="relative h-[480px] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80"
              alt="BlackDog Burger"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border border-white/10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { motion } from "framer-motion"
import { Clock, MapPin, Truck } from "lucide-react"

const GOOGLE_MAPS_URL = "https://maps.google.com" // Reemplazar con la URL real

export function InfoSection() {
  return (
    <section className="relative grid-bg">
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

      <div className="relative z-20 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-white/30 text-xs font-bold tracking-[0.35em] uppercase mb-4">
              Información
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
              CÓMO ENCONTRARNOS
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {/* Horarios */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-black/60 p-10 text-center"
            >
              <Clock size={28} className="text-white/40 mx-auto mb-6" />
              <p className="text-white/30 text-[10px] font-bold tracking-[0.25em] uppercase mb-3">
                Horarios
              </p>
              <p className="text-white/60 text-sm mb-3">Viernes y Sábado</p>
              <p className="text-4xl font-black text-white leading-tight">
                20hs
                <br />
                <span className="text-white/40 text-2xl">a</span>
                <br />
                01hs
              </p>
            </motion.div>

            {/* Delivery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-black/60 p-10 text-center"
            >
              <Truck size={28} className="text-white/40 mx-auto mb-6" />
              <p className="text-white/30 text-[10px] font-bold tracking-[0.25em] uppercase mb-3">
                Zona de Envíos
              </p>
              <div className="mt-2 mb-4">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-white/50 text-xs uppercase tracking-wider">Racine</span>
                  <div className="flex-1 flex items-center gap-1">
                    <div className="h-px bg-white/20 flex-1" />
                    <div className="w-2 h-2 bg-white/40 rotate-45" />
                    <div className="h-px bg-white/20 flex-1" />
                  </div>
                  <span className="text-white/50 text-xs uppercase tracking-wider text-right">Márquez<br/>Castro</span>
                </div>
                <div className="h-2 bg-white/15 w-full relative overflow-hidden">
                  <div className="absolute inset-y-0 left-[10%] right-[10%] bg-white/50" />
                </div>
              </div>
              <p className="text-white/80 text-sm font-semibold">Ciudad de la Costa</p>
              <p className="text-white/40 text-xs mt-2">Consultar por zonas cercanas</p>
              <p className="text-white/40 text-[11px] mt-3 border border-white/10 py-1.5 px-3 inline-block">
                10% off con take away
              </p>
            </motion.div>

            {/* Ubicación */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-black/60 p-10 text-center"
            >
              <MapPin size={28} className="text-white/40 mx-auto mb-6" />
              <p className="text-white/30 text-[10px] font-bold tracking-[0.25em] uppercase mb-3">
                Ubicación
              </p>
              <p className="text-white/60 text-sm mb-2">Ciudad de la Costa</p>
              <p className="text-white/80 text-base font-semibold mb-6">
                Dirección próximamente
              </p>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-white/20 text-white/70 hover:bg-white hover:text-black hover:border-white transition-all duration-200 text-xs font-bold tracking-widest uppercase px-6 py-3"
              >
                Ver en Google Maps
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

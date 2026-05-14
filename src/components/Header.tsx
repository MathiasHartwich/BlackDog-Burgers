import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useScroll } from "framer-motion"
import { Menu, X, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  cartCount: number
  onOpenCart: () => void
}

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setScrolled(v > 0.03))
    return unsub
  }, [scrollYProgress])

  return (
    <header>
      <nav
        data-state={menuOpen ? "active" : undefined}
        className="group fixed z-30 w-full pt-2"
      >
        <div
          className={cn(
            "mx-auto max-w-7xl px-6 transition-all duration-300 lg:px-12",
            scrolled && "bg-black/85 backdrop-blur-xl border-b border-white/8"
          )}
        >
          <motion.div
            className={cn(
              "relative flex flex-wrap items-center justify-between gap-6 py-4 duration-200 lg:gap-0 lg:py-5",
              scrolled && "lg:py-3"
            )}
          >
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <a href="/" className="flex items-center">
                <img
                  src="/logo-v1.png"
                  alt="BlackDog Burger"
                  className="h-11 w-auto object-contain"
                  style={{ filter: "invert(1)" }}
                />
              </a>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                className="relative z-20 block cursor-pointer p-2 lg:hidden text-white"
              >
                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-5 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-5 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <ul className="hidden lg:flex gap-8 text-xs font-bold tracking-[0.15em] uppercase">
                <li>
                  <a href="#menu" className="text-white/50 hover:text-white duration-150">
                    Menú
                  </a>
                </li>
                <li>
                  <a href="#quienes-somos" className="text-white/50 hover:text-white duration-150">
                    Quiénes Somos
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-black group-data-[state=active]:block lg:group-data-[state=active]:flex mb-4 hidden w-full flex-wrap items-center justify-end space-y-6 border border-white/10 p-5 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-5 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-5 text-sm font-bold tracking-widest uppercase">
                  <li>
                    <a href="#menu" className="text-white/50 hover:text-white duration-150" onClick={() => setMenuOpen(false)}>
                      Menú
                    </a>
                  </li>
                  <li>
                    <a href="#quienes-somos" className="text-white/50 hover:text-white duration-150" onClick={() => setMenuOpen(false)}>
                      Quiénes Somos
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex w-full items-center gap-4 md:w-fit">
                <button
                  onClick={onOpenCart}
                  className="relative text-white/60 hover:text-white transition-colors"
                  aria-label="Ver carrito"
                >
                  <ShoppingBag size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={onOpenCart}
                  className="border border-white/30 text-white/80 hover:bg-white hover:text-black hover:border-white text-xs font-black uppercase tracking-widest px-5 py-2.5 transition-all duration-200"
                >
                  Empezar Pedido
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </nav>
    </header>
  )
}

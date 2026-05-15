import { useState } from "react"
import { Instagram } from "lucide-react"
import { Analytics } from "@vercel/analytics/react"
import { StickyBar } from "@/components/StickyBar"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { BurgersSection } from "@/components/BurgersSection"
import { WhoWeAre } from "@/components/WhoWeAre"
import { InfoSection } from "@/components/InfoSection"
import { CTASection } from "@/components/CTASection"
import { CartDrawer } from "@/components/CartDrawer"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { useCart } from "@/hooks/useCart"

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const {
    items,
    drinks,
    addItem,
    removeItem,
    updateQuantity,
    addDrink,
    removeDrink,
    updateDrinkQuantity,
    clearCart,
    total,
    itemCount,
  } = useCart()

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <StickyBar />
      <Header cartCount={itemCount} onOpenCart={() => setCartOpen(true)} />

      <Hero
        onMenuClick={scrollToMenu}
      />

      <BurgersSection
        onAddToCart={(burger, size) => {
          addItem(burger, size)
          setCartOpen(true)
        }}
      />

      <InfoSection />

      <WhoWeAre />

      <CTASection onOrderClick={() => setCartOpen(true)} />

      <footer className="py-10 px-6 bg-black border-t border-white/8">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <a
            href="https://www.instagram.com/blackdogburgersbdb/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
          >
            <Instagram size={15} />
            <span className="text-xs tracking-widest uppercase">@blackdogburgersbdb</span>
          </a>
          <p className="text-white/25 text-xs tracking-widest uppercase">
            © 2026 BlackDog Burger · Ciudad de la Costa · Sitio por{" "}
            <a
              href="https://github.com/MathiasHartwich"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors"
            >
              MH
            </a>
          </p>
        </div>
      </footer>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        drinks={drinks}
        total={total}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onAddDrink={addDrink}
        onUpdateDrinkQuantity={updateDrinkQuantity}
        onRemoveDrink={removeDrink}
        onClearCart={clearCart}
      />

      <WhatsAppButton />
      <Analytics />
    </div>
  )
}

import { useState } from "react"
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
      <Header cartCount={itemCount} onOpenCart={() => setCartOpen(true)} />

      <Hero
        onOrderClick={() => setCartOpen(true)}
        onMenuClick={scrollToMenu}
      />

      <BurgersSection
        onAddToCart={(burger, size) => {
          addItem(burger, size)
          setCartOpen(true)
        }}
      />

      <WhoWeAre />

      <InfoSection />

      <CTASection onOrderClick={() => setCartOpen(true)} />

      <footer className="py-10 px-6 bg-black border-t border-white/8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/25 text-xs tracking-widest uppercase">
            © 2024 BlackDog Burger · Ciudad de la Costa
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
    </div>
  )
}

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, Trash2, MessageCircle, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { drinks } from "@/data/burgers"
import type { BurgerSize, CartItem, CartDrinkItem, DrinkItem, OrderData } from "@/types"

const WHATSAPP_NUMBER = "5491100000000" // Reemplazar con el número real
const TAKEAWAY_DISCOUNT = 0.10

const SIZE_LABEL: Record<string, string> = { simple: "Simple", doble: "Doble", triple: "Triple" }

function buildWhatsAppMessage(order: OrderData): string {
  const itemsList = order.items
    .map((i) => `  • ${i.quantity}x ${i.burger.name} ${SIZE_LABEL[i.size]} - $${(i.burger.prices[i.size] * i.quantity)}`)
    .join("\n")

  const drinksList = order.drinks.length
    ? "\n" + order.drinks.map((d) => `  • ${d.quantity}x ${d.drink.name} - $${d.drink.price * d.quantity}`).join("\n")
    : ""

  const delivery =
    order.deliveryMethod === "delivery"
      ? `📍 Delivery a: ${order.address}`
      : `🏪 Retiro en local`

  const discountLine = order.deliveryMethod === "pickup"
    ? `\n🏷️ Descuento take away (-10%): -$${order.discount}`
    : ""

  return encodeURIComponent(
    `🐾 *Nuevo pedido BlackDog Burger*\n\n` +
    `👤 ${order.customerName}\n` +
    `📱 ${order.phone}\n` +
    `${delivery}\n\n` +
    `*Pedido:*\n${itemsList}${drinksList}\n` +
    `_(Todas incluyen papas fritas)_\n` +
    `${discountLine}\n` +
    `💰 *Total: $${order.total}*\n\n` +
    (order.notes ? `📝 ${order.notes}` : "")
  )
}

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  items: CartItem[]
  drinks: CartDrinkItem[]
  total: number
  onUpdateQuantity: (burgerId: string, size: BurgerSize, quantity: number) => void
  onRemoveItem: (burgerId: string, size: BurgerSize) => void
  onAddDrink: (drink: DrinkItem) => void
  onUpdateDrinkQuantity: (drinkId: string, quantity: number) => void
  onRemoveDrink: (drinkId: string) => void
  onClearCart: () => void
}

export function CartDrawer({
  open,
  onClose,
  items,
  drinks: cartDrinks,
  total,
  onUpdateQuantity,
  onRemoveItem,
  onAddDrink,
  onUpdateDrinkQuantity,
  onRemoveDrink,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<"cart" | "checkout">("cart")
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery")
  const [form, setForm] = useState({ customerName: "", phone: "", address: "", notes: "" })

  const discount = deliveryMethod === "pickup" ? Math.round(total * TAKEAWAY_DISCOUNT) : 0
  const finalTotal = total - discount
  const isEmpty = items.length === 0 && cartDrinks.length === 0

  const handleSendOrder = () => {
    if (!form.customerName || !form.phone) return
    if (deliveryMethod === "delivery" && !form.address) return

    const orderData: OrderData = {
      items,
      drinks: cartDrinks,
      total: finalTotal,
      discount,
      deliveryMethod,
      ...form,
    }

    const message = buildWhatsAppMessage(orderData)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank")
    onClearCart()
    onClose()
    setStep("cart")
    setForm({ customerName: "", phone: "", address: "", notes: "" })
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => setStep("cart"), 300)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 z-30 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-40 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  {step === "cart" ? "Tu pedido" : "Confirmar pedido"}
                </h2>
                {!isEmpty && step === "cart" && (
                  <p className="text-white/30 text-xs mt-0.5">Todas las burgers incluyen papas fritas</p>
                )}
              </div>
              <button onClick={handleClose} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {step === "cart" ? (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {isEmpty ? (
                    <div className="text-center text-white/40 py-20">
                      <p className="text-lg font-bold">Tu carrito está vacío</p>
                      <p className="text-sm mt-2">Agregá tus hamburguesas favoritas</p>
                    </div>
                  ) : (
                    <>
                      {/* Burger items */}
                      {items.length > 0 && (
                        <div className="space-y-3">
                          {items.map((item) => (
                            <div key={`${item.burger.id}-${item.size}`} className="flex gap-3 border border-white/8 p-4 bg-white/3">
                              <img
                                src={item.burger.image}
                                alt={item.burger.name}
                                className="w-14 h-14 object-cover shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-black text-white text-sm">{item.burger.name}</p>
                                <p className="text-white/40 text-xs uppercase tracking-wider">{SIZE_LABEL[item.size]}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <button onClick={() => onUpdateQuantity(item.burger.id, item.size, item.quantity - 1)} className="text-white/50 hover:text-white w-6 h-6 border border-white/15 flex items-center justify-center transition-colors">
                                    <Minus size={12} />
                                  </button>
                                  <span className="text-white text-sm font-bold w-4 text-center">{item.quantity}</span>
                                  <button onClick={() => onUpdateQuantity(item.burger.id, item.size, item.quantity + 1)} className="text-white/50 hover:text-white w-6 h-6 border border-white/15 flex items-center justify-center transition-colors">
                                    <Plus size={12} />
                                  </button>
                                </div>
                              </div>
                              <div className="flex flex-col items-end justify-between">
                                <button onClick={() => onRemoveItem(item.burger.id, item.size)} className="text-white/20 hover:text-red-400 transition-colors">
                                  <Trash2 size={14} />
                                </button>
                                <span className="text-white font-black text-sm">${item.burger.prices[item.size] * item.quantity}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Drinks section */}
                      <div>
                        <p className="text-white/30 text-[10px] font-bold tracking-[0.25em] uppercase mb-3">Bebidas</p>
                        <div className="space-y-2">
                          {drinks.map((drink) => {
                            const inCart = cartDrinks.find((d) => d.drink.id === drink.id)
                            return (
                              <div key={drink.id} className="flex items-center justify-between border border-white/8 px-4 py-3 bg-white/3">
                                <div>
                                  <p className="text-white/80 text-sm font-semibold">{drink.name}</p>
                                  <p className="text-white/40 text-xs">${drink.price}</p>
                                </div>
                                {inCart ? (
                                  <div className="flex items-center gap-2">
                                    <button onClick={() => onUpdateDrinkQuantity(drink.id, inCart.quantity - 1)} className="text-white/50 hover:text-white w-6 h-6 border border-white/15 flex items-center justify-center">
                                      <Minus size={12} />
                                    </button>
                                    <span className="text-white text-sm font-bold w-4 text-center">{inCart.quantity}</span>
                                    <button onClick={() => onUpdateDrinkQuantity(drink.id, inCart.quantity + 1)} className="text-white/50 hover:text-white w-6 h-6 border border-white/15 flex items-center justify-center">
                                      <Plus size={12} />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => onAddDrink(drink)}
                                    className="text-xs font-bold border border-white/20 text-white/60 hover:border-white hover:text-white px-3 py-1.5 transition-all"
                                  >
                                    + Agregar
                                  </button>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {!isEmpty && (
                  <div className="p-6 border-t border-white/10 space-y-4">
                    <div className="flex justify-between text-white">
                      <span className="text-white/50 text-sm">Subtotal</span>
                      <span className="font-bold">${total}</span>
                    </div>
                    <Button
                      onClick={() => setStep("checkout")}
                      className="w-full bg-white text-black hover:bg-white/90 font-black tracking-wide"
                      size="lg"
                    >
                      Continuar con el pedido →
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                  <div>
                    <label className="block text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Nombre *</label>
                    <input
                      type="text"
                      value={form.customerName}
                      onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                      placeholder="Tu nombre"
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Teléfono *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="11 1234-5678"
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">¿Cómo lo recibís?</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setDeliveryMethod("delivery")}
                        className={`py-3.5 border text-sm font-bold uppercase tracking-wider transition-all ${
                          deliveryMethod === "delivery" ? "bg-white text-black border-white" : "border-white/15 text-white/50 hover:border-white/30"
                        }`}
                      >
                        🛵 Delivery
                      </button>
                      <button
                        onClick={() => setDeliveryMethod("pickup")}
                        className={`py-3.5 border text-sm font-bold uppercase tracking-wider transition-all ${
                          deliveryMethod === "pickup" ? "bg-white text-black border-white" : "border-white/15 text-white/50 hover:border-white/30"
                        }`}
                      >
                        🏪 Take Away
                      </button>
                    </div>
                    {deliveryMethod === "pickup" && (
                      <div className="mt-2 flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2.5">
                        <Tag size={13} className="text-white/60" />
                        <span className="text-white/70 text-xs font-semibold">10% de descuento aplicado</span>
                      </div>
                    )}
                  </div>

                  {deliveryMethod === "delivery" && (
                    <div>
                      <label className="block text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Dirección *</label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="Calle, número, piso/depto"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors text-sm"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Aclaraciones</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Sin cebolla, sin pepino..."
                      rows={2}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors resize-none text-sm"
                    />
                  </div>

                  {/* Resumen */}
                  <div className="border border-white/10 p-4 space-y-2">
                    <p className="text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">Resumen</p>
                    {items.map((item) => (
                      <div key={`${item.burger.id}-${item.size}`} className="flex justify-between text-sm">
                        <span className="text-white/60">{item.quantity}x {item.burger.name} {SIZE_LABEL[item.size]}</span>
                        <span className="text-white">${item.burger.prices[item.size] * item.quantity}</span>
                      </div>
                    ))}
                    {cartDrinks.map((d) => (
                      <div key={d.drink.id} className="flex justify-between text-sm">
                        <span className="text-white/60">{d.quantity}x {d.drink.name}</span>
                        <span className="text-white">${d.drink.price * d.quantity}</span>
                      </div>
                    ))}
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-400 border-t border-white/10 pt-2">
                        <span>Descuento take away (-10%)</span>
                        <span>-${discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-black border-t border-white/10 pt-2">
                      <span className="text-white">Total</span>
                      <span className="text-white">${finalTotal}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-white/10 space-y-3">
                  <Button
                    onClick={handleSendOrder}
                    disabled={!form.customerName || !form.phone || (deliveryMethod === "delivery" && !form.address)}
                    className="w-full bg-[#25D366] hover:bg-[#1ebe59] text-white gap-2 font-black tracking-wide disabled:opacity-40"
                    size="lg"
                  >
                    <MessageCircle size={18} />
                    Enviar pedido por WhatsApp
                  </Button>
                  <button onClick={() => setStep("cart")} className="w-full text-white/30 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
                    ← Volver al carrito
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

import { useState, useCallback } from "react"
import type { BurgerItem, BurgerSize, CartItem, CartDrinkItem, DrinkItem } from "@/types"

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [drinks, setDrinks] = useState<CartDrinkItem[]>([])

  const addItem = useCallback((burger: BurgerItem, size: BurgerSize) => {
    setItems((prev) => {
      const key = `${burger.id}-${size}`
      const existing = prev.find((i) => `${i.burger.id}-${i.size}` === key)
      if (existing) {
        return prev.map((i) =>
          `${i.burger.id}-${i.size}` === key ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { burger, size, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((burgerId: string, size: BurgerSize) => {
    setItems((prev) => prev.filter((i) => !(i.burger.id === burgerId && i.size === size)))
  }, [])

  const updateQuantity = useCallback((burgerId: string, size: BurgerSize, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => !(i.burger.id === burgerId && i.size === size)))
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.burger.id === burgerId && i.size === size ? { ...i, quantity } : i
      )
    )
  }, [])

  const addDrink = useCallback((drink: DrinkItem) => {
    setDrinks((prev) => {
      const existing = prev.find((d) => d.drink.id === drink.id)
      if (existing) {
        return prev.map((d) => d.drink.id === drink.id ? { ...d, quantity: d.quantity + 1 } : d)
      }
      return [...prev, { drink, quantity: 1 }]
    })
  }, [])

  const removeDrink = useCallback((drinkId: string) => {
    setDrinks((prev) => prev.filter((d) => d.drink.id !== drinkId))
  }, [])

  const updateDrinkQuantity = useCallback((drinkId: string, quantity: number) => {
    if (quantity <= 0) {
      setDrinks((prev) => prev.filter((d) => d.drink.id !== drinkId))
      return
    }
    setDrinks((prev) =>
      prev.map((d) => d.drink.id === drinkId ? { ...d, quantity } : d)
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setDrinks([])
  }, [])

  const burgerTotal = items.reduce((sum, i) => sum + i.burger.prices[i.size] * i.quantity, 0)
  const drinkTotal = drinks.reduce((sum, d) => sum + d.drink.price * d.quantity, 0)
  const total = burgerTotal + drinkTotal

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0) + drinks.reduce((sum, d) => sum + d.quantity, 0)

  return {
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
  }
}

export type BurgerSize = "simple" | "doble" | "triple"

export interface BurgerItem {
  id: string
  name: string
  description: string
  prices: { simple: number; doble: number; triple: number }
  image: string
}

export interface DrinkItem {
  id: string
  name: string
  price: number
}

export interface CartItem {
  burger: BurgerItem
  size: BurgerSize
  quantity: number
}

export interface CartDrinkItem {
  drink: DrinkItem
  quantity: number
}

export interface OrderData {
  items: CartItem[]
  drinks: CartDrinkItem[]
  total: number
  discount: number
  customerName: string
  phone: string
  address: string
  deliveryMethod: "delivery" | "pickup"
  notes?: string
}

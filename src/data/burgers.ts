import type { BurgerItem, DrinkItem } from "@/types"

export const burgers: BurgerItem[] = [
  {
    id: "cheese",
    name: "CHEESE",
    description: "Doble queso por carne · Salsa de la casa",
    prices: { simple: 399, doble: 499, triple: 579 },
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
  },
  {
    id: "quarto",
    name: "QUARTO",
    description: "Doble queso · Cebolla grillada · Mostaza · Ketchup",
    prices: { simple: 409, doble: 499, triple: 579 },
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
  },
  {
    id: "black-dog",
    name: "BLACK DOG",
    description: "Doble queso · Panceta a la plancha · Cebolla caramelizada · Salsa de la casa",
    prices: { simple: 429, doble: 529, triple: 599 },
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80",
  },
]

export const drinks: DrinkItem[] = [
  { id: "coca-cola-chica", name: "Coca-Cola Chica", price: 79 },
  { id: "coca-cola-grande", name: "Coca-Cola Grande", price: 79 },
]

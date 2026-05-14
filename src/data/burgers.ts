import type { BurgerItem, DrinkItem } from "@/types"

export const burgers: BurgerItem[] = [
  {
    id: "cheese",
    name: "CHEESE",
    description: "Doble queso por carne · Salsa de la casa       ",
    prices: { simple: 399, doble: 499, triple: 579 },
    image: "/cheese.jpeg",
  },
  {
    id: "quarto",
    name: "QUARTO",
    description: "Doble queso · Cebolla grillada · Mostaza · Ketchup",
    prices: { simple: 409, doble: 499, triple: 579 },
    image: "/quarto.jpeg",
  },
  {
    id: "black-dog",
    name: "BLACK DOG",
    description: "Doble queso · Panceta a la plancha · Cebolla caramelizada · Salsa de la casa",
    prices: { simple: 429, doble: 529, triple: 599 },
    image: "/blackdog.jpeg",
    mostOrdered: true,
  },
]

export const drinks: DrinkItem[] = [
  { id: "coca-cola-comun", name: "Coca-Cola Común", price: 79 },
  { id: "coca-cola-zero", name: "Coca-Cola Zero", price: 79 },
]

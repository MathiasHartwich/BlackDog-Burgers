import type { BurgerItem, DrinkItem, ExtraItem } from "@/types"

export const burgers: BurgerItem[] = [
  {
    id: "egg-mash",
    name: "EGG-MASH",
    description: "Ali-Oli · Bondiola · Doble queso emmental por carne · Huevo a la plancha",
    prices: { simple: 449, doble: 549 },
    image: "/eggmash.jpeg",
    isNew: true,
  },
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
  { id: "coca-cola-comun", name: "Coca-Cola Común 600ml", price: 89 },
  { id: "coca-cola-zero", name: "Coca-Cola Zero 600ml", price: 89 },
]

export const extras: ExtraItem[] = [
  { id: "papas-extra", name: "Porción de papas extra", price: 99 },
]

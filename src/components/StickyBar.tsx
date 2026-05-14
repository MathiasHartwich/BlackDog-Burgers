import { useState, useEffect } from "react"

function getUruguayDate() {
  const now = new Date()
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Montevideo",
    hour: "numeric",
    minute: "numeric",
    weekday: "short",
    hour12: false,
  }).formatToParts(now)

  const get = (type: string) => parseInt(parts.find((p) => p.type === type)?.value ?? "0")
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? ""

  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  const day = dayMap[weekday] ?? -1
  const hour = get("hour")
  const minute = get("minute")

  return { day, hour, minute }
}

function getBarState() {
  const { day, hour, minute } = getUruguayDate()

  // Open: Fri/Sat 20:00–23:59  OR  Sat/Sun 00:00–00:59
  const isOpen =
    ((day === 5 || day === 6) && hour >= 20) ||
    ((day === 6 || day === 0) && hour === 0)

  if (isOpen) {
    // Minutes remaining until 01:00
    let minutesLeft: number
    if (hour === 0) {
      minutesLeft = 60 - minute
    } else {
      minutesLeft = (24 - hour) * 60 - minute
    }
    const h = Math.floor(minutesLeft / 60)
    const m = minutesLeft % 60
    const countdown = h > 0 ? `${h}h ${m}min` : `${m}min`
    return { state: "open" as const, countdown }
  }

  // Opens later today: Fri/Sat before 20:00
  if ((day === 5 || day === 6) && hour < 20) {
    return { state: "today" as const, countdown: "" }
  }

  // Closed — next opening is always Friday (Saturday is handled by "opens today" state)
  const daysUntilFri = ((5 - day + 7) % 7) || 7
  const nextDay = daysUntilFri === 1 ? "mañana" : "este viernes"
  return { state: "closed" as const, countdown: nextDay }
}

export function StickyBar() {
  const [barState, setBarState] = useState(getBarState)

  useEffect(() => {
    const interval = setInterval(() => setBarState(getBarState()), 60_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full bg-[#111] border-b border-white/8 flex items-center justify-center h-9 px-4">
      {barState.state === "open" && (
        <p className="text-white/80 text-[12px] tracking-wide flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span>ABIERTO AHORA · Cerramos en <strong>{barState.countdown}</strong></span>
        </p>
      )}
      {barState.state === "today" && (
        <p className="text-white/60 text-[12px] tracking-wide flex items-center gap-2">
          <span>⏰</span>
          <span>Abrimos hoy a las 20:00 · <strong className="text-white/80">Reservá tu pedido</strong></span>
        </p>
      )}
      {barState.state === "closed" && (
        <p className="text-white/40 text-[12px] tracking-wide flex items-center gap-2">
          <span>🌙</span>
          <span>Solo viernes y sábado · Próxima apertura: <strong className="text-white/60">{barState.countdown} 20:00</strong></span>
        </p>
      )}
    </div>
  )
}

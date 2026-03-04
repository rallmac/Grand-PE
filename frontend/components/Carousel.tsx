"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "../lib/utils"

export type CarouselApi = ReturnType<typeof useEmblaCarousel>[1]
export type CarouselOptions = Parameters<typeof useEmblaCarousel>[0]
export type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1]

export type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
} & React.ComponentProps<"div">

const CarouselContext = React.createContext<{
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  orientation: "horizontal" | "vertical"
  opts?: CarouselOptions
} | null>(null)

function useCarousel() {
  const ctx = React.useContext(CarouselContext)
  if (!ctx) throw new Error("useCarousel must be used within a <Carousel />")
  return ctx
}

export function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
    plugins,
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const [applySidePadding, setApplySidePadding] = React.useState(false)

  const onSelect = React.useCallback((embla: CarouselApi) => {
    if (!embla) return
    setCanScrollPrev(embla.canScrollPrev())
    setCanScrollNext(embla.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext],
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    function checkWidth() {
      if (typeof window === "undefined") return
      const w = window.innerWidth
      // Apply side padding for slightly wider range on small screens
      setApplySidePadding(w >= 351 && w <= 751)
    }
    checkWidth()
    window.addEventListener("resize", checkWidth)
    return () => window.removeEventListener("resize", checkWidth)
  }, [])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)
    return () => {
      api?.off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        style={
          applySidePadding
            ? { paddingLeft: "8px", paddingRight: "8px", boxSizing: "border-box" }
            : undefined
        }
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

export function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()
  const [disableTrackOffset, setDisableTrackOffset] = React.useState(false)

  React.useEffect(() => {
    function check() {
      if (typeof window === "undefined") return
      const w = window.innerWidth
      setDisableTrackOffset(w >= 351 && w <= 751)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-content">
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? (disableTrackOffset ? "" : "-ml-4") : "-mt-4 flex-col",
          className,
        )}
        style={disableTrackOffset ? { marginLeft: 0 } : undefined}
        {...props}
      />
    </div>
  )
}

export function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()
  const [disableItemPadding, setDisableItemPadding] = React.useState(false)

  React.useEffect(() => {
    function check() {
      if (typeof window === "undefined") return
      const w = window.innerWidth
      setDisableItemPadding(w >= 351 && w <= 751)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? (disableItemPadding ? "" : "pl-4") : "pt-4",
        className,
      )}
      {...props}
    />
  )
}

export function CarouselPrevious({ className, ...props }: React.ComponentProps<"button">) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()
  return (
    <button
      type="button"
      data-slot="carousel-previous"
      className={cn(
        "absolute size-8 rounded-full border border-[#a60029] bg-[#a60029] text-white shadow-sm flex items-center justify-center",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Previous slide"
      {...props}
    >
      <ArrowLeft className="size-4" />
      <span className="sr-only">Previous slide</span>
    </button>
  )
}

export function CarouselNext({ className, ...props }: React.ComponentProps<"button">) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()
  return (
    <button
      type="button"
      data-slot="carousel-next"
      className={cn(
        "absolute size-8 rounded-full border border-[#a60029] bg-[#a60029] text-white shadow-sm flex items-center justify-center",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Next slide"
      {...props}
    >
      <ArrowRight className="size-4" />
      <span className="sr-only">Next slide</span>
    </button>
  )
}

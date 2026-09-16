"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type HeroImage = {
  src: string;
  alt: string;
};

const heroImages: HeroImage[] = [
  { src: "/images/1.png", alt: "NFHS key indicator banner 1" },
  { src: "/images/2.png", alt: "NFHS key indicator banner 2" },
  { src: "/images/3.png", alt: "NFHS key indicator banner 3" },
  { src: "/images/4.png", alt: "NFHS key indicator banner 4" },
  { src: "/images/5.png", alt: "NFHS key indicator banner 5" },
  { src: "/images/6.png", alt: "NFHS key indicator banner 6" },
  { src: "/images/7.png", alt: "NFHS key indicator banner 7" },
];

function getSlidesPerView(width: number) {
  if (width < 640) {
    return 1;
  }

  if (width < 1024) {
    return 3;
  }

  return 4;
}

export function HomeImageCarousel() {
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const updateSlidesPerView = () => {
      setSlidesPerView(getSlidesPerView(window.innerWidth));
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  const maxIndex = Math.max(0, heroImages.length - slidesPerView);
  const currentIndex = Math.min(index, maxIndex);
  const trackWidth = useMemo(
    () => `${(heroImages.length * 100) / slidesPerView}%`,
    [slidesPerView],
  );
  const slideWidth = useMemo(() => `${100 / heroImages.length}%`, []);
  const translate = useMemo(
    () => `translateX(-${(currentIndex * 100) / heroImages.length}%)`,
    [currentIndex],
  );

  useEffect(() => {
    if (slidesPerView !== 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 2600);

    return () => {
      window.clearInterval(timer);
    };
  }, [maxIndex, slidesPerView]);

  const goPrevious = () => {
    setIndex((current) => {
      const safe = Math.min(current, maxIndex);
      return safe <= 0 ? maxIndex : safe - 1;
    });
  };

  const goNext = () => {
    setIndex((current) => {
      const safe = Math.min(current, maxIndex);
      return safe >= maxIndex ? 0 : safe + 1;
    });
  };

  return (
    <section aria-label="Featured NFHS visual indicators" className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">Key highlights</h2>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Show previous image"
            onClick={goPrevious}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Show next image"
            onClick={goNext}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-500 ease-out"
          style={{
            width: trackWidth,
            transform: translate,
          }}
        >
          {heroImages.map((image) => (
            <article
              key={image.src}
              className="overflow-hidden rounded-2xl border bg-card shadow-sm"
              style={{ width: slideWidth }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={379}
                height={330}
                className="h-auto w-full"
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 33vw, 25vw"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

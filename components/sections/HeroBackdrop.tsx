"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CLIP_MS = 9000;

export function HeroBackdrop({
  clips,
  poster,
  alt,
}: {
  clips: readonly string[];
  poster?: string;
  alt: string;
}) {
  const sources = clips;
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const videosRef = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(motion.matches);
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || sources.length < 2) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % sources.length);
    }, CLIP_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, sources.length]);

  useEffect(() => {
    videosRef.current.forEach((video, index) => {
      if (!video) return;
      if (index === active && !reduceMotion) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [active, reduceMotion]);

  if (reduceMotion && poster) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={poster} alt={alt} className="hero-video-grade h-full w-full object-cover" />
    );
  }

  return (
    <>
      {sources.map((src, index) => (
        <video
          key={src}
          ref={(node) => {
            videosRef.current[index] = node;
          }}
          autoPlay={index === 0}
          muted
          loop
          playsInline
          poster={index === 0 ? poster : undefined}
          preload={index === 0 ? "auto" : "metadata"}
          className={cn(
            "hero-video-grade absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-[var(--ease-out-expo)]",
            index === active ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={index !== active}
          aria-label={index === 0 ? alt : undefined}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
    </>
  );
}

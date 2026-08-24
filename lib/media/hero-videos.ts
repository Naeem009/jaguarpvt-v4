/**
 * Royalty-free hero footage (Mixkit Free License + Pexels License).
 * Replace files in public/videos/ when Jaguar brand footage is ready.
 */
export const HERO_VIDEOS = {
  home: "/videos/home/hero-fabric.mp4",
  manufacturing: "/videos/heroes/manufacturing.mp4",
  sustainability: "/videos/heroes/sustainability.mp4",
  products: "/videos/heroes/products.mp4",
  contact: "/videos/heroes/contact.mp4",
  careers: "/videos/heroes/careers.mp4",
} as const;

export type HeroVideoKey = keyof typeof HERO_VIDEOS;

const STITCHING = "/videos/home/hero-stitching.mp4";

/** Home hero cycles fabric → stitching → factory to match the manufacturing-unit story. */
export const HERO_VIDEO_PLAYLISTS: Record<HeroVideoKey, readonly string[]> = {
  home: [HERO_VIDEOS.home, STITCHING, HERO_VIDEOS.manufacturing],
  manufacturing: [HERO_VIDEOS.manufacturing],
  sustainability: [HERO_VIDEOS.sustainability],
  products: [HERO_VIDEOS.products],
  contact: [HERO_VIDEOS.contact],
  careers: [HERO_VIDEOS.careers],
};

export function getHeroVideo(key: HeroVideoKey) {
  return HERO_VIDEOS[key];
}

export function getHeroVideoPlaylist(key: HeroVideoKey) {
  return HERO_VIDEO_PLAYLISTS[key];
}

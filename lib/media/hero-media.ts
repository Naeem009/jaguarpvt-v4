import { HERO_VIDEOS, HERO_VIDEO_PLAYLISTS, type HeroVideoKey } from "./hero-videos";

export type HeroVideoMedia = {
  type: "video";
  src: string;
  clips: readonly string[];
  poster: string;
  alt: string;
};

/** Build a hero video media object with optional multi-clip playlist. */
export function heroVideoMedia(
  poster: string,
  alt: string,
  videoKey: HeroVideoKey = "manufacturing",
): HeroVideoMedia {
  return {
    type: "video",
    src: HERO_VIDEOS[videoKey],
    clips: HERO_VIDEO_PLAYLISTS[videoKey],
    poster,
    alt,
  };
}

import subtitlesData from "@/data/subtitle.json";

export type Locale = "id" | "en";
export type SubtitleDictionary = typeof subtitlesData.id;

export const subtitles: Record<Locale, SubtitleDictionary> = subtitlesData;

export function getSubtitles(locale: Locale): SubtitleDictionary {
  return subtitles[locale] || subtitles.id;
}


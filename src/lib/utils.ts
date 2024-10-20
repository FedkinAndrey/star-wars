import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Film } from '@/services/films/types.ts';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getHeroFilms(heroFilmIds: number[], allFilms: Film[]): Film[] {
  const heroFilmIdSet = new Set(heroFilmIds);
  return allFilms.filter((film) => heroFilmIdSet.has(film.id));
}

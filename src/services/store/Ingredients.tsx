import { get, set } from "idb-keyval";

const KEY = "ingredients-taxonomy-v1";
const URL = "https://static.openfoodfacts.org/data/taxonomies/ingredients.json";
const TTL_MS = 1000 * 60 * 60 * 24 * 7;

export type IngredientTaxonomy = Record<string, { name?: Record<string, string> }>;
type CacheShape = { ts: number; data: IngredientTaxonomy };

export type MapsState = {
  opts: string[];
  idToName: Record<string, string>;
  nameToId: Record<string, string>;
};

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function buildMaps(data: IngredientTaxonomy | null, lang: string): MapsState {
  if (!data) return { opts: [], idToName: {}, nameToId: {} };
  const opts: string[] = [];
  const idToName: Record<string, string> = {};
  const nameToId: Record<string, string> = {};
  Object.entries(data).forEach(([id, entry]) => {
    const name = entry.name?.[lang] || entry.name?.en || entry.name?.fr;
    if (name) {
      opts.push(name);
      idToName[id] = name;
      nameToId[normalize(name)] = id;
    }
  });
  return { opts, idToName, nameToId };
}

let inMemory: IngredientTaxonomy | null = null;

export function getIngredientsDataSync(): IngredientTaxonomy | null {
  return inMemory;
}

export async function getIngredientsData(): Promise<IngredientTaxonomy> {
  if (inMemory) return inMemory;

  const cached = await get<CacheShape>(KEY);
  const isFresh = cached && Date.now() - cached.ts < TTL_MS;
  if (isFresh) {
    inMemory = cached.data as IngredientTaxonomy;
    return inMemory;
  }

  const res = await fetch(URL);
  const data = (await res.json()) as IngredientTaxonomy;

  inMemory = data;
  await set(KEY, { ts: Date.now(), data });
  return inMemory;
}
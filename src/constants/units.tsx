import type { TFunction } from "i18next";

export const UNIT_VALUES = ["none", "slice", "bag", "pot", "g", "kg", "l", "cl", "ml"] as const;
export type UnitValue = typeof UNIT_VALUES[number];

export function getUnitOptions(t: TFunction) {
  return [
    { value: "none",  label: t("inventory.units.none")   },
    { value: "slices", label: t("inventory.units.slices") },
    { value: "bags",   label: t("inventory.units.bags")   },
    { value: "pots",   label: t("inventory.units.pots")   },
    { value: "g",     label: "g"  },
    { value: "kg",    label: "kg" },
    { value: "l",     label: "L"  },
    { value: "cl",    label: "cL" },
    { value: "ml",    label: "mL" },
  ] as const;
}
export const genderOptions = [
  { value: "all", label: "All" },
  { value: "boys", label: "Boys" },
  { value: "girls", label: "Girls" },
];

export const defaultGender = "all";

export function formatGender(value?: string) {
  if (!value) {
    return "All";
  }

  const normalized = value.toString().trim().toLowerCase();

  if (normalized === "all" || normalized === "any") {
    return "All";
  }

  if (normalized === "boys" || normalized === "boy" || normalized === "male") {
    return "Boys";
  }

  if (normalized === "girls" || normalized === "girl" || normalized === "female") {
    return "Girls";
  }

  return value;
}

export function normalizeGenderValue(value?: string) {
  const normalized = value?.toString().trim().toLowerCase();

  if (!normalized || normalized === "all" || normalized === "any") {
    return "all";
  }

  if (normalized === "boys" || normalized === "boy" || normalized === "male") {
    return "boys";
  }

  if (normalized === "girls" || normalized === "girl" || normalized === "female") {
    return "girls";
  }

  return normalized;
}

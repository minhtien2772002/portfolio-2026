export const farewellKeySegments = [
  { name: "company", length: 3, pattern: /[^A-Z]/g },
  { name: "year", length: 2, pattern: /\D/g },
  { name: "initials", length: 2, pattern: /[^A-Z]/g },
];

export function sanitizeFarewellSegment(value, index) {
  const segment = farewellKeySegments[index];
  if (!segment) return "";
  return String(value || "").toUpperCase().replace(segment.pattern, "").slice(0, segment.length);
}

export function parseFarewellKey(value) {
  const normalized = String(value || "").trim().toUpperCase();
  const compact = normalized.replace(/[^A-Z0-9]/g, "");
  if (!/^[A-Z]{3}\d{2}[A-Z]{2}$/.test(compact)) return null;
  return [compact.slice(0, 3), compact.slice(3, 5), compact.slice(5, 7)];
}

export function formatFarewellKey(values) {
  if (!Array.isArray(values) || values.length !== 3) return "";
  const sanitized = values.map((value, index) => sanitizeFarewellSegment(value, index));
  return sanitized.every((value, index) => value.length === farewellKeySegments[index].length)
    ? sanitized.join("-")
    : "";
}

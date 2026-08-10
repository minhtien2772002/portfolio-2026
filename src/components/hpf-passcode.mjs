export const HPF_PASSCODE_LENGTH = 4;
export const HPF_MASK_GLYPH = "*";

export function sanitizeHpfPasscode(value) {
  return String(value || "").replace(/\D/g, "").slice(0, HPF_PASSCODE_LENGTH);
}

export function shouldAutoSubmitHpfPasscode(value, submitting = false, recovering = false) {
  return !submitting && !recovering && sanitizeHpfPasscode(value).length === HPF_PASSCODE_LENGTH;
}

export function getHpfPasscodeCellStates(value, focused = true) {
  const length = sanitizeHpfPasscode(value).length;
  const activeIndex = Math.min(length, HPF_PASSCODE_LENGTH - 1);
  return Array.from({ length: HPF_PASSCODE_LENGTH }, (_, index) => ({
    active: focused && index === activeIndex,
    filled: index < length,
    mask: index < length ? HPF_MASK_GLYPH : "",
  }));
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function GradualBlur({
  target = "parent",
  position = "top",
  exponential = true,
  strength = 2,
  divCount = 5,
  opacity = 1,
  height = "6rem",
} = {}) {
  const layers = Array.from({ length: divCount }, (_, index) => {
    const progress = (divCount - index) / divCount;
    const blurProgress = exponential ? progress * progress : progress;
    const blur = Math.max(0.5, blurProgress * strength * 12);
    const segmentStart = (index / divCount) * 100;
    const segmentEnd = ((index + 1) / divCount) * 100;
    const maskStart = clamp(segmentStart - 8, 0, 100);
    const maskEnd = clamp(segmentEnd + 8, 0, 100);

    return `
      <span
        class="gradual-blur-layer"
        aria-hidden="true"
        style="
          --gradual-blur-amount: ${blur.toFixed(2)}px;
          --gradual-mask-start: ${maskStart.toFixed(2)}%;
          --gradual-mask-visible-start: ${segmentStart.toFixed(2)}%;
          --gradual-mask-visible-end: ${segmentEnd.toFixed(2)}%;
          --gradual-mask-end: ${maskEnd.toFixed(2)}%;
        "
      ></span>
    `;
  }).join("");

  return `
    <div
      class="gradual-blur gradual-blur--${position}"
      data-target="${target}"
      data-position="${position}"
      data-exponential="${exponential}"
      data-strength="${strength}"
      data-div-count="${divCount}"
      data-opacity="${opacity}"
      aria-hidden="true"
      style="--gradual-blur-height: ${height}; --gradual-blur-opacity: ${opacity};"
    >
      ${layers}
    </div>
  `;
}

(function () {
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!isFinePointer || prefersReducedMotion) return;

  const style = document.createElement("style");
  style.textContent = `
    @media (pointer: fine) {
      body.directional-cursor-enabled,
      body.directional-cursor-enabled * {
        cursor: none !important;
      }

      .directional-cursor {
        position: fixed;
        top: 0;
        left: 0;
        width: 22px;
        height: 22px;
        z-index: 2147483647;
        pointer-events: none;
        user-select: none;
        opacity: 0;
        transform: translate3d(-100px, -100px, 0);
        transition: opacity 180ms ease, width 180ms ease, height 180ms ease;
        will-change: transform;
      }

      .directional-cursor svg {
        width: 100%;
        height: 100%;
        display: block;
        filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.18));
      }

      .directional-cursor .inner {
        fill: #F2F5F8;
      }

      .directional-cursor .outer {
        fill: #111920;
      }

      .directional-cursor.is-hovering {
        width: 28px;
        height: 28px;
      }
    }
  `;

  document.head.appendChild(style);
  document.body.classList.add("directional-cursor-enabled");

  const cursor = document.createElement("div");
  cursor.className = "directional-cursor";
  cursor.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
      <path class="inner" d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z" />
      <path class="outer" d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z" />
    </svg>
  `;

  document.body.appendChild(cursor);

  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;

  let previousTargetX = 0;
  let previousTargetY = 0;

  let currentAngle = 0;
  let targetAngle = 0;

  let hasMoved = false;
  let isVisible = false;

  const positionEase = 0.22;
  const angleEase = 0.18;
  const angleThreshold = 5;

  function lerp(start, end, amount) {
    return start + (end - start) * amount;
  }

  function lerpAngle(start, end, amount) {
    let diff = ((end - start + 540) % 360) - 180;
    return start + diff * amount;
  }

  function getAngle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 90;
  }

  function onMouseMove(event) {
    targetX = event.clientX;
    targetY = event.clientY;

    if (!hasMoved) {
      currentX = targetX;
      currentY = targetY;
      previousTargetX = targetX;
      previousTargetY = targetY;
      hasMoved = true;
    }

    const distance = Math.hypot(targetX - previousTargetX, targetY - previousTargetY);

    if (distance > angleThreshold) {
      targetAngle = getAngle(previousTargetX, previousTargetY, targetX, targetY);
      previousTargetX = targetX;
      previousTargetY = targetY;
    }

    if (!isVisible) {
      cursor.style.opacity = "1";
      isVisible = true;
    }

    const interactive = event.target.closest("a, button, input, textarea, select, [role='button'], .curzr-hover");
    cursor.classList.toggle("is-hovering", Boolean(interactive));
  }

  function animate() {
    if (hasMoved) {
      currentX = lerp(currentX, targetX, positionEase);
      currentY = lerp(currentY, targetY, positionEase);
      currentAngle = lerpAngle(currentAngle, targetAngle, angleEase);

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${currentAngle}deg)`;
    }

    requestAnimationFrame(animate);
  }

  function hideCursor() {
    cursor.style.opacity = "0";
    isVisible = false;
  }

  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("mouseleave", hideCursor);
  requestAnimationFrame(animate);
})();

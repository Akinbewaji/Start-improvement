import { useEffect, useRef } from "react";
import "./roulette.css";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only enable on devices with a fine pointer (desktop mouse/trackpad)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const dot = dotRef.current;
    if (!dot) return;

    document.body.classList.add("has-custom-cursor");

    let lastTrailTime = 0;
    let lastX = 0;
    let lastY = 0;
    let isVisible = false;

    const onPointerMove = (e: MouseEvent) => {
      if (!isVisible) {
        dot.style.display = "block";
        isVisible = true;
      }

      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      const now = performance.now();
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);

      // Spawn subtle trailing leaf particles during movement
      if (now - lastTrailTime > 45 && dist > 6) {
        lastTrailTime = now;
        const angle = (Math.atan2(e.clientY - lastY, e.clientX - lastX) * 180) / Math.PI;
        lastX = e.clientX;
        lastY = e.clientY;

        const leaf = document.createElement("div");
        leaf.className = "cursor-trail-leaf";
        leaf.style.left = `${e.clientX}px`;
        leaf.style.top = `${e.clientY}px`;
        leaf.style.setProperty("--rot", `${angle}deg`);
        document.body.appendChild(leaf);

        setTimeout(() => {
          leaf.remove();
        }, 400);
      }
    };

    const interactiveSelector = "a, button, [role='button'], input, select, textarea, .btn, .tag";

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(interactiveSelector)) {
        document.body.classList.add("cursor-hover");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(interactiveSelector)) {
        document.body.classList.remove("cursor-hover");
      }
    };

    const onMouseLeave = () => {
      dot.style.display = "none";
      isVisible = false;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      document.body.classList.remove("cursor-hover");
      window.removeEventListener("mousemove", onPointerMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" style={{ display: "none" }} />;
}

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
}

export function Magnetic({ children, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const el = ref.current;

      const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = el.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;

        xTo(deltaX * strength);
        yTo(deltaY * strength);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: ref },
  );

  return React.cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      ref.current = node;
      const childRef = (children as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref;
      if (typeof childRef === "function") {
        childRef(node);
      } else if (childRef && typeof childRef === "object" && "current" in childRef) {
        (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
  } as React.Attributes);
}

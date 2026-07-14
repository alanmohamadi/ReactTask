import { useRef } from "react";

export function useTouchScroll() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const startDragging = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if ("button" in e && e.button !== 0) return;

    if (!sliderRef.current) return;

    e.preventDefault();

    isDraggingRef.current = true;

    const pageX = "touches" in e ? (e.touches[0]?.pageX ?? 0) : e.pageX;

    startXRef.current = pageX - sliderRef.current.getBoundingClientRect().left;

    scrollLeftRef.current = sliderRef.current.scrollLeft;
  };

  const onDragging = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!isDraggingRef.current || !sliderRef.current) return;

    e.preventDefault();

    const pageX = "touches" in e ? (e.touches[0]?.pageX ?? 0) : e.pageX;

    const x = pageX - sliderRef.current.getBoundingClientRect().left;

    const walk = (x - startXRef.current) * 2;

    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const stopDragging = () => {
    isDraggingRef.current = false;
  };

  return {
    sliderRef,
    startDragging,
    onDragging,
    stopDragging,
  };
}

import { useRef, useEffect } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
const useDashboard = () => {

  const drawerButtonRef = useRef<HTMLLabelElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Make .container 100vh, by calculating on Mobile */
  const isMobile = useMediaQuery('(max-width: 767px)');
  useEffect(() => {
    const drawerButtonHeight = drawerButtonRef.current?.offsetHeight || 0;
    if (isMobile && containerRef.current) {
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      containerRef.current.style.minHeight = `${viewportHeight - drawerButtonHeight}px`;
    }
  }, [isMobile, drawerButtonRef, containerRef])

  return {
    drawerButtonRef,
    containerRef
  }
}

export default useDashboard
import { useRef, useEffect, useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { useSelector } from "react-redux";
import { setHasAutoOpened } from "../store/slices/base";
import { useDispatch } from "react-redux";

const useDashboard = () => {
  /* Resizing Logic */
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
  /* Resizing Logic END */

  /* Opening drawer automatically upon login in */
  const { hasAutoOpened } = useSelector((state: any) => state.base);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!hasAutoOpened) {
      setTimeout(() => {
        const drawerCheckbox = document.getElementById('my-drawer-1') as HTMLInputElement;
        if (drawerCheckbox) drawerCheckbox.checked = true;
        dispatch(setHasAutoOpened(true));
      }, 100);
    }
  }, [hasAutoOpened, dispatch]);
  /* Opening drawer automatically upon login in END */

  const classnames = {
    container: 'bg-secondary container !min-w-full !min-h-[100dvh]',
    drawerBtn: 'btn drawer-button bg-base-300 rounded-none fixed bottom-[0.5px] left-[0.25px] px-10 py-6',
    searchInput: "input input-bordered w-full mb-4 caret-primary active:!ring-1 focus-within:!ring-1 focus-visible:!ring-1 focus:!ring-1 active:!outline-none focus-within:!outline-none focus-visible:!outline-none focus:!outline-none active:!border-none focus-within:!border-none focus-visible:!border-none focus:!border-none"
  }

  /* Search logic value */
  const [searchValue, setSearchValue] = useState<string>('');



  return {
    drawerButtonRef,
    containerRef,
    searchValue,
    setSearchValue,
    classnames
  }
}

export default useDashboard
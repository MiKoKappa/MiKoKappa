import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function FullscreenMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Animation logic
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "circ.inOut" }
      );

      gsap.fromTo(
        itemsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 1,
          ease: "circ.inOut",
        }
      );
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "circ.inOut",
      });
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="h-8 skewed-button-primary font-display font-medium text-sm text-custom-light -mr-2"
      >
        <svg
          className="w-6 h-6 -ml-3 mr-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="square"
            stroke-width="1.5"
            d="M5 7h14M5 12h14M5 17h14"
          />
        </svg>
        MENU
      </button>

      <div
        ref={menuRef}
        onClick={() => setIsOpen(false)}
        className="fixed top-0 left-0 w-full h-full bg-custom-dark bg-opacity-95 text-white z-40 transform translate-x-full flex flex-col items-center justify-center transition-transform"
      >
        {/* <button
          onClick={() => setIsOpen(false)}
          className="p-3 h-8 skewed-button-primary font-display font-medium text-sm text-custom-light -mr-2"
        >
          &#10006;
        </button> */}
        <nav className="space-y-6 text-3xl mt-12">
          {["Home", "About", "Blog", "Contact"].map((label, i) => (
            <a
              key={label}
              href={`/${label != "Home" ? label.toLowerCase() : ""}`}
              ref={(el) => (itemsRef.current[i] = el)}
              onClick={() => setIsOpen(false)}
              className="block"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

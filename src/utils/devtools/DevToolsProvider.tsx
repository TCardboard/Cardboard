"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import {
  createContext,
  Fragment,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/libs/utils";
import { ease } from "../ease";
import type { Route } from "./route/index.generated";
import { ROUTE_SYSTEM } from "./route/index.generated";

type DevRouteSetting = {
  open: boolean;
  initialOpen: boolean;
  autoClose: boolean;
  setOpen: (open: boolean) => void;
  setInitialOpen: (initialOpen: boolean) => void;
  setAutoClose: (autoClose: boolean) => void;
};

const RouteContext = createContext({} as DevRouteSetting);

const useDevSetting = () => {
  const context = useContext(RouteContext);
  if (context === null) {
    throw new Error(
      "useDevSetting must be used within a RouteContext Provider",
    );
  }
  return context;
};

export function RoutingDevTools() {
  const [autoClose, setAutoClose] = useLocalStorage("DEV-AUTOCLOSE", true);
  const [initialOpen, setInitialOpen] = useLocalStorage(
    "DEV-INITIALOPEN",
    false,
  );

  const [open, setOpen] = useState(initialOpen);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    });
    setMounted(true);
  }, []);

  if (process.env.NODE_ENV !== "development") return null;

  if (!mounted) {
    return null;
  }

  return createPortal(
    <RouteContext.Provider
      value={{
        open,
        initialOpen,
        autoClose,
        setOpen,
        setInitialOpen,
        setAutoClose,
      }}
    >
      {/* toggle button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onKeyDown={() => {}}
        className="fixed bottom-16 left-5 z-999 flex cursor-pointer select-none items-center justify-center gap-2 rounded-full border-3 border-white/10 bg-black/80 p-1 px-4 font-[Geist] text-white outline outline-black transition-colors hover:bg-[#111111]/80 hover:brightness-110"
      >
        <svg
          className="size-4"
          role="img"
          aria-label="icon"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1155 1000"
        >
          <path d="m577.3 0 577.4 1000H0z" fill="#fff" />
        </svg>
        <p>Routes</p>
      </button>
      <AnimatePresence mode="wait">
        {open && (
          <>
            <motion.div
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 z-50 flex h-dvh w-dvw items-center justify-center bg-black/20"
            />
            <RouteSheet />
          </>
        )}
      </AnimatePresence>
    </RouteContext.Provider>,
    document.body,
  );
}

const RouteSheet = () => {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 1, ease: ease.outExpo }}
      className="fixed top-0 left-0 z-50 flex h-dvh w-[450px] flex-col border-neutral-900 border-r bg-black font-[Geist] font-light text-white"
    >
      <DevRouteSetting />
      <div className="flex h-full flex-col overflow-y-auto pb-32">
        {ROUTE_SYSTEM.map((section) => (
          <Fragment key={section.name}>
            <RouteSection>{section.name}</RouteSection>
            {section.routes.map((route) => (
              <RouteNavigation key={route.url} {...route} />
            ))}
          </Fragment>
        ))}
      </div>
    </motion.div>
  );
};

const DevRouteSetting = () => {
  const { autoClose, initialOpen, setAutoClose, setInitialOpen } =
    useContext(RouteContext);
  return (
    <div className="flex w-full items-center gap-4 border-neutral-900 border-y p-4">
      <p>initial open</p>
      <button
        type="button"
        onClick={() => setInitialOpen(!initialOpen)}
        className={cn(
          "flex h-4 w-8 cursor-pointer rounded-full transition-colors",
          initialOpen ? "justify-end bg-green-500" : "justify-start bg-red-500",
        )}
      >
        <motion.div
          layout
          transition={{ duration: 0.5, ease: ease.outExpo }}
          className="aspect-square h-full scale-75 rounded-full bg-white"
        />
      </button>
      <p>auto close</p>
      <button
        type="button"
        onClick={() => setAutoClose(!autoClose)}
        className={cn(
          "flex h-4 w-8 cursor-pointer rounded-full transition-colors",
          autoClose ? "justify-end bg-green-500" : "justify-start bg-red-500",
        )}
      >
        <motion.div
          layout
          transition={{ duration: 0.5, ease: ease.outExpo }}
          className="aspect-square h-full scale-75 rounded-full bg-white"
        />
      </button>
    </div>
  );
};

const RouteSection = ({ children }: { children: ReactNode }) => {
  return (
    <p className="w-full border-neutral-900 border-y border-l-4 border-l-white bg-white/10 p-4">
      {children}
    </p>
  );
};

const RouteNavigation = (route: Route) => {
  const { autoClose, setOpen } = useDevSetting();

  return (
    <Link
      href={route.url}
      onClick={() => autoClose && setOpen(false)}
      onKeyDown={() => {}}
      className="flex w-full justify-between border-neutral-900 border-y p-4 py-2 hover:bg-white/20"
    >
      <p>{route.url}</p>
      <p className="text-white/50">{route.name}</p>
    </Link>
  );
};

"use client";

import * as React from "react";

type SheetProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  side?: "left" | "right";
};

const sheetStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  bottom: 0,
  width: "80%",
  maxWidth: 320,
  background: "#ffffff",
  boxShadow: "var(--shadow)",
  padding: "18px",
  overflowY: "auto",
  transition: "transform 0.25s ease",
  zIndex: 30,
};

export function Sheet({ open, onOpenChange, children, side = "right" }: SheetProps) {
  return (
    <>
      {open && (
        <div
          className="sheet-backdrop"
          onClick={() => onOpenChange?.(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(16, 33, 51, 0.35)",
            zIndex: 25,
          }}
        />
      )}
      <div
        style={{
          ...sheetStyles,
          right: side === "right" ? 0 : undefined,
          left: side === "left" ? 0 : undefined,
          transform:
            open ?? false
              ? "translateX(0)"
              : side === "right"
              ? "translateX(105%)"
              : "translateX(-105%)",
        }}
        aria-hidden={!open}
      >
        {children}
      </div>
    </>
  );
}

export function SheetTrigger({
  onClick,
  children,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="op-btn ghost" onClick={onClick}>
      {children}
    </button>
  );
}

export function SheetContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

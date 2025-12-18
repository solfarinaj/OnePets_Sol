"use client";

import * as React from "react";

type NavLink = {
  label: string;
  href: string;
};

type NavigationMenuProps = {
  links: NavLink[];
};

export function NavigationMenu({ links }: NavigationMenuProps) {
  return (
    <nav className="op-nav-links" aria-label="Menú principal">
      {links.map((link) => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}

export function NavigationMenuMobile({
  links,
  onSelect,
}: NavigationMenuProps & { onSelect?: () => void }) {
  return (
    <div className="op-nav-mobile">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={onSelect}
          style={{ display: "block", padding: "10px 0", color: "var(--text)" }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

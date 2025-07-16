'use client';

import { Tooltip } from "antd";
import Link from 'next/link';

export function NavItem({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {

  return (
    <Tooltip>
        <Link
          href={href}
        >
          {children}
          <span className="sr-only">{label}</span>
        </Link>
      {label}
    </Tooltip>
  );
}

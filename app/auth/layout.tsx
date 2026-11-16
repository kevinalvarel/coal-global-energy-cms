import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Sign In | PT Coal Global Energy Admin Portal",
    template: "%s | PT Coal Global Energy",
  },
  description:
    "Secure authentication portal for authorized personnel of PT Coal Global Energy.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}


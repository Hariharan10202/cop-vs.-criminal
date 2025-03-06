"use client";

import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface NextLinkProps {
  href: string;
  color?: "primary";
  label: string;
  children?: ReactNode;
}

const NextLink = ({ href, color, label, children }: NextLinkProps) => {
  const router = useRouter();

  return (
    <Button
      onPress={() => {
        if (href === "/result") {
          router.refresh();
        } else {
          router.push(`${href}`);
        }
      }}
      size="lg"
      color={color ?? "default"}
      className="font-semibold"
    >
      <div className="flex items-center gap-x-2 group">
        <span className="text-xl">{label}</span>
        {children}
      </div>
    </Button>
  );
};

export default NextLink;

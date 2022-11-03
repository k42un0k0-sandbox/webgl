import Image from "next/image";
import { ComponentProps } from "react";

export default function Left(
  props: Omit<ComponentProps<typeof Image>, "src" | "alt">
) {
  return (
    <Image
      src="/assets/left.webp"
      alt="left"
      width="24"
      height="24"
      {...props}
    />
  );
}

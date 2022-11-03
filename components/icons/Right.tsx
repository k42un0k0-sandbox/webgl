import Image from "next/image";
import { ComponentProps } from "react";

export default function Right(
  props: Omit<ComponentProps<typeof Image>, "src" | "alt">
) {
  return (
    <Image
      src="/assets/right.webp"
      alt="right"
      width="24"
      height="24"
      {...props}
    />
  );
}

export const pagesPath = {
  fundamentals: {
    fundamentals: {
      $url: (url?: { hash?: string }) => ({
        pathname: "/fundamentals/fundamentals" as const,
        hash: url?.hash,
      }),
    },
  },
  techniques: {
    $2d: {
      draw_images: {
        $url: (url?: { hash?: string }) => ({
          pathname: "/techniques/2d/draw-images" as const,
          hash: url?.hash,
        }),
      },
    },
  },
  $url: (url?: { hash?: string }) => ({
    pathname: "/" as const,
    hash: url?.hash,
  }),
};

export type PagesPath = typeof pagesPath;

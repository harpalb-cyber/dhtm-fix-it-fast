/// <reference types="vite/client" />

// Minimal test typings so app code keeps the browser `fetch` type (full Bun types alter it).
declare module "bun:test" {
  export const describe: (name: string, fn: () => void) => void;
  export const test: (name: string, fn: () => void | Promise<void>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const expect: (value: unknown) => any;
}

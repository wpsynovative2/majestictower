/**
 * Plain ESM rather than `next.config.ts` on purpose.
 *
 * Hostinger's build image ships glibc < 2.29, so the native SWC binary
 * (`@next/swc-linux-x64-gnu`) fails to load and Next falls back to
 * `@next/swc-wasm-nodejs`. Under that fallback Next cannot compile a
 * TypeScript config: it writes a hashed temp module next to
 * `next.config.compiled.js` and then fails to import it, so the build dies with
 * `ERR_MODULE_NOT_FOUND ... <hash>.next.config`.
 *
 * A .mjs config is imported directly as ESM, with no compile step, so that
 * whole code path is skipped. The JSDoc type below keeps editor completion.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
};

export default nextConfig;

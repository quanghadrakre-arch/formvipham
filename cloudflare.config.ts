import { bindings, defineConfig, defineWorker } from "cf/config";

const workerName = process.env.WORKER_NAME?.trim() || "formvipham";

if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/.test(workerName)) {
  throw new Error(
    `WORKER_NAME "${workerName}" khong hop le: chi dung chu, so va dau "-" (toi da 63 ky tu, khong bat dau/ket thuc bang "-").`,
  );
}

export default defineConfig({
  accountId: "4658479748241b16ea9de243ffec5e6b",
  worker: defineWorker({
    name: workerName,
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-03",
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      VINEXT_KV_CACHE: bindings.kv({ id: "ddc75356e5bb4a11ba8c6012ddfd0550" }),
    },
  }),
});

import { bindings, defineConfig, defineWorker } from "cf/config";

const workerName = process.env.WORKER_NAME?.trim() || "formvipham";

if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/.test(workerName)) {
  throw new Error(
    `WORKER_NAME "${workerName}" khong hop le: chi dung chu, so va dau "-" (toi da 63 ky tu, khong bat dau/ket thuc bang "-").`,
  );
}

export default defineConfig({
  accountId: "083cdb70f64b2d55e90b24869942680e",
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
      VINEXT_KV_CACHE: bindings.kv({ id: "4c02bcfa9ef840bbb4b826f00a92d5f2" }),
    },
  }),
});

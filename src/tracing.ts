/**
 * Copyright 2022 Design Barn Inc.
 */

console.log(process.env);

import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { FastifyInstrumentation } from "@opentelemetry/instrumentation-fastify";
import { NodeSDK } from "@opentelemetry/sdk-node";
import process from "node:process";

const traceExporter = new OTLPTraceExporter();

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [
    getNodeAutoInstrumentations(),
    new FastifyInstrumentation(),
  ],
});

sdk.start();
console.log("Tracing initialized");

process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(
      () => console.log("SDK shut down successfully"),
      (err) => console.log("Error shutting down SDK", err)
    )
    .finally(() => process.exit(0));
});

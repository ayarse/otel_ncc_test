/**
 * Copyright 2022 Design Barn Inc.
 */

console.log(process.env);

import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { FastifyInstrumentation } from "@opentelemetry/instrumentation-fastify";
import { GraphQLInstrumentation } from "@opentelemetry/instrumentation-graphql";
import { GrpcInstrumentation } from "@opentelemetry/instrumentation-grpc";
import { NodeSDK } from "@opentelemetry/sdk-node";

const traceExporter = new OTLPTraceExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
  headers: {
    "x-honeycomb-team": process.env.HONEYCOMB_API_KEY,
  },
});

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [
    new GraphQLInstrumentation(),
    new FastifyInstrumentation(),
    new GrpcInstrumentation(),
  ],
});

sdk.start();
console.log("Tracing initialized");

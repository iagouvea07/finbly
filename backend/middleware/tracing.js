const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

const prometheusPort = 9464;
const prometheusEndpoint = '/metrics';

const prometheusExporter = new PrometheusExporter(
    { port: prometheusPort, endpoint: prometheusEndpoint},
    () => {
        console.log(`Prometheus scrape endpoint: http://localhost:${prometheusPort}${prometheusEndpoint}`);
    }
)

const sdk = new NodeSDK({
  metricReader: prometheusExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
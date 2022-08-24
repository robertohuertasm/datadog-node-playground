# synthentics-tunnel-poc

The app is hosted in Azure => <https://synthetics-poc.azurewebsites.net>

It will be redeployed on every push to `master`.

Aside from that, at CI/CD level, it will start the server and execute all the synthetic tests against `localhost`.

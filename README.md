# synthentics-tunnel-poc

The app is hosted in Azure => <https://datadog-node-playground.azurewebsites.net/>

It will be redeployed on every push to `master`.

Aside from that, at CI/CD level, it will start the server and execute all the synthetic tests against `localhost`.

Datadog uses `Space Buccaneers organization`.

To test locally, run `npm run start:local`.

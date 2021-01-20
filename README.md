<p align="center">
  <a href="https://github.com/veramolabs/orion-github-action/actions"><img alt="orion-github-action status" src="https://github.com/veramolabs/orion-github-action/workflows/build-test/badge.svg"></a>
</p>

# Veramo execute action

Execute methods on Veramo Cloud Agent

## Example

Creates verifiable credential and uploads as an artifact

```yml
jobs:
  example: 
    runs-on: ubuntu-latest
    steps:
      # Create verifiable credential
      - id: vc
        uses: veramolabs/orion-github-action
        with:
          url: ${{secrets.AGENT_URL}}
          token: ${{secrets.AGENT_TOKEN}}
          method: createVerifiableCredential
          args: |
            {
              "proofFormat": "jwt",
              "credential": {
                "type": [
                  "VerifiableCredential",
                  "Example"
                ],
                "issuer": { 
                  "id": "${{ secrets.ISSUER_DID }}" 
                },
                "credentialSubject": {
                  "id": "${{ secrets.ISSUER_DID }}",
                  "foo": "bar"
                }
              }
            }

      # Create artifact
      - run: mkdir -p ./artifacts
      - run: echo ${{ toJSON(steps.vc.outputs.result) }} > ./artifacts/credential.txt

      # Upload artifact
      - uses: actions/upload-artifact@v2
        id: upload
        with:
          name: credential
          path: ./artifacts/credential.txt

```
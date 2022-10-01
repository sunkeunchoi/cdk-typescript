## CDK Config
```bash
# Check AWS credentials
aws s3 ls
# If no credentials set credentials
# aws configure

# configure aws cdk
alias cdk='npx cdk'
cdk bootstrap
```

## Got ERR_REQUIRE_ESM issue
```bash
#package.json
    "got": "^11"
```
>[link blog](https://bobbyhadz.com/blog/javascript-got-error-err-require-esm-of-es-module)

## Deploy
```bash
cdk deploy
```
## Invoke lambda
```bash
alias booktoki_async='aws lambda invoke --function-name booktoki --cli-binary-format raw-in-base64-out --invocation-type Event --payload'
alias booktoki='aws lambda invoke --function-name booktoki --cli-binary-format raw-in-base64-out --payload'
```

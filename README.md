# Hono todo app

## Tech stack

- [Hono](https://hono.dev/)
- AWS Lambda
- AWS CDK

## Install dependencies

```bash
pnpm i
```

## Edit AWS Lambda code

Edit `lambda/*` files

## Create AWS Lambda function (first time only)

```bash
# Set your aws profile
export AWS_PROFILE=your-profile

# Change directory to cdk
cd cdk

npx cdk bootstrap
npx cdk deploy
```


## Update AWS Lambda code

```bash
# Set your aws profile
export AWS_PROFILE=your-profile

pnpm run deploy
```

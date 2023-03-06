# 🏞 brand-counter-backend

## 📣 Before you start!

- Please set the `AWS_ACCOUNT` value in `config/env.yml` to the number of the the AWS accounts you are deploying to.
- You also need to create a S3-bucket for your deployment files. The bucket should be in region `eu-north-1` and it should be called
  `${AWS_ACCOUNT}.eu-north-1.serverless.deploys`. You can change this to any bucket you'd like by updating the `deploymentBucket` property in `./serverless.ts`

---

<br />

## 🧱 Build/deploy status

![Build Status TEST](todo-add-build-badge-for-test-here)
<br />
![Build Status PROD](todo-add-build-badge-for-prod-here)

This service provides backend API functionality for the brand counter service.
<br /><br />

## 📃 Getting started

- ⚙️ Install dependencies: `npm i`
- 🧪 Run tests: `npm t`
  <br /><br />

### 🗂 Project structure

- `/serverless.ts`-entry point for any settings in the project
- `/jest.config.js`- Configure tests.

- `/config/env.yml` - Configure environment params that can be accessed in the code with `process.env.NAME_OF_PARAM`
- `/config/functions.ts`- Configure lambda functions.
- `/config/iam.ts` - Configure permissions of the role that the Lambda functions will have when running. If a lambda function needs to access dynamoDB the right access for that needs to be added here.
- `/config/resources.ts`- AWS resources such as dynamoDB tables.
- `/buildspec`- Build and deployment specification for test and production environment.
  <br /><br />

## Running lambdas locally

- `npm start`
  <br /><br />

## 🐛 Debugging

- In VSCode click run and debug and choose between debugging lambdas or unit tests.
  <br /><br />

## 👷🏻‍♀️ Setup deployment

### Simple deployment

- Set the `profile` property in `/serverless.ts` to the name of the AWS profile you want to use for deployment.
- run `npm run deploy:test` or `npm run deploy:prod`
  <br /><br />

### CodeBuild deployment

<i>Use this for automatic builds for each push to the `main`-branch</i>

- Go to CodeBuild on the account where you want to deploy this service
- Fill out `name` and `description`
- Check `Build badge`
- In `Source provider` choose GitHub and `Repository in my GitHub account`
- Choose this repo by searching for it
- Check `Webhook`, `Single Build` , `Event type` PUSH
- Under `Start a build under these conditions` in `HEAD_REF` fill in `^refs/heads/main$`
- Choose `Managed image` and operating system `Ubuntu`, `Runtime` 5 `Image version` latest.
- Choose `Existing service role` codebuild-service-role, Uncheck `Allow AWS CodeBuild to modify...`
- Choose `Use a buildspec file` and fill in `buildspec/test.yml` (or `buildspec/prod.yml` depending on environment).
- Click `Create build project`
  <br /><br />

## ✨ Deploying

- On every commit CI/CD pipeline for the test environment will build and deploy to Test.
- Build spec files for test/prod are located in the `/buildspec` directory.

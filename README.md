# screen-recorder-monorepo

[![Netlify Status](https://api.netlify.com/api/v1/badges/20d2e1c1-a660-43aa-8ee7-8e1b0f12ea9b/deploy-status)](https://app.netlify.com/sites/frontendcasestudy/deploys)


## Steps to run the project locally:

1. git clone the repo in your machine, and then cd into the directory:
```shell
git clone https://github.com/yashpriyam/frontend_todo_case_study.git
cd frontend_todo_case_study
```

2. now open a terminal and install all the dependencies:
```
npm i
```

3. create a .env file in the root directory of the project and add the following env variables:
```
SKIP_PREFLIGHT_CHECK=true
DEV_DB=mongodb+srv://JeXcBPk752QAfjCb:JeXcBPk752QAfjCb@cluster0.k468m.mongodb.net/youShd?retryWrites=true&w=majority
STAGING_DB=mongodb+srv://JeXcBPk752QAfjCb:JeXcBPk752QAfjCb@cluster0.k468m.mongodb.net/youShd?retryWrites=true&w=majority
JWT_SECRET=asndkjndnasjidnkf12343n12nek3qruo32jrh3983hr3892h9ioj2398j3dno
```

4. start the app and server locally:
```
npm start
```

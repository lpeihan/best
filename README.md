# BEST

## 切换到指定的 Node.js 版本

```shell
# 先安装nvm https://github.com/nvm-sh/nvm

nvm use # NVM会读取.nvmrc文件并切换到指定的版本
```

## 安装 pnpm

```shell
sudo npm i pnpm@9.1.0 --force -g
```

## 打包上线

```shell
# 强制使用pnpm包管理器
pnpm release # 生成 changelog
pnpm deploy-dev # 上传到测试环境
pnpm deploy-stage # 上传到stage环境
pnpm deploy-prod # 上传到正式环境
```

## 项目目录结构

```
├── CHANGELOG.md
├── README.md
├── babel.config.js
├── commitlint.config.js
├── components.d.ts
├── config
│   ├── dev.env.js
│   ├── local.env.js
│   └── prod.env.js
├── dist
│   ├── css
│   ├── favicon.ico
│   ├── img
│   ├── index.html
│   └── js
├── jsconfig.json
├── mocks
│   └── index.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── api
│   ├── assets
│   ├── components
│   ├── config.js
│   ├── directives.js
│   ├── main.js
│   ├── popup
│   ├── router
│   ├── store
│   ├── styles
│   ├── utils
│   └── views
└── vue.config.js

# tree -L 2 -I "node_modules"
```

## 打包报错

```shell
# On Unix-like (Linux, macOS, Git bash, etc.):
export NODE_OPTIONS=--openssl-legacy-provider

# On Windows command prompt:
set NODE_OPTIONS=--openssl-legacy-provider

```

## 将 webpack 配置导出

```shell
npx vue-cli-service inspect > output.txt
```

## 需要安装 vscode 插件

- ESLint
- Prettier - Code formatter
- Stylelint

vscode 的配置在 .vscode/settings.json

## docker

docker build -t best:v1 . //注意最后的点不能省略

docker run -p 8080:80 -d best:v1

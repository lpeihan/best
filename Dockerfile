# Build Stage
FROM node:18-slim AS build

# 安装 pnpm
RUN npm install -g pnpm

# 设置环境变量
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建应用
RUN pnpm build

# Production Stage
FROM nginx:alpine

# 复制构建的文件到Nginx的静态文件目录
COPY --from=build /app/dist/ /usr/share/nginx/html/

# 复制Nginx配置文件
COPY default.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]

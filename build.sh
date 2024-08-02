#!/bin/bash

# 设置变量
IMAGE_NAME="best"
IMAGE_TAG="v1"
CONTAINER_NAME="best_container"
HOST_PORT=8082  # 修改为未占用的端口
CONTAINER_PORT=80

# 确保脚本在项目的根目录执行
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 切换到项目目录
cd $PROJECT_DIR

# 更新代码库
echo "Switching to master branch and pulling latest changes..."
git checkout master
git pull

# 构建 Docker 镜像
echo "Building Docker image $IMAGE_NAME:$IMAGE_TAG..."
docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .

# 检查是否已有同名容器在运行
if [ $(docker ps -aq -f name=${CONTAINER_NAME}) ]; then
    echo "Stopping and removing existing container with name $CONTAINER_NAME..."
    # 停止并删除旧的容器
    docker stop ${CONTAINER_NAME}
    docker rm ${CONTAINER_NAME}
fi

# 启动新的容器
echo "Running Docker container $CONTAINER_NAME..."
docker run -p ${HOST_PORT}:${CONTAINER_PORT} -d --name ${CONTAINER_NAME} ${IMAGE_NAME}:${IMAGE_TAG}

echo "Deployment completed. Container is running on port $HOST_PORT."

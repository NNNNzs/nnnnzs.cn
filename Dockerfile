# 使用官方Node.js 20.14.0的Docker镜像作为基础镜像
FROM node:20.14.0

# 创建应用目录
WORKDIR /usr/src/app

# 将package.json和package-lock.json（如果存在）拷贝到容器中
COPY package*.json ./


# 将target.tar.gz文件拷贝到容器中
COPY target.tar.gz ./

# 解压target.tar.gz文件
RUN tar -xzf target.tar.gz -C /usr/src/app

RUN rm -rf target.tar.gz

# 可以添加其他需要的文件或配置

# 定义环境变量
ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 4000

EXPOSE 4000

# 运行应用
CMD ["npm", "run", "start"]
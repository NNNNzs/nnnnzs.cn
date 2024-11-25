#!/bin/bash

start_time=$(date +%s)
start_build_time=$(date +%s)
# 如果你使用 zsh
source /usr/local/opt/nvm/nvm.sh
nvm use 20

rm -rf .nuxt
rm -rf .output
npm run build

end_build_time=$(date +%s)
# 打包.nuxt和.output文件夹到一个tar压缩包
tar -czvf target.tar.gz .nuxt .output package.json docker-compose.yml

# 使用scp命令将压缩包传输到远程服务器
scp target.tar.gz nnnnzs@vpc.nnnnzs.cn:/www/wwwroot/nnnnzs.cn

rm target.tar.gz

ssh nnnnzs@vpc.nnnnzs.cn <<EOF
    # 切换到远程目录
    cd /www/wwwroot/nnnnzs.cn

    rm -rf .nuxt
    rm -rf .output

    tar -xzvf target.tar.gz
    rm target.tar.gz
    docker-compose down
    docker-compose up -d

EOF

end_time=$(date +%s)
total_build_time=$((end_build_time - start_build_time))
# 计算总时间
total_time=$((end_time - start_time))

# build时长
echo "build时长：${total_build_time} 秒"
# 打印总时间
echo "脚本执行总时间：${total_time} 秒"

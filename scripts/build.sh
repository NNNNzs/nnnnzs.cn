#!/bin/bash

rm -rf .nuxt
rm -rf .output

start_time=$(date +%s)
# 执行npm build命令
npm run build

# 打包.nuxt和.output文件夹到一个tar压缩包
tar -czvf target.tar.gz .nuxt .output

# 使用scp命令将压缩包传输到远程服务器
scp target.tar.gz nnnnzs@vpc.nnnnzs.cn:/www/wwwroot/nnnnzs.cn

rm target.tar.gz

ssh nnnnzs@vpc.nnnnzs.cn << EOF
    # 切换到远程目录
    cd /www/wwwroot/nnnnzs.cn
    
    rm -rf .nuxt
    rm -rf .output

    tar -xzvf target.tar.gz
    rm target.tar.gz
    npm run pm2 

EOF

end_time=$(date +%s)

# 计算总时间
total_time=$((end_time - start_time))

# 打印总时间
echo "脚本执行总时间：${total_time} 秒"
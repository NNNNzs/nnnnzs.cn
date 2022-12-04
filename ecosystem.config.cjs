module.exports = {
  apps: [
    {
      name: 'nnnnzs.cn',
      exec_mode: 'cluster',
      script: 'node ./.output/server/index.mjs',
    },
  ],
}
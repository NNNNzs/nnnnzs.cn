module.exports = {
  apps: [
    {
      name: 'nnnnzs.cn',
      exec_mode: 'cluster',
      instances: 'max',
      script: 'node ./.output/server/index.mjs',
    },
  ],
}
#!/bin/bash

rm -rf .nuxt
rm -rf .output

pnpm install

npm run build

tar -czvf target.tar.gz .nuxt .output package.json

docker build -t nnnnzs .

rm -rf target.tar.gz
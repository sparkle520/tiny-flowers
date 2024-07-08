const n=`node 版本切换简洁的方式 nvm (Node Version Manager)，拒绝繁琐的安装和修改环境变量.\r
\r
# 安装 nvm \r
\r
链接 <https://github.com/coreybutler/nvm-windows/> \r
\r
# 使用 nvm \r
\r
## 查看可下载的 node 版本 \r
\r
cmd 键入\r
\r
\`\`\`  shell\r
nvm list available           \r
\`\`\`\r
\r
## 下载 node 版本  \r
\r
cmd 键入  \r
\r
这里示例为下载 12.14.0版本\r
\r
\`\`\`\r
nvm install 12.14.0   \r
\`\`\`\r
\r
### node 下载慢配置镜像  \r
\r
复制下面的文本粘贴到 nvm 安装目录下的 settings.txt\r
\r
\`\`\`\r
node_mirror: https://npm.taobao.org/mirrors/node/\r
npm_mirror: https://npm.taobao.org/mirrors/npm/\r
\`\`\`\r
\r
## 切换 node 版本  \r
\r
cmd 键入\r
\r
\`\`\`\r
nvm use 12.14.0          \r
\`\`\`\r
\r
## 查看已下载的 node 版本  \r
\r
cmd 键入  \r
\r
带 * 号为当前 node 版本\r
\r
\`\`\`\r
nvm list  \r
\`\`\`\r
\r
`;export{n as default};

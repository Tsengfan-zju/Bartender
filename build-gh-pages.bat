@echo off
rem 这个批处理文件用于在Windows环境中构建GitHub Pages版本
rem 设置VITE_BASE_PATH环境变量
set VITE_BASE_PATH=/Bartender/
rem 执行构建命令
npm run build
rem 显示构建完成信息
echo GitHub Pages版本构建完成！生成的文件在dist目录中。
pause
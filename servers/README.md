# PeerServer

## 独立使用方法

1. 解压后上传到目标机器 /tmp/ 目录下

2. 在目标机器上执行:

```
$ chmod +x /tmp/peerserver
$ ./peerserver -server [helperserver 地址] -port [helperserver 端口] -id [通信 seckey]
```

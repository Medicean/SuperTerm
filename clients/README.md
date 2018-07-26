# Clients

## 独立使用方法

1. 在本机上执行:

```
$ chmod +x client*
$ ./client -server [helperserver 地址] -port [helperserver 端口]
```

2. 打开浏览器，访问 `http://127.0.0.1:21301/?seckey=[启动 peerserver 时指定的 id 参数的值]`

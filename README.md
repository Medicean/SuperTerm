# SuperTerm

> AntSword 创建交互式终端插件

通过 WebShell 创建一个交互式终端，详细见:[WebShell下的交互式Shell](http://blog.evalbug.com/2018/07/25/antsword_prompt_shell/)。

## 安装

### 商店安装

进入 AntSword 插件中心，选择 SuperTerm,点击安装

### 手动安装

1. 获取源代码

	```
	git clone https://github.com/Medicean/SuperTerm.git
	```
	
	或者
	
	点击 [这里](https://github.com/Medicean/SuperTerm/archive/master.zip) 下载源代码，并解压。

2. 拷贝源代码至插件目录

    将插件目录拷贝至 `antSword/antData/plugins/` 目录下即安装成功


## 适用前提条件

1. 目标机器支持 udp 协议，并且 udp 可外连 (比如可以访问 `8.8.8.8:53`)
2. 目标所在的 Nat 为 `Full Cone(完全圆锥型)`,`Address Restricted Cone(地址限制圆锥型)`, `Port Restricted Cone(端口限制圆锥型)`。不支持 `Symmetric(对称型)`，遇到这种的，老老实实上 `nc`。

## 使用

1. 将 [servers](./servers/) 目录下对应的 peerserver 上传到目标 `/tmp/` 目录下，并重命名为 `peerserver`
2. 在目标机器上执行: `chmod +x /tmp/peerserver`
3. 填写隧道辅助服务器地址和端口后，点击「启动」按钮
4. 不要关闭控制台面板，在「Shell管理」界面中，选择对应目标，加载「超级终端」插件
5. 在退出程序前，请先点击「停止」按钮

演示视频见: [WebShell下的交互式Shell](http://blog.evalbug.com/2018/07/25/antsword_prompt_shell/)

## 关于隧道辅助服务器

SuperTerm 和 PeerServer 只会在建立连接的时候需要 HelperServer 参与，之后不会有业务数据发向 HelperServer

可以使用公共的 HelperServer，也可以自己用 vps 搭建

HelperServer [下载地址](https://github.com/Medicean/SuperTerm/releases/tag/helperserver-v0.0.6)

## 已知问题

1. 不支持 `Symmetric NAT(对称型)`，遇到这种的，老老实实上 `nc`。
2. 不能保证 100% 成功，可以多试几次。
3. 暂不支持 Windows。

## 其它

> 仓促做完了自己两年前的设想，整个插件还不够稳定，本仓库会一直更新迭代，直到相对稳定。bin 程序等源码重新整理之后再放出来

如果觉得插件不错，支持作者：

<img src="./wxpay.png" width="325px">

## 相关链接

* [AntSword 文档](http://doc.u0u.us)
* [WebShell下的交互式Shell](http://blog.evalbug.com/2018/07/25/antsword_prompt_shell/)
* [dhtmlx 文档](http://docs.dhtmlx.com/)

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

## 其它

如果觉得插件不错，支持作者：

<img src="./wxpay.png" width="325px">

## 相关链接

* [AntSword 文档](http://doc.u0u.us)
* [WebShell下的交互式Shell](http://blog.evalbug.com/2018/07/25/antsword_prompt_shell/)
* [dhtmlx 文档](http://docs.dhtmlx.com/)

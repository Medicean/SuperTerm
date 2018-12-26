var serverspath = path.join(__dirname, "../servers/");

module.exports = {
    title: "超级终端",
    control: {
        title: "控制台",
        form: {
            title: "服务配置",
            ts_address: "隧道服务器地址",
            ts_address_tips: "隧道服务器地址",
            ts_port: "隧道服务器端口",
            ts_port_tips: "9999",
            startbtn: "启动",
            stopbtn: "停止",
        }
    },
    help:{
        title: "使用帮助",
        text: `<ol>
        <li>将 <a href="javascript:antSword.shell.showItemInFolder('${serverspath.replace(/\\/g, "\\\\")}');">servers</a> 目录下对应的 peerserver 上传到目标 /tmp/目录下，并重命名为 peerserver</li>
<li>在目标机器上执行: chmod +x /tmp/peerserver</li>
<li>填写隧道辅助服务器地址和端口后，点击「启动」按钮</li>
<li>不要关闭控制台面板，在「Shell管理」界面中，选择对应目标，加载「超级终端」插件</li>
<li>在退出程序前，请先点击「停止」按钮</li>
<li>演示视频见: <a href="javascript:antSword.shell.openExternal('http://blog.evalbug.com/2018/07/25/antsword_prompt_shell/');" >WebShell下的交互式Shell</a></li>
</ol>
<div style="width:300px;margin:auto;text-align:center;">
    <span>如果觉得不错，请作者喝杯咖啡?</span>
    <img src="http://blog.evalbug.com/images/wechatimg.png" style="width:300px;">
</div>
`
    },
    message:{
        ps_conn_pre: "WebShell端准备连接",
        ps_conn_error: "WebShell端连接失败",
        ps_conn_success: "WebShell端连接成功",
    },
    success: "创建成功",
    error: "创建失败",
    hint_close_controltab: "该操作将会停止服务,确定退出?",
    hint_input_seckey: "输入通信密钥, 强烈建议8位以上",
    error_not_support_windows: "暂不支持 windows 平台",
    error_local_service_not_running: "本地服务未启动, 如已点击启动按钮，请稍等几秒后启动",
}
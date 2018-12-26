var serverspath = path.join(__dirname, "../servers/");

module.exports = {
    title: "SuperTerm",
    control: {
        title: "ControlPanel",
        form: {
            title: "Service configuration",
            ts_address: "Tunnel server address",
            ts_address_tips: "Tunnel server address",
            ts_port: "Tunnel server port",
            ts_port_tips: "default:9999",
            startbtn: "Start",
            stopbtn: "Stop",
        }
    },
    help:{
        title: "Help",
        text: `<ol>
        <li>Upload the corresponding peerserver in the <a href="javascript:antSword.shell.showItemInFolder('${serverspath.replace(/\\/g,"\\\\")}');">servers</a> directory to the target /tmp/ directory and rename it to peerserver</li>
<li>Run Command on the target machine: chmod +x /tmp/peerserver</li>
<li>After filling in the tunnel assistance server address and port, click the "Start" button.</li>
<li>Do not close the control panel. In the "Shell Manager" interface, select the corresponding target and load the "SuperTerm" plugin</li>
<li>Please click the "Stop" button before exiting the program.</li>
<li>See the demo video: <a href="javascript:antSword.shell.openExternal('http://blog.evalbug.com/2018/07/25/antsword_prompt_shell/');" >Interactive Shell under WebShell</a></li>
</ol>
<div style="width:300px;margin:auto;text-align:center;">
    <span>If you feel good, make a cup of coffee?</span>
    <img src="http://blog.evalbug.com/images/wechatimg.png" style="width:300px;">
</div>
`
    },
    message:{
        ps_conn_pre: "WebShell prepare connection",
        ps_conn_error: "WebShell connect to peerserver error",
        ps_conn_success: "WebShell connect to peerserver success",
    },
    hint_close_controltab: "This operation will stop the service and confirm the exit?",
    hint_input_seckey: "Enter the communication key, it is strongly recommended to be 8 or more",
    error_not_support_windows: "Windows platform is not supported yet",
    error_local_service_not_running: "The local service is not started. If you have clicked the start button, please wait a few seconds to start.",
}
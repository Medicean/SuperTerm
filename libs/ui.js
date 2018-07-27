/**
 * 终端配置UI框架
 */

const tabbar = require('ui/tabbar');
const WIN = require('ui/window');
const LANG = require('../language/');
const URL = require('url');
const child_process = require("child_process");

class UI {
  constructor(opt){
    // if(antSword.remote.process.platform == "win32"){
    //   toastr.error(LANG['error_not_support_windows'], antSword['language']['toastr']['error']);
    //   return {
    //     onStart: (func)=>{},
    //     onAbout: () => {}
    //   }
    // }

    this.shellip = opt["ip"];
    this.statuschecker = null;
    this.serverstatus = false;
    this.CreateControlUI();
    return {
      onStart: (func) => {
        this.bindTerminalHandler(func);
      },
      onAbout: () => {}
    };
    // 直接加载 terminal
    // let win = new antSword['remote'].BrowserWindow({
    //   width: 930,
    //   height: 666,
    //   // minWidth: 800,
    //   // minHeight: 600,
    //   show: false,
    //   title: `${LANG['title']} - ${opt['url']}`
    // });
    // win.on('close', () => {
    //   this.win = win = null;
    // });
    
    // win.loadURL("http://127.0.0.1:21301/?seckey=peer-server");
    // win.show();
    // // win.openDevTools();
    // this.win = win;
  }

  bindTerminalHandler(callback){
    let that = this;
    if(antSword.superterm.started === true){
      layer.prompt({formType:0,title:LANG["hint_input_seckey"]},function(value, index, elem){
        // TODO: 过滤 value
        var serveraddr = antSword['storage']("superterm_ts_address")
        var serverport = antSword['storage']("superterm_ts_port")
        var seckey = value;
        var cmd = `/tmp/peerserver -server ${serveraddr} -port ${serverport} -id ${seckey}`;
        layer.close(index);
        toastr.info(LANG['message']['ps_conn_pre'], antSword['language']['toastr']["info"])

        callback({cmd:cmd})
        .then((ret)=>{
          if (ret.text == "0") {
            toastr.error(LANG['message']['ps_conn_error'], antSword['language']['toastr']['error']);
          }else{
            toastr.success(LANG['message']['ps_conn_success'], antSword['language']['toastr']['success']);
            //
            var hash = String(Math.random()).substr(2, 10);
            var terminal_tab = antSword.tabbar.addTab(
              `tab_superterm_${hash}`,
              `<i class="fa fa-terminal"></i> ${LANG['title']}-`+that.shellip,
              null, null, true, true
            );
            let cell = antSword.tabbar.cells(`tab_superterm_${hash}`);
            cell.attachURL(`http://127.0.0.1:21301/?seckey=${seckey}`);
          }
        });
      })
    }else{
      toastr.info(LANG['error_local_service_not_running'], antSword['language']['toastr']['info']);
    }
  }

  checkLocal() {
    let that = this;
    fetch("http://127.0.0.1:21301/status")
    .then((res) => {
      if (!res.ok){
        that.serverstatus=false;
        return
      }
      res.text().then(statusmsg=>{
        if (statusmsg == "running"){
          that.serverstatus = true;
          return
        }else{
          that.serverstatus=false;
          return
        }
      })
    })
    .catch((_) => {
      that.serverstatus = false;
    });
  }

  loopTest() {
    var that = this;
    this.statuschecker=setInterval(function(){
      that.checkLocal();
      if(that.serverstatus==true){
        that.form.disableItem("startbtn");
        that.form.enableItem("stopbtn");
        that.form.setItemLabel("statusmsg",`<i class="fa fa-circle" style="color:green"></i>`);
      }else{
        that.form.disableItem("stopbtn");
        that.form.enableItem("startbtn");
        that.form.setItemLabel("statusmsg",`<i class="fa fa-circle" style="color:red"></i>`);
      }
      antSword["superterm"]["started"]=that.serverstatus;
    }, 10000);
  }

  CreateControlUI(){
    let that = this;
    this.checkLocal();
    let control_tab = antSword.tabbar.tabs("tab_superterm_control");
    if (control_tab != null){
      return
    }
    that.loopTest();
    antSword["superterm"]={};
    control_tab = antSword.tabbar.addTab(
      'tab_superterm_control',
      `<i class="fa fa-terminal"></i> ${LANG['title']}-${LANG['control']['title']}`,
      null, null, true, true
    );
    antSword.tabbar.attachEvent("onTabClose", (id) => {
      if(id != "tab_superterm_control"){return true}
      layer.confirm(LANG["hint_close_controltab"], {
        icon: 2, shift: 6,
        title: antSword['language']['toastr']["info"],
      }, (index) => {
        if(that.process && that.process.killed == false){
          that.process.kill()
        }
        clearInterval(that.statuschecker);
        // 关闭 tab
        antSword.tabbar.cells("tab_superterm_control").close();
        // 关闭 confirm
        layer.close(index);
      });
    });
    const cell = antSword.tabbar.cells('tab_superterm_control');
    const layout = cell.attachLayout('2U');
    
    let control_pannel = layout.cells('a');
    let help_pannel = layout.cells('b');

    let LANG_CONTROL_FORM = LANG['control']['form']
    
    let formdata=[{
      type: "fieldset", label: LANG_CONTROL_FORM['title'], offsetLeft: 12, offsetTop: 12, list:[
        {
        type: 'block', inputWidth: 'auto',
        offsetTop: 12,
        position: 'label-left',
        labelWidth: 200,
        list: [
          {
            type: 'input', label: LANG_CONTROL_FORM['ts_address'], name: 'ts_address',
            required: true, validate:"NotEmpty",
            value: antSword['storage']("superterm_ts_address", "", "127.0.0.1"),
            info: true,
            userdata: {
              info: LANG_CONTROL_FORM['ts_address_tips'],
            }
          }, {
            type: 'input', label: LANG_CONTROL_FORM['ts_port'], name: 'ts_port',
            required: true,
            value: antSword['storage']("superterm_ts_port", "", 9999),
            info: true,
            userdata: {
              info: LANG_CONTROL_FORM['ts_port_tips'],
            }
          },
          { type: "block", name:"btnblock", className:"display: flex;flex-direction: row;align-items: center;", list:[
            { type:"button" , name:"startbtn", value: `<i class="fa fa-play"></i> ${LANG_CONTROL_FORM["startbtn"]}`, disabled: this.serverstatus,},
            {type: 'newcolumn', offset:20},
            { type:"button" , name:"stopbtn", value: `<i class="fa fa-stop"></i> ${LANG_CONTROL_FORM["stopbtn"]}`, disabled: !this.serverstatus,},
            {type: 'newcolumn', offset:20},
            {type: "label", offsetTop:12, name: "statusmsg", label: this.serverstatus === true?`<i class="fa fa-circle" style="color:green"></i>`:`<i class="fa fa-circle" style="color:red"></i>`}
          ]}
        ]}
    ]}
  ];
    // 表单
    control_pannel.setText(LANG["control"]['title']);
    const form = control_pannel.attachForm(formdata, true);
    this.popup = {}
    form.enableLiveValidation(true);
    
    form.attachEvent("onButtonClick", (name)=>{
      switch (name) {
        case "startbtn":
          let formvals = this.form.getValues();
          console.log(formvals);
          antSword['storage']('superterm_ts_address', formvals['ts_address']);
          antSword['storage']('superterm_ts_port', formvals['ts_port']);
          var clientpath = path.join(__dirname, `../clients/client_${antSword.remote.process.platform}_${antSword.remote.process.arch}`)
          if(antSword.remote.process.platform == "win32"){
            clientpath = clientpath + ".exe";
          }
          var hash = String(Math.random()).substr(2, 10);
          var cmd = `${clientpath} -server ${formvals['ts_address']} -port ${formvals['ts_port']} -id ${hash}`
          var process = child_process.exec(cmd);
          if(process.killed==true){
            // 出错
            break
          }
          this.process=process;
          this.serverstatus=true;
          form.disableItem("startbtn");
          form.enableItem("stopbtn");
          form.setItemLabel("statusmsg",`<i class="fa fa-circle" style="color:green"></i>`);
          break;
        case "stopbtn":
          if(this.process.killed == false){
            this.process.kill()
          }
          
          this.serverstatus=false;
          form.disableItem("stopbtn");
          form.enableItem("startbtn");
          form.setItemLabel("statusmsg",`<i class="fa fa-circle" style="color:red"></i>`);
          break;
      }
    });

    form.attachEvent("onInfo", (name, e) => {
      var tips_popup;
      if(this.popup.hasOwnProperty(name)){
        tips_popup = this.popup[name];
      }else{
        tips_popup = new dhtmlXPopup({mode: "bottom"});
        tips_popup.attachHTML(
          "<div style='width:300px;'>" +
          this.form.getUserData(name, "info") +
          "</div>");
        this.popup[name] = tips_popup;
      }
      if(tips_popup.isVisible()){
        tips_popup.hide();
      }else{
        var t = e.target || e.srcElement;
        var x = window.dhx4.absLeft(t);
        var y = window.dhx4.absTop(t);
        var w = t.offsetWidth;
        var h = t.offsetHeight;
        tips_popup.show(x,y,w,h);
      }
    });
    this.form = form;
    let LANG_HELP = LANG['help'];
    help_pannel.setText(LANG_HELP['title']);
    help_pannel.attachHTMLString(LANG_HELP["text"]);
  }
}

module.exports = UI;

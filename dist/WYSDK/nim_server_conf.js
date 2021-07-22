const nim_server_conf = {
  "lbs_web": "http://162.16.13.80:10081/lbs/webconf.jsp",
  "link_ssl_web": true,
  "nos_uploader_web": "http://162.16.13.82:10080",
  "https_enabled": false,
  "nos_downloader": "162.16.13.82:10080/{bucket}/{object}",
  "nos_accelerate": "",
  "nos_accelerate_host": "",
  "nt_server": "",
  "kibana_server": "http://162.16.13.81:38781/statistic/realtime/sdkinfo",
  "statistic_server": "http://162.16.13.81:38781/statistic/realtime/sdkFunctioninfo",
  "report_global_server": "http://162.16.13.81:38781/statics/report/realtime/global"
}
export default nim_server_conf;

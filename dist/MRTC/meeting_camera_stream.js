var a5_0x1720=['audio_check_node','1QsHxqf','stringify','marsblur','163985OlrnYP','6yEVEkI','stopCheckVideoTimer','pre_local_stream_launch','64457svfcmx','innerGetStream','PreOpenLocalMedia','constraints','6vENMKZ','1319143BRzZyv','disconnect','getUserMedia','preOpenStream','warning','audio_no_data_time','341704gPlUQR','catch','checkVideoTimer','getTime','134213DVRKDy','pre_open_camera_start_time','trace','clearStreamCallback','1xkACSs','blurSwitch','bind','928117kGMvaY','audio_stat_times','\x20streamId=','1223477kTNgJe','streamId','prototype','name','media_type','closeCheckAudioDeviceAvailable','checkAudioDeviceAvailable\x20close!\x20audio_stat_times=','摄像头预热成功!\x20','then'];var a5_0x5207=function(_0x262251,_0x2b8b51){_0x262251=_0x262251-0xcc;var _0x1720cf=a5_0x1720[_0x262251];return _0x1720cf;};var a5_0x22af02=a5_0x5207;(function(_0xd02c0a,_0x4ee215){var _0x45f3ed=a5_0x5207;while(!![]){try{var _0xd212dd=parseInt(_0x45f3ed(0xde))*parseInt(_0x45f3ed(0xe2))+parseInt(_0x45f3ed(0xe9))+-parseInt(_0x45f3ed(0xf1))*parseInt(_0x45f3ed(0xe3))+parseInt(_0x45f3ed(0xd7))*parseInt(_0x45f3ed(0xda))+parseInt(_0x45f3ed(0xcd))+parseInt(_0x45f3ed(0xdb))*parseInt(_0x45f3ed(0xed))+-parseInt(_0x45f3ed(0xf4));if(_0xd212dd===_0x4ee215)break;else _0xd02c0a['push'](_0xd02c0a['shift']());}catch(_0x43533a){_0xd02c0a['push'](_0xd02c0a['shift']());}}}(a5_0x1720,0xa4886));var CameraStreamController=function(){var _0x233213=a5_0x5207;this['trace']=meeting_api_util['trace']['bind'](meeting_api_util),this['warning']=meeting_api_util['warning'][_0x233213(0xf3)](meeting_api_util),this[_0x233213(0xdf)]=function(_0x54cdb7){return new Promise((_0x495cd4,_0x17f2d4)=>{var _0x35225d=a5_0x5207;navigator['mediaDevices'][_0x35225d(0xe5)](_0x54cdb7)[_0x35225d(0xd5)](_0x495cd4)[_0x35225d(0xea)](_0x17f2d4);});},this[_0x233213(0xd2)]=function(_0x41c195){var _0x1a0a4e=_0x233213;this[_0x1a0a4e(0xef)](_0x1a0a4e(0xd3)+_0x41c195[_0x1a0a4e(0xf5)]+_0x1a0a4e(0xcc)+_0x41c195[_0x1a0a4e(0xce)]),_0x41c195[_0x1a0a4e(0xd6)]&&(_0x41c195['audio_check_node'][_0x1a0a4e(0xe4)](),_0x41c195[_0x1a0a4e(0xd6)]=null),_0x41c195[_0x1a0a4e(0xe8)]&&(_0x41c195[_0x1a0a4e(0xe8)]=null),_0x41c195['audio_stat_times']&&(_0x41c195[_0x1a0a4e(0xf5)]=null);},this['stopCheckVideoTimer']=function(_0x155019){var _0x361446=_0x233213;_0x155019[_0x361446(0xeb)]&&_0x155019[_0x361446(0xeb)]!=-0x1&&(this['trace']('close\x20check\x20video\x20device\x20timer,\x20timer_id\x20=\x20'+_0x155019['checkVideoTimer']),clearTimeout(_0x155019['checkVideoTimer']),_0x155019[_0x361446(0xeb)]=-0x1);},this[_0x233213(0xf0)]=function(_0x4b43cd){var _0x37bc6e=_0x233213;_0x4b43cd[_0x37bc6e(0xd9)]&&(_0x4b43cd[_0x37bc6e(0xd9)][_0x37bc6e(0xf2)]=![]);if(_0x4b43cd[_0x37bc6e(0xd1)]==0x3)this[_0x37bc6e(0xdc)](_0x4b43cd);else _0x4b43cd['media_type']==0x2?this[_0x37bc6e(0xd2)](_0x4b43cd):(this[_0x37bc6e(0xdc)](_0x4b43cd),this[_0x37bc6e(0xd2)](_0x4b43cd));};};CameraStreamController[a5_0x22af02(0xcf)][a5_0x22af02(0xe0)]=function(_0x234f8d,_0x3f28ca){var _0x530f91=a5_0x22af02;if(this[_0x530f91(0xdd)])return;this['pre_local_stream_launch']=!![],this['trace']('摄像头预热启动!\x20'+JSON[_0x530f91(0xd8)](_0x234f8d)+',\x20'+JSON[_0x530f91(0xd8)](_0x3f28ca)),this[_0x530f91(0xee)]=new Date()[_0x530f91(0xec)](),this['preOpenStream']=this[_0x530f91(0xdf)]({'audio':_0x234f8d,'video':_0x3f28ca});},CameraStreamController[a5_0x22af02(0xcf)]['GetStream']=function(_0xc94965){return new Promise((_0x34c16b,_0x12dbba)=>{var _0x3eb0a0=a5_0x5207;_0xc94965[_0x3eb0a0(0xf0)]=this[_0x3eb0a0(0xf0)][_0x3eb0a0(0xf3)](this);if(this[_0x3eb0a0(0xdd)]){this['trace']('use\x20pre\x20local\x20stream...'),this[_0x3eb0a0(0xe6)][_0x3eb0a0(0xd5)](function(_0x4c2f00){var _0x146a2a=_0x3eb0a0;let _0x28d21f=new Date()['getTime']()-this[_0x146a2a(0xee)];this['trace'](_0x146a2a(0xd4)+_0x28d21f),_0x34c16b({'mediaInfo':_0xc94965,'stream':_0x4c2f00}),this[_0x146a2a(0xdd)]=![];}['bind'](this))[_0x3eb0a0(0xea)](function(_0x2842e4){var _0x5b0b5b=_0x3eb0a0;this[_0x5b0b5b(0xe7)]('PreOpenLocalMedia\x20error\x20'+_0x2842e4[_0x5b0b5b(0xd0)]),this[_0x5b0b5b(0xdd)]=![];}[_0x3eb0a0(0xf3)](this));return;}this[_0x3eb0a0(0xdf)](_0xc94965[_0x3eb0a0(0xe1)])[_0x3eb0a0(0xd5)](function(_0x457b41){_0x34c16b({'mediaInfo':_0xc94965,'stream':_0x457b41});}[_0x3eb0a0(0xf3)](this))[_0x3eb0a0(0xea)](_0x12dbba);});};
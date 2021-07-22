document.write("<script type='text/javascript' src='lib/mcu.js'></script>");
/**
 * 轻量接入音视频通话web-sdk
 * @constructor
 */
var RtcRoomController = function() {


  this.trace = function(text) {
    console.log(this.gethhmmss() + ": " + text);
  };
  this.warning = function(text) {
    console.log("%c" + this.gethhmmss() + ": " + text, "color:red");
  };
  this.mcu_controller = new McuController();

  // 创建补0函数
  function timeFormat(s) {
    return s < 10 ? "0" + s : s;
  }

  this.gethhmmss = function() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let milliseconds = now.getMilliseconds();
    return `[${timeFormat(year)}-${timeFormat(month)}-${timeFormat(date)} ${timeFormat(hours)}:${timeFormat(minutes)}:${timeFormat(seconds)}.${timeFormat(milliseconds)}]`;
  };

  //初始化房间
  this.initRoom = function() {

    let basicConfig = this.basic_config;
    let room = basicConfig.room;
    let publish = basicConfig.publish;
    let subscribe = basicConfig.subscribe;
    let record = basicConfig.record;

    function setWeakBitrateLimit() {
      // 设置弱网码率告警
      let publishWeakBitrate = publish.publish_weak_bitrate;
      let subscribeWeakBitrate = subscribe.subscribe_weak_bitrate;
      let codecType = room.codec_type;
      let protoType = room.proto_type;
      this.SetPublishWeakBitrateLimit(publishWeakBitrate);
      this.SetSubscribeWeakBitrateLimit(subscribeWeakBitrate);
      this.SetLocalCodecType(codecType);
      this.SetLocalProtoType(protoType);
    }

    setWeakBitrateLimit.call(this);
    let publish_device = parseInt(publish.publish_device);
    let init_config = {};
    init_config.auto_publish_subscribe = parseInt(room.auto_publish_subscribe);
    let initPublish = publish.initPublish;
    let initSubscribe = subscribe.initSubscribe;
    let mediaType = parseInt(room.media_type);
    init_config.publish_device = publish_device;
    //是否需要实时音量值,默认为false
    init_config.need_volume_analyser = room.need_volume_analyser;
    init_config.video_profile_type = publish.video_profile_type;
    switch (init_config.auto_publish_subscribe) {
      case 1:
        //订阅的时候的参数
        init_config.initSubscribe = initSubscribe;
        break;
      case 2:
        //发布的时候的参数
        init_config.initPublish = initPublish;
        init_config.media_type = mediaType;

        break;
      case 3:
        init_config.media_type = mediaType;
        init_config.initPublish = initPublish;
        init_config.initSubscribe = initSubscribe;
        break;
      case 4:
        break;
      default:
        break;

    }
    //是否默认开始服务端录制,默认为false
    init_config.defaultRecord = record.defaultRecord;
    if (init_config.defaultRecord) {
      // 是否强依赖录制
      init_config.recordStrongDepend = record.recordStrongDepend;
      let recordParam = {};
      recordParam.width = record.width;
      recordParam.height = record.height;
      recordParam.fps = record.fps;
      recordParam.sampleRate = record.sampleRate;
      recordParam.channels = record.channels;
      recordParam.audioCodeRate = record.audioCodeRate;
      recordParam.splitType = record.splitType;
      recordParam.startTimeout = record.startTimeout;
      recordParam.recordTotalStream = record.recordTotalStream;
      init_config.recordParam = recordParam;
    }
    this.InitRoomConfig(init_config);
  }.bind(this);


  // 初始化长连接回调
  this.mcu_controller.OnConnectOK = function() {
    this.initRoom();
  }.bind(this);

  this.mcu_controller.OnConnectFailed = function(code, msg) {
    this.OnError(-1004, msg);
  }.bind(this);

  // 房间配置初始化OK
  this.mcu_controller.OnInitRoomConfigOK = function() {
    let basicConfig = this.basic_config;
    let room = basicConfig.room;
    let roomId = room.room_id;
    if (roomId) {
      let token = room.token;
      let engine = room.engine;
      this.JoinRoom(roomId, token, engine);
    } else {
      this.CreateRoom();
    }
  }.bind(this);

  // #################################################################################################################
  // #################################################################################################################
  // #################################################################################################################
  // ###################################轻量版轻量版轻量版轻量版轻量版###################################################
  // #################################################################################################################
  // #################################################################################################################
  // #################################################################################################################

  //本端发布成功
  this.mcu_controller.OnPublishSucc = function(sid) {
    this.OnMediaConnected(sid);
  }.bind(this);

  this.mcu_controller.OnMediaCallFail = function(code, msg) {
    this.OnError(code, msg);
  }.bind(this);

  this.mcu_controller.OnMediaClose = function(code, sid) {
    if (sid) {
      this.StopAsr(sid);
    }
    this.OnMediaClose(code, sid);
  }.bind(this);

  // 弱网回调接口
  this.mcu_controller.OnNetworkWeak = function(bpsVideoSend, bpsVideoRecv, sid) {
    this.OnNetworkWeak(bpsVideoSend, bpsVideoRecv, sid);
  }.bind(this);

  //推送'取消发布'给与会者
  this.mcu_controller.OnUnPublish = function(feed) {
    this.OnUnPublish(feed);
  }.bind(this);

  //推送'有新订阅'给与会者
  this.mcu_controller.OnNewSubscribe = function(subscriber, feed) {
    this.OnNewSubscribe(subscriber, feed);
  }.bind(this);

  //推送'取消订阅'给与会者
  this.mcu_controller.OnUnSubscribe = function(unsubscriber, feed) {
    this.OnUnSubscribe(unsubscriber, feed);
  }.bind(this);

  //订阅失败
  this.mcu_controller.OnSubscribeFailed = function(sid, code, msg) {
    this.OnError(code, msg);
  }.bind(this);

  //发布失败
  this.mcu_controller.OnPublishFailed = function(sid, code, msg) {
    this.trace(`OnPublishFailed sid=${sid},code=${code},msg=${msg}`);
    this.OnError(code, msg);
  }.bind(this);

  //push 新发布
  this.mcu_controller.OnNewPublish = function(feed) {
    this.OnNewPublish(feed);
  }.bind(this);

  // 获取签名
  this.mcu_controller.OnGetSign = function(bizName, subBiz, uid, workspaceId) {
    return this.OnGetSign(bizName, subBiz, uid, workspaceId);
  }.bind(this);

  this.mcu_controller.OnInitRoomConfigFail = function(code, msg) {
    this.OnError(-114, code + "_" + msg);
  }.bind(this);


  this.mcu_controller.OnJoinRoomSucc = function() {
    this.OnJoinRoomSucc();
  }.bind(this);

  this.mcu_controller.OnParticipantLeaveRoom = function(participant, exitType) {
    this.OnParticipantLeaveRoom(participant, exitType);
  }.bind(this);


  // 创建房间回调
  this.mcu_controller.OnCreateRoomSucc = function(room_id, rtoken) {
    this.OnCreateRoomSucc(room_id, rtoken);
  }.bind(this);

  //创建房间失败
  this.mcu_controller.OnCreateRoomFailed = function(code, msg) {
    this.OnError(-108, code + "_" + msg);
  }.bind(this);

  //加入房间失败处理
  this.mcu_controller.OnJoinRoomFailed = function(code, msg) {
    this.OnJoinRoomFailed(code, msg);
  }.bind(this);

  // 退出房间回调
  this.mcu_controller.OnLeaveRoom = function(leaveType) {
    this.OnLeaveRoom(leaveType);
  }.bind(this);

  // 邀请回调
  this.mcu_controller.OnInviteOK = function() {
    this.OnInviteOK();
  }.bind(this);

  this.mcu_controller.OnInviteFail = function(code, msg) {
    this.OnError(code, msg);
  }.bind(this);

  this.mcu_controller.OnReplyInviteFail = function(code, msg) {
    this.OnError(code, msg);
  }.bind(this);


  //推送'新加入房间者'给与会者
  this.mcu_controller.OnNewJoinerIn = function(participant) {
    this.OnNewJoinerIn(participant);
  }.bind(this);

  //推送'房间与会者列表'给新加入者
  this.mcu_controller.OnRoomAttendanceList = function(participants) {
    this.OnRoomAttendanceList(participants);
  }.bind(this);

  // 文字消息回调
  this.mcu_controller.OnReceiveTextMsg = function(source, msg) {
    this.OnReceiveTextMsg(source, msg);
  }.bind(this);

  // 发送失败
  this.mcu_controller.OnSendTextMsgFailed = function(msgId, code, msg) {
    this.OnError(code, msg);
  }.bind(this);

  //浏览器录制相关回调
  this.mcu_controller.OnClientStartRecordSuccess = function(clientRecordId) {
    this.OnClientStartRecordSuccess(clientRecordId);
  }.bind(this);

  this.mcu_controller.OnClientStartRecordFailed = function(clientRecordId, code, msg) {
    this.OnError(code, msg);
  }.bind(this);

  this.mcu_controller.OnClientStopRecordSuccess = function(videoURL, clientRecordBlob, clientRecordId) {
    this.OnClientStopRecordSuccess(videoURL, clientRecordBlob, clientRecordId);
  }.bind(this);

  this.mcu_controller.OnClientStopRecordFailed = function(clientRecordId, code, msg) {
    this.OnError(code, msg);
  }.bind(this);

  this.mcu_controller.OnClientDownloadRecordSuccess = function(clientRecordId) {
    this.OnClientDownloadRecordSuccess(clientRecordId);
  }.bind(this);

  this.mcu_controller.OnClientDownloadRecordFailed = function(clientRecordId, code, msg) {
    this.OnError(code, msg);
  }.bind(this);

  this.mcu_controller.OnClientPauseRecordSuccess = function(clientRecordId) {
    this.OnClientPauseRecordSuccess(clientRecordId);
  }.bind(this);

  this.mcu_controller.OnClientPauseRecordFailed = function(clientRecordId, code, msg) {
    this.OnError(code, msg);
  }.bind(this);

  this.mcu_controller.OnClientResumeRecordSuccess = function(clientRecordId) {
    this.OnClientResumeRecordSuccess(clientRecordId);
  }.bind(this);

  this.mcu_controller.OnClientResumeRecordFailed = function(clientRecordId, code, msg) {
    this.OnError(code, msg);
  }.bind(this);

  //开始录制成功,返回recordId
  this.mcu_controller.OnStartRemoteRecordSucc = function(record_id) {
    this.OnStartRemoteRecordSucc(record_id);
  }.bind(this);
  this.mcu_controller.OnStartRecordSucc = function(record_id) {this.OnStartRecordSucc(record_id);}.bind(this);// 【废弃】

  //录制初始化成功
  this.mcu_controller.OnInitRemoteRecordSucc = function(recordId) {
    this.OnInitRemoteRecordSucc(recordId);
  }.bind(this);
  this.mcu_controller.OnInitRecordSucc = function(recordId) {this.OnInitRecordSucc(recordId);}.bind(this);// 【废弃】

  //开始录制失败
  this.mcu_controller.OnStartRemoteRecordFailed = function(recordId, code, msg) {
    this.OnError(code, msg);
  }.bind(this);
  this.mcu_controller.OnStartRecordFailed = function(recordId, code, msg) {this.OnError(code, msg);}.bind(this);// 【废弃】

  //停止录制成功
  this.mcu_controller.OnStopRemoteRecordSucc = function(record_id) {
    this.OnStopRemoteRecordSucc(record_id);
  }.bind(this);
  this.mcu_controller.OnStopRecordSucc = function(record_id) {this.OnStopRecordSucc(record_id);}.bind(this);// 【废弃】

  //停止录制失败
  this.mcu_controller.OnStopRemoteRecordFailed = function(record_id, code, msg) {
    this.OnError(code, msg);
  }.bind(this);
  this.mcu_controller.OnStopRecordFailed = function(record_id, code, msg) {this.OnError(code, msg);}.bind(this);// 【废弃】

  //获取录制信息成功
  this.mcu_controller.OnRemoteRecordInfoSucc = function(recordInfo) {
    this.OnRemoteRecordInfoSucc(recordInfo);
  }.bind(this);
  this.mcu_controller.OnRecordInfoSucc = function(recordInfo) {this.OnRecordInfoSucc(recordInfo);}.bind(this);// 【废弃】

  //获取录制信息失败
  this.mcu_controller.OnRemoteRecordInfoFailed = function(record_id, code, msg) {
    this.trace(`OnRemoteRecordInfoFailed record_id=${record_id},code=${code},msg=${msg}`);
    this.OnError(code, msg);
  }.bind(this);
  this.mcu_controller.OnRecordInfoFailed = function(record_id, code, msg) {this.OnError(code, msg);}.bind(this);// 【废弃】

  //服务端录制出错
  this.mcu_controller.OnRemoteRecordingFailed = function(recordId, feedId, code, msg) {
    this.OnError(code, msg);
  }.bind(this);
  this.mcu_controller.OnRecordingFailed = function(recordId, feedId, code, msg) {this.OnError(code, msg);}.bind(this);// 【废弃】

  //录制结束后，通知端
  this.mcu_controller.OnRemoteRecordOver = function(recordId) {
    this.OnRemoteRecordOver(recordId);
  }.bind(this);
  this.mcu_controller.OnRecordOver = function(recordId) {this.OnRecordOver(recordId);}.bind(this);// 【废弃】

  //服务端暂停录制成功
  this.mcu_controller.OnPauseRemoteRecordSucc = function (record_id) {
      this.OnPauseRemoteRecordSucc(record_id);
  }.bind(this);

  //服务端暂停录制失败
  this.mcu_controller.OnPauseRemoteRecordFailed = function (record_id, code, msg) {
    this.OnError(code, msg);
  }.bind(this);

  //服务端继续录制成功
  this.mcu_controller.OnResumeRemoteRecordSucc = function (record_id) {
      this.OnResumeRemoteRecordSucc(record_id);
  }.bind(this);

  //服务端继续录制失败
  this.mcu_controller.OnResumeRemoteRecordFailed = function (record_id, code, msg) {
    this.OnError(code, msg);
  }.bind(this);


  this.mcu_controller.OnStartVodSuccess = function(file, vodId) {
    this.OnStartVodSuccess(file, vodId);
  }.bind(this);

  this.mcu_controller.OnStartVodFail = function(file, vodId, code, msg) {
    this.trace(`OnStartVodFail file=${file}, vodId=${vodId},code=${code},msg=${msg}`);
    this.OnError(code, msg);
  }.bind(this);

  this.mcu_controller.OnStopVodSuccess = function(vodId) {
    this.OnStopVodSuccess(vodId);
  }.bind(this);

  this.mcu_controller.OnStopVodFail = function(vodId, code, msg) {
    this.trace(`OnStopVodFail vodId=${vodId},code=${code},msg=${msg}`);
    this.OnError(code, msg);
  }.bind(this);

  //获取实时音量数据
  this.mcu_controller.OnVolumeAnalyser = function(sid, analyser) {
    this.OnVolumeAnalyser(sid, analyser);
  }.bind(this);

  //点播播放完后，需要通知座席
  this.mcu_controller.OnVodOver = function(vodId) {
    this.trace(`OnVodOver vodId=${vodId}`);
    this.OnVodOver(vodId);
  }.bind(this);

  // #########################################################
  // ####################### 以下方法 业务实现 #########################
  // #########################################################

  //视频通话出错时触发
  this.OnError = function(code, msg) {
    this.warning(`OnError code=${code},msg=${msg}`);
  };

  //本端视频发布成功
  this.OnMediaConnected = function(sid) {
    this.warning(`OnMediaConnected sid=${sid}`);
  };

  // 弱网回调接口
  this.OnNetworkWeak = function(bpsVideoSend, bpsVideoRecv, sid) {
    this.warning(`network is weak,sid = ${sid}, bpsVideoSend = ${bpsVideoSend}, bpsVideoRecv = ${bpsVideoRecv}`);
  };

  //推送'有新订阅'给与会者
  this.OnNewSubscribe = function(subscriber, feed) {
    feed = JSON.stringify(feed);
    this.trace(`~~~~~~~~~~~~~ OnNewSubscribe  push, subscriber=${subscriber},feed=${feed}`);
  };

  //推送'取消订阅'给与会者
  this.OnUnSubscribe = function(unsubscriber, feed) {
    feed = JSON.stringify(feed);
    this.trace(`~~~~~~~~~~~~~ OnUnSubscribe  push, unsubscriber=${unsubscriber},feed=${feed}`);
  };

  //加入房间成功
  this.OnJoinRoomSucc = function() {
    this.warning("~~~~~~~~~~~~~ join room succ!");
  };

  // 加入房间失败
  this.OnJoinRoomFailed = function(code, msg) {
    this.warning(`~~~~~~~~~~~~~ join room failed! code=${code},msg=${msg}`);
  }

  //房间与会者退出房间
  this.OnParticipantLeaveRoom = function(participant, exitType) {
    this.warning(`~~~~~~~~~~~~~ user ${participant} left room! exitType=${exitType}`);
  };

  // 创建房间成功回调
  this.OnCreateRoomSucc = function(room_id, rtoken) {
    this.warning(`~~~~~~~~~~~~~ create room succ! room_id: ${room_id}, rtoken: ${rtoken}`);
  };

  // 退出房间回调
  this.OnLeaveRoom = function(leaveType) {
    this.warning(`~~~~~~~~~~~~~ leave room! leaveType = ${leaveType}`);
  };

  //获取签名
  this.OnGetSign = function(bizName, subBiz, uid, workspaceId) {
    this.trace(`~~~~~~~~~~~~~OnGetSign  bizName=${bizName},subBiz=${subBiz},uid=${uid},workspaceId=${workspaceId}`);
    return "signature";
  };

  // 邀请成功回调
  this.OnInviteOK = function() {
    this.warning("~~~~~~~~~~~~~ invite OK!");
  };

  //获取实时音量数据
  this.OnVolumeAnalyser = function(sid, analyser) {
    this.trace(`OnVolumeAnalyser success, sid = ${sid}, analyser = ${analyser}`);
  };

  //点播播放完后，需要通知座席
  this.OnVodOver = function(vodId) {
    this.trace(`OnVodOver  vodId= ${vodId}`);
  };


  this.OnStartVodSuccess = function(file, vodId) {
    this.trace(`Response StartVod Success vodId= ${vodId},file= ${file}`);
  };

  this.OnStopVodSuccess = function(vodId) {
    this.trace(`Response StopVod Success vodId= ${vodId}`);
  };

  //推送音视频关闭
  this.OnMediaClose = function(code, sid) {
    this.warning(` media is close! code=${code},sid=${sid}`);
  };


  //推送'取消发布'给与会者
  this.OnUnPublish = function(feed) {
    feed = JSON.stringify(feed);
    this.trace(`~~~~~~~~~~~~~ OnUnPublish  push, feed=${feed}`);
  };


  //push 新发布
  this.OnNewPublish = function(feed) {
    this.trace("new publish push: " + feed);
  };

  //推送'新加入房间者'给与会者
  this.OnNewJoinerIn = function(participant) {
    this.trace(`~~~~~~~~~~~~~ OnNewJoinerIn  push, participant=${participant}`);
  };

  //推送'房间与会者列表'给新加入者
  this.OnRoomAttendanceList = function(participants) {
    participants = JSON.stringify(participants);
    this.trace(`~~~~~~~~~~~~~ OnRoomAttendanceList  push, participants=${participants}`);
  };

  //文字消息回调
  this.OnReceiveTextMsg = function(source, msg) {
    this.warning(`~~~~~~~~~~~~~ recv text msg from ${source}, msg: ${msg}`);
  };

  this.OnClientStartRecordSuccess = function(clientRecordId) {
    this.trace(`~~~~~~~~~~~~~ OnClientRecordSuccess,clientRecordId=${clientRecordId}`);
  };

  this.OnClientStopRecordSuccess = function(videoURL, clientRecordBlob, clientRecordId) {
    this.trace(`~~~~~~~~~~~~~ OnClientStopRecordSuccess,clientRecordId=${clientRecordId}`);
  };

  this.OnClientDownloadRecordSuccess = function(clientRecordId) {
    this.trace(`~~~~~~~~~~~~~ OnClientDownloadRecordSuccess,clientRecordId=${clientRecordId}`);
  };

  this.OnClientPauseRecordSuccess = function(clientRecordId) {
    this.trace(`~~~~~~~~~~~~~ OnClientPauseRecordSuccess,clientRecordId=${clientRecordId}`);
  };

  this.OnClientResumeRecordSuccess = function(clientRecordId) {
    this.trace(`~~~~~~~~~~~~~ OnClientResumeRecordSuccess,clientRecordId=${clientRecordId}`);
  };

  //服务端开始录制成功,返回recordId
  this.OnStartRemoteRecordSucc = function (record_id, record_third_id) {
      this.trace(`~~~~~~~~~~~~~ OnStartRemoteRecordSucc record_id=${record_id}, record_third_id=${record_third_id}`);
      this.OnStartRecordSucc(record_id, record_third_id);
  };
  this.OnStartRecordSucc = function (record_id, record_third_id) {};   //【废弃】

  //服务端录制初始化成功
  this.OnInitRemoteRecordSucc = function (record_id, record_third_id) {
      this.trace(`~~~~~~~~~~~~~ OnInitRemoteRecordSucc record_id=${record_id}, record_third_id=${record_third_id}`);
      this.OnInitRecordSucc(record_id, record_third_id);
  };
  this.OnInitRecordSucc = function (record_id, record_third_id) {};   //【废弃】

  //服务端停止录制成功
  this.OnStopRemoteRecordSucc = function (record_id) {
      this.trace(`~~~~~~~~~~~~~ OnStopRemoteRecordSucc record_id = ${record_id}`);
      this.OnStopRecordSucc(record_id);
  };
  this.OnStopRecordSucc = function (record_id) {};   //【废弃】

  //服务端获取录制信息成功
  this.OnRemoteRecordInfoSucc = function (recordInfo) {
      this.trace(`~~~~~~~~~~~~~ OnRemoteRecordInfoSucc recordInfo = ${recordInfo}`);
      this.OnRecordInfoSucc(recordInfo);
  };
  this.OnRecordInfoSucc = function (recordInfo) {};   //【废弃】

  //服务端录制结束后，通知端
  this.OnRemoteRecordOver = function (recordId) {
      this.trace(`OnRemoteRecordOver recordId= ${recordId}`);
      this.OnRecordOver();
  };
  this.OnRecordOver = function (recordId) {};   //【废弃】

  //服务端暂停录制成功
  this.OnPauseRemoteRecordSucc = function (record_id) {
      this.warning(`~~~~~~~~~~~~~ OnPauseRemoteRecordSucc record_id = ${record_id}`);
  }

  //服务端继续录制成功
  this.OnResumeRemoteRecordSucc = function (record_id) {
      this.warning(`~~~~~~~~~~~~~ OnResumeRemoteRecordSucc record_id = ${record_id}`);
  }

  // #########################################################
  // ####################### ASR相关 #########################
  // #########################################################

  //开启语音识别成功
  this.mcu_controller.OnStartAsrSuccess = function(sid, tag, sessionId) {
    this.OnStartAsrSuccess(sid, tag, sessionId);
  }.bind(this);

  //开启语音识别失败
  this.mcu_controller.OnStartAsrFailed = function(sid, code, msg, tag, sessionId) {
    this.OnError(code, msg);
  }.bind(this);

  //语音识别回调
  this.mcu_controller.OnAsrMessage = function(value, sid, tag, status, sessionId) {
    this.OnAsrMessage(value, sid, tag, status, sessionId);
  }.bind(this);

  //nul自然语言处理,人工智能
  this.mcu_controller.OnNluMessage = function(value, sid) {
    this.OnNluMessage(value, sid);
  }.bind(this);

  //关闭麦克风成功
  this.mcu_controller.OnStopAsrSuccess = function(sid, tag, sessionId) {
    this.OnStopAsrSuccess(sid, tag, sessionId);
  }.bind(this);

  //关闭麦克风失败
  this.mcu_controller.OnStopAsrFailed = function(sid, code, msg, tag, sessionId) {
    this.OnError(code, msg);
  }.bind(this);

  //长时间未识别异步通知
  this.mcu_controller.OnAsrMsgIdle = function(sid, tag, sessionId) {
    this.OnAsrMsgIdle(sid, tag, sessionId);
  }.bind(this);


  // #########################################################
  // ####################### ASR相关-异步回调 #########################
  // #########################################################

  this.OnStartAsrSuccess = function(sid, tag, sessionId) {
    this.trace(`Start Asr  is  success, sid=${sid}, tag=${tag}, sessionId=${sessionId}`);
  };

  this.OnAsrMessage = function(msg, sid, tag, status, sessionId) {
    this.trace(`OnAsrMessage is  success sid=${sid},msg=${msg},tag=${tag},status=${status}, sessionId=${sessionId}`);
  };

  //nul自然语言处理,人工智能
  this.OnNluMessage = function(msg, sid) {
    this.trace(`OnNluMessage is  success sid=${sid},msg=${msg}`);
  };

  //关闭麦克风成功
  this.OnStopAsrSuccess = function(sid, tag, sessionId) {
    this.trace(` OnStopAsrSuccess sid=${sid},tag=${tag},sessionId=${sessionId}`);
  };

  this.OnAsrMsgIdle = function(sid, tag, sessionId) {
    this.trace(`OnAsrMsgIdle sid=${sid},tag=${tag}, sessionId=${sessionId}`);
  };


};

//主调接口
/**
 * @memberof RtcRoomController
 * 开启音视频
 */
RtcRoomController.prototype.Start = function(config_param) {

  this.trace(`StartMedia config_param=${JSON.stringify(config_param)}`);
  this.basic_config = config_param;

  let room = config_param.room;
  let uid = room.uid;
  let biz_name = room.biz_name;
  let sub_biz = room.sub_biz ? room.sub_biz : room.appId;
  let room_server_url = room.room_server_url;
  let network_check_timeout = room.network_check_timeout;

  if (!config_param || !room || !uid || !biz_name || !sub_biz || !room_server_url) {
    this.OnError(-103, "Connect param invalid");
    return;
  }

  let connect_param = {};
  connect_param.uid = uid;
  connect_param.biz_name = biz_name;
  connect_param.sub_biz = sub_biz;
  connect_param.room_server_url = room_server_url;
  connect_param.network_check_timeout = network_check_timeout;

  this.mcu_controller.Connect(connect_param);
};


/**
 * @memberof RtcRoomController
 * @brief
 *
 * 初始化房间配置
 */
RtcRoomController.prototype.InitRoomConfig = function(config_param) {
  this.mcu_controller.InitRoomConfig(config_param);
};

/**
 * @memberof RtcRoomController
 * @brief
 * 创建房间
 * @param
 */
RtcRoomController.prototype.CreateRoom = function() {
  return this.mcu_controller.CreateRoom();
};


/**
 * @memberof RtcRoomController
 * @brief
 * 加入房间
 * @param
 * room_id_: 房间id
 * rtoken: 房间密码
 */
RtcRoomController.prototype.JoinRoom = function(roomId, token, engine) {
  return this.mcu_controller.JoinRoom(roomId, token, engine);
};


/**
 * @memberof RtcRoomController
 * @brief
 * 邀请加入房间
 */
RtcRoomController.prototype.Invite = function(invitee, invitationChannelType, invitationLink) {

  return this.mcu_controller.Invite(invitee, invitationChannelType, invitationLink);

};


/**
 * @memberof RtcRoomController
 * @brief
 * 离开房间
 */
RtcRoomController.prototype.LeaveRoom = function() {
  return this.mcu_controller.LeaveRoom();
};

/**
 * @memberof RtcRoomController
 * @brief
 * 取消发布媒体流
 */
RtcRoomController.prototype.UnPublish = function(sid) {
  this.mcu_controller.UnPublish(sid);
};


/**
 * @memberof RtcRoomController
 * @brief
 * 取消订阅媒体流
 */
RtcRoomController.prototype.UnSubscribe = function(sid) {
  this.mcu_controller.UnSubscribe(sid);
};

/**
 * @memberof RtcRoomController
 * @brief
 * 设置本地音频开启状态
 * @param
 */
RtcRoomController.prototype.SetLocalAudioEnable = function(enabled, sid) {
  this.mcu_controller.SetLocalAudioEnable(enabled, sid);
};


/**
 * @memberof RtcRoomController
 * @brief
 * 设置本地视频开启状态
 * @param
 */
RtcRoomController.prototype.SetLocalVideoEnable = function(enabled, sid) {
  this.mcu_controller.SetLocalVideoEnable(enabled, sid);
};


/**
 * @memberof RtcRoomController
 * @brief
 * 设置发布弱网码率下限
 * @param
 */
RtcRoomController.prototype.SetPublishWeakBitrateLimit = function(bitrate) {

  return this.mcu_controller.SetPublishWeakBitrateLimit(bitrate);
};


/**
 * @memberof RtcRoomController
 * @brief
 * 设置订阅弱网码率下限
 * @param
 */
RtcRoomController.prototype.SetSubscribeWeakBitrateLimit = function(bitrate) {

  return this.mcu_controller.SetSubscribeWeakBitrateLimit(bitrate);
};


/**
 * @memberof RtcRoomController
 * @brief
 * 设置视频编码格式
 * @param
 */
RtcRoomController.prototype.SetLocalCodecType = function(codec_type) {

  return this.mcu_controller.SetLocalCodecType(codec_type);
};

/**
 * @memberof RtcRoomController
 * @brief
 * 设置音视频传输协议类型
 * @param
 */
RtcRoomController.prototype.SetLocalProtoType = function(proto_type) {
  return this.mcu_controller.SetLocalProtoType(proto_type);
};


/**
 * @memberof RtcRoomController
 * @brief
 * 截图
 * @param
 * type = 0；切坐席图像；type = 1：切远端图像
 * width:图像宽度
 * height: 图像高度
 */
RtcRoomController.prototype.TakePicture = function(type, width, height, sid, picture_type) {

  return this.mcu_controller.TakePicture(type, width, height, sid, picture_type);

};


/**
 * @memberof RtcRoomController
 * @brief
 * 开始录制视频
 * @param
 * targetType : 本地视频（0）或者远端视频（1）
 * mediaType : 录制轨道类型
 * record_id : 录制id
 */
RtcRoomController.prototype.StartRecord = function(recordType, mediaType, recordId, publish_sid, subscribe_sid, timeSlice) {

  return this.mcu_controller.StartRecord(recordType, mediaType, recordId, publish_sid, subscribe_sid, timeSlice);

};

/**
 * @memberof RtcRoomController
 * @brief
 * 结束录制视频
 * @param
 * record_id 录制id
 * @return
 * 返回blob数据
 */
RtcRoomController.prototype.StopRecord = function(record_id) {

  this.mcu_controller.StopRecord(record_id);
};

/**
 * @memberof RtcRoomController
 * @brief
 * 下载录制视频
 * @param
 * record_id 录制id
 * fileName 录制文件存储文件名
 * @return
 */
RtcRoomController.prototype.DownloadRecord = function(record_id, file_name) {

  this.mcu_controller.DownloadRecord(record_id, file_name);
};


/**
 * @memberof RtcRoomController
 * @brief
 * 暂停录制视频
 * @param
 * record_id 录制id
 * @return
 */
RtcRoomController.prototype.PauseRecord = function(record_id) {
  this.mcu_controller.PauseRecord(record_id);
};


/**
 * @memberof RtcRoomController
 * @brief
 * 恢复录制视频
 * @param
 * record_id 录制id
 * @return
 */
RtcRoomController.prototype.ResumeRecord = function(record_id) {
  this.mcu_controller.ResumeRecord(record_id);
};

/**
 * @memberof RtcRoomController
 * @brief
 * 开始服务端录制
 * @return
 */
RtcRoomController.prototype.StartRemoteRecord = function(filePath, recordParam) {

  this.mcu_controller.StartRemoteRecord(filePath, recordParam);
};


/**
 * @memberof RtcRoomController
 * @brief
 * 结束服务端录制
 * @return
 */
RtcRoomController.prototype.StopRemoteRecord = function(recordId) {

  this.mcu_controller.StopRemoteRecord(recordId);
};


/**
 * @memberof RtcRoomController
 * 获取录制信息
 */
RtcRoomController.prototype.GetRecordInfo = function(recordId, roomId, splitType) {

  this.mcu_controller.GetRecordInfo(recordId, roomId, splitType);
};


/**
 * @memberof RtcRoomController
 * @brief
 * 发送消息 文字聊天  发送文字消息
 *  participants   发送目标id(List)
 * @param
 *
 */
RtcRoomController.prototype.SendTextMsg = function(msg, participants) {

  return this.mcu_controller.SendTextMsg(msg, participants);
};


/**
 * @memberof RtcRoomController
 * 修改自动发布订阅模式
 */
RtcRoomController.prototype.ChangeAutoPublishOrSubscribe = function(auto_publish_subscribe) {
  this.mcu_controller.ChangeAutoPublishOrSubscribe(auto_publish_subscribe);
};


/**
 * @memberof RtcRoomController
 * 开启点播
 */
RtcRoomController.prototype.StartVod = function(vodParams) {

  this.mcu_controller.StartVod(vodParams);
};

/**
 * @memberof RtcRoomController
 * 停止点播
 */
RtcRoomController.prototype.StopVod = function(vodId) {

  this.mcu_controller.StopVod(vodId);
};

/**
 * @memberof RtcRoomController
 * 开始语音识别
 */
RtcRoomController.prototype.StartAsr = function(config_param) {
  this.mcu_controller.StartAsr(config_param);
};


/**
 * @memberof RtcRoomController
 * 停止语音识别
 */
RtcRoomController.prototype.StopAsr = function(sid) {

  this.mcu_controller.StopAsr(sid);

};

/**
 * @memberof RtcRoomController
 * 错误上报
 */
RtcRoomController.prototype.DownloadLog = function() {
  this.mcu_controller.DownloadLog();
};


/**
 * @memberof RtcRoomController
 * @brief
 * 关闭连接
 */
RtcRoomController.prototype.Stop = function() {
  return this.mcu_controller.Disconnect();
};
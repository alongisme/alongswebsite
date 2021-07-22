var BandwidthHandler = (function() {
    function setBAS(sdp, bandwidth, isScreen) {
        if (!!navigator.mozGetUserMedia || !bandwidth) {
            return sdp;
        }

        if (isScreen) {
            if (!bandwidth.screen) {
                console.warn("It seems that you are not using bandwidth for screen. Screen sharing is expected to fail.");
            } else if (bandwidth.screen < 300) {
                console.warn("It seems that you are using wrong bandwidth value for screen. Screen sharing is expected to fail.");
            }
        }

        // if screen; must use at least 300kbs
        if (bandwidth.screen && isScreen) {
            sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g, "");
            sdp = sdp.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + bandwidth.screen + "\r\n");
        }

        // remove existing bandwidth lines
        if (bandwidth.audio || bandwidth.video || bandwidth.data) {
            sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g, "");
        }

        if (bandwidth.audio) {
            sdp = sdp.replace(/a=mid:audio\r\n/g, "a=mid:audio\r\nb=AS:" + bandwidth.audio + "\r\n");
        }

        if (bandwidth.video) {
            sdp = sdp.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + (isScreen ? bandwidth.screen : bandwidth.video) + "\r\n");
        }

        return sdp;
    }


    // add by insing，增加vp8信息
    function addVP8Info(sdp, bandwidth, isScreen) {
        if (!!navigator.mozGetUserMedia || !bandwidth) {
            return sdp;
        }

        if (isScreen) {
            if (!bandwidth.screen) {
                console.warn("It seems that you are not using bandwidth for screen. Screen sharing is expected to fail.");
            } else if (bandwidth.screen < 300) {
                console.warn("It seems that you are using wrong bandwidth value for screen. Screen sharing is expected to fail.");
            }
        }

        // if screen; must use at least 300kbs
        if (bandwidth.screen && isScreen) {
            sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g, "");
            sdp = sdp.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + bandwidth.screen + "\r\n");
        }

        return sdp;
    }


    // Find the line in sdpLines that starts with |prefix|, and, if specified,
    // contains |substr| (case-insensitive search).
    function findLine(sdpLines, prefix, substr) {
        return findLineInRange(sdpLines, 0, -1, prefix, substr);
    }

    // Find the line in sdpLines[startLine...endLine - 1] that starts with |prefix|
    // and, if specified, contains |substr| (case-insensitive search).
    function findLineInRange(sdpLines, startLine, endLine, prefix, substr) {
        var realEndLine = endLine !== -1 ? endLine : sdpLines.length;
        for (var i = startLine; i < realEndLine; ++i) {
            if (sdpLines[i].indexOf(prefix) === 0) {
                if (!substr ||
                    sdpLines[i].toLowerCase().indexOf(substr.toLowerCase()) !== -1) {
                    return i;
                }
            }
        }
        return null;
    }

    // Gets the codec payload type from an a=rtpmap:X line.
    function getCodecPayloadType(sdpLine) {
        var pattern = new RegExp("a=rtpmap:(\\d+) \\w+\\/\\d+");
        var result = sdpLine.match(pattern);
        return (result && result.length === 2) ? result[1] : null;
    }


    function setEncodeType(sdp, type) {
        var sdpLines = sdp.split("\r\n");

        // 获取将要设置的编解码类型对应的序号
        var code_type =  type + "/90000";
        var index = findLine(sdpLines, "a=rtpmap", code_type);
        if (!index) {
            console.log("this device can't support " + type);
            return sdp;
        }
        var payload_number = getCodecPayloadType(sdpLines[index]);

        // 获取video支持编解码类型序号集
        var video_attr = "m=video 9 UDP/TLS/RTP/SAVPF ";
        index = findLine(sdpLines, "m=video", video_attr);
        if (!index) {
            console.log("this device can't support video");
            return sdp;
        }
        var video_payload_line = sdpLines[index];
        var video_payloads = video_payload_line.substring(video_attr.length);
        var video_payload_arr = video_payloads.split(" ");
        var length = video_payload_arr.length;

        var new_payload_number_arr = payload_number;
        for (var i = 0; i < length; i++) {
            if (video_payload_arr[i] != payload_number) {
                new_payload_number_arr += " " + video_payload_arr[i];
            }
        }
        var new_encode_string = video_attr + new_payload_number_arr;
        sdp = sdp.replace(video_payload_line, new_encode_string);
        return sdp;
    }

    function addEncodeType(sdp, type, number) {
        var sdpLines = sdp.split("\r\n");

        // 检查是否已经支持对应type
        var replace_type = type + "/90000";
        var index = findLine(sdpLines, "a=rtpmap", replace_type);
        if (index) {
            console.log("sdp alreay support " + type);
            return sdp;
        }

        // 获取video支持编解码类型序号集
        var video_attr = "m=video 9 UDP/TLS/RTP/SAVPF ";
        index = findLine(sdpLines, "m=video", video_attr);
        if (!index) {
            console.log("sdp can not support video");
            return sdp;
        }

        var video_payload_line = sdpLines[index];
        var video_payloads = video_payload_line.substring(video_attr.length);
        var video_payload_arr = video_payloads.split(" ");
        var sel_payload_number = video_payload_arr[0];
        var index = findLine(sdpLines, "a=rtpmap:" + sel_payload_number, "/90000");
        var sel_payload_str;
        if (!index) {
            console.log("this device can't support " + sel_payload_number);
            return sdp;
        }
        sel_payload_str = sdpLines[index];

        // 末尾加上对应type的序号
        var new_video_payload_str = video_payload_line + " " + number;
        sdp = sdp.replace(video_payload_line, new_video_payload_str);

        // 增加对应type的rtpmap
        var demo_payload = "a=rtpmap:96 VP8/90000\r\na=rtcp-fb:96 goog-remb\r\na=rtcp-fb:96 transport-cc\r\na=rtcp-fb:96 ccm fir\r\na=rtcp-fb:96 nack\r\na=rtcp-fb:96 nack pli";
        var replace_str = demo_payload.replace(/96/g, number).replace("VP8", type);
        console.log("new type str = " + replace_str);
        replace_str = replace_str + "\r\n" + sel_payload_str;
        sdp = sdp.replace(sel_payload_str, replace_str);

        return sdp;
    }

    function setVideoBitrates(sdp, params) {
        params = params || {};
        var xgoogle_min_bitrate = params.min;
        var xgoogle_max_bitrate = params.max;

        var sdpLines = sdp.split("\r\n");

        // add by yixin 20161201
        var video_attr = "m=video 9 UDP/TLS/RTP/SAVPF ";
        index = findLine(sdpLines, "m=video", video_attr);
        var video_payload_line = sdpLines[index];
        var video_payloads = video_payload_line.substring(video_attr.length);
        var video_payload_arr = video_payloads.split(" ");
        var first_payload =  video_payload_arr[0];

        // add by yixin 20161201
        var bit_string = "a=fmtp:" + first_payload +  " x-google-min-bitrate=" + xgoogle_min_bitrate + "; x-google-max-bitrate=" +xgoogle_max_bitrate;
        var pay_load_attr = "a=fmtp:" + first_payload;
        var n_pos = sdp.indexOf(pay_load_attr);

        if (n_pos == -1) {
            var n_pos_v = sdp.indexOf("a=mid:video");
            var n_pos2 = sdp.indexOf("fmtp:", n_pos_v + 10);
            if (n_pos2 != -1) {
                var n_pos3 = sdp.indexOf("\r\n", n_pos2 + 5);
                var sub_str = sdp.substring(n_pos2, n_pos3 + 2);
                // this.trace("remote sub str = " + sub_str);
                var new_str = sub_str + bit_string + "\r\n";
                // this.trace("remote sub new string = " + new_str);
                sdp = sdp.replace(sub_str, new_str);
                return sdp;
            } else {
                // this.trace("offer sdp if error!");
                return;
            }
        } else {
            var n_pos2 = sdp.indexOf("\r\n", n_pos + 8);
            var sub_str = sdp.substring(n_pos, n_pos2);

            // 后面没有其它属性
            if (sub_str == pay_load_attr) {
                var rep_str = sub_str + " x-google-min-bitrate=" + xgoogle_min_bitrate + ";x-google-max-bitrate=" + xgoogle_max_bitrate;
                sdp = sdp.replace(sub_str, rep_str);
            } else {
                if (sub_str.indexOf("x-google-min-bitrate") != -1) {
                    return sdp;
                }
                else {
                    var rep_str = sub_str + ";x-google-min-bitrate=" + xgoogle_min_bitrate + ";x-google-max-bitrate=" + xgoogle_max_bitrate;
                    // var rep_str = bit_string;
                    sdp = sdp.replace(sub_str, rep_str);
                }
            }
            return sdp;

        }

    }

    function setOpusAttributes(sdp, params) {
        params = params || {};
        var sdpLines = sdp.split("\r\n");

        // Opus
        var opusIndex = findLine(sdpLines, "a=rtpmap", "opus/48000");
        var opusPayload;
        if (opusIndex) {
            opusPayload = getCodecPayloadType(sdpLines[opusIndex]);
        }

        if (!opusPayload) {
            return sdp;
        }

        var opusFmtpLineIndex = findLine(sdpLines, "a=fmtp:" + opusPayload.toString());
        if (opusFmtpLineIndex === null) {
            return sdp;
        }

        var appendOpusNext = "";
        /* del by insing
        appendOpusNext += '; stereo=' + (typeof params.stereo != 'undefined' ? params.stereo : '1');
        appendOpusNext += '; sprop-stereo=' + (typeof params['sprop-stereo'] != 'undefined' ? params['sprop-stereo'] : '1');
        */

        if (typeof params.maxaveragebitrate != "undefined") {
            appendOpusNext += "; maxaveragebitrate=" + (params.maxaveragebitrate || 128 * 1024 * 8);
        }

        if (typeof params.maxplaybackrate != "undefined") {
            appendOpusNext += ";maxplaybackrate=" + (params.maxplaybackrate || 128 * 1024 * 8);
        }

        if (typeof params.cbr != "undefined") {
            appendOpusNext += "; cbr=" + (typeof params.cbr != "undefined" ? params.cbr : "1");
        }

        if (typeof params.useinbandfec != "undefined") {
            appendOpusNext += "; useinbandfec=" + params.useinbandfec;
        }

        if (typeof params.usedtx != "undefined") {
            appendOpusNext += "; usedtx=" + params.usedtx;
        }

        /*
        if (typeof params.maxptime != 'undefined') {
            appendOpusNext += '\r\na=maxptime:' + params.maxptime;
        }

        if (typeof params.minptime != 'undefined') {
            appendOpusNext += '\r\na=minptime:' + params.minptime;
        }
        */

        sdpLines[opusFmtpLineIndex] = sdpLines[opusFmtpLineIndex].concat(appendOpusNext);

        sdp = sdpLines.join("\r\n");
        return sdp;
    }

    return {
        setApplicationSpecificBandwidth: function(sdp, bandwidth, isScreen) {
            return setBAS(sdp, bandwidth, isScreen);
        },
        setVideoBitrates: function(sdp, params) {
            return setVideoBitrates(sdp, params);
        },
        setOpusAttributes: function(sdp, params) {
            return setOpusAttributes(sdp, params);
        },
        setEncodeType: function(sdp, type) {
            return setEncodeType(sdp, type);
        },
        addEncodeType: function(sdp, type, number) {
            return addEncodeType(sdp, type, number);
        },
        findLine: function(sdpLines, prefix, substr) {
            return findLine(sdpLines, prefix, substr);
        }

    };
})();

(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45d64a86"],{"0056":function(t,e,n){"use strict";n("d53d")},"02f4":function(t,e,n){var r=n("4588"),i=n("be13");t.exports=function(t){return function(e,n){var o,a,c=String(i(e)),s=r(n),l=c.length;return s<0||s>=l?t?"":void 0:(o=c.charCodeAt(s),o<55296||o>56319||s+1===l||(a=c.charCodeAt(s+1))<56320||a>57343?t?c.charAt(s):o:t?c.slice(s,s+2):a-56320+(o-55296<<10)+65536)}}},"0390":function(t,e,n){"use strict";var r=n("02f4")(!0);t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},"0bfb":function(t,e,n){"use strict";var r=n("cb7c");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"20fd":function(t,e,n){"use strict";var r=n("d9f6"),i=n("aebd");t.exports=function(t,e,n){e in t?r.f(t,e,i(0,n)):t[e]=n}},"214f":function(t,e,n){"use strict";n("b0c5");var r=n("2aba"),i=n("32e9"),o=n("79e5"),a=n("be13"),c=n("2b4c"),s=n("520a"),l=c("species"),u=!o((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),f=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();t.exports=function(t,e,n){var d=c(t),v=!o((function(){var e={};return e[d]=function(){return 7},7!=""[t](e)})),g=v?!o((function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[l]=function(){return n}),n[d](""),!e})):void 0;if(!v||!g||"replace"===t&&!u||"split"===t&&!f){var A=/./[d],h=n(a,d,""[t],(function(t,e,n,r,i){return e.exec===s?v&&!i?{done:!0,value:A.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}})),p=h[0],b=h[1];r(String.prototype,t,p),i(RegExp.prototype,d,2==e?function(t,e){return b.call(t,this,e)}:function(t){return b.call(t,this)})}}},"268f":function(t,e,n){t.exports=n("fde4")},"277f":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADbElEQVRIS7WWW2hcVRSG/7UmMU4oDqQYEMQEHUk6hWTOPiJ4Y8ahUrz0oQZFxAfJg5BCkRCLD62KIogR++AFUah4eZGhWgUvLyEd0IyI2etkJiQQie2oWIoPgVSFTObMWbLTpoxJJh1T3I/7nLW+9a8bm/A/H2rFfzKZvC6RSORU9VYiUlVdWFlZOT0/P//Xley3BaRSqWvi8fgxVR0lol0bnF1Q1XEReRVA2AzUFJBKpXbF4/FvANwN4Osoit5l5pl6vc7M7AE4RET7VHViaWnpQKVSWdkK0hRgjMkDGAIwIiLvOeNCoXBEVWOqeiqXyy0YY0YBvA7gAxEZbhngeV6GmQuXUvCsM8zn87Hu7u4zqnqTS4mqHs3lcuPGmLddEKp6exAE0xshWyowxnxMRA8vLy/fsLi4eKHRaGJi4mZmfpOI7lfVh8bGxn5k5t8BnLDWjrQE8H1/QVV/E5F9W8kuFovxarV6lohsNpt90Pf9H1zqROS2VgHnVbUgIo81647JyclPmbk/m83u9X3/K1XtE5Fkq4Cyqv4pInc1A0xNTfWEYdiVyWQCY0wJwN8icmdLAFc4InoqiqKeIAjObTdMxhgX9U8AXhORtYZoPFsWeXBwcG9bW5uLKm+tfXwbABljvgCwv1ar7ZmdnT3TEsD9ZIwZJ6IjAN4A8Iy1ttZo3Nvbe21XV5dT6vr/BWvtSy3PgVsRHR0dbj28QheXz88A3o+iqMTM7sqo6jAR9QCoR1E0mkgk3ikUCptWxqYU+b7vBumUE6Gq3wP4EsATRLRnQ4QC4CSARwGkVbWoqo9srNm/AAMDAze2t7cXAeyOomgkCIKP1p36vn+LqiaZOXLb1Fr766Vvrg6HABwnokqtVrunXC7/sW7XCGBjzLdOfhiG95VKpe+utIobv6fT6QdisZgr+KS1dv8mgOd5w8x8gogOT09Pv/VfnDeofB7Ai6o6JCKfufvLCnzfLwOIW2v7AEQ7ASSTyY5EIvGLS6GIZC4DPM/rYeYKgOestS/vxPm6jTHmOICnq9Xq9XNzc0trCowxB4nIScpZa09fDcDzvCFmPlmv1++dmZkprAHW8x+GYV+pVHJjv+Pjed4dzOw68aC19vM1QH9//+7Ozs4DIvIhAN2x94uGbel0+snV1dVP3KOgpVfF1QD/Abf7fCgVgoJHAAAAAElFTkSuQmCC"},"32a6":function(t,e,n){var r=n("241e"),i=n("c3a1");n("ce7e")("keys",(function(){return function(t){return i(r(t))}}))},"454f":function(t,e,n){n("46a7");var r=n("584a").Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},"46a7":function(t,e,n){var r=n("63b6");r(r.S+r.F*!n("8e60"),"Object",{defineProperty:n("d9f6").f})},"520a":function(t,e,n){"use strict";var r=n("0bfb"),i=RegExp.prototype.exec,o=String.prototype.replace,a=i,c="lastIndex",s=function(){var t=/a/,e=/b*/g;return i.call(t,"a"),i.call(e,"a"),0!==t[c]||0!==e[c]}(),l=void 0!==/()??/.exec("")[1],u=s||l;u&&(a=function(t){var e,n,a,u,f=this;return l&&(n=new RegExp("^"+f.source+"$(?!\\s)",r.call(f))),s&&(e=f[c]),a=i.call(f,t),s&&a&&(f[c]=f.global?a.index+a[0].length:e),l&&a&&a.length>1&&o.call(a[0],n,(function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(a[u]=void 0)})),a}),t.exports=a},5372:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return i}));n("a481");var r=function(t){if("游客"!=t&&void 0!=t){var e;console.info("getHideName_str",t);var n=/^0?1[3|4|5|6|7|8][0-9]\d{8}$/.test(t);if(n){var r=/(\d{3})\d*(\d{4})/;e=t.replace(r,"$1****$2")}else e=t.length<=3?"*"+t.substring(1,2):t.length>3&&t.length<=6?"**"+t.substring(2,5):t.substring(0,2)+"****"+t.substring(7);return e}return t},i=function(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;return function(){var r=this,i=arguments;e&&clearTimeout(e),e=setTimeout((function(){t.apply(r,i)}),n)}}},"5bba":function(t,e,n){n("9d98");var r=n("584a").Object;t.exports=function(t,e){return r.defineProperties(t,e)}},"5e83":function(t,e,n){t.exports=n("8580")},"5f1b":function(t,e,n){"use strict";var r=n("23c6"),i=RegExp.prototype.exec;t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var o=n.call(t,e);if("object"!==typeof o)throw new TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==r(t))throw new TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},"7d0b":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAADE0lEQVQ4T52Uz2sVVxTHv995yXuGbqSCQdNasVTUiC2IIK6LxVZFQWjrRgQVf2Fe+t7MzSTWBmrM3Dv5Ba0iQenOuihU/IX6D7hRN2oQFyIapUoX6SJtknlzj1yZ93hRE7VnM8y953zuOed+7yHeYm1tbc2NjY2LnVuhUBjt6el5MlsIZ9sMw3CetXYUwJzMT0j6URT1zxT3GjAIgr0kdwE4DeBLAFsBBCQfi8hPAD4E8KOIfAHghjHmt3r4NKBSKhaREsl/AXwgIimAY8aYIy6oXC6vyuVylwB8JCIuW7fcq7XuqkJrwCyzEyJyJkmS3U1NTZ8mSfJ3HMd/1WfQ3d2dHx8fX0HyOQBDcruI7DbGuIpQD/yT5OapqalFg4OD0xpfLpfnO+e+vj4HqVl7e3tLPp9/BOCC1nrLNKBSagOASyKyxRhz3m12dHSsF5EBAK0Z5S7JH6Iouub+gyDYTPKctXZjHMeXa8AwDJdaa4+KyLY0TVf29/ePZDDXL5dBtfE7ASwi+Y2DKqVaReQ2yT+SJDk8MDBwn8VicUE+n39M0hORPmNM4E5SSt0B0DQ5Obl6aGhozK0Vi8W5hULhJoD/tNYrM78YQElE7MvDgiBYS/I6gINa6+PZbc7P5XLPnDy01kfr+6aUOgzg5zRNm6s9VUodAPCr53nrakBr7fY4jn//P0Df97/3PO9Mmqbr2NXV1VKpVJxo/xGR/VXoe5T8HQAnt7kvS3YZ+b7/LckOkstFZIkx5um7XEoQBAsBPCB5D0CktT5b06FS6isAV6y1m+I4vvgusgnDcKO19jzJr6MouvKqDocAHPI8b0Vvb687sWYzCTsMw2XW2hER+cUY0zYN6Pv+HpInAZwdGxvbMTw8nLxporinNzEx0WqtdSqY+elVNZUNh4cAFgB46v6NMefqhoN7ES0AJDtQa63D14ZDdUEptQ/AEZJXRWQNgM9EZB/JcbcOYF72/ZzkrSiKTtVXMuuALZVKnzQ0NNwHkM+C3NRSxhj3Ot5oswJdRGdnZ3OlUvkYQAOAUWOMm+Az2gvCkZlXCvFPGQAAAABJRU5ErkJggg=="},8580:function(t,e,n){n("ee6d"),t.exports=n("584a").Object.getOwnPropertyDescriptors},"85f2":function(t,e,n){t.exports=n("454f")},8861:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tellerDetail"},[t.showVideo?t._e():[n("div",{staticClass:"bag"},[n("Header",{attrs:{title:t.title,"left-flow":!0},on:{goback:t.goback}}),t._v(" "),n("div",{staticClass:"heaer_img"},[n("div",{staticClass:"img_box"},[n("img",{attrs:{src:t.imgUrl,alt:""}})]),t._v(" "),n("div",{staticClass:"name"},[n("div",{staticClass:"left"},[n("p",[t._v(t._s(t.tellerInfo.name))]),t._v(" "),n("p",{staticClass:"gary"},[t._v(t._s(t.tellerInfo.concernState)+"位粉丝")])]),t._v(" "),n("div",{staticClass:"button",class:{button_ccc:1==t.tellerInfo.concernState},on:{click:t.attention}},[t._v("\n            "+t._s(1==t.tellerInfo.concernState?"已关注":"关注")+"\n          ")])])])],1),t._v(" "),n("div",{staticClass:"playback"},[n("div",{staticClass:"title_text"},[t._v("\n        直播回放\n      ")]),t._v(" "),n("div",{ref:"wire",staticClass:"list"},t._l(t.tellerVideoList,(function(e,r){return n("div",{key:r+1,staticClass:"list_item"},[n("div",{staticClass:"left"},[n("div",{staticClass:"ball"}),t._v(" "),n("div",{staticClass:"wire_box"},[n("div",{staticClass:"wire",style:{height:180*e.records.length+"px"}})])]),t._v(" "),n("div",{staticClass:"right"},[n("div",{staticClass:"time"},[n("p",[t._v(t._s(e.ymd))]),t._v(" "),n("p",[t._v(t._s(e.hi))])]),t._v(" "),n("div",{staticClass:"title"},[t._v("\n              "+t._s(e.title)+"\n            ")]),t._v(" "),t._l(e.records,(function(r,i){return n("div",{key:i+1,staticClass:"video_box",on:{click:function(e){return t.videoPlay(r)}}},[n("img",{attrs:{src:e.snapshot,alt:""}}),t._v(" "),n("div",{staticClass:"bottom"},[n("div",{staticClass:"amount"},[t._m(0,!0),t._v(" "),n("div",[t._v(t._s(e.hot))])]),t._v(" "),n("div",{staticClass:"duration"},[t._v("\n                  "+t._s(r.times)+"\n                ")])])])}))],2)])})),0)])],t._v(" "),t.showVideo?n("div",{staticClass:"videoBox"},[n("video",{staticClass:"video",attrs:{src:t.video_src,controls:"controls",autoplay:"autoplay"}}),t._v(" "),n("div",{staticClass:"see",on:{click:t.closeVideo}},[t._v("查看更多回放")])]):t._e()],2)},i=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("img",{attrs:{src:n("df84"),alt:""}})])}],o=n("db72"),a=n("2f62"),c=n("5372"),s=n("f392"),l=n("9796"),u=n.n(l),f={name:"TellerDetail",components:{Header:s["a"]},data:function(){return{title:"主播详情",imgUrl:u.a,ccc:!0,tellerId:"",tellerInfo:{},tellerVideoList:[],video_src:"",showVideo:!1}},created:function(){this.$route.query.info&&(console.info("info",this.$route.query.info),this.tellerId=this.$route.query.info.tellerId)},computed:Object(o["a"])({},Object(a["b"])(["channelInfo"])),mounted:function(){this.initData(),this.getAttentionState()},methods:{initData:function(){var t=this,e={tellerId:this.tellerId};this.$store.dispatch("userInfo/getTellerInfo",e).then((function(e){console.info("getTellerInfo",e),t.tellerInfo=e,t.tellerInfo.headUrl&&(t.imgUrl=t.tellerInfo.headUrl);var n={tellerId:t.tellerId,start:1,limit:50};t.$store.dispatch("userInfo/getTellerVideo",n).then((function(e){console.info("getTellerVideo",e),e.list&&(t.tellerVideoList=e.list)}))}))},attention:Object(c["a"])((function(){var t=this;if(window.localStorage.getItem("loginInfo")){var e={tellerId:this.channelInfo.tellerId,userId:JSON.parse(localStorage.getItem("loginInfo")).userId,state:1==this.tellerInfo.concernState?2:1};this.$store.dispatch("channel/updateConcern",e).then((function(e){console.info("取消、关注",e),0==e.code&&(1==t.tellerInfo.concernState?t.tellerInfo.concernState=2:t.tellerInfo.concernState=1)}))}else this.$emit("roomLogin")})),videoPlay:function(t){console.info("item",t),this.video_src=t.origUrl,this.showVideo=!0},closeVideo:function(){this.showVideo=!1},goback:function(){console.info("this.query",this.$router.query),this.$route.query.str?this.$router.push({path:"/liveRoom",query:{tellerId:this.tellerInfo.tellerId,cid:this.channelInfo.cid}}):this.$router.go(-1)}}},d=f,v=(n("9fb4"),n("2877")),g=Object(v["a"])(d,r,i,!1,null,"21c20513",null);e["default"]=g.exports},"8aae":function(t,e,n){n("32a6"),t.exports=n("584a").Object.keys},9796:function(t,e,n){t.exports=n.p+"static/img/lemon2.045418e0.png"},"9d98":function(t,e,n){var r=n("63b6");r(r.S+r.F*!n("8e60"),"Object",{defineProperties:n("7e90")})},"9fb4":function(t,e,n){"use strict";n("b586")},a290:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAABKklEQVQ4T82UwUnEQBiF/z+BJQRyELcFJeRgYP4CxAJWKxD0agUreNy9WYAe7EDxYgEpIJkhqcGtQPSU5EmESJDNZjcm4lxn5uP9894bphEWj8Ck/wNVSs0AhMaYxbpJd1YqItcAFsz85nneNIqi/Cd4a2gQBBPHce6Z+QLAyrKsWRzHprdS3/f3Xdd9YuZjAElRFGdpmq7aTO5UGobhoW3bL8x8AOA5z/PzLMveN6VmI1RETojokYj2ANxqredEVHbFsBWqlLpk5rsKUJbllTHmoQtW77dBbRH5IKIJgBut9XJbYHXuT5V+CRv8TetxB3e/Bg+e0xrcbBQRvTLz6a8a1XReROYAllX3kySZElH/7jfB1S9FREdtUeus6S757Ap/H9b3nVGUfgLRbYYWdDuWwAAAAABJRU5ErkJggg=="},a481:function(t,e,n){"use strict";var r=n("cb7c"),i=n("4bf8"),o=n("9def"),a=n("4588"),c=n("0390"),s=n("5f1b"),l=Math.max,u=Math.min,f=Math.floor,d=/\$([$&`']|\d\d?|<[^>]*>)/g,v=/\$([$&`']|\d\d?)/g,g=function(t){return void 0===t?t:String(t)};n("214f")("replace",2,(function(t,e,n,A){return[function(r,i){var o=t(this),a=void 0==r?void 0:r[e];return void 0!==a?a.call(r,o,i):n.call(String(o),r,i)},function(t,e){var i=A(n,t,this,e);if(i.done)return i.value;var f=r(t),d=String(this),v="function"===typeof e;v||(e=String(e));var p=f.global;if(p){var b=f.unicode;f.lastIndex=0}var x=[];while(1){var m=s(f,d);if(null===m)break;if(x.push(m),!p)break;var I=String(m[0]);""===I&&(f.lastIndex=c(d,o(f.lastIndex),b))}for(var C="",y=0,S=0;S<x.length;S++){m=x[S];for(var E=String(m[0]),V=l(u(a(m.index),d.length),0),w=[],O=1;O<m.length;O++)w.push(g(m[O]));var R=m.groups;if(v){var U=[E].concat(w,V,d);void 0!==R&&U.push(R);var _=String(e.apply(void 0,U))}else _=h(E,d,V,w,R,e);V>=y&&(C+=d.slice(y,V)+_,y=V+E.length)}return C+d.slice(y)}];function h(t,e,r,o,a,c){var s=r+t.length,l=o.length,u=v;return void 0!==a&&(a=i(a),u=d),n.call(c,u,(function(n,i){var c;switch(i.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,r);case"'":return e.slice(s);case"<":c=a[i.slice(1,-1)];break;default:var u=+i;if(0===u)return n;if(u>l){var d=f(u/10);return 0===d?n:d<=l?void 0===o[d-1]?i.charAt(1):o[d-1]+i.charAt(1):n}c=o[u-1]}return void 0===c?"":c}))}}))},a4bb:function(t,e,n){t.exports=n("8aae")},b0c5:function(t,e,n){"use strict";var r=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},b586:function(t,e,n){},ba99:function(t,e,n){var r=n("6abf"),i=n("9aa9"),o=n("e4ae"),a=n("e53d").Reflect;t.exports=a&&a.ownKeys||function(t){var e=r.f(o(t)),n=i.f;return n?e.concat(n(t)):e}},bf90:function(t,e,n){var r=n("36c3"),i=n("bf0b").f;n("ce7e")("getOwnPropertyDescriptor",(function(){return function(t,e){return i(r(t),e)}}))},ce7e:function(t,e,n){var r=n("63b6"),i=n("584a"),o=n("294c");t.exports=function(t,e){var n=(i.Object||{})[t]||Object[t],a={};a[t]=e(n),r(r.S+r.F*o((function(){n(1)})),"Object",a)}},d53d:function(t,e,n){},d847:function(t,e,n){t.exports=n("5bba")},db72:function(t,e,n){"use strict";var r=n("a4bb"),i=n.n(r),o=n("e265"),a=n.n(o),c=n("268f"),s=n.n(c),l=n("5e83"),u=n.n(l),f=n("d847"),d=n.n(f),v=n("85f2"),g=n.n(v);function A(t,e,n){return e in t?g()(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function h(t,e){var n=i()(t);if(a.a){var r=a()(t);e&&(r=r.filter((function(e){return s()(t,e).enumerable}))),n.push.apply(n,r)}return n}function p(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?h(Object(n),!0).forEach((function(e){A(t,e,n[e])})):u.a?d()(t,u()(n)):h(Object(n)).forEach((function(e){g()(t,e,s()(n,e))}))}return t}n.d(e,"a",(function(){return p}))},df84:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAKCAYAAABmBXS+AAAAi0lEQVQoU43QKw5CUQyE4a8CQQIEgWUbBIUnwbEFdgGaVcAScDw8C8GwAR4SUXKScxMSzB1RMf3bThqqMnOIBca44xgRj9KOUjJziR0K2KgAq4g4RGZOcUUHL/SbYXwwK9AZ8zq+wQ17dKt3KdATg2qsI2KbmROcMCrbW0Otzv0Gf6P3F7zVC9o88wt+fEW3IUTLhgAAAABJRU5ErkJggg=="},e265:function(t,e,n){t.exports=n("ed33")},ed33:function(t,e,n){n("014b"),t.exports=n("584a").Object.getOwnPropertySymbols},ee6d:function(t,e,n){var r=n("63b6"),i=n("ba99"),o=n("36c3"),a=n("bf0b"),c=n("20fd");r(r.S,"Object",{getOwnPropertyDescriptors:function(t){var e,n,r=o(t),s=a.f,l=i(r),u={},f=0;while(l.length>f)n=s(r,e=l[f++]),void 0!==n&&c(u,e,n);return u}})},f392:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"header"},[r("div",{staticClass:"left",staticStyle:{width:"24px",height:"24px"}},[t.leftFlow?r("div",[r("span",{on:{click:t.goback}},[r("img",{attrs:{src:n("a290"),alt:""}})])]):t._e()]),t._v(" "),r("div",{staticClass:"text"},[t._v("\n    "+t._s(t.title)+"\n  ")]),t._v(" "),r("div",{staticClass:"right",staticStyle:{width:"34px",height:"34px"}},[""!==t.rightIcon?r("div",["personal"===t.rightIcon?r("span",[r("img",{attrs:{src:n("277f"),alt:""}})]):t._e(),t._v(" "),"setting"===t.rightIcon?r("span",{on:{click:t.setting}},[r("img",{attrs:{src:n("7d0b"),alt:""}})]):t._e(),t._v(" "),"save"===t.rightIcon?r("span",{staticStyle:{"line-height":"34px"},on:{click:t.save}},[t._v("\n        完成\n      ")]):t._e()]):t._e()])])},i=[],o={name:"Header",props:{title:{type:String,default:""},rightIcon:{type:String,default:function(){return""}},leftFlow:{type:Boolean,default:function(){return!1}}},methods:{goback:function(){this.$emit("goback")},setting:function(){this.$emit("setting")},save:function(){this.$emit("save")}}},a=o,c=(n("0056"),n("2877")),s=Object(c["a"])(a,r,i,!1,null,"4bcb1ca8",null);e["a"]=s.exports},fde4:function(t,e,n){n("bf90");var r=n("584a").Object;t.exports=function(t,e){return r.getOwnPropertyDescriptor(t,e)}}}]);
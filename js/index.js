 $(function() {
 	if (moment().format() > moment("20170805", "YYYYMMDD").format() && moment().format() < moment("20170925", "YYYYMMDD").format()) {
 		var _url = window.location.href;
 		var _u = _url.split("=")[1];
 		$.ajax({
 			url: "http://beauty.sit.tangdada.com.cn/beauty/api/v1/signin/query_signin_activity?token=" + _u,
 			//url: "http://beauty.sit.tangdada.com.cn/beauty/api/v1/signin/query_signin_activity?token=14d80e4b-9959-4ae9-b9d4-26e842a23928",
 			type: "post",
 			dataType: "json",
 			success: function(res) {
 				console.log(res);
 				var checkprize = res.data.prize;
 				var checksign = res.data.sign;
 				var day = res.data.sign_count;　
 				var name = res.data.user.nickname;
 				var imgUrl = res.data.user.head_image;
 				$(".headicon").find("img").attr("src", imgUrl);
 				$(".username").text(name);
 				checkSign(checksign, day);
 				checkPrize(checkprize, day);
 			}
 		});
 	}
 	//console.log(_u);

 	function checkSign(checksign, day) {
 		if (checksign == 0) {
 			signed(day);
 		} else {
 			$(".sign").find("img").attr("src", "img/signed.png");
 			$(".sign").parent().siblings(".fbtn").css("display", "block");
 			day++;
 			$(".checksign").text("您已经连续签到" + day + "天啦，加油～");
 			if (day == 1) {
 				firstchanged();
 			} else if (day == 10) {
 				firstchanged();
 				changed(day);
 				lastchanged();
 			} else if (day > 1 && day < 10) {
 				firstchanged();
 				changed(day);
 			}
 		}
 	}

 	function checkPrize(checkprize, day) {
 		if (checkprize == 0 && day < 10) {
 			$(".lsign").on("touchstart", function() {
 				Toast("您签到还未满10天", 2);
 			});
 		} else {
 			$(".lsign").text("已领取")
 			$(".lsign").on("touchstart", function() {
 				Toast("您已经领取过奖品了", 2);
 			});
 		}
 	}

 	function signed(day) {
 		if (day > 0 && day < 10) {
 			$(".first").find("img").attr("src", "img/first.png");
 			for (var i = 0; i < (day - 1); i++) {
 				$(".circle").eq(i).attr("src", "img/circle.png");
 			}
 			sign(day);
 		} else if (day == 10) {
 			$(".first").find("img").attr("src", "img/first.png");
 			for (var i = 0; i < day; i++) {
 				$(".circle").eq(i).attr("src", "img/circle.png");
 			}
 			$(".last").find("img").attr("src", "img/last.png");
 			$(".sign").find("img").attr("src", "img/signed.png");
 			start(); //   原生方法
 		} else {
 			sign(day);
 		}
 	}

 	function sign(day) {
 		$(".sign").one("touchstart", function() {
 			$(this).find("img").attr("src", "img/signed.png");
 			$(this).parent().siblings(".fbtn").css("display", "block");
 			day++;
 			$(this).siblings(".info").children(".checksign").text("您已经连续签到" + day + "天啦，加油～");
 			$.ajax({
 				url: "http://sit.tangdada.com.cn/beauty/api/v1/signin/signin?token=" + _u,
 				//url: "http://sit.tangdada.com.cn/beauty/api/v1/signin/signin?token=778a95d5-5a7f-453d-b284-4c0fbc6831cc",
 				type: "post",
 				dataType: "json",
 				success: function(res) {
 					//console.log(res);
 				}
 			});

 			if (day == 1) {
 				firstchanged();
 			} else if (day == 10) {
 				firstchanged();
 				changed(day);
 				lastchanged();
 				start(); //   原生方法
 			} else if (day > 1 && day < 10) {
 				firstchanged();
 				changed(day);
 			}
 		});

 	}

 	function firstchanged() {
 		$(".first").find("img").attr("src", "img/first.png");
 		$(".fsign").css("color", "#fc4368");
 	}

 	function lastchanged() {
 		$(".last").find("img").attr("src", "img/last.png");
 	}

 	function changed(day) {
 		var n = day - 2;
 		$(".circle").eq(n).attr("src", "img/circle.png");
 	}
 	$(".fbtn").on("touchstart", function() {
 		Toast("您今天已经签到了", 2);
 	});

 	function start() {
 		var u = navigator.userAgent;
 		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
 		if (isAndroid) {
 			android.activitySuccess();
 		} else {
 			setupWebViewJavascriptBridge(function(bridge) {

 				/* Initialize your app here */

 				bridge.callHandler('activitySuccess', {

 				}, function responseCallback(responseData) {

 				})
 			})
 		}
 	}


 	function Toast(msg, duration) {
 		duration = isNaN(duration) ? 3000 : duration;
 		var m = document.createElement('div');
 		m.innerHTML = msg;
 		m.style.cssText = "width: 60%;min-width: 150px;opacity: 0.5;height: 30px;color: rgb(255, 255, 255);line-height: 30px;text-align: center;border-radius: 10px;position: fixed;top: 40%;left: 20%;z-index: 999999;background: rgb(0, 0, 0);font-size: 12px;";
 		document.body.appendChild(m);
 		setTimeout(function() {
 			var d = 0.5;
 			m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
 			m.style.opacity = '0';
 			setTimeout(function() {
 				document.body.removeChild(m)
 			}, d * 1000);
 		}, duration);
 	}


 	function setupWebViewJavascriptBridge(callback) {
 		if (window.WebViewJavascriptBridge) {
 			return callback(WebViewJavascriptBridge);
 		}
 		if (window.WVJBCallbacks) {
 			return window.WVJBCallbacks.push(callback);
 		}
 		window.WVJBCallbacks = [callback];
 		var WVJBIframe = document.createElement('iframe');
 		WVJBIframe.style.display = 'none';
 		WVJBIframe.src = 'https://__bridge_loaded__';
 		document.documentElement.appendChild(WVJBIframe);
 		setTimeout(function() {
 			document.documentElement.removeChild(WVJBIframe)
 		}, 0)
 	}

 });
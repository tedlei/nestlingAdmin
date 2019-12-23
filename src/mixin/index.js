import Vue from 'vue'
import axios from 'axios'

Vue.config.productionTip = false;
import { Message, Notification, MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// lay-ui 引入
import 'layui-src/src/css/layui.css'
import 'layui-src/src/layui.js'


layui.config({
    version: false, //一般用于更新模块缓存，默认不开启。设为true即让浏览器不缓存。也可以设为一个固定的值，如：201610
    debug: false, //用于开启调试模式，默认false，如果设为true，则JS模块的节点会保留在页面
    base: '' //设定扩展的Lay-ui模块的所在目录，一般用于外部模块扩展
});

// 富文本编辑器
import editorInit from "../../static/js/editor";


export default new class Mixins {
	constructor() {
		// 注册网络请求
		this.axios = this.netWork();
	}
	netWork(){
		let _this = null;
		let ipList = [
			'http://192.168.3.78:9101/',
			'http://192.168.3.78:9102',
			'http://192.168.3.78:9103/',
			'http://192.168.3.78:9104/',
			'http://192.168.3.78:9105/',
			'http://192.168.3.78:9106/',
		];
		let ipList2 = [
			'http://192.168.3.63:9101/',
			'http://192.168.3.63:9102',
			'http://192.168.3.63:9103/',
			'http://192.168.3.63:9104/',
			'http://192.168.3.63:9105/',
			'http://192.168.3.63:9106/',
		];
		let ipList3 = [
			'http://192.168.3.66:9101/',
			'http://192.168.3.66:9102',
			'http://192.168.3.66:9103/',
			'http://192.168.3.66:9104/',
			'http://192.168.3.66:9105/',
			'http://192.168.3.66:9106/',
		];
    	// 网络请求
		// axios.defaults.withCredentials = false;  // 是否允许携带cookie-
		axios.defaults.timeout = 20000;
		axios.defaults.validateStatus = function (status) {
			//验证响应状态码=>自定义成功失败规则：状态码以2/3开头算作成功
		    let result = /^(2|3)\d{2}$/.test(status);
		    if (!result) {
		        let errorMsg = '';
		        switch(status){
		            case 404:
		                errorMsg = '网址错误';
		                break;
		            default:
		                errorMsg = '请求失败';
		        }
		        throw new Error(errorMsg + '， 错误码为：' + status);
		    }
			//判断用户是否登陆，201：未登录
			if(status===201){
				_this.verifyLogin({
					message: '未登陆，请先登陆！',
					url: '/login'
				}, false)
			}
		    return result;
		};

		return function (params, id, isImage){
			_this = this;
			if (typeof id === 'undefined') id = 1;
			axios.defaults.baseURL = typeof id === 'string' ? id : ipList[id-1];
			// axios.defaults.baseURL =  ipList2[id-1];

			// 是否为图片上传
			if (isImage) {
				axios.defaults.headers ={'Content-Type': 'multipart/form-data'};
			} else {
				axios.defaults.headers = {'Content-Type': 'application/json;charset=UTF-8'};    //设置请求头
			}

			let url = params.url;
			if (/^\//.test(url)) params.url = url.slice(1);

			let phone = _this.getItem('phone');    //所有接口都需要传的值
			let data = params.data;
			if(phone){
				data.phone = phone;
			}
			if (params.method === 'get') {
				if (data) {
					Object.keys(data).forEach((key, i)=>{
						if (!i) params.url += "?";
                        if (i < 1) params.url += key + '=' + data[key];
                        else params.url += '&' + key + '=' + data[key];
					});
					data = {};
				}
			}

			return axios(params);
		};
  }
	// netWork() {
	// 	// 网络请求
	// 	axios.defaults.baseURL = 'http://127.0.0.1/';
	// 	axios.defaults.withCredentials = true;  // 是否允许携带cookie-
	// 	axios.defaults.headers = { 'Content-Type': 'application/json' };    //设置请求头
	// 	axios.defaults.timeout = 10000;
	// 	axios.defaults.validateStatus = function (status) {
	// 		//验证响应状态码=>自定义成功失败规则：状态码以2/3开头算作成功
	// 		let result = /^(2|3)\d{2}$/.test(status);
	// 		if (!result) {
	// 			let errorMsg = '';
	// 			switch (status) {
	// 				case 404:
	// 					errorMsg = '网址错误';
	// 					break;
	// 				default:
	// 					errorMsg = '请求失败';
	// 			}
	// 			throw new Error(errorMsg + '， 错误码为：' + status);
	// 		}
	// 		return result;
	// 	};

	// 	return axios;
	// }

	install() {
		let self = this;
		Vue.mixin({
			data() {
				return {
					fetch: self.axios,
                    editor: editorInit  // 富文本编辑器初始化函数
				}
			},
			methods: {
				// 序列化
				parse(obj) {
					return JSON.parse(JSON.stringify(obj));
				},
				stringify(obj) {
					return JSON.stringify(obj);
				},
				// 路由跳转
				push(param) {
					this.$router.push(param);
				},
				// 返回
				pop() { this.$router.go(-1) },
				// 退出
				quit() {
					// 清除本地所有数据
					window.localStorage.clear();
					this.push('/login');
				},
				getTimer() {
					function double(val) {
						if (val < 10) val = '0' + val;
						return val;
					}
					let nowTimer = new Date(),
						year = double(nowTimer.getFullYear()),
						month = double(nowTimer.getMonth() + 1),
						date = double(nowTimer.getDate() + 1),
						hours = double(nowTimer.getHours()),
						minutes = double(nowTimer.getMinutes()),
						seconds = double(nowTimer.getSeconds());

					return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
				},
				getItem(name) {
					let result = window.localStorage.getItem(name);
					return JSON.parse(result);
				},
				setItem(name, value) {
					window.localStorage.setItem(name, JSON.stringify(value));
				},
				$message(msg) {
					if (!msg.duration) {
						Object.assign(msg, { duration: 2000 })
					}
					Message(msg);
				},
				$notify(msg) {
					Notification(msg)
				},
				$msgbox(msg) {
					return MessageBox(msg);
				},
				/**
				 * @param refName*	Object	ref值
				 * @param boole		boolean	是否减去导航栏右侧主内容内边距
				 * @param reduce	Number	自定义需减少值
				 */
				showScroll(refName, boole, reduce){
					let w = screen.width;
					w = Math.max(1440, w);

					// 头部高度
					w = 80 / 1920 * w;
					// 导航栏右侧主内容内边距
					let pading = getComputedStyle(document.querySelector('.main_select')).paddingTop.substring(0, 2)*1;

					reduce = reduce || 0;
					w = (boole ? (w + pading*2) : w) + reduce;

					this.$refs[refName].style.height = `calc(100vh - ${w}px)`;
				},

				/**
				 * url 跳转的子路由
				 */
				childRouteJump(url){
					this.push(this.$route.fullPath.replace('?', '/' + url +'?'))
				},
				/**
				 * @param param
				 *            message    提示信息
				 *            url        跳转的url
				 * @param result    Boolean or Function: 函数返回值为Boolean（是否登陆的结果）
				 */
				verifyLogin(param, result) {
					// 未登陆跳转到登录页
					result = typeof result === 'function' ? result() : result;

					if (!result) {
						this.$msgbox({
							message: param.message,
							beforeClose: (action, instance, done) => {
								instance.confirmButtonLoading = true;
								instance.confirmButtonText = '跳转中...';
								setTimeout(() => {
									// 跳转到登录页
									this.push(param.url);
									done();
									setTimeout(() => {
										instance.confirmButtonLoading = false;
									}, 300);
								}, 1000);
							}
						});
					}
				}
			}
		})
	}
}


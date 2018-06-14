//params  对象的属性，要传一个属性过来
function parseParams(params){
	var str = '?';
	for(var key in params){
		if(params[key] === undefined || params[key] === null || params[key] === ''){
			continue;
		}
		str += key + '=' + params[key] + '&';
	}
	return str + '_s=0';
}

var Api = {
	// 获取管理员下所有用户签到信息
	getAllUsers : function(cb,ecb) {
		var url = "/visits/team/checkins";
		get(url,cb,ecb);
	},

	// 获取管理员下所有用户拜访信息
	getAllUserVisits : function(cb,ecb) {
		var url = "/visits/team/records";
		get(url,cb,ecb);
	},

	// 查询用户拜访详情
	getUserVisitDetails : function(recordId,correspondingCustomerId,cb,ecb) {
		var url = "/visits/records/" + recordId +"?correspondingCustomerId="+correspondingCustomerId;
		get(url,cb,ecb);
	},

	// 查询团队拜访计划
	getTeamVisitPlan : function(type,cb,ecb) {
		var url = "/visits/team/plans?type="+ type ;
		get(url,cb,ecb);
	},

	// 查询销售代表计划
	getVisitPlan : function(type,cb,ecb) {
		var url = "/visits/plans?type="+ type ;
		get(url,cb,ecb);
	},

	// 代表安排计划
	setVisitPlan : function(params,cb,ecb) {
		var url = "/visits/plans";
		ajax(url, JSON.stringify(params), "POST", cb, ecb);
	},

	// 代表取消计划
	cancelVisitPlan : function(params,cb,ecb) {
		var url = "/visits/plans";
		ajax(url, JSON.stringify(params), "DELETE", cb, ecb);
	},

	// 查询医院列表
	getHospitals : function(cb,ecb) {
		var url = "/visits/corresponding_customers" ;
		get(url,cb,ecb);
	},

	// 查询医院签到状态
	getHospitalStatus : function(correspondingCustomerId,cb,ecb) {
		var url = "/visits/checkins/"+correspondingCustomerId;
		get(url, cb, ecb);
	},

	// 签到 签退操作
	setHospitalSign : function(correspondingCustomerId,params,cb,ecb) {
		var url = "/visits/checkins/"+correspondingCustomerId+parseParams(params);
		ajax(url, null, "POST", cb, ecb);
	},

	// 查询用户拜访信息
	getUserVisits : function(cb,ecb) {
		var url = "/visits/records";
		get(url,cb,ecb);
	},

	// 获取拜访目的
	getPurposes : function(cb,ecb) {
		var url = "/visits/purposes";
		get(url,cb,ecb);
	},

	// 查询用户产品列表
	getProducts : function(cb,ecb) {
		var url = "/visits/products";
		get(url,cb,ecb);
	},

	// 查询参会人
	getDoctors : function(correspondingCustomerId,cb,ecb) {
		var url = "/visits/customer_employees?correspondingCustomerId="+correspondingCustomerId;
		get(url,cb,ecb);
	},

	// 新增用户拜访信息
	addVisitsRecord : function(params,cb,ecb) {
		var url = "/visits/records";
		ajax(url, JSON.stringify(params), "POST", cb, ecb);
	},

	// 修改用户拜访信息
	updateVisitsRecord : function(recordId,params,cb,ecb) {
		var url = "/visits/records/"+recordId;
		ajax(url, JSON.stringify(params), "POST", cb, ecb);
	},

	// 查询当前拜访记录
	getVisitRecord : function(recordId,correspondingCustomerId,cb,ecb) {
		var url = "/visits/records/"+recordId+"?correspondingCustomerId="+correspondingCustomerId;
		get(url,cb,ecb);
	},

	// openId登录
	openIdLogin : function(openId,cb,ecb) {
		var url = "/users/"+openId;
		ajax(url, null, "POST", cb, ecb);
	},

	// 获取验证码
	getVerifcode : function(mobile,cb,ecb) {
		var url = "/users/verifyCode/"+mobile;
		get(url,cb,ecb);
	},

	// 验证码登录
	verifcodeLogin : function(openId,params,cb,ecb) {
		var url = "/users/verifycode/signin/"+openId;
		ajax(url, JSON.stringify(params), "POST", cb, ecb);
	},

	//首次根据code获取跳转链接
	getFirstRedirectUrl : function(code ,cb ,ecb) {
		var url = "/users/code/" + code;
		get(url ,cb ,ecb);
	},

	//根据token获取跳转链接
	getRedirectUrlByToken : function(cb ,ecb) {
		var url = "/users/sign";
		get(url ,cb ,ecb);
	}
};

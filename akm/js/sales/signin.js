$(function(){
    // fastClick
    FastClick.attach(document.body);


    $('.js_container').on('click', '.sds-map-desc', function(){
        window.location.href="./select_hospital.html";
    });

    $('.sign-btn').find("p").on('click',function(){
        var self = $(this);
        if($(this).hasClass('signover')){
            return ;
        }
        var checkType = 0;
        if($(this).hasClass('signout')){
            checkType =1;
        }
        var correspondingCustomerId = $('.sign-btn').attr("hospitalId");
        // TODO 这里要获取 经纬度
        var params = {
            longitude:0,
            latitude:0,
            checkType : checkType
        };
        Api.setHospitalSign(correspondingCustomerId,params,function(data){
            if(data && data == 1){
                if(self.hasClass('signin')){
                    self.removeClass().addClass('signout');
                }else if(self.hasClass('signout')){
                    self.removeClass().addClass('signover');
                }
            }
        },function(data){
            if(data){
                alert("服务器错误");
            }
        });
    });

    var correspondingCustomerId = request('hospitalId');
    if(!correspondingCustomerId){
        getHospitals();
    }else{
        // 从本地取数据
        getLocalHospital(correspondingCustomerId);
    }

    function getLocalHospital(hospitalId){
        var hospitals = getCookie("sandoz-hospitals");
        hospitals = JSON.parse(hospitals);
        for(var i=0; i< hospitals.length; i++){
            if(hospitalId == hospitals[i].correspondingCustomerId){
                $('.selected-hospital').text(hospitals[i].customerName);
                $('.sign-btn').attr("hospitalId",correspondingCustomerId);
                getHospitalStatus(hospitals[i]);
                break;
            }
        }
    }

    function getHospitals(){
        Api.getHospitals(function(data){
            if(data && data.length>0){
                setCookie("sandoz-hospitals",JSON.stringify(data),1);
                // 取第一条医院,查询状态后进行显示
                getHospitalStatus(data[0]);
            }
        },function(data){
            if(data){
                alert("服务器错误");
            }
        });
    }

    function getHospitalStatus(data){
        $('.selected-hospital').text(data.customerName);
        $('.sign-btn').attr("hospitalId",data.correspondingCustomerId);
        Api.getHospitalStatus(data.correspondingCustomerId,function(data){
            if(data){
                if(data.checkStatus == 0){
                    $('.sign-btn').find('p').removeClass().addClass('signin');
                }else if(data.checkStatus == 1){
                    $('.sign-btn').find('p').removeClass().addClass('signout');
                }else if(data.checkStatus == 2){
                    $('.sign-btn').find('p').removeClass().addClass('signover');
                }
            }
        },function(data){
            if(data){
                alert("服务器错误");
            }
        });
    }
});


/*--获取网页传递的参数--*/
function request(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof(returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

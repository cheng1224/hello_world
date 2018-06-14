$(function(){
    // fastClick
    FastClick.attach(document.body);

    var $progress = $('.progress');
    var $visit_progress_icon = $(".visit_progress_icon").remove();
    var $load_more = $('.sds-visit-panel-content-bottom').remove();
    var $doctor_content_li = $('.sds-visit-card').remove();
    var $visit_panel = $('.sds-visit-panel').remove();

    $('.js_container').delegate('.sds-visit-panel-title','click', function() {
        $(this).parent().find('.visit-panel-show').toggle();
        $(this).parent().find('.caret').toggleClass('open');
    });

    $('.js_container').delegate('.sds-visit-card','click', function() {
        var correspondingCustomerId = $(this).parent().attr('hospitalId');
        var customerName = encodeURIComponent($(this).parent().parent().find('.hospital-name').text());
        var customerEmployeeId = $(this).attr('doctorId');
        var employeeName = encodeURIComponent($(this).find('.doctor-name').text());
        var visitStatus = $(this).attr('visitStatus');
        var visitRecordId = $(this).attr('visitRecordId');
        location.href = "visit_record.html?hospitalId="+correspondingCustomerId+"&hospitalName="+customerName+
                        "&doctorId="+customerEmployeeId+"&doctorName="+employeeName+"&visitStatus="+visitStatus+"&visitRecordId="+visitRecordId;
    });


    // 加载更多
    $('.js_container').delegate('.sds-visit-panel-content-bottom','click',function(){
        // 找到自己的父节点,获取医院id
        var correspondingCustomerId = $(this).parent().attr("hospitalId");
        // 从本地数据中拿到数据
        var hospital = getLocalDate(correspondingCustomerId);
        // 从第七条数据开始, 往后面加数据
        // 删除自己, 暂不做收起
        if(hospital && hospital.employees && hospital.employees.length > 6 ){
            for(var j=5; j < hospital.employees.length; j++){
                var $add_li = $doctor_content_li.clone();
                $add_li.attr('doctorId',hospital.employees[j].customerEmployeeId);
                $add_li.attr('visitStatus',hospital.employees[j].visitStatus);
                $add_li.attr('visitRecordId',hospital.employees[j].visitRecordId);
                $add_li.find('.doctor-position').text(hospital.employees[j].department);
                $add_li.find('.doctor-name').text(hospital.employees[j].employeeName);
                if(hospital.employees[j].tagType == 0){  // 1 point 2 no point
                    $add_li.find('.star').removeClass("on");
                }else{
                    $add_li.find('.star').addClass("on");
                }
                if(hospital.employees[j].visitStatus == 0){ // 0 未拜访 1 未完成  2 已拜访
                    $add_li.find('.dot').removeClass("on");
                    if(hospital.employees[j].sex == 0){
                        $add_li.find('img').attr('src','../img/woman_over.png');
                    }else{
                        $add_li.find('img').attr('src','../img/man_over.png');
                    }
                }else if(hospital.employees[j].visitStatus == 1){
                    $add_li.find('.dot').addClass("on");
                    if(hospital.employees[j].sex == 0){
                        $add_li.find('img').attr('src','../img/woman.png');
                    }else{
                        $add_li.find('img').attr('src','../img/man.png');
                    }
                }else if(hospital.employees[j].visitStatus == 2){
                    $add_li.find('.dot').removeClass("on");
                    if(hospital.employees[j].sex == 0){
                        $add_li.find('img').attr('src','../img/woman.png');
                    }else{
                        $add_li.find('img').attr('src','../img/man.png');
                    }
                }
                $(this).parent().append($add_li);
            }
        }
        $(this).remove();
    });

    //$('.js_container').on("click", ".sds-navbar__item", function(){
    //    $(this).addClass('sds-bar__item_on').siblings().removeClass('sds-bar__item_on');
    //});

    $('.js_container').on("click", ".help", function(){
        $('.stamp').toggleClass('show');
    });
    $('.js_container').on("click", ".stamp", function(){
        $(this).removeClass('show');
    });

    getUserVisits();

    function getUserVisits(){
        Api.getUserVisits(function(data){
            if(data){
                setCookie("sandoz-visiting-hospitals",JSON.stringify(data),1);
                $('.visit_progress').text(data.visitProgress);
                $('.total_progress').text(data.totalCount);
                for(var i=1;i<=data.totalCount;i++){
                    var $li = $visit_progress_icon.clone();
                    if(data.visitProgress < data.totalCount){
                        i <=  data.visitProgress ? $li.addClass("progress-icon-light") : $li.addClass("progress-icon-default");
                    }else if(data.visitProgress == data.totalCount){
                        $li.addClass("progress-icon-primary");
                    }else if(data.visitProgress > data.totalCount){
                        $li.addClass("progress-icon-deep");
                    }
                    $progress.append($li);
                }
                if(data.visitCustomers && data.visitCustomers.length){
                    for(var i=0; i<data.visitCustomers.length;i++){
                        var hospital = data.visitCustomers[i];
                        var $add_panel = $visit_panel.clone();
                        $add_panel.find('.hospital-name').text(hospital.customerName);
                        $add_panel.find('.sds-visit-panel-content').attr('hospitalId',hospital.correspondingCustomerId);
                        if(hospital && hospital.employees){
                            var count = 6;
                            if(hospital.employees.length < 6){
                                count = hospital.employees.length;
                            }
                            for(var j=0; j<count; j++){
                                var $add_li = $doctor_content_li.clone();
                                $add_li.attr('doctorId',hospital.employees[j].customerEmployeeId);
                                $add_li.attr('visitStatus',hospital.employees[j].visitStatus);
                                $add_li.attr('visitRecordId',hospital.employees[j].visitRecordId);
                                $add_li.find('.doctor-position').text(hospital.employees[j].department);
                                $add_li.find('.doctor-name').text(hospital.employees[j].employeeName);
                                if(hospital.employees[j].tagType == 0){  // 1 point 2 no point
                                    $add_li.find('.star').removeClass("on");
                                }else{
                                    $add_li.find('.star').addClass("on");
                                }
                                if(hospital.employees[j].visitStatus == 0){ // 0 未拜访 1 未完成  2 已拜访
                                    $add_li.find('.dot').removeClass("on");
                                    if(hospital.employees[j].sex == 0){
                                        $add_li.find('img').attr('src','../img/woman_over.png');
                                    }else{
                                        $add_li.find('img').attr('src','../img/man_over.png');
                                    }
                                }else if(hospital.employees[j].visitStatus == 1){
                                    $add_li.find('.dot').addClass("on");
                                    if(hospital.employees[j].sex == 0){
                                        $add_li.find('img').attr('src','../img/woman.png');
                                    }else{
                                        $add_li.find('img').attr('src','../img/man.png');
                                    }
                                }else if(hospital.employees[j].visitStatus == 2){
                                    $add_li.find('.dot').removeClass("on");
                                    if(hospital.employees[j].sex == 0){
                                        $add_li.find('img').attr('src','../img/woman.png');
                                    }else{
                                        $add_li.find('img').attr('src','../img/man.png');
                                    }
                                }
                                $add_panel.find('.sds-visit-panel-content').append($add_li);
                            }
                            if(hospital.employees.length > 6){
                                $add_panel.find('.sds-visit-panel-content').append($load_more);
                            }
                        }
                        $('.page').append($add_panel);
                    }

                }
            }
        },function(data){
            if(data){
                alert("服务器错误");
            }
        });
    }

});

function getLocalDate(correspondingCustomerId){
    var localData = getCookie("sandoz-visiting-hospitals");
    var data = JSON.parse(localData);
    var hospitals = data ? data.visitCustomers : "";
    if(hospitals){
        for(var i=0; i<hospitals.length; i++){
            if(correspondingCustomerId == hospitals[i].correspondingCustomerId){
                return hospitals[i];
            }
        }
    }
}



/*--获取网页传递的参数--*/
function request(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {};
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

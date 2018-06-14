$(function(){
    // fastClick
    FastClick.attach(document.body);


    //显示日期
    var date = new Date();
    var toDate = new Date(new Date().getTime() + (3600 * 24 * 1000));
    var today = dateFormat(date);
    var tomorrow = dateFormat(toDate);
    $('.today').text(today);
    $('.tomorrow').text(tomorrow);


    var $page = $('.page');
    var $today_panel = $('.today_panel');
    var $tomorrow_panel = $('.tomorrow_panel');
    var $plan_box = $('.plan_box');
    var $am = $('.am').remove();
    var $pm = $('.pm').remove();
    var $hospital_sign_item = $am.find('.hospital_sign_item').remove();

    //sds_has_sign
    //sds_no_sign

    $('.sds-navbar__item').on('click', function() {
        $(this).addClass("sds-bar__item_on").siblings().removeClass("sds-bar__item_on");
        if($(this).find('.today').length){
            $('.today_panel').show();
            $('.tomorrow_panel').hide();
        }else{
            $('.today_panel').hide();
            $('.tomorrow_panel').show();
        }
    });

    $page.delegate('.user_name','click',function(e){
        e.stopPropagation();
        if($(this).parent().find('.caret').hasClass('open')){
            $(this).parent().find('.caret').removeClass("open");
        }else{
            $(this).parent().find('.caret').addClass("open");
        }
        $(this).parent().find('.js_visit_panel_show').toggle();
    });

    $page.delegate('.caret','click',function(e){
        e.stopPropagation();
        if($(this).parent().find('.caret').hasClass('open')){
            $(this).parent().find('.caret').removeClass("open");
        }else{
            $(this).parent().find('.caret').addClass("open");
        }
        $(this).parent().find('.js_visit_panel_show').toggle();
    });

    //$page.delegate('.js_visit_panel_show','click',function(e){
    //    e.stopPropagation();
    //    alert(123);
    //});

    // 0 今天  1 明天
    var type = 0;
    // 获取团队成员计划
    Api.getTeamVisitPlan(type,function(data){
        render(data,$today_panel);
        loadTomorrowData();
    },function(data){
        if(data){
            alert("服务器错误");
        }
    });

    function loadTomorrowData(){
        Api.getTeamVisitPlan(1,function(data){
            render(data,$tomorrow_panel);
        },function(data){
            if(data){
                alert("服务器错误");
            }
        });
    }

    function render(data,$panel){
        if(data && data.length){
            $panel.empty();
            for(var j=0; j<data.length;j++){
                var $p_box = $plan_box.clone();
                var $am_add = $am.clone();
                var $pm_add = $pm.clone();
                $p_box.find('.user_name').text(data[j].userName);
                if(data[j].am && data[j].am.length > 0){
                    for(var i=0;i<data[j].am.length;i++){
                        var $item = $hospital_sign_item.clone();
                        $item.find('.hospital_name').text(data[j].am[i].customerName);
                        if(data[j].am[i].checkStatus){
                            $item.find('.hospital_sign').text("已签到");
                            $item.find('.hospital_sign').addClass('sds_has_sign');
                        }else{
                            $item.find('.hospital_sign').text("未签到");
                            $item.find('.hospital_sign').addClass('sds_no_sign');
                        }
                        $am_add.append($item);
                    }
                    $p_box.find('.js_visit_panel_show').append($am_add);
                }
                if(data[j].pm && data[j].pm.length > 0){
                    for(var i=0;i<data[j].pm.length;i++){
                        var $item = $hospital_sign_item.clone();
                        $item.find('.hospital_name').text(data[j].pm[i].customerName);
                        if(data[j].pm[i].checkStatus){
                            $item.find('.hospital_sign').text("已签到");
                            $item.find('.hospital_sign').addClass('sds_has_sign');
                        }else{
                            $item.find('.hospital_sign').text("未签到");
                            $item.find('.hospital_sign').addClass('sds_no_sign');
                        }
                        $pm_add.append($item);
                    }
                    $p_box.find('.js_visit_panel_show').append($pm_add);
                }
                $panel.append($p_box);
            }
        }else{
            alert("暂无用户信息");
        }
    }
    
});




function dateFormat(date) {
    var d = date.getDate();
    var m = date.getMonth()+1;
    return m + "/" + d;
}
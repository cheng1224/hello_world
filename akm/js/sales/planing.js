$(function(){
    // fastClick
    FastClick.attach(document.body);


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


    var modal = '<div class="modal">'+
        '<div class="sds-mask"></div>'+
        '<div class="sds-picker">'+
        '<div class="sds-picker-group">'+
        '<div class="sds-picker-content">'+
        '<div class="sds-picker-item" data="0">上午</div>'+
        '<div class="sds-picker-item" data="1">下午</div>'+
        '<div class="sds-picker-item" data="2">全天</div>'+
        '<div class="sds-picker-item" data="no">不拜访</div>'+
        '</div>'+
        '<div class="sds-picker-cancel">取消</div>'+
        '</div>'+
        '</div>'+
        '</div>';

    var sdsMask = $('.sds-mask');
    var sdsPicker = $('.sds-picker');

    $('.js_container').on('click','.sds-card',function(){
        $('.container').append(modal);
        $('.sds-mask').removeClass('sds-animate-fade-out').addClass('sds-animate-fade-in');
        $('.sds-picker').removeClass('sds-animate-slide-down').addClass('sds-animate-slide-up');
        $hospitalItem = $(this);
    });

    $('.js_container').on('click', '.modal', function(){
        $('.sds-mask').addClass('sds-animate-fade-out').removeClass('sds-animate-fade-in');
        $('.sds-picker').addClass('sds-animate-slide-down').removeClass('sds-animate-slide-up');
        $('.modal').remove();

    });

    // 选择的医院
    var $hospitalItem = "";
    $('.container').delegate(".sds-picker-item", "click", function(e){
        e.stopPropagation();
        var val = $(this).attr("data");
        var correspondingCustomerId = $hospitalItem.attr("hospitalId");
        // 判断是 今天还是明天
        var dateType = $('.sds-bar__item_on').find('.today').length;
        if(dateType){
            dateType = 0;
        }else{
            dateType = 1;
        }
        if(val != "no"){
            var params = {
                correspondingCustomerId : correspondingCustomerId,
                timePoint : val,
                dateType : dateType
            };
            Api.setVisitPlan(params,function(data){
                if(data && data == 1){
                    // 医院字体变亮, icon变化, 上午下午变化,颜色变化
                    if(val == '0'){
                        $hospitalItem.find('.plan-icon i').css({backgroundImage:"url('../img/morning.png')"});
                        $hospitalItem.find('.plan-time').text("上午");
                    }else if(val == '1'){
                        $hospitalItem.find('.plan-icon i').css({backgroundImage:"url('../img/afternoon.png')"});
                        $hospitalItem.find('.plan-time').text("下午");
                    }else if(val == '2'){
                        $hospitalItem.find('.plan-icon i').css({backgroundImage:"url('../img/day.png')"});
                        $hospitalItem.find('.plan-time').text("全天");
                    }
                    $hospitalItem.find('.plan-time').css({color:'#2883d2'});
                    $hospitalItem.find('.hospital-name').css({color:'#000'});
                }
            },function(data){
                if(data){
                    alert("服务器错误");
                }
            });
        }else{
            var params = {
                correspondingCustomerId : correspondingCustomerId,
                dateType : dateType
            };
            Api.cancelVisitPlan(params,function(data){
                if(data && data > 0){
                    // 医院字体变灰, icon变默认, 上午下午变成待安排,颜色变灰
                    $hospitalItem.find('.plan-icon i').css({backgroundImage:"url('../img/to_be_arranged.png')"});
                    $hospitalItem.find('.plan-time').text("待安排");
                    $hospitalItem.find('.plan-time').css({color:null});
                    $hospitalItem.find('.hospital-name').css({color:null});
                }
            },function(data){
                if(data){
                    alert("服务器错误");
                }
            });
        }
    });

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
    var $panel_li = $('.panel-ul');

    //sds_has_sign
    //sds_no_sign



    $page.delegate('.plan_box','click',function(e){
        e.stopPropagation();
        if($(this).find('.caret').hasClass('open')){
            $(this).find('.caret').removeClass("open");
        }else{
            $(this).find('.caret').addClass("open");
        }
        $(this).find('.js_visit_panel_show').toggle();
    });

    // 0 今天  1 明天
    var type = 0;
    // 获取团队成员计划
    Api.getVisitPlan(type,function(data){
        render(data,$today_panel);
        loadTomorrowData();
    },function(data){
        if(data){
            alert("服务器错误");
        }
    });

    function loadTomorrowData(){
        Api.getVisitPlan(1,function(data){
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
                var $p_box = $panel_li.clone();
                $p_box.attr("hospitalId",data[j].correspondingCustomerId);
                $p_box.find('.hospital-name').text(data[j].customerName);
                if(data[j].planStatus == 0){  // 未安排
                    // 待安排
                    $p_box.find('.plan-icon i').css({backgroundImage:"url('../img/to_be_arranged.png')"});
                    $p_box.find('.plan-time').text("待安排");
                }else if(data[j].planStatus == 1 || data[j].planStatus == 2 || data[j].planStatus == 3){  //已安排
                    // 上午 下午  全天
                    if(data[j].timePoint == 0){
                        $p_box.find('.plan-icon i').css({backgroundImage:"url('../img/morning.png')"});
                        $p_box.find('.plan-time').text("上午");
                    }else if(data[j].timePoint == 1){
                        $p_box.find('.plan-icon i').css({backgroundImage:"url('../img/afternoon.png')"});
                        $p_box.find('.plan-time').text("下午");
                    }else if(data[j].timePoint == 2){
                        $p_box.find('.plan-icon i').css({backgroundImage:"url('../img/day.png')"});
                        $p_box.find('.plan-time').text("全天");
                    }
                    $p_box.find('.plan-time').css({color:'#2883d2'});
                    $p_box.find('.hospital-name').css({color:'#000'});
                }
                $panel.append($p_box);
            }
        }else{
            alert("暂无计划");
        }
    }
//
});




function dateFormat(date) {
    var d = date.getDate();
    var m = date.getMonth()+1;
    return m + "/" + d;
}
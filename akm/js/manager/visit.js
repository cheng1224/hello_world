$(function(){
    // fastClick
    FastClick.attach(document.body);
    

    var $page = $('.page');
    var $visit_panel = $page.find('.js_visit_panel');


    var $visit_box = $('.visit_box').remove();
    var $visit_item = $visit_box.find('.visit_item').remove();
    var $visit_doctor_ul = $('.visit_doctor_ul');
    var $visit_doctor_li = $('.visit_doctor_li').remove();

    $page.delegate('.js_visit_panel','click',function(e){
        e.stopPropagation();
        $(this).find('.js_visit_panel_show').toggle();
    });

    $page.delegate('.visit_doctor_li','click',function(e){
        e.stopPropagation();
        var recordId = $(this).attr("visitRecordId");
        var hospitalId = $(this).attr("hospitalId");
        window.location.href = 'visit_details.html?recordId='+recordId+"&hospitalId="+hospitalId;
    });


    // 获取管理员名下所有的拜访信息
    Api.getAllUserVisits(function(data){
        if(data && data.length){
            $page.empty();
            for(var j=0; j<data.length;j++){
                var $panel_ul = $visit_panel.clone();
                $panel_ul.attr('userId',data[j].userId);
                $panel_ul.find('.user_name').text(data[j].userName);
                $panel_ul.find('.action_desc').text(data[j].actionDesc);
                $panel_ul.find('.time_desc').text(data[j].timeDesc);
                $panel_ul.find('.finish_count').text(data[j].finishCount);
                $panel_ul.find('.total_count').text(data[j].totalCount);

                var $itme_ul = $visit_box.clone();
                // 判断为哪种状态
                var type = 0;
                if(data[j].finishCount == data[j].totalCount){
                    type = 1;
                }else if(data[j].finishCount > data[j].totalCount){
                    type = 2;
                }
                for(var i=1;i<=data[j].totalCount;i++){
                    var $li = $visit_item.clone();
                    if(type == 0){
                        i <=  data[j].finishCount ? $li.addClass("sds_have_visit_type_box") : $li.addClass("sds_visit_type_box");
                    }else if(type == 1){
                        $li.addClass("sds_all_visit_type_box");
                    }else if(type == 2){
                        $li.addClass("sds_overstep_visit_type_box");
                    }

                    $itme_ul.append($li);
                }

                var $visit_ul = $visit_doctor_ul.clone();
                if(data[j] && data[j].visitDoctors){
                    for(var i=0;i<data[j].visitDoctors.length;i++){
                        var $li = $visit_doctor_li.clone();
                        $li.attr('visitRecordId',data[j].visitDoctors[i].visitRecordId);
                        $li.attr('hospitalId',data[j].visitDoctors[i].correspondingCustomerId);
                        $li.find('.sds_doctor_name').text(data[j].visitDoctors[i].employeeName);
                        $li.find('.sds_doctor_hospital').text(data[j].visitDoctors[i].customerName);
                        $visit_ul.append($li);
                    }
                }
                $panel_ul.find('.weui_sds_visiter_type').prepend($itme_ul);
                $panel_ul.append($visit_ul);
                $page.append($panel_ul);
            }
        }else{
            alert("暂无用户信息");
        }
    },function(data){
        if(data){
            alert("服务器错误");
        }
    });
    
});

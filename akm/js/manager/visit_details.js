$(function(){
    // fastClick
    FastClick.attach(document.body);
    

    var $page = $('.page_body');

    var $product_title = $('.product_title').remove();
    var $product_box = $('.product_box').remove();

    var recordId = request("recordId");
    var hospitalId = request("hospitalId");

    // 获取管理员名下所有的拜访信息
    Api.getUserVisitDetails(recordId,hospitalId,function(data){
        if(data){
            $page.find('.hospital_name').text(data.customerName);
            $page.find('.doctor_name').text(data.employeeName);
            $page.find('.wait_time_limit').text(data.waitTimelimit);
            $page.find('.visit_time_limit').text(data.visitTimelimit);
            if(data.isAssist){
                $page.find('.is_assist').text("是");
            }else{
                $page.find('.is_assist').text("否");
            }
            var participators = "";
            if(data.participators){
                for(var i=0; i<data.participators.length;i++){
                    if(data.participators[i].isSelected){
                        participators += data.participators[i].employeeName;
                        participators += "、";
                    }
                }
            }
            // 去掉后面的顿号
            participators = participators.substr(0,participators.length-1)
            $page.find('.participants').text(participators);

            if(data.visitProjects && data.visitProjects.length){
                //$page.find('.product_name').text(data.visitProjects[0].productName);
                //$page.find('.visit_purpose').text(data.visitProjects[0].purposeName);
                //$page.find('.feedback').text(data.visitProjects[0].feedback);
                if(data.visitProjects.length > 1){
                    for(var i=0; i<data.visitProjects.length;i++){
                        if(data.visitProjects[i].isSelected){
                            var $product = $product_box.clone();
                            $product.find('.product_name').text(data.visitProjects[i].productName);
                            $product.find('.visit_purpose').text(data.visitProjects[i].purposeName);
                            $product.find('.feedback').text(data.visitProjects[i].feedback);
                            $page.append($product_title.clone());
                            $page.append($product);
                        }
                    }
                }
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
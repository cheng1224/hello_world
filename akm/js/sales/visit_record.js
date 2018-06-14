$(function(){
    // fastClick
    FastClick.attach(document.body);

    var $page = $('.page');
    var $join_doctor_ul = $('.weui-cells_checkbox');
    var $join_doctor_li = $('.join_doctor_li').remove();

    var $product_label_ul = $('.product-label-ul');
    var $product_label_li = $('.product-label-li').remove();
    var $radio_content = $('.radio-content').remove();


    var correspondingCustomerId = request('hospitalId');
    var customerName = decodeURIComponent(request('hospitalName'));
    var customerEmployeeId = request('doctorId');
    var employeeName = decodeURIComponent(request('doctorName'));
    var visitStatus = request('visitStatus');
    var visitRecordId = request('visitRecordId');

    var requestData = {
        correspondingCustomerId : correspondingCustomerId,
        customerName : customerName,
        customerEmployeeId : customerEmployeeId,
        employeeName : employeeName,
        waitTimelimit : 15,
        visitTimelimit : 15,
        isAssist : 1,
        products : [],
        participators : []
    };

    $page.find('.hospital-name').text(customerName);
    $page.find('.doctor-name').text(employeeName);


    if(visitStatus == "0"){
        // 获取产品
        Api.getProducts(function(data){
            if(data){
                var product = data;
                if(product && product.length){
                    // 产品
                    for(var i=0; i<product.length; i++){
                        var $p_label = $product_label_li.clone();
                        var $p_content = $radio_content.clone();
                        $p_label.find('.product_name').text(product[i].productName);
                        $p_label.find('.product_name').attr("productId",product[i].productId);
                        $p_label.find('.product_input').attr('id',"productId"+i);
                        $p_label.find('label').attr('for',"productId"+i);

                        if(product[i].purposeName){
                            $p_content.find('.purpose_name').attr('purposeId',product[i].purposeId);
                            $p_content.find('.purpose_name').text(product[i].purposeName);
                            $p_content.find('.purpose_textarea').text(product[i].feedback);
                            $p_content.find('.word_number').text(product[i].feedback.length);
                        }
                        $product_label_ul.append($p_label);
                        $product_label_ul.append($p_content);
                    }
                }
            }
        },function(data){
            if(data){
                alert("服务器错误");
            }
        });

        // 获取参会人
        Api.getDoctors(correspondingCustomerId, function(data){
            if(data){
                var hospital = data;
                if(hospital  && hospital.length){
                    for(var i=0; i<hospital.length; i++){
                        var $add = $join_doctor_li.clone();
                        $add.find('.join_doctor_name').text(hospital[i].employeeName);
                        $add.find('.join_doctor_name').attr('doctorId',hospital[i].customerEmployeeId);
                        $add.attr('for',"id"+i);
                        $add.find('.join_doctor_checkbox').attr('id',"id"+i);
                        $join_doctor_ul.append($add);
                    }
                }
            }
        },function(data){
            if(data){
                alert("服务器错误");
            }
        });
    }else{ // 修改
        // 获取数据
        Api.getVisitRecord(visitRecordId,correspondingCustomerId,function(data){
            if(data){
                $page.find('.hospital-name').text(data.customerName);
                $page.find('.doctor-name').text(data.employeeName);
                requestData.correspondingCustomerId = data.correspondingCustomerId;
                requestData.customerEmployeeId = data.customerEmployeeId;

                var waitTime = $('#waitTime').val(data.waitTimelimit);
                var visitTime = $('#visitTime').val(data.visitTimelimit);
                var isAssist = $('#isAssist').val(data.isAssist);
                var product = data.visitProjects;
                if(product && product.length){
                    // 产品
                    for(var i=0; i<product.length; i++){
                        var $p_label = $product_label_li.clone();
                        var $p_content = $radio_content.clone();
                        $p_label.find('.product_name').text(product[i].productName);
                        $p_label.find('.product_name').attr("productId",product[i].productId);
                        $p_label.find('.product_input').attr('id',"productId"+i);
                        $p_label.find('label').attr('for',"productId"+i);

                        if(product[i].isSelected){
                            $p_label.find('.product_input').prop('checked',true);
                            $p_label.addClass('label-show');
                            $p_content.find('.purpose_name').attr('purposeId',product[i].purposeId);
                            $p_content.find('.purpose_name').text(product[i].purposeName);
                            $p_content.find('.purpose_textarea').text(product[i].feedback);
                            $p_content.find('.word_number').text(product[i].feedback.length);
                        }
                        $product_label_ul.append($p_label);
                        $product_label_ul.append($p_content);
                    }
                }
                var hospital = data.participators;
                if(hospital  && hospital.length){
                    for(var i=0; i<hospital.length; i++){
                        var $add = $join_doctor_li.clone();
                        $add.find('.join_doctor_name').text(hospital[i].employeeName);
                        $add.find('.join_doctor_name').attr('doctorId',hospital[i].customerEmployeeId);
                        $add.attr('for',"id"+i);
                        $add.find('.join_doctor_checkbox').attr('id',"id"+i);
                        if(hospital[i].isSelected){
                            $add.find('.join_doctor_checkbox').prop("checked",true);
                        }
                        $join_doctor_ul.append($add);
                    }
                }

            }
        },function(data){
            if(data){
                alert("服务器错误");
            }
        });

    }






    // 获取拜访目的
    var purposes;
    Api.getPurposes(function(data){
        if(data){
            purposes = dataPurposesFormat(data);
            setCookie('sandoz-visit-purposes',JSON.stringify(purposes),1);
        }
    },function(data){
        if(data){
            alert("服务器错误");
        }
    });


    $('.page').delegate('.product-label-click','click',function(e){
        e.stopPropagation();
        $(this).parent().parent().parent().toggleClass('label-show');
        if($(this).parent().parent().parent().hasClass('label-show')){
            $(this).prev().prop("checked",true);
        }else{
            $(this).prev().prop("checked",false);
        }

    });


    // 点击时间的bug
    $('.page').delegate('.join_doctor_li','click',function(e){
        e.stopPropagation();
        if($(this).find('input').attr("checked")){
            $(this).find('.join_doctor_checkbox').prop("checked",false);
        }else{
            $(this).find('.join_doctor_checkbox').prop("checked",true);
        }
    });


    //文本域的 onchange事件
    $('.page').delegate('.purpose_textarea','input propertychange',function(e){
        e.stopPropagation();
        var num = $(this).val().length;
        if(num > 200){
            var char = $(this).val();
            char = char.substr(0,200);
            $(this).val(char);
            num = 200;
        }
        $(this).parent().find('.word_number').text(num);

    });

    var isFinish = true;
    var reqData = {};
    $('#submit').click(function(e){
        // 获取数据
        var waitTime = $('#waitTime').val();
        var visitTime = $('#visitTime').val();
        var isAssist = $('#isAssist').val();
        var visitProjects = [];
        $(".product-label-li").each(function(i,item){
            if($(this).hasClass("label-show")){
                var productName = $(this).find('.product_name').text();
                var productId = $(this).find('.product_name').attr('productId');
                var purposeName = $(this).next().find('.purpose_name').text();
                var purposeId = $(this).next().find('.purpose_name').attr('purposeId');
                var text = $(this).next().find('.purpose_textarea').val();
                var product = {
                    productId : productId,
                    productName : productName,
                    purposeName : purposeName,
                    purposeId : purposeId,
                    feedback : text
                };
                if(!purposeId || !text.trim()){
                    isFinish = false;
                }else{
                    isFinish = true;
                }
                visitProjects.push(product);
            }
        });

        if(visitProjects.length == 0){
            isFinish = true;
        }

        var participators = [];
        $(".join_doctor_li").each(function(i,item){
            if($(this).find('.join_doctor_checkbox').attr("checked")){
                var employeeName = $(this).find('.join_doctor_name').text();
                var customerEmployeeId = $(this).find('.join_doctor_name').attr('doctorId');
                var doctor = {
                    customerEmployeeId : customerEmployeeId,
                    employeeName : employeeName
                };
                participators.push(doctor);
            }
        });

        reqData = {
            correspondingCustomerId : requestData.correspondingCustomerId,
            customerName : requestData.customerName,
            customerEmployeeId : requestData.customerEmployeeId,
            employeeName : requestData.employeeName,
            waitTimelimit : parseInt(waitTime),
            visitTimelimit : parseInt(visitTime),
            isAssist : parseInt(isAssist),
            products : visitProjects,
            participators : participators
        };
        if(!isFinish){
            $("#iosDialog2").show();
            setTimeout(function(){
                $('#iosDialog2').css({
                    opacity: 1,
                    transition: "opacity .2s linear",
                });
            },200);
            return;
        }

        if(visitProjects.length > 0){
            submit(reqData);
        }else{
            $('#confirmDialog').css("display", "block");
            setTimeout(function(){
                $('#confirmDialog').css({
                    opacity: 1,
                    transition: "opacity .2s linear",
                });
            },200);
        }

    });

    $(".i_know").click(function(){
        $('#iosDialog2').css({
            opacity: 0,
            transition: "opacity .2s linear",
        });
        setTimeout(function(){
            $('#iosDialog2').hide();
        },200);
    });



    $('#cancel').click(function(e){
        submit(reqData);
        $('#confirmDialog').css({
            opacity: 0,
            transition: "opacity .2s linear",
        });

        setTimeout(function(){
            $('#confirmDialog').css("display", "none");
        },200);
    });

    $('#confirm').click(function(e){
        $('#confirmDialog').css({
            opacity: 0,
            transition: "opacity .2s linear",
        });

        setTimeout(function(){
            $('#confirmDialog').css("display", "none");
        },200);
    });

    $('.page').delegate('.showPicker','click', function () {
        var self = $(this);
        weui.picker(purposes,{
                onChange: function (result) {
                    //console.log(result);
                },
                onConfirm: function (result) {
                    console.log(result);
                    // 获取数据
                    var data = getCookie('sandoz-visit-purposes');
                    data = JSON.parse(data);
                    for(var i=0;i<data.length;i++){
                        if(result == data[i].value){
                            self.find('.purpose_name').text(data[i].label);
                            self.find('.purpose_name').attr('purposeId',result);
                            break;
                        }
                    }
                }
            });


    });

    function submit(params){
        // 新增
        if(visitStatus == "0"){
            Api.addVisitsRecord(params,function(data){
                if(data && data == 1){
                    location.href = "visiting.html";
                }
            },function(){
                alert("服务器错误");
            });
        }else{ // 修改
            Api.updateVisitsRecord(visitRecordId,params,function(data){
                if(data && data == 1){
                    location.href = "visiting.html";
                }
            },function(){
                alert("服务器错误");
            });
        }

    }


});


function dataPurposesFormat(data){
    var params = [];
    if(data && data.length){
        for(var i=0; i<data.length; i++){
            var param = {};
            param["label"]= data[i].purposeName;
            param["value"]= data[i].purposeId;
            params.push(param);
        }
        return params;
    }
    return null;
}


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

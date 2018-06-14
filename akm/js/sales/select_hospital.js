$(function(){
    // fastClick
    FastClick.attach(document.body);

    var $radio_ul = $('.weui-cells_radio');
    var $hospital_li = $('.hospital_li').remove();

    var hospitals = getCookie("sandoz-hospitals");
    hospitals = JSON.parse(hospitals);
    for(var i=0; i< hospitals.length; i++){
        var $add = $hospital_li.clone();
        $add.find('.hospital-name').text(hospitals[i].customerName);
        $add.attr("hospitalId",hospitals[i].correspondingCustomerId);
        $radio_ul.append($add);
    }

    $('.js_container').on('click','.weui-check__label', function(e){
         e.preventDefault();
        var hospitalId = $(this).attr('hospitalId');
        var hospitalName = $(this).find('.hospital-name').text();
        window.location.href="./signin.html?hospitalId="+hospitalId;

    });
});

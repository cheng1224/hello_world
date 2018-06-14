$(function () {
    // fastClick
    FastClick.attach(document.body);

    var $page = $(".page");
    var $list_ul = $page.find(".list_ul").remove();
    var $list_li = $list_ul.find(".list_li").remove();


// 获取管理员名下所有用户的信息
    Api.getAllUsers(function (data) {
        if (data && data.length) {
            $page.empty();
            // 每行显示3条记录, 三条一循环
            var num = Math.ceil(data.length / 3);
            for (var j = 1; j <= num; j++) {
                var $ul = $list_ul.clone();
                for (var i = 0; i < 3; i++) {
                    var $li = $list_li.clone();
                    var index = i + ((j - 1) * 3);
                    $li.find(".user_name").text(data[index].userName);
                    $li.find(".image").attr("src", data[index].headImgUrl);
                    if (data[index].checkStatus) {
                        $li.find(".sign_time").text(dateFormat(data[index].checkinTime));
                    } else {
                        $li.find(".sign_time").text("未签到");
                    }
                    $ul.append($li);
                    if (index == data.length - 1) {
                        break;
                    }
                }
                $page.append($ul);
            }
        } else {
            alert("暂无用户信息");
        }
    }, function (data) {
        if (data) {
            alert("服务器错误");
        }
    });

});

function dateFormat(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var ss = d.getSeconds();
    hh = hh < 10 ? "0" + hh : hh;
    ss = ss < 10 ? "0" + ss : ss;
    return hh + ":" + ss;
}
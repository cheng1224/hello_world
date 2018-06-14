/**
 * Created by jfengjiang on 2015/9/11.
 */

$(function () {
    // page stack
    var stack = [];
    var $container = $('.js_container');
    //这里的click事件，它的事件是.js_cell[data-id],也就是class=js_cell，并且有data-id属性
    $container.on('click', '.js_cell[data-id]', function () {
    	//用button这个例子讲，这个id应该是data-id="button"里的button
    	//然后go就跳转了，也就是push的效果应该是它弄的
        var id = $(this).data('id');
        go(id);
    });

	//返回页方法
    //location.hash = '#hash1' 和点击后退都会触发`hashchange`，这里操作面的后退操作
    //location.hash变了
    $(window).on('hashchange', function (e) {
        if (/#.+/gi.test(e.newURL)) {
            return;
        }
        //var $top = stack.pop();很明显出栈了
        var $top = stack.pop();
        //if (!$top) {return;} 是如果栈顶，不做操作
        if (!$top) {
            return;
        }
        //给$top添加或删除页面动画的css
        $top.addClass('slideOut').on('animationend', function () {
            $top.remove();
        }).on('webkitAnimationEnd', function () {
            $top.remove();
        });
    });


	//跳转页 方法
    function go(id){
    	//push的页面从哪里来呢？
    	//id是data-id="button"里的button，也就是说我们要根据id=“tpl_button”来找模板里的html。
    	//只要是class=js_cell，并且有data-id属性的就会触发点击时间，根据tpl_button里的内容显示（push）
    	//这就是push，跳转到子页的方法
        var $tpl = $($('#tpl_' + id).html()).addClass('slideIn').addClass(id);
        //$container.append($tpl);是dom元素插入
        $container.append($tpl);
        //stack.push($tpl); 视图栈中push最新的页面
        stack.push($tpl);
        //location.hash = '#' + id;是pushstate更改url地址
        location.hash = '#' + id;
		
		//下面是页面的动画而添加或删除的class
        $($tpl).on('webkitAnimationEnd', function (){
            $(this).removeClass('slideIn');
        }).on('animationend', function (){
            $(this).removeClass('slideIn');
        });
        // 消息提醒
        if (id == 'cell') {
            $('.js_tooltips').show();
            setTimeout(function (){
                $('.js_tooltips').hide();
            }, 3000);
        }
    }

    if (/#.*/gi.test(location.href)) {
        go(location.hash.slice(1));
    }

    // toast
    $container.on('click', '#showToast', function () {
        $('#toast').show();
        setTimeout(function () {
            $('#toast').hide();
        }, 5000);
    });
//  $container.on('click', '#showLoadingToast', function () {
//      $('#loadingToast').show();
//      setTimeout(function () {
//          $('#loadingToast').hide();
//      }, 5000);
//  });
//
//  $container.on('click', '#showDialog1', function () {
//      $('#dialog1').show();
//      $('#dialog1').find('.weui_btn_dialog').on('click', function () {
//          $('#dialog1').hide();
//      });
//  });
//  $container.on('click', '#showDialog2', function () {
//      $('#dialog2').show();
//      $('#dialog2').find('.weui_btn_dialog').on('click', function () {
//          $('#dialog2').hide();
//      });
//  })
});
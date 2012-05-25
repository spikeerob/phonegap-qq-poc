/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    $('#qqform').submit(function(){
        $.mobile.changePage('#fetch', {transition: 'slideup'});
        return false;
    });
});


$(document).bind('pagechange', function(){
    if (typeof $.mobile.activePage != 'undefined') {
        switch($.mobile.activePage.attr('id')) {
            case 'fetch':
                $('#values').html($("form#qqform").serialize());
                setTimeout(function(){$.mobile.changePage('#result', {transition: 'slidedown'}); }, 3000);
                break;
        }
    }
});

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    $('#qqform').submit(function(){
        $.mobile.changePage('#fetch', {transition: 'pop', role: 'dialog'});
        return false;
    });
});


$(document).bind('pagechange', function(){
    if (typeof $.mobile.activePage != 'undefined') {
        switch($.mobile.activePage.attr('id')) {
            case 'fetch':
                $('#values').html($("form#qqform").serialize());
                setTimeout(function(){$.mobile.changePage('#result', {transition: 'fade'}); }, 3000);
                break;
        }
    }
});

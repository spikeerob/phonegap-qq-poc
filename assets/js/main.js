/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    $('#qqform').submit(function(){
        $.mobile.changePage('#fetch', {transition: 'fade', changeHash: false});
        return false;
    });
    
    $('#gender-m').attr('checked', true).checkboxradio('refresh');
    $('#yearofbirth').val('1982');
    $('#postcode').val('bn35np');
    $('#carreg').val('ef51pxr');
    $('#noclaims').val('2').selectmenu('refresh');
});

$(document).bind('pagechange', function(){
    if (typeof $.mobile.activePage != 'undefined') {
        switch($.mobile.activePage.attr('id')) {
            case 'fetch':
                $.ajax({
                    url: 'http://api.quickquote-directline.monitormedia.net/car?format=json',
                    type: 'post',
                    data: $("form#qqform").serialize(),
                    dataType: 'json',
                    success: function(data) {
                        $('#quoteString').text(data.quoteString);
                        $.mobile.changePage('#result', {transition: 'fade'});
                    }
                })
                break;
        }
    }
});

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
             
            case 'data':
                var networkState = navigator.network.connection.type;

                var states = {};
                states[Connection.UNKNOWN]  = 'Unknown connection';
                states[Connection.ETHERNET] = 'Ethernet connection';
                states[Connection.WIFI]     = 'WiFi connection';
                states[Connection.CELL_2G]  = 'Cell 2G connection';
                states[Connection.CELL_3G]  = 'Cell 3G connection';
                states[Connection.CELL_4G]  = 'Cell 4G connection';
                states[Connection.NONE]     = 'No network connection';

                $('#connection').text(states[networkState]);
                
                var accelSuccess = function(acceleration) {
                    $('#xaxis').text(acceleration.x);
                    $('#yaxis').text(acceleration.y);
                    $('#zaxis').text(acceleration.z);
                }

                var accelError = function() {
                    alert('accelError!');
                }

                var accelOptions = {frequency: 500};
                navigator.accelerometer.watchAcceleration(accelSuccess, accelError, accelOptions);



                var contactSuccess = function(contacts) {
                    var robs = [];
                    $(contacts).each(function() {
                        robs.push(this.displayName);
                    });
                    $('#robs').text(robs.join(', '));
                };

                var contactError = function() {
                    alert('contactError!');
                };

                // find all contacts with 'Bob' in any name field
                var contactOptions = new ContactFindOptions();
                contactOptions.filter = "Rob";
                contactOptions.multiple = true;
                var fields = ["displayName", "name"];
                navigator.contacts.find(fields, contactSuccess, contactError, contactOptions);

                
                
                var geoSuccess = function(position) {
                    $('#lat').text(position.coords.latitude);
                    $('#long').text(position.coords.longitude);
                    $('#alt').text(position.coords.altitude);
                }

                var geoError = function() {
                    alert('geoError!');
                }
                
                var geoOptions = { frequency: 1000 };
                navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);

                break;
        }
    }
});

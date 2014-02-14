
var rtLogin = function(container, _id) {

	var host = window.location.host.split(':')[0];
    var socket = io.connect('http://162.242.146.183:3000');

//	console.log(socket.emit('rt-login', JSON.stringify({ user: _id })));

	socket.on('timeline', function (data) {
		var dv = $( data ).hide();
    container.prepend(dv);
    dv.hide().show('blind');
    container.scrollTop(0);
});

};

rtLogin($('#events-list'), $('#nvm').data('user'))
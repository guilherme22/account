var appData = window.appData = {};
var urlService = location.origin+"/";
var markAtual = "";

appData.marcadores = {};
//metodo para usar o "GET" do ajax
appData.ajaxGet = function (url, sucesso, erro){
    $.ajax({
        type:"GET",
        url:url,
        dataTYpe: "json",
        success: sucesso,
        error: erro
    })
}

appData.insertNewRow = function (TableData){
    var i = 0, theGrid = $('#theGrid'), odd = true, a;

    a = $('<tr style="cursor:pointer" class="gradeX" id="'+TableData._id +'" onclick="appData.showClick(this)">');
    if(odd) {
        a.addClass('odd');
        odd = false;
    } else {
        a.addClass('even');
        odd = true;
    }
    var inicio = moment(TableData.timeline.timestamp[0]);
    var lastPosition = TableData.timeline.position[ TableData.timeline.position.length - 1 ];
    a.append('<td>' + TableData.driver_name + '</td>');
    a.append('<td>'+TableData.plate_number+'</td>');
    a.append('<td>'+inicio.format('DD/MM - hh:mm')+'</td>');
    if(appData.verifyViolationFour(TableData.timeline.work_time_violation))
        a.append('<td>'+'<span class="glyphicon glyphicon-remove"></span>'+'</td>');
    else
        a.append('<td>'+'<div>&nbsp;</div>'+'</td>');

    if(appData.verifyViolationEight(TableData.timeline.work_time_violation))
        a.append('<td>'+'<span class="glyphicon glyphicon-remove"></span>'+'</td>');
    else
        a.append('<td>'+'<div>&nbsp;</div>'+'</td>');

    if(TableData.total_break_time > 60)
        a.append('<td>'+'<div class="glyphicon glyphicon-ok ""></div>'+'</td>');
    else
        a.append('<td>'+'<div>&nbsp;</div>'+'</td>');
    if(TableData.total_break_time > 30)
        a.append('<td>'+'<div class="glyphicon glyphicon-ok"></div>'+'</td>');
    else
        a.append('<td>'+'<div>&nbsp;</div>'+'</td>');
    if(TableData.total_work_time > 720)
        a.append('<td>'+'<div class="glyphicon glyphicon-ok"></div>'+'</td>');
    else
        a.append('<td>'+'<div>&nbsp;</div>'+'</td>');
    if(TableData.finished )
        a.append('<td>'+'<div class="glyphicon glyphicon-ok"></div>'+'</td>');
    else
        a.append('<td>'+'<div>&nbsp;</div>'+'</td>');
    theGrid.prepend(a)
}

function addMarkHandler ( data ) {
   
  var map = window.vmap;
  var lastPosition = data.timeline.position[ data.timeline.position.length - 1 ];
  var lastDetail = data.timeline.detail[ data.timeline.detail.length - 1 ];
  var content = [ 
    '<div id="content">',
      '<div id="siteNotice">','</div>',
      '<label id="firstHeading" class="firstHeading">',lastDetail  , '</label>',
        '<button id='+data._id +' class="btn btn-small btn-primary btnInfoWindow"  onclick="appData.closeMark(this)">OK</button>',
      '</div>',
    '</div>'
  ].join('');
  var opts = {
    lat: lastPosition.lat,
    lng: lastPosition.lng,
    title: data.driver_name.slice(0, 30) + ( data.driver_name.length >= 30 ? '...' : '' ),
    infoWindow: { content: content },
     animation: google.maps.Animation.DROP,
     _id: data._id
  };

   if(checkMarker(opts, map.markers) === -1){
       map.addMarker( opts );
   } else{
   var markAtual =   map.markers.splice((checkMarker(opts, map.markers)), 1);
       markAtual[0].setMap(null);
       map.addMarker( opts );
   }
  return map;
}

appData.addMark = addMarkHandler;

function driverFocusHandler ( opts ) {
  var map = ( window.vmap );
  opts.click = console.log.bind( console );
}

function checkMarker(mark, markers){
        for (var i = 0, len = markers.length; i < len; i++) {
            if (markers[i]['_id'] === mark._id) return i;
        }
        return -1;
};

appData.driverFocus = driverFocusHandler;
//metodo para inicializar o mapa e a tabela
appData.startMapPage = function(){
    var socket = ( window.socket || io.connect('http://162.242.146.183:3000') );
          socket.on('timeline', function(data){
          appData.removeRow();
          appData.insertNewRow(data);
          appData.addMark(data);
        });
}

appData.fetchList = function(fn){
    var fn = (fn || function(){});
    function successHandler (data){
        var result = data.result;
        result.map(appData.insertNewRow);
        result.map(appData.addMark);
        fn();
    }

    function errorHandler (data){
        console.log(data);
    }
    appData.ajaxGet('http://journey.roadapps.net:3000/api/travel', successHandler, errorHandler);
}
// verificar se passou do limite de 4hs
appData.verifyViolationFour = function(workViolation){
    var out = false;
    out = !!~workViolation.indexOf(1);
    return out;
}
//verificar se passou do limite de 8hs
appData.verifyViolationEight = function(workViolation){
    var out = false;
    out = !!~workViolation.indexOf(2);
    return out;
}
//verificar se passou do limite de 2hs de parada
appData.verifyViolationStop = function(breakViolations){
    var out = false;
    out = !!~breakViolations.indexOf(0);
    return out;
}

appData.closeMark = function (valor){
    var opts =  {_id: valor.id};
    markAtual = vmap.markers[(checkMarker(opts,vmap.markers))];
    markAtual.infoWindow.close();
}

appData.showClick = function(parametro){
    var opts =  {_id: parametro.id};

    if(typeof markAtual != "string")
        markAtual.infoWindow.close();
    markAtual = vmap.markers[(checkMarker(opts,vmap.markers))];
    markAtual.infoWindow.open(vmap.map, markAtual);
}

appData.removeRow = function (){
    var list = $(".gradeX").map(function() {
        return $(this)
    });
    var id = list[list.length -1][0].id;
    $('#theGrid ' +'tr#'+id).remove();
}
$(function() {
      var map = window.vmap = new GMaps({
        div: '#map',
        lat: -23,
        lng: -46,
        zoom:4
      });

  appData.fetchList(appData.startMapPage);
});

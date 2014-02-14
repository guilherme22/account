 var map;
 var directionsDisplay;
 var start;
 var rendererOptions = {
			draggable: false,
			suppressMarkers: true,
		};


var citymap = {};
citymap['chicago'] = {
  center: new google.maps.LatLng(41.878113, -87.629798),
  population: 2842518
};
citymap['newyork'] = {
  center: new google.maps.LatLng(40.714352, -74.005973),
  population: 8143197
};
citymap['losangeles'] = {
  center: new google.maps.LatLng(34.052234, -118.243684),
  population: 3844829
};
var cityCircle;


var bermudaTriangle;

  // Define the LatLng coordinates for the polygon's path.
  var triangleCoords = [
    new google.maps.LatLng(25.774252, -80.190262),
    new google.maps.LatLng(18.466465, -66.118292),
    new google.maps.LatLng(32.321384, -64.75737),
    new google.maps.LatLng(25.774252, -80.190262)
  ];


function initialize(){
	directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
	var annArbor = new google.maps.LatLng(42.277817,-83.733673);
	var myOptions = {
	  zoom: 6,
	  mapTypeId: google.maps.MapTypeId.ROADMAP,
	  center: annArbor
	}
	
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	directionsDisplay.setMap(map);

  for (var city in citymap) {
    var populationOptions = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: citymap[city].center,
      radius: citymap[city].population / 40
    };
    cityCircle = new google.maps.Circle(populationOptions);
  }

  bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });

  bermudaTriangle.setMap(map);
  
}

waypts = [{
      location:"Fowlerville, MI", 
      stopover:true
    },{
      location:"Howell, MI",
      stopover:true
    }];	

	waypts2 = [{
      location:"Fort Wayne, IN", 
      stopover:true
    },{
      location:"Albion, MI",
      stopover:true
    },{
      location:"Three Rivers, MI",
      stopover:true
    }];	
	
	waypts3 = [{
      location:"Fort Wayne, IN", 
      stopover:true
    },{
      location:"Albion, MI",
      stopover:true
    },{
      location:"Three Rivers, MI",
      stopover:true
    },{
			location: 'W Grand River Ave, Meridian Charter Township, MI, United States',
			stopover: true
		},{
			location: 'Ferris Rd, Onondaga, MI, United States',
			stopover: true
		}
    ];	
	
	//start;
	//end;
	//waypts;
	
    function renderDirections(result) {
      var directionsRenderer = new google.maps.DirectionsRenderer;
      directionsRenderer.setMap(map);
      directionsRenderer.setDirections(result);
    }
	
	//polyline options don't exactly work
	//var polylineOpts = {map: map, strokeColor:'#000000', strokeWidth: 3, strokeOpacity: 0.5}

    var directionsService = new google.maps.DirectionsService;
    function requestDirections(start, end) {
      directionsService.route({
        origin: start,
        waypoints: waypts,
		optimizeWaypoints: true,
		destination: end,
		//polylineOptions: polylineOpts,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      }, function(result) {
        renderDirections(result);
      });
    }
    requestDirections('East Lansing, MI', 'Ann Arbor, MI');
	
	
	var directionsService = new google.maps.DirectionsService;
    function requestDirections2(start, end) {
      directionsService.route({
        origin: start,
        //waypoints: waypts,
		//optimizeWaypoints: true,
		destination: end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      }, function(result) {
        renderDirections(result);
      });
    }
	
    requestDirections2('Detroit, MI', 'Ann Arbor, MI');
	
	var directionsService = new google.maps.DirectionsService;
    function requestDirections3(start, end) {
      directionsService.route({
        origin: start,
		optimizeWaypoints: true,
        waypoints: waypts3,
		destination: end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      }, function(result) {
        renderDirections(result);
      });
    }
	
	
	requestDirections3('Purdue University, 560 Oval Dr, West Lafayette, IN 47907-2084, USA', 'Ann Arbor, MI');

	var mapResize = function() {
		$('#map_canvas').css({
			height: $( window ).height(),
			width: $('#pgbody').outerWidth(true),
			marginLeft: -20
		});
	};

	mapResize();

	$(initialize);
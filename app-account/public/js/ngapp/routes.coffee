initialize = ->
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)
  annArbor = new google.maps.LatLng(42.277817, -83.733673)
  myOptions =
    zoom: 6
    mapTypeId: google.maps.MapTypeId.ROADMAP
    center: annArbor

  map = new google.maps.Map(document.getElementById("map-canvas"), myOptions)
  directionsDisplay.setMap map
  mapResize()
renderDirections = (result) ->
  directionsRenderer = new google.maps.DirectionsRenderer
  directionsRenderer.setMap map
  directionsRenderer.setDirections result
  mapResize()
#var polylineOpts = {map: map, strokeColor:'#000000', strokeWidth: 3, strokeOpacity: 0.5}
requestDirections = (start, end) ->
  directionsService.route
    origin: start
    waypoints: waypts
    optimizeWaypoints: true
    destination: end
    
    #polylineOptions: polylineOpts,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  , (result) ->
    renderDirections result

requestDirections2 = (start, end) ->
  directionsService.route
    origin: start
    
    #waypoints: waypts,
    #optimizeWaypoints: true,
    destination: end
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  , (result) ->
    renderDirections result

requestDirections3 = (start, end) ->
  directionsService.route
    origin: start
    optimizeWaypoints: true
    waypoints: waypts3
    destination: end
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  , (result) ->
    renderDirections result

map = undefined
directionsDisplay = undefined
start = undefined
rendererOptions =
  draggable: false
  suppressMarkers: true

waypts = [
  location: "Fowlerville, MI"
  stopover: true
,
  location: "Howell, MI"
  stopover: true
]
waypts2 = [
  location: "Fort Wayne, IN"
  stopover: true
,
  location: "Albion, MI"
  stopover: true
,
  location: "Three Rivers, MI"
  stopover: true
]
waypts3 = [
  location: "Fort Wayne, IN"
  stopover: true
,
  location: "Albion, MI"
  stopover: true
,
  location: "Three Rivers, MI"
  stopover: true
,
  location: "W Grand River Ave, Meridian Charter Township, MI, United States"
  stopover: true
,
  location: "Ferris Rd, Onondaga, MI, United States"
  stopover: true
]
directionsService = new google.maps.DirectionsService
requestDirections "East Lansing, MI", "Ann Arbor, MI"
directionsService = new google.maps.DirectionsService
requestDirections2 "Detroit, MI", "Ann Arbor, MI"
directionsService = new google.maps.DirectionsService
requestDirections3 "Purdue University, 560 Oval Dr, West Lafayette, IN 47907-2084, USA", "Ann Arbor, MI"
mapResize = ->
  $("#map-events").css
    height: $(window).height()
    width: $("#pgbody").outerWidth(true)
mapResize()
$(window).on "resize", mapResize
$ initialize
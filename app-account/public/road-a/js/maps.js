
function google_maps() {
    new GMaps({
        div: '#map',
        lat: -12.043333,
        lng: -77.028333
    });

    url = GMaps.staticMapURL({
        size: [610, 300],
        lat: -12.043333,
        lng: -77.028333
    });

    $('<img/>').attr('src', url)
        .appendTo('#static');

    map = new GMaps({
        div: '#route',
        lat: -12.043333,
        lng: -77.028333
    });
    $('#start_travel').click(function (e) {
        e.preventDefault();
        map.travelRoute({
            origin: [-12.044012922866312, -77.02470665341184],
            destination: [-12.090814532191756, -77.02271108990476],
            travelMode: 'driving',
            step: function (e) {
                $('#instructions').append('<li>' + e.instructions + '</li>');
                $('#instructions li:eq(' + e.step_number + ')').delay(450 * e.step_number).fadeIn(200, function () {
                    map.setCenter(e.end_location.lat(), e.end_location.lng());
                    map.drawPolyline({
                        path: e.path,
                        strokeColor: '#131540',
                        strokeOpacity: 0.6,
                        strokeWeight: 6
                    });
                });
            }
        });
    });

    var addresspicker = $("#addresspicker").addresspicker();
    var addresspickerMap = $("#addresspicker_map").addresspicker({
        regionBias: "de",
        map: "#map_canvas",
        typeaheaddelay: 1000,
        mapOptions: {
            zoom: 16,
            center: new google.maps.LatLng(52.5122, 13.4194)
        }

    });

    addresspickerMap.on("addressChanged", function (evt, address) {
        console.dir(address);
    });
    addresspickerMap.on("positionChanged", function (evt, markerPosition) {
        markerPosition.getAddress(function (address) {
            if (address) {
                $("#addresspicker_map").val(address.formatted_address);
            }
        })
    });
}

function vector_maps() {
    jQuery('#vmap').vectorMap({
        map: 'world_en',
        backgroundColor: '#333333',
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#666666',
        enableZoom: true,
        showTooltip: true,
        values: sample_data,
        scaleColors: ['#C8EEFF', '#006491'],
        normalizeFunction: 'polynomial'
    });
    jQuery('#vmap-asia').vectorMap({
        map: 'asia_en',
        backgroundColor: '#333333',
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#666666',
        enableZoom: true,
        showTooltip: true,
        values: sample_data,
        scaleColors: ['#C8EEFF', '#006491'],
        normalizeFunction: 'polynomial'
    });
    jQuery('#vmap-europe').vectorMap({
        map: 'europe_en',
        backgroundColor: '#333333',
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#666666',
        enableZoom: true,
        showTooltip: true,
        values: sample_data,
        scaleColors: ['#C8EEFF', '#006491'],
        normalizeFunction: 'polynomial'
    });
    jQuery('#vmap-australia').vectorMap({
        map: 'australia_en',
        backgroundColor: '#333333',
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#666666',
        enableZoom: true,
        showTooltip: true,
        values: sample_data,
        scaleColors: ['#C8EEFF', '#006491'],
        normalizeFunction: 'polynomial'
    });
    jQuery('#vmap-africa').vectorMap({
        map: 'africa_en',
        backgroundColor: '#333333',
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#666666',
        enableZoom: true,
        showTooltip: true,
        values: sample_data,
        scaleColors: ['#C8EEFF', '#006491'],
        normalizeFunction: 'polynomial'
    });
    jQuery('#vmap-northamerica').vectorMap({
        map: 'north-america_en',
        backgroundColor: '#333333',
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#666666',
        enableZoom: true,
        showTooltip: true,
        values: sample_data,
        scaleColors: ['#C8EEFF', '#006491'],
        normalizeFunction: 'polynomial'
    });
    jQuery('#vmap-southamerica').vectorMap({
        map: 'south-america_en',
        backgroundColor: '#333333',
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#666666',
        enableZoom: true,
        showTooltip: true,
        values: sample_data,
        scaleColors: ['#C8EEFF', '#006491'],
        normalizeFunction: 'polynomial'
    });
}

google_maps();
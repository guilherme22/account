var grafics = {};
var appData = {}
var urlService = location.origin+"/";

// metodo para criar graficos no formato pizza
grafics.criar = function (placeholder,dataSource, config){
    $.plot(placeholder, dataSource,config);
};

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

//metodo para usar o metodo "POST" do ajax
appData.ajaxSend = function (url, data, sucesso, erro){
    $.ajax({
        type:"POST",
        url:url,
        data: JSON.stringify(data),
        dataTYpe: "json",
        success: sucesso,
        error: erro
    });
}

//metodo para inicilizar app
appData.start = function(){

    //metodo para retornar source de linhas
    appData.ajaxGet(urlService+"jsons/linhas.json", function(data){

        grafics.criar($("#chart"), [ {
            data: data.total,
            label: "Total"
        }, {
            data: data.Autorizados,
            label: "Com Autorização"
        }, {
            data: data.NaoAutorizados,
            label: "Sem Autorização"
        }], {
            series: {
                lines: {
                    show: true,
                    lineWidth: 1,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.05
                        }, {
                            opacity: 0.09
                        }]
                    }
                },
                points: {
                    show: true,
                    lineWidth: 2,
                    radius: 3
                },
                shadowSize: 0,
                stack: true
            },
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#f9f9f9",
                borderWidth: 0
            },
            legend: {
                // show: false
                labelBoxBorderColor: "#fff"
            },
            colors: ["#94aec4", "#3473A9"],
            xaxis: {
                ticks: [
                    [1, "DOM"],
                    [2, "SEG"],
                    [3, "TER"],
                    [4, "QUA"],
                    [5, "QUI"],
                    [6, "SEX"],
                    [7, "SAB"]
                ],
                font: {
                    size: 12,
                    family: "Open Sans, Arial",
                    variant: "small-caps",
                    color: "#9da3a9"
                }
            },
            yaxis: {
                ticks: 3,
                tickDecimals: 0,
                font: {
                    size: 12,
                    color: "#9da3a9"
                }
            }
        })


    }, function(error){
        alert("Erro: " + JSON.stringify(error))
    });

    //metodo para retornar source do grafico pizza esquerdo 

    appData.ajaxGet(urlService+"jsons/pizzaesquerda.json", function(data){
        var pieData = 
                {
                    value: data.Dia,
                    color:"#F38630"
                },
                {
                    value : data.Noite,
                    color : "#2F7ABC"
                },
            ];
        var myPie = new Chart(document.getElementById("canvas").getContext("2d")).Pie(pieData);
    });

    //metodo para retornar source de grafico pizza direito

    appData.ajaxGet(urlService+"jsons/pizzadireita.json", function(data){
        var pieData2 = [
                {
                    value: data.Dia,
                    color:"#E65B5B"
                },
                {
                    value: data.Noite,
                    color:"#6FB34A"
                },
            ];
        var myPie = new Chart(document.getElementById("canvas2").getContext("2d")).Pie(pieData2);
    });

    //metodo para retornar source do primeiro grafico de barrass
    appData.ajaxGet(urlService+"jsons/barraum.json", function(data){
        grafics.criar($("#bar"), [data], {
            series: {
                bars: {
                    show: true,
                    barWidth: 0.6,
                    align: "center"
                }

            },
            colors: ["#94aec4", "#3473A9"],
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#fff",
                borderWidth: 0
            },
            xaxis: {
                mode: "categories",
                tickLength: 0
            }
        })

    }, function(error){
        alert("Erro: " + JSON.stringify(error))
    });

    //metodo para retornar source do segundo grafico de barras
    appData.ajaxGet(urlService+"jsons/barradois.json", function(data){
        grafics.criar($("#bar2"), [data],{
            series: {
                bars: {
                    show: true,
                    barWidth: 0.6,
                    align: "center"
                }

            },
            colors: ["#94aec4", "#3473A9"],
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#fff",
                borderWidth: 0
            },
            xaxis: {
                mode: "categories",
                tickLength: 0
            }
        })

    }, function(error){
        alert("Erro: " + JSON.stringify(error))
    });

    //metodo para retornar source do terceiro grafico de barras
    appData.ajaxGet(urlService+"jsons/barratres.json", function(data){
        grafics.criar($("#bar3"), [data], {
            series: {
                bars: {
                    show: true,
                    barWidth: 0.7,
                    align: "center"
                }

            },
            colors: ["#94aec4", "#3473A9"],
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#fff",
                borderWidth: 0
            },
            xaxis: {
                mode: "categories",
                tickLength: 0
            }
        })

    }, function(error){
        alert("Erro: " + JSON.stringify(error))
    });

}

//metodo para inicializar o mapa e a tabela
appData.startMapPage = function(){
    appData.ajaxGet(urlService+"jsons/grid.json", function(sucesso){
        TableData = sucesso;
        var i = 0, theGrid = $('#theGrid'), odd = true, a;
        theGrid.html('');
        for(i = 0; i < TableData.length; i++) {
            a = $('<tr class="gradeX">');
            if(odd) {
                a.addClass('odd');
                odd = false;
            } else {
                a.addClass('even');
                odd = true;
            }
            a.append('<td>'+TableData[i].nome+'</td>');
            a.append('<td>'+TableData[i].cpf+'</td>');
            a.append('<td>'+TableData[i].inicioDaViagem+'</td>');
            a.append('<td>'+TableData[i].regra_4horas+'</td>');
            a.append('<td>'+TableData[i].regra_8horas+'</td>');
            if(TableData[i].almoco)
                a.append('<td>'+'<div class="glyphicon glyphicon-saved"></div>'+'</td>');
            else
                a.append('<td>'+'<span class="glyphicon glyphicon-remove"></span>'+'</td>');
            if(TableData[i].tempoDeDescanso)
                a.append('<td>'+'<div class="glyphicon glyphicon-saved"></div>'+'</td>');
            else
                a.append('<td>'+'<span class="glyphicon glyphicon-remove"></span>'+'</td>');
            a.append('<td>'+TableData[i].fimDaUltimaViagem+'</td>');
            if(TableData[i].horaExtra)
                a.append('<td>'+'<div class="glyphicon glyphicon-saved"></div>'+'</td>');
            else
                a.append('<td>'+'<span class="glyphicon glyphicon-remove"></span>'+'</td>');
            if(TableData[i].horaExtraNoturna)
                a.append('<td>'+'<div class="glyphicon glyphicon-saved"></div>'+'</td>');
            else
                a.append('<td>'+'<span class="glyphicon glyphicon-remove"></span>'+'</td>');
            theGrid.append(a)
        }
        data_tables()
    }, function(error){
        alert("Erro ao retornar as informações da tabela")
    })
}


function data_tables() {
    $('#managed-table').dataTable();
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
    }
}

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

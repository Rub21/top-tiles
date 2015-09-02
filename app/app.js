L.mapbox.accessToken = 'pk.eyJ1IjoicnViZW4iLCJhIjoiYlBrdkpRWSJ9.JgDDxJkvDn3us36aGzR6vg';
var map = L.mapbox.map('map', 'ruben.nbalnj6l', {
    infocontrol: true,
    zoomControl: false,
    center: [35.546, 137.411],
    zoom: 8
});

new L.Control.Zoom({
    position: 'topright'
}).addTo(map);
var hues = [
    '#ffffb2',
    '#fecc5c',
    '#fd8d3c',
    '#f03b20',
    '#bd0026'
];
var usLayer = L.mapbox.featureLayer()
    .loadURL('https://dl.dropboxusercontent.com/u/43116811/edition-data-team/japan-z13-focus.geojson')
    .addTo(map)
    .on('ready', function() {
        var scale = [10, 3466];
        usLayer.eachLayer(function(layer) {
            var scale = 0;
            if (layer.feature.properties.num < 50) {
                scale = 0;
            } else if (layer.feature.properties.num >= 50 && layer.feature.properties.num < 200) {
                scale = 1;
            } else if (layer.feature.properties.num >= 200 && layer.feature.properties.num < 500) {
                scale = 2;
            } else if (layer.feature.properties.num >= 500 && layer.feature.properties.num < 1000) {
                scale = 3;
            } else if (layer.feature.properties.num >= 1000) {
                scale = 4;
            }
            layer.setStyle({
                fillColor: hues[scale],
                fillOpacity: .9,
                weight: 0.3
            });
            layer.on({
                click: function() {
                    var coor = [];
                    var arr = layer.feature.geometry.coordinates[0];
                    coor.push((arr[0][0] + arr[1][0] + arr[2][0] + arr[3][0]) / 4);
                    coor.push((arr[0][1] + arr[1][1] + arr[2][1] + arr[3][1]) / 4);
                    console.log(coor);
                    console.log(coor);
                    window.open('http://lxbarth.com/compare/swipe/?ruben.nbalnj6l&google#15/' + coor[1] + '/' + coor[0], '_blank');
                }
            });

            document.getElementById('map').classList.remove("loading");
        });
    });
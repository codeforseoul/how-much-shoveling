var mapElement = document.querySelector('google-map');
mapElement.addEventListener('google-map-ready', mapLoaded);

var tmpl = document.querySelector('template');
tmpl.addEventListener('template-bound', function() {
  var mapElement = document.querySelector('google-map');
  mapElement.addEventListener('google-map-ready', mapLoaded);
});

function mapLoaded(e) {
  var map = this.map;
  map.setOptions({
    styles: [
      {
        // set all features to 15% of the saturation of their default color
        stylers: [{saturation: -85}]
      }, {
        // in addition, lower the lightness of water specifically
        featureType: "water",
        elementType: "geometry",
        stylers: [{lightness: -20}]
      }
    ]
  });
}
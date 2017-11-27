var map;

function initMap() {
    var myLatLng = {lat: 51.6552584, lng: 39.1364064};

    map = new google.maps.Map($('.map')[0], {
        center: myLatLng,
        zoom: 16
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Мы здесь!'
    });
}
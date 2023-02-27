

// my custom token
mapboxgl.accessToken =
'pk.eyJ1Ijoic3Zpa3RvcjEiLCJhIjoiY2xlbWtybzZ4MTYxczNwbXpzbjBtaG1zdiJ9.w3yyW4LVqpTVvTEmP24p8Q';


navigator.geolocation.getCurrentPosition(success, error, {});

function success(position) {
    setupMap([position.coords.longitude, position.coords.latitude])
}

function error() {
    console.log("location not found")
}


function setupMap(center) {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 6,
    });
}



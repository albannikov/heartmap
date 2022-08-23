function init () {

    start = '62.132648, 77.463929'; // start coordinates
    zoom = 14;                      // start zoom
    id = 'map';    

    start = start.split(',');       // split coordinates to array

    lat = start[0];
    long = start[1];
    coords = [lat, long];
    let Map = new ymaps.Map(id, {    // initialize map
        center: coords,
        type: 'yandex#hybrid',
        zoom: zoom,
        controls: ['zoomControl']
    });
    

    /* Adding search on map */
    var search = new ymaps.control.SearchControl({
        options: {
            float: 'left',
            floatIndex: 100,
            noPlacemark: true
        }
    });
    Map.controls.add(search);

    /* Addung mark on map*/
    mark = new ymaps.Placemark([lat, long],{}, {preset: "islands#redCircleDotIcon", draggable: true});
    Map.geoObjects.add(mark);

    /* Event drag mark */
    mark.events.add("dragend", function () {
        coords = this.geometry.getCoordinates();
        save();
    }, mark);

    /* Event click */
    Map.events.add('click', function (e) {
        coords = e.get('coords');
        save();
    });


    /* Event search */
    search.events.add("resultselect", function () {
        coords = search.getResultsArray()[0].geometry.getCoordinates();
        save();
    });
}
/* Save value in form */
function save (){
    var new_coords = [coords[0].toFixed(6), coords[1].toFixed(6)];
    mark.getOverlaySync().getData().geometry.setCoordinates(new_coords);
    document.getElementById("coordinates").value = new_coords;
}


ymaps.ready(init);
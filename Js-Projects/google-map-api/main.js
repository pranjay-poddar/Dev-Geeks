function initMap()
{
    var map= new google.maps.Map( document.getElementById("map"),{
        center :{lat:28.7041, lng:77.1025},
        zoom : 8

    });
    const Markers=[];

    google.maps.event.addListener(map,'click',function(event){
        if(confirm("are you sure to make a mark here"))
        {
            var marker= new google.maps.Marker({
                position:event.latLng,
                map:map
            })
            Markers.push(marker);
        }
    })
    // var marker=new google.maps.Marker({
    //     position:{lat:28.9845,lng:77.7064},
    //     map:map
    // })
    document.getElementById("add-marker").addEventListener('submit',addMarker);

    function addMarker(e)
    {
        e.preventDefault();
        if(confirm("are you sure to make a mark here"))
        {
            const latitude=parseFloat(document.getElementById("lat").value);
            const longitude=parseFloat(document.getElementById("lng").value);
            const text=document.getElementById("text-c").value;
            var marker=new google.maps.Marker({
                position:{lat:latitude,lng:longitude},
                map:map
            });
            var infoWindow=new google.maps.InfoWindow({
                content:text
            });
            marker.addListener('mouseover',function(){
                infoWindow.open(map,marker);
            });
            Markers.push(marker);
            alertbox("Marker added successfully","success")
        }
    }

    function alertbox(data,classes)
    {
        let parent=document.getElementById("alert");
        let alert=document.createElement('div');
        alert.className=`alert alert-${classes}`;
        alert.textContent=data;
        parent.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
}
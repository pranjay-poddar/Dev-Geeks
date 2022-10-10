let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');

// change volume
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}
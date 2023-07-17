setInterval(() => {
     d = new Date();
     // get the details of the current time and date
     htime = d.getHours();
     mtime = d.getMinutes();
     stime = d.getSeconds();
     // rotations
     hrotation = htime * 30  + mtime / 2;
     mrotation = mtime * 6;
     srotation = stime * 6;
     hour.style.transform = `rotate(${hrotation}deg)`;
     minute.style.transform = `rotate(${mrotation}deg)`;
     second.style.transform = `rotate(${srotation}deg)`;
},1000);
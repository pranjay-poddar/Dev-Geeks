//Stole off the net somewhere on stackoverflow.  Whoever you are, god bless you...
export const timeToString = (rez) => {
    let h = Math.trunc(rez / 3600000 % 100).toString().padStart(2, '0');
    let m = Math.trunc(rez / 60000 % 60).toString().padStart(2, '0');
    let s = Math.trunc(rez / 1000 % 60).toString().padStart(2, '0');
    let ms = Math.trunc(rez % 1000).toString().padStart(3, '0');
    console.log(h + ':' + m + ':' + s + '.' + ms);
    return h + ':' + m + ':' + s + '.' + ms;
}
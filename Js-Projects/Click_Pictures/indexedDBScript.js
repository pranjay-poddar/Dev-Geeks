// Initialising camera by sending request
let request = indexedDB.open("camera", 1);
let db;

request.onsuccess = function () {
    //  if exist then will get db from here 
    db = request.result;
}

request.onerror = function (err) {
    console.log(err)
}

request.onupgradeneeded = function () {
    // 1st time creation 
    db = request.result;
    db.createObjectStore("images", { keyPath: "mid" });
    db.createObjectStore("videos", { keyPath: "mid" });
}

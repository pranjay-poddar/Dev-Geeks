


let findRideForm = document.getElementById("findForm");
let findRideFrom = document.getElementById("fRf");
let findRideTo = document.getElementById("fRt");
let findRideDate = document.getElementById("fRd");
let fRfErrMsg = document.getElementById("fRfErrMsg");
let fRtErrMsg = document.getElementById("fRtErrMsg");
let fRdErrMsg = document.getElementById("fRdErrMsg");
let findRideBtn = document.getElementById("findRideBtn");
let offerRideForm = document.getElementById("offerForm");
let offerRideFrom = document.getElementById("oRf");
let offerRideTo = document.getElementById("oRt");
let offerRideDate = document.getElementById("oRd");
let oRfErrMsg = document.getElementById("oRfErrMsg");
let oRtErrMsg = document.getElementById("oRtErrMsg");
let oRdErrMsg = document.getElementById("oRdErrMsg");
let offerRideBtn = document.getElementById("offerRideBtn");
/*Find Ride*/
function validatefRf() {
    if (findRideFrom.value === "") {
        fRfErrMsg.textContent = "Required*";
        fRfErrMsg.classList.add("errMsg");
    } else {
        fRfErrMsg.textContent = "";
    }
}

function validatefRt() {
    if (findRideTo.value === "") {
        fRtErrMsg.textContent = "Required*";
        fRtErrMsg.classList.add("errMsg");
    } else {
        fRtErrMsg.textContent = "";
    }
}

function validatefRd() {
    if (findRideTo.value === "") {
        fRdErrMsg.textContent = "Required*";
        fRdErrMsg.classList.add("errMsg");
    } else {
        fRdErrMsg.textContent = "";
    }
}
findRideFrom.addEventListener("change", validatefRf);
findRideTo.addEventListener("change", validatefRt);
findRideDate.addEventListener("change", validatefRd);
findRideForm.addEventListener("submit", function(event) {
    event.preventDefault();
    validatefRf();
    validatefRt();
    validatefRd();
});
/*OfferRide*/
function validateoRf() {
    if (offerRideFrom.value === "") {
        oRfErrMsg.textContent = "Required*";
        oRfErrMsg.classList.add("errMsg");
    } else {
        oRfErrMsg.textContent = "";
    }
}

function validateoRt() {
    if (offerRideTo.value === "") {
        oRtErrMsg.textContent = "Required*";
        oRtErrMsg.classList.add("errMsg");
    } else {
        oRtErrMsg.textContent = "";
    }
}

function validateoRd() {
    if (offerRideDate.value === "") {
        oRdErrMsg.textContent = "Required*";
        oRdErrMsg.classList.add("errMsg");
    } else {
        oRdErrMsg.textContent = "";
    }
}
offerRideFrom.addEventListener("change", validateoRf);
offerRideTo.addEventListener("change", validateoRt);
offerRideDate.addEventListener("change", validateoRd);
offerRideForm.addEventListener("submit", function(event) {
    event.preventDefault();
    validateoRf();
    validateoRt();
    validateoRd();
});
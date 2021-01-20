var startTime = localStorage.getItem("startTime");
var drinking = localStorage.getItem("drinking");
var total = parseInt(localStorage.getItem("total"));
var BAC=0;

var currentTime = moment().format("DD/MM HH:mm:ss");
if (localStorage.getItem("startTime")) {
    let startSeconds = parseInt(startTime.charAt(6)+startTime.charAt(7))*3600+parseInt(startTime.charAt(9)+startTime.charAt(10))*60+parseInt(startTime.charAt(12)+startTime.charAt(13));
    console.log(startSeconds);
    let currentSeconds = parseInt(currentTime.charAt(6)+currentTime.charAt(7))*3600+parseInt(currentTime.charAt(9)+currentTime.charAt(10))*60+parseInt(currentTime.charAt(12)+currentTime.charAt(13));
    console.log(currentSeconds);
    var timeElapsed = currentSeconds - startSeconds;
    BAC=(total*0.02)-0.02*(timeElapsed/3600);
}


$("#currentTime").text(currentTime);
$("#total").text("Total shots: "+total);
$("#BAC").text("Approximate BAC: "+BAC);
$("#startTime").text("Start time: "+startTime);

function shot (event) {
    if (event.keyCode==32) {
        total+=1;
        BAC+=0.02;
        var currentTime = moment().format("DD/MM HH:mm:ss");
        $("#currentTime").text(currentTime);
        if (!drinking) {
            startTime = currentTime;
        }
        drinking = true;

        console.log(currentTime);
        let startSeconds = parseInt(startTime.charAt(6)+startTime.charAt(7))*3600+parseInt(startTime.charAt(9)+startTime.charAt(10))*60+parseInt(startTime.charAt(12)+startTime.charAt(13));
        console.log(startSeconds);
        let currentSeconds = parseInt(currentTime.charAt(6)+currentTime.charAt(7))*3600+parseInt(currentTime.charAt(9)+currentTime.charAt(10))*60+parseInt(currentTime.charAt(12)+currentTime.charAt(13));
        console.log(currentSeconds);
        var timeElapsed = currentSeconds - startSeconds;
        if (timeElapsed<0) {
            timeElapsed+=86400;
        }
        console.log(timeElapsed);
        BAC=(total*0.02)-0.02*(timeElapsed/3600);
        $("#total").text("Total shots: "+total);
        $("#BAC").text("Approximate BAC: "+BAC);
        $("#startTime").text("Start time: "+startTime);
        localStorage.setItem("total",total);
        localStorage.setItem("startTime",startTime);
        localStorage.setItem("drinking",true);
    }

}
// shot();
$(document).on("keydown", shot);
$("#refresh").on("click", function(event) {
    event.preventDefault();
    location.reload();
})
document.querySelectorAll("button").forEach( function(item) {
    item.addEventListener('focus', function() {
        this.blur();
    })
})
$("#clear").on("click", function (event) {
    event.preventDefault();
    localStorage.setItem("total",0);
    total=0;
    localStorage.setItem("drinking",false);
    drinking=false;
    $("currentTime").html("");
    $("#total").html("");
    $("#BAC").html("");
    $("#startTime").html("");
});
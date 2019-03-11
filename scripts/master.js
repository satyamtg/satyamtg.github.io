
//Start the timer
var countdownTimer = setInterval(updateClock, 1000);

//Function to compute time
function updateClock() {
  var deadline = new Date("Mar 25, 2019 00:00:00").getTime();
  var now = new Date().getTime();
  var diff = deadline - now;
  var days = Math.floor(diff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((diff%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
  var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((diff % (1000 * 60)) / 1000);
  document.getElementById("day").innerHTML =days ;
  document.getElementById("hour").innerHTML =hours;
  document.getElementById("minute").innerHTML = minutes;
  document.getElementById("second").innerHTML =seconds;
  if (diff < 0) {
    clearInterval(countdownTimer);
    document.getElementById("day").innerHTML ='0';
    document.getElementById("hour").innerHTML ='0';
    document.getElementById("minute").innerHTML ='0' ;
    document.getElementById("second").innerHTML = '0';
  }
}

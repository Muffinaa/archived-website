function clock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var ap = 'AM';
    if (hours > 11) ap = 'PM';
    if (hours > 12) hours = hours - 12;
    if (hours == 0) hours = 12;
    if (minutes <= 9) minutes = '0' + minutes;
    if (seconds <= 9) seconds = '0' + seconds;
    var ctime = '[ ' + hours + ':' + minutes + ':' + seconds + ' ' + ap + ' ]';
    document.getElementById('clock').innerHTML = ctime;
    setTimeout('clock()', 1000);
}

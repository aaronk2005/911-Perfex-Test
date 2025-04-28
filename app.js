function toggleNavbar() {
    var navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}  

document.getElementById('startTest').addEventListener('click', function() {
    this.style.display = 'none'; // Hide the start test button
    document.getElementById('moduleLinks').style.display = 'block'; // Show module buttons
    document.getElementById('timerDisplay').style.display = 'block'; // Show timer

    // Start a 30-minute timer
    let time = 30 * 60;
    const timerDisplay = document.getElementById('timerDisplay');
    const timer = setInterval(function() {
        let minutes = parseInt(time / 60, 10);
        let seconds = parseInt(time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerDisplay.textContent = minutes + ":" + seconds;

        if (--time < 0) {
            clearInterval(timer);
            // Optionally, disable module buttons or alert the user
            alert("Time is up!");
        }
    }, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
    const moduleButtons = document.querySelectorAll('.module-button:not(.Grade-test)');
    let lastCompletedModule = parseInt(sessionStorage.getItem('lastCompletedModule') || '0');
    updateModuleButtons(lastCompletedModule);
    lockAccessedModules();  // Ensure correct state right at load

    // Start the timer when the page loads
    startTimer(30, 0); // 30 minutes countdown

    function startTimer(minutes, seconds) {
        let timer = minutes * 60 + seconds;
        const timerDisplay = document.getElementById('timerDisplay');
        const interval = setInterval(function() {
            let minutes = parseInt(timer / 60, 10);
            let seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            timerDisplay.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(interval);
                // Additional actions when timer runs out can be implemented here.
            }
        }, 1000);
    }

    moduleButtons.forEach((button, index) => {
        button.addEventListener('click', function(event) {
            if (button.classList.contains('locked')) {
                event.preventDefault();
                return false;
            } else {
                markModuleAsCompleted(index);
                sessionStorage.setItem(`moduleAccessed-${index}`, 'true'); // Mark module as accessed
            }
        });
    });

    function markModuleAsCompleted(index) {
        sessionStorage.setItem('lastCompletedModule', String(index + 1));
        sessionStorage.setItem(`moduleSubmitted-${index}`, 'true'); // Set a flag when module is submitted
        updateModuleButtons(index + 1);
        lockAccessedModules(); // Recheck locking after updating
    }

    function updateModuleButtons(lastCompletedModule) {
        moduleButtons.forEach((button, index) => {
            if (index <= lastCompletedModule) {
                button.classList.remove('locked');
                button.disabled = false;
                if (index < lastCompletedModule) {
                    button.classList.add('completed');
                } else {
                    button.classList.remove('completed');
                }
            } else {
                button.classList.add('locked');
                button.disabled = true;
                button.classList.remove('completed');
            }
        });
    }

    function lockAccessedModules() {
        moduleButtons.forEach((button, index) => {
            if (sessionStorage.getItem(`moduleSubmitted-${index}`) === 'true') {
                button.classList.add('locked');
                button.disabled = true;
            }
        });
    }

    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            lastCompletedModule = parseInt(sessionStorage.getItem('lastCompletedModule') || '0');
            updateModuleButtons(lastCompletedModule);
            lockAccessedModules();
        }
    });
});

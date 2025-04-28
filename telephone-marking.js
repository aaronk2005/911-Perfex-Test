document.addEventListener('DOMContentLoaded', function() {
    var ringtone = new Audio("ringtone.mp3");
    ringtone.loop = true;
    var phonecall = new Audio("phonecall.mp3");
    var phone_pickup = new Audio("pickup.mp3");
    var introduction = new Audio("phone-introduction.mp3");

    let element = document.getElementById("audio-button");
    let picker = document.getElementById("pickup-button");
    picker.setAttribute("hidden", "hidden");

    element.addEventListener('click', playAudioSequence);
    picker.addEventListener('click', pickup);

    const answers = ["JOHN WESTON", "9258 JOHN MUIR ROAD", "235-8158", "AMBULANCE", "BABY CHOKING"];
    let scores = [0, 0, 0, 0, 0]; // Initialize scores array

    document.querySelectorAll('.enter-button').forEach((button, index) => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling.value.toUpperCase();
            scores[index] = (input === answers[index].toUpperCase()) ? (index < 4 ? 2 : 3) : 0;
            lockField(this.previousElementSibling.id, this.id);
        });
    });

    document.getElementById('submitForm').addEventListener('click', function() {
        let totalScore = scores.reduce((acc, score) => acc + score, 0);
        localStorage.setItem('telephoneTestScore', totalScore.toString());
        window.location.href = 'modules.html';
    });

    function playAudioSequence() {
        introduction.play().catch(error => console.error("Playback failed:", error));
        element.setAttribute("hidden", "hidden");
        introduction.onended = function() {
            picker.removeAttribute("hidden");
            ringtone.play().catch(error => console.error("Playback failed:", error));
        };
    }

    function pickup() {
        picker.setAttribute("hidden", "hidden");
        ringtone.pause();
        phone_pickup.play().catch(error => console.error("Playback failed:", error));
        phonecall.play().catch(error => console.error("Playback failed:", error));
    }

    function lockField(fieldId, buttonId) {
        document.getElementById(fieldId).disabled = true;
        document.getElementById(buttonId).disabled = true;
    }
});

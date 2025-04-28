document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start');
    const stopBtn = document.getElementById('stop');
    const originalTextElement = document.getElementById('originalText');
    const transcriptElement = document.getElementById('transcript');
    const submitBtn = document.getElementById('submitBtn');
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;
    let finalTranscript = '';
    let isStoppedByButton = false;

    recognition.onresult = function(event) {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        transcriptElement.textContent = finalTranscript + interimTranscript;
    };

    recognition.onstart = function() {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        finalTranscript = '';
        transcriptElement.textContent = '';
    };

    recognition.onend = function() {
        if (!isStoppedByButton) {
            calculateAndStoreScore();
        }
        startBtn.disabled = false;
        stopBtn.disabled = true;
        isStoppedByButton = false;
    };

    const calculateScore = () => {
        let originalText = removePunctuation(originalTextElement.textContent).toLowerCase();
        let transcribedText = removePunctuation(transcriptElement.textContent).toLowerCase();

        let wordsOriginal = originalText.split(/\s+/);
        let wordsTranscribed = transcribedText.split(/\s+/);

        let intersect = wordsTranscribed.filter(word => wordsOriginal.includes(word)).length;
        return (intersect / wordsOriginal.length) * 24;
    };

    const calculateAndStoreScore = () => {
        const score = calculateScore();
        localStorage.setItem('readingAloudTestScore', score.toFixed(1));
    };

    // Adjusted the regular expression to not remove whitespaces
    const removePunctuation = text => text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    startBtn.addEventListener('click', () => {
        recognition.start();
    });

    stopBtn.addEventListener('click', () => {
        isStoppedByButton = true;
        recognition.stop();
    });

    submitBtn.addEventListener('click', () => {
        if (!isStoppedByButton) {
            recognition.stop();
        }
        calculateAndStoreScore();
        window.location.href = 'modules.html';
    });
});

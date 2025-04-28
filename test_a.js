document.addEventListener('DOMContentLoaded', function() {
    const playAudioButton = document.getElementById('playAudio');
    const storyAudio = document.getElementById('storyAudio');
    const submitNotesButton = document.getElementById('submitNotes');
    const notesArea = document.getElementById('notes');

    playAudioButton.addEventListener('click', function() {
        storyAudio.play();
        playAudioButton.disabled = true; // Disable the button after playing once
    });

    submitNotesButton.addEventListener('click', function() {
        localStorage.setItem('testANotes', notesArea.value);
       
    });
});

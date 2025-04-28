document.addEventListener('DOMContentLoaded', function() {
    const combinationsInput = document.getElementById('combinationsInput');
    const phrasesInput = document.getElementById('phrasesInput');
    const combinationsButton = document.getElementById('combinationsButton');
    const phrasesButton = document.getElementById('phrasesButton');
    const combinationsAudio = document.getElementById('combinationsAudio');
    const phrasesAudio = document.getElementById('phrasesAudio');

    // Initially disable input fields until the corresponding audio is played
    combinationsInput.disabled = true;
    phrasesInput.disabled = true;

    const combinationsAnswers = [
        "X59B", "Z52", "2G8", "972", "SW6", "W42", "X7Y4", "M993", "85J", "B48", "33KY",
        "5R22", "LA4", "6W5", "3M33", "4L50", "MX23", "X170", "D500", "2R19", "A2R4", "2CL",
        "7P4", "59N4", "2B1", "89X", "PQ74", "1024", "8921", "XY4", "B98", "XQC", "RT40"
    ];
    const phrasesAnswers = [
        "7K34, The Sergeant says take the detail.", 
        "5W7, A Juvenile problem at Hazels Drive-In.", 
        "3H69, A 10-52 at 529 Irving Avenue, Code 3.", 
        "There is a disabled red car on the Low Angeles Freeway.", 
        "I’m calling to report that a tow truck is needed on highway 101, north of the diablo canyon bridge as soon as possible.", 
        "There has been an auto accident between a black ford and a taxicab at the entrance to the Sunrise Shopping Center."
    ];

    let combinationsCorrect = 0;
    let phrasesCorrect = 0;
    const totalCombinations = combinationsAnswers.length;
    const totalPhrases = phrasesAnswers.length;
    const totalQuestions = totalCombinations + totalPhrases;

    // Function to check answer
    function checkAnswer(inputValue, answersArray) {
        return answersArray.includes(inputValue.toUpperCase().trim());
    }

    // Handle keypress event for Enter key
    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const activeElement = document.activeElement;
            const isCombination = activeElement === combinationsInput;
            const answersArray = isCombination ? combinationsAnswers : phrasesAnswers;
            const correct = checkAnswer(activeElement.value, answersArray);

            if (correct) {
                if (isCombination) combinationsCorrect++;
                else phrasesCorrect++;
            }

            activeElement.value = ''; // Clear input field
        }
    });

    // Play audio for combinations and enable input field
    combinationsButton.addEventListener('click', function() {
        combinationsAudio.play();
        this.disabled = true;
        combinationsInput.disabled = false;
    });

    // Enable phrases button after combinations audio ends
    combinationsAudio.addEventListener('ended', function() {
        phrasesButton.disabled = false;
        combinationsInput.disabled = true;
    });

    // Play audio for phrases and enable input field
    phrasesButton.addEventListener('click', function() {
        phrasesAudio.play();
        this.disabled = true;
        phrasesInput.disabled = false;
    });

    // Enable the grade button after phrases audio ends
    phrasesAudio.addEventListener('ended', function() {
        phrasesInput.disabled = true;
    });

    // Handle click event for submit button, calculate score, and store it
    document.querySelector('.submit-container .submit-button').addEventListener('click', function() {
        // Calculation assumes each correct answer is worth a point
        const correctAnswers = combinationsCorrect + phrasesCorrect;
        const score = (correctAnswers / totalQuestions) * 25.5;

        localStorage.setItem('combinationsTestScore', score.toFixed(2));
        localStorage.setItem('combinationsTestComplete', 'true');
        
    });
});

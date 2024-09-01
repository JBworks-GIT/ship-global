document.addEventListener('DOMContentLoaded', () => {
    let randomNumber;
    let attemptCount = 0;

    const guessInput = document.getElementById('guessInput');
    const submitGuess = document.getElementById('submitGuess');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const attemptCountDisplay = document.getElementById('attemptCount');
    const restartGame = document.getElementById('restartGame');

    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 100) + 1;
    };

    const startGame = () => {
        randomNumber = generateRandomNumber();
        attemptCount = 0;
        feedbackMessage.textContent = '';
        attemptCountDisplay.textContent = attemptCount;
        restartGame.style.display = 'none';
        submitGuess.disabled = false;
        guessInput.disabled = false;
        guessInput.value = '';
    };

    const getFeedbackMessage = (userGuess) => {
        const difference = Math.abs(randomNumber - userGuess);
        
        if (userGuess === randomNumber) {
            return `Congratulations! You've guessed the number in ${attemptCount} attempts.`;
        }
        
        if (difference <= 5) {
            return userGuess < randomNumber ? 'Very close! Try a little higher.' : 'Very close! Try a little lower.';
        }
        
        if (difference <= 10) {
            return userGuess < randomNumber ? 'Close! Try a bit higher.' : 'Close! Try a bit lower.';
        }
        
        if (userGuess < randomNumber) {
            return 'Too low! Try a higher number.';
        } else {
            return 'Too high! Try a lower number.';
        }
    };

    const handleGuess = () => {
        const userGuess = parseInt(guessInput.value, 10);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            feedbackMessage.textContent = 'Please enter a number between 1 and 100.';
            return;
        }

        attemptCount++;
        attemptCountDisplay.textContent = attemptCount;

        feedbackMessage.textContent = getFeedbackMessage(userGuess);

        if (userGuess === randomNumber) {
            submitGuess.disabled = true;
            guessInput.disabled = true;
            restartGame.style.display = 'inline-block';
        }
    };

    submitGuess.addEventListener('click', handleGuess);
    restartGame.addEventListener('click', startGame);

    startGame();
});

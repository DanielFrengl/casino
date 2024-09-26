function gamble() {
const reels = document.querySelectorAll('.reel');
const symbols = ['🌲', '🐻', '🐺', '🏹', '🎯', '🔥', '💰', '⭐', '✨']; // "✨" is the wild symbol
const betAmount = parseInt(document.getElementById('betAmount').value);
let balance = parseInt(document.getElementById('balance').innerText.replace('$', ''));
let rewardMessage = document.getElementById('rewardMessage');

// Clear reward message initially
rewardMessage.innerHTML = '';

// Deduct bet from balance
balance -= betAmount;
document.getElementById('balance').innerText = `$${balance}`;

// Clear previous symbols (with delay to prevent flickering)
clearPreviousSymbols();

// Start spinning reels
reels.forEach((reel, index) => {
    reel.classList.add('scrolling');
    const stopTime = (index + 1) * 1000; // Delay each reel stopping by 1s

    setTimeout(() => {
        reel.classList.remove('scrolling');
        reel.classList.add('stopping');

        setTimeout(() => {
            reel.classList.remove('stopping');
            const slots = reel.querySelectorAll('.symbol');

            // Randomize new symbols
            setTimeout(() => {  // Adding a delay before updating symbols
                slots.forEach(slot => {
                    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                    slot.innerHTML = randomSymbol;
                });
            }, 50); // Adjust this delay time if needed

            // After all reels stop, check for rewards
            if (index === reels.length - 1) {
                checkForRewards();
            }
        }, 1000);
    }, stopTime);
});

function clearPreviousSymbols() {
    // Loop through each reel and clear its slots
    reels.forEach(reel => {
        const slots = reel.querySelectorAll('.symbol');
        slots.forEach(slot => {
            slot.innerHTML = ''; // Clear the content of the slot
        });
    });
}

function checkForRewards() {
    const reelSymbols = [];
    reels.forEach(reel => {
        const slots = reel.querySelectorAll('.symbol');
        const symbolsInReel = Array.from(slots).map(slot => slot.innerHTML);
        reelSymbols.push(symbolsInReel);
    });

    let reward = 0;

    // Check rows for 3 symbols in the first three columns
    reward += checkRowWins(reelSymbols, betAmount);

    // Check diagonals but only if the winning symbol starts in the first column and stays within the first 3 columns
    reward += checkDiagonalWins(reelSymbols, betAmount);

    // Display reward message or no win message
    if (reward > 0) {
        balance += reward;
        document.getElementById('balance').innerText = `$${balance}`;
        rewardMessage.innerHTML = `You won $${reward}!`;
        highlightWinningSymbols(reelSymbols);
    } else {
        rewardMessage.innerHTML = `No win. Better luck next time!`;
    }
}

function highlightWinningSymbols(reelSymbols) {
    // Highlight winning symbols with the 'winning' class
    const winningSymbols = document.querySelectorAll('.symbol');
    winningSymbols.forEach(symbol => symbol.classList.remove('winning'));

    // Example: Highlight first row as a win for demo purposes
    reels.forEach((reel, reelIndex) => {
        const row = 0; // First row for this example
        const winningSymbol = reel.querySelectorAll('.symbol')[row];
        winningSymbol.classList.add('winning');
    });
}

// Function to check rows for 3 matching symbols in the first three columns
function checkRowWins(reelSymbols, betAmount) {
    const winningCombinations = [
        ['🌲', '🌲', '🌲'], // Trees
        ['🐻', '🐻', '🐻'], // Bears
        ['🏹', '🏹', '🏹'], // Bows
        ['🔥', '🔥', '🔥'], // Fire
        ['💰', '💰', '💰'], // Money
        ['⭐', '⭐', '⭐'], // Stars
        ['✨', '✨', '✨'], // Wilds
    ];

    let reward = 0;

    for (let row = 0; row < 3; row++) {
        let symbolsInRow = reelSymbols.map((reel) => reel[row]);

        // Only check for the first three columns
        let firstThreeColumns = symbolsInRow.slice(0, 3);

        winningCombinations.forEach((combination, index) => {
            let matchCount = 0;
            firstThreeColumns.forEach((symbol) => {
                if (symbol === combination[0] || symbol === '✨') {
                    matchCount++;
                }
            });

            if (matchCount === 3) { // Match exactly 3 symbols in the first 3 columns
                reward += betAmount * (index + 1); // Payout increases with the combination index
            }
        });
    }
    return reward;
}

// Function to check diagonal wins with the rule: must stay within the first 3 columns
function checkDiagonalWins(reelSymbols, betAmount) {
    let reward = 0;

    // Only checking diagonals within the first 3 columns
    const leftDiagonal = [reelSymbols[0][0], reelSymbols[1][1], reelSymbols[2][2]];
    const rightDiagonal = [reelSymbols[0][2], reelSymbols[1][1], reelSymbols[2][0]];

    const winningCombinations = [
        ['🌲', '🌲', '🌲'], // Trees
        ['🐻', '🐻', '🐻'], // Bears
        ['🏹', '🏹', '🏹'], // Bows
        ['🔥', '🔥', '🔥'], // Fire
        ['💰', '💰', '💰'], // Money
        ['⭐', '⭐', '⭐'], // Stars
        ['✨', '✨', '✨'], // Wilds
    ];

    winningCombinations.forEach((combination, index) => {
        if (leftDiagonal[0] === combination[0] || leftDiagonal[0] === '✨') {
            let matchCount = 0;
            leftDiagonal.forEach(symbol => {
                if (symbol === combination[0] || symbol === '✨') {
                    matchCount++;
                }
            });
            if (matchCount === 3) {
                reward += betAmount * (index + 1);
            }
        }

        if (rightDiagonal[0] === combination[0] || rightDiagonal[0] === '✨') {
            let matchCount = 0;
            rightDiagonal.forEach(symbol => {
                if (symbol === combination[0] || symbol === '✨') {
                    matchCount++;
                }
            });
            if (matchCount === 3) {
                reward += betAmount * (index + 1);
            }
        }
    });

    return reward;
}}

document.getElementById('spinButton').addEventListener('click', gamble)
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        gamble()
    }
})

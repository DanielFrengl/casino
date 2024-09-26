<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hunter's Dream 2 Slot Machine</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<div class="slot-machine">
    <div class="reels">
        <?php
        // Define slot symbols including a wild symbol
        $symbols = ['🌲', '🐻', '🐺', '🏹', '🎯', '🔥', '💰', '⭐', '✨']; // "✨" is the wild symbol

        // Generate 5 reels with 3 symbols in each reel
        for ($reel = 0; $reel < 5; $reel++) {
            echo "<div class='reel' id='reel-$reel'>";
            for ($row = 0; $row < 3; $row++) {
                // Assign random symbols for initial display
                $randomSymbol = $symbols[array_rand($symbols)];
                echo "<div class='slot'><div class='symbol'>$randomSymbol</div></div>";
            }
            echo "</div>";
        }
        ?>
    </div>
</div>

<button id="spinButton">Spin</button>

<div class="game-info">
    <div>Balance: <span id="balance">$1000</span></div>
    <div>Bet: <input type="number" id="betAmount" value="10" min="1" max="100"></div>
    <div id="rewardMessage" class="reward-message"></div>
</div>

<script src="script.js"></script>
</body>
</html>

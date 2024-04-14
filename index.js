let foodx, foody;
let snakex = 5, snakey = 8;
const playboard = $(".game-space");
const scoreElement = $(".score");
let gameOver = false;
let setIntervalId;
let score = 0;
let velocityx = 0, velocityy = 0;
let isPausedAtThree = false;
const snakeBody = [];
let eatsound = new Audio('eat.wav')
let gamelostsound = new Audio('gameover.wav')


const quizModal = $('#quizModal');
const quizForm = $('#quizForm');

quizForm.submit(function(event) {
    event.preventDefault();
    let selectedAnswer = $('input[name="capital"]:checked').val();
    console.log("Answer submitted:", selectedAnswer);
    quizModal.hide(); // Hide the quiz modal
    setIntervalId = setInterval(initGAME, 100); // Resume the game
});

function showQuiz() {
    clearInterval(setIntervalId); // Pause the game
    quizModal.show(); // Show the quiz modal
}

$(document).keydown(function(e) {
    switch (e.key) {
        case "ArrowUp":
            if (velocityy !== 1) {
                velocityx = 0;
                velocityy = -1;
            }
            break;
        case "ArrowDown":
            if (velocityy !== -1) {
                velocityx = 0;
                velocityy = 1;
            }
            break;
        case "ArrowLeft":
            if (velocityx !== 1) {
                velocityx = -1;
                velocityy = 0;
            }
            break;
        case "ArrowRight":
            if (velocityx !== -1) {
                velocityx = 1;
                velocityy = 0;
            }
            break;
    }
    initGAME();
});

function changefoodposition() {
    foodx = Math.floor(Math.random() * 30) + 1;
    foody = Math.floor(Math.random() * 30) + 1;
}

function handleGameOver() {
    clearInterval(setIntervalId);
    location.reload();
    alert("Game Over! Press OK to replay...");
}

function initGAME() {
    if(gameOver) return handleGameOver();

    if (foodx === snakex && foody === snakey) {
        eatsound.play()
        changefoodposition();

        snakeBody.push([foody, foodx]);
        score++;
        scoreElement.text(`Score: ${score}`);
    }

    if (score === 3 && !isPausedAtThree) {
        isPausedAtThree = true;
        showQuiz();
        return;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakex, snakey];

    if(snakex <= 0 || snakex > 30 || snakey <= 0 || snakey > 30) {
        gameOver = true;
        gamelostsound.play()
        return;
    }

    snakex += velocityx;
    snakey += velocityy;

    let htmlmarkup = `<div class = "food" style="grid-area: ${foody} / ${foodx}"></div>`;
    snakeBody.forEach(function(part, i) {
        htmlmarkup += `<div class="head" style="grid-area: ${part[1]} / ${part[0]}"></div>`;
        if (i !== 0 && part[1] === snakeBody[0][1] && part[0] === snakeBody[0][0]) {
            gameOver = true;
        }
    });

    playboard.html(htmlmarkup);
}
// playboard.css({
//     "background-image": "url('snake-game.jpg')",
//     "background-size": "cover",
//     "background-position": "center", 
//     "background-repeat": "no-repeat" 
// });
changefoodposition();
setIntervalId = setInterval(initGAME, 100);

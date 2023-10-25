const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        livesLeft: document.querySelector("#lives-left"),
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        currentLives: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);

        gameOver();
    }
}


function playSound(audioName, volume){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = volume;
    audio.play();
}

function gameOver(){
    const gameOverAudio = new Audio('./src/audios/gameover.m4a');
    gameOverAudio.volume = 1;

    gameOverAudio.addEventListener('ended', function () {
        alert("Game Over! O seu resultado foi " + state.values.result);
        window.location.reload(true);
    });

    gameOverAudio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitbox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit", .2);
            } else{
                state.values.currentLives--;
                state.view.livesLeft.textContent = "x" + state.values.currentLives;
                if(state.values.currentLives <= 0){
                    gameOver();
                }
            }
        })
    });
}

function init(){
    addListenerHitbox();
}

init();
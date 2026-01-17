let playerScore = 0, computerScore = 0;
const choices = ['🪨','📃','✂️'];

const knopki = document.querySelectorAll('button');
const card = document.querySelector('.card'); 
const scoreboard = document.getElementById('scoreboard')

knopki.forEach(function(button){
    button.addEventListener('click', function(){
        playRound(button.textContent);
    });
});
    


function decideWinner(player, computer) {
    if(player === computer) return 'draw';
    else if(player === '🪨' && computer === '✂️') return 'player';
    else if(player === '✂️' && computer === '📃') return 'player';
    else if(player === '📃' && computer === '🪨') return 'player';
    else return 'computer';
}

function updateScoreBoard() {
    scoreboard.textContent = `player: ${playerScore} - Computer: ${computerScore}`;
}

function clearSelected() {
    knopki.forEach(btn=> btn.classList.remove('selected'));
}

function disableButtons(value) {
    knopki.forEach(btn=> btn.disabled = value);
}

function showModal(winner) {
    const modal = document.createElement('div');
    modal.classList.add("modal");

    let message = ''
    let emoji = ''

    if (winner === 'player') {
        message = 'Ты выйграл! 🎉';
        emoji = '🏆';
    } else if (winner === 'computer') {
        message = 'Компьютер выйграл! 💻';
        emoji = '🤖';
    } else {
        message = 'Ничья! 💛';
        emoji = '⚖️';
    }

    modal.innerHTML = `<div> ${emoji} ${message}<div>`;

    const btn = document.createElement('button')
    btn.textContent = 'Restart';
    btn.addEventListener('click', function(){
        playerScore = 0;
        computerScore = 0;
        updateScoreBoard()
        card.textContent = '❓'
        document.body.removeChild(modal);
        disableButtons(false);
        clearSelected();
    });
    
    modal.appendChild(btn);
    document.body.append(modal);
}

 // обрабатывает каждый игровой раунд
function playRound(playerChoice) {
    disableButtons(true);
        
    knopki.forEach(btn=> {
        if(btn.textContent == playerChoice) {
            btn.classList.add('selected')
        }
    })


    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const winner = decideWinner(playerChoice, computerChoice);
    console.log('Ты выбрал: ' + playerChoice + '; Комп выбрал: ' + computerChoice + ' | Победитель: ' + winner);
    card.classList.add('rotate');
    card.classList.remove('back');
    card.classList.add('front')

    setTimeout(()=>{
        card.textContent = computerChoice;
        if (winner === 'player') playerScore++;
        else if (winner === 'computer') computerScore++;
        else if (winner === 'draw') {
            playerScore++;
            computerScore++;
        }
        updateScoreBoard();
    }, 180);
        
        
    setTimeout(()=>{
    card.classList.remove('rotate');
    card.classList.remove('front');

    setTimeout(()=>{
        card.textContent = '❓';

        if (playerScore === 3 || computerScore === 3) {
            let winner = "";
            if (playerScore > computerScore) winner = 'player';
            else if (computerScore > playerScore) winner = 'computer';
            else winner = 'draw';
            showModal(winner);
        } else {
                setTimeout(() => {
                    disableButtons(false);
                    clearSelected();
                }, 250);
            }
        
        }, 180);
    }, 1000);
}
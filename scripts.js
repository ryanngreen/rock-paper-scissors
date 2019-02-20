		const buttons = document.querySelectorAll('button');
		let rounds = 0;
		let playerScore = 0;
		let computerScore = 0;
		let draws = 0;
		let gameOver = false;

		// Clicking button starts the game
		// Player selection is stored in variable
		buttons.forEach(function(button) {
			button.addEventListener('click', event => {
				if (button.value == 'new') {
					newGame();
				} else {
					let playerSelection = button.value;
					playGame(playerSelection);
				}
			});
		});

		// Computer makes selection
		function computerSelection() {
			let computerNumber = Math.floor(Math.random() * 3);
			return computerNumber;
		}

		function playGame(playerSelection) {
			let roundResult = determineRound(playerSelection, computerSelection());
			updateHTML(roundResult);
			finalWinner();
			updateButtons();
		}

		// Compare selections to determine winner or draw
		function determineRound(playerSelection, computerSelection) {
			rounds++;
			let choices = ['Rock', 'Paper', 'Scissors']
			
			switch (true) {
				case (playerSelection == computerSelection):
					draws++;
					return "It's a tie!";
					break;

				case (playerSelection == '0' && computerSelection == '2') ||
				(playerSelection == '1' && computerSelection == '0') ||
				(playerSelection == '2' && computerSelection == '1'):
					playerScore++;
					return `You win! ${choices[playerSelection]} beats ${choices[computerSelection]}!`;
					break;

				case (playerSelection == '2' && computerSelection == '0') ||
				(playerSelection == '0' && computerSelection == '1') ||
				(playerSelection == '1' && computerSelection == '2'):
					computerScore++;
					return `You lose! ${choices[computerSelection]} beats ${choices[playerSelection]}!`;
					break;
			}
		}

		// Update html to reflect current round and score
		function updateHTML(roundResult) {
			let roundCount = document.getElementById('rounds');
			let drawCount = document.getElementById('draws');
			let roundResultHolder = document.getElementById('roundResult');
			let playerScoreHolder = document.getElementById('playerScore');
			let computerScoreHolder = document.getElementById('computerScore');

			roundCount.innerHTML = rounds;
			drawCount.innerHTML = draws;

			roundResultHolder.innerHTML = roundResult;

			playerScoreHolder.innerHTML = playerScore;
			computerScoreHolder.innerHTML = computerScore;
		}

		function updateButtons() {
			let newGameButton = document.getElementById('newGame');
			let buttonSelections = document.getElementById('buttonSelections');

			if (gameOver) {
				buttonSelections.style.display = "none";
				newGameButton.style.display = "inline-block";
			} else {
				console.log('New Game');
				buttonSelections.style.display = "block";
				newGameButton.style.display = "none";
			}
		}

		// At 5 rounds, update to show final winner
		function finalWinner() {
			if(rounds >= 5 && !(playerScore == computerScore)) {
				let winner = playerScore > computerScore ? 'You won!' : 'The computer won!';

				alert(`Game Complete! ${winner}`);
				gameOver = true;
			}
		}

		function newGame() {
			rounds = 0;
			draws = 0;
			playerScore = 0;
			computerScore = 0;
			gameOver = false;

			updateHTML('Round Result.');
			updateButtons();
		}
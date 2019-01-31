		const buttons = document.querySelectorAll('button');
		let rounds = 0;
		let playerScore = 0;
		let computerScore = 0;
		let draws = 0;
		let won = false;

		// Clicking button starts the game
		// Player selection is stored in variable
		buttons.forEach(function(button) {
			button.addEventListener('click', event => {
				let playerSelection = button.value;
				game(playerSelection);
			});
		});

		// Computer makes selection
		function computerSelection() {
			let computerNumber = Math.floor(Math.random() * 3);
			return computerNumber;
		}

		// Compare selections to determine winner or draw
		function playGame(playerSelection, computerSelection) {
			rounds++;
			let choices = ['Rock', 'Paper', 'Scissors']
			
			switch (true) {
				case (playerSelection == computerSelection):
					draws++;
					updateHTML();
					return "It's a tie!";
					break;

				case (playerSelection == '0' && computerSelection == '2') ||
				(playerSelection == '1' && computerSelection == '0') ||
				(playerSelection == '2' && computerSelection == '1'):
					playerScore++;
					updateHTML();
					return `You win! ${choices[playerSelection]} beats ${choices[computerSelection]}!`;
					break;

				case (playerSelection == '2' && computerSelection == '0') ||
				(playerSelection == '0' && computerSelection == '1') ||
				(playerSelection == '1' && computerSelection == '2'):
					computerScore++;
					updateHTML();
					return `You lose! ${choices[computerSelection]} beats ${choices[playerSelection]}!`;
					break;
			}
		}

		function game(playerSelection) {
			console.log(playGame(playerSelection, computerSelection()));
			finalWinner();
			if (won) {
				rounds = 0;
				draws = 0;
				playerScore = 0;
				computerScore = 0;
				won = false;
			}
		}

		// Update html to reflect current round and score
		function updateHTML() {
			let roundCount = document.getElementById('rounds');
			let drawCount = document.getElementById('draws');
			let playerScoreHolder = document.getElementById('playerScore');
			let computerScoreHolder = document.getElementById('computerScore');

			roundCount.innerHTML = rounds;
			drawCount.innerHTML = draws;
			playerScoreHolder.innerHTML = playerScore;
			computerScoreHolder.innerHTML = computerScore;
		}

		// At 5 rounds, update to show final winner
		function finalWinner() {
			if(rounds >= 5 && !(playerScore == computerScore)) {
				let winner = playerScore > computerScore ? 'You won!' : 'The computer won!';
				alert(`Game Complete! ${winner}`);
				won = true;
			}
		}
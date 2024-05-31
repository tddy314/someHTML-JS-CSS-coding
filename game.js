document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const restartButton = document.getElementById('restart-button');
    let score = 0;

    const colors = {
        0: '#cdc1b4',
        2: '#eee4da',
        4: '#ede0c8',
        8: '#f2b179',
        16: '#f59563',
        32: '#f67c5f',
        64: '#f65e3b',
        128: '#edcf72',
        256: '#edcc61',
        512: '#edc850',
        1024: '#edc53f',
        2048: '#edc22e',
    };

    function createBoard() {
        for (let i = 0; i < 16; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.textContent = "";
            gameBoard.appendChild(tile);
        }
    }

    function generateNumber() {
        const tiles = document.querySelectorAll('.tile');
        const emptyTiles = Array.from(tiles).filter(tile => tile.textContent === '');
        if (emptyTiles.length > 0) {
            const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            randomTile.textContent = Math.random() > 0.5 ? 2 : 4;
            randomTile.style.backgroundColor = colors[randomTile.textContent];
        }
        else {
            alert("Game - over");
        }
    }

    function moveTiles(direction) {
        const tiles = Array.from(document.querySelectorAll('.tile')).map(tile => parseInt(tile.textContent) || 0);
        const newTiles = [];

        if (direction === 'left' || direction === 'right') {
            for (let i = 0; i < 4; i++) {
                const row = tiles.slice(i * 4, i * 4 + 4);
                if (direction === 'right') row.reverse();
                const newRow = mergeTiles(row.filter(tile => tile !== 0));
                if (direction === 'right') newRow.reverse();
                newTiles.push(...newRow);
            }
        } else {
            for (let i = 0; i < 4; i++) {
                const column = [tiles[i], tiles[i + 4], tiles[i + 8], tiles[i + 12]];
                if (direction === 'down') column.reverse();
                const newColumn = mergeTiles(column.filter(tile => tile !== 0));
                if (direction === 'down') newColumn.reverse();
                for (let j = 0; j < 4; j++) {
                    newTiles[i + j * 4] = newColumn[j];
                }
            }
        }

        return newTiles;
    }

    function mergeTiles(rowOrColumn) {
        for (let i = 0; i < rowOrColumn.length - 1; i++) {
            if (rowOrColumn[i] === rowOrColumn[i + 1]) {
                rowOrColumn[i] *= 2;
                rowOrColumn[i + 1] = 0;
                score += rowOrColumn[i];
            }
        }
        return rowOrColumn.filter(tile => tile !== 0).concat(Array(4).fill(0)).slice(0, 4);
    }

    function updateBoard(newTiles) {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile, i) => {
            tile.textContent = newTiles[i] !== 0 ? newTiles[i] : '';
            tile.style.backgroundColor = colors[newTiles[i]] || colors[0];
        });
        scoreDisplay.textContent = score;
    }

    function handleKeyPress(event) {
        let newTiles;
        switch (event.key) {
            case 'ArrowUp':
                newTiles = moveTiles('up');
                break;
            case 'ArrowDown':
                newTiles = moveTiles('down');
                break;
            case 'ArrowLeft':
                newTiles = moveTiles('left');
                break;
            case 'ArrowRight':
                newTiles = moveTiles('right');
                break;
            default:
                return;
        }
        updateBoard(newTiles);
        generateNumber();
    }

    function restartGame() {
       
        for(let i = 0 ; i < 16 ; i++)
            gameBoard.removeChild(gameBoard.firstElementChild);
        createBoard();
        generateNumber();
        generateNumber(); 
        score = 0;
        scoreDisplay.textContent = "0";
    }

    restartButton.addEventListener('click', restartGame);
    document.addEventListener('keydown', handleKeyPress);
    createBoard();
   generateNumber();
   generateNumber();
});

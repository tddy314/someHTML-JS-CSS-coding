document.addEventListener('DOMContentLoaded',() => {
    const gameboard = document.getElementById('board');
    const status = document.getElementById('status');
    const restart = document.getElementById('restart');
    const diff = document.getElementById('diff');

    let bsize = 3;
    let cur = 'X';
    let active = true;
    let board = [];

    const init = () => {
        gameboard.innerHTML = '';
        board = Array(bsize * bsize).fill('');
        active = true;
        cur = 'X';
        status.textContent = `Make your move: ${cur}`;
        gameboard.style.gridTemplateColumns = `repeat(${bsize}, 80px)`;
        
        for(let i = 0; i < bsize * bsize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handle_click);
            gameboard.appendChild(cell);
        }

    };

    const handle_click = (e) => {
        const cell = e.target;
        const id = cell.dataset.index;
        if(board[id] !== '' || !active) {
            return;
        }
        update(cell, id);
        checkWin(id); 
    }

    const update = (cell, id) => {
        board[id] = cur;
        cell.textContent = cur;
        cur = cur === 'X' ? 'O' : 'X';
        status.textContent = `Make your move: ${cur}`;
    }

    const checkWin = (id) => {
        /// vertical
        
        let cnt = 0;
        for(let i = id; i >= 0; i -= bsize) {
           if(board[i] === board[id]) cnt++;
        }
        
       
        for(let i = id; i < bsize * bsize; i += bsize) {
            if(board[i] === board[id]) cnt++;
        }
        

        cnt--;
        
     
        if(cnt === bsize) { 
            status.textContent = `Player ${board[id]} win!`;
            active = false;
            return;
        }
      
        cnt = 0;
        for(let i = id; i >= 0; i--) {
            if(board[i] === board[id]) ++cnt;
            else break;
            if(i % bsize === 0) {
                break;
            }
        }
        for(let i = id + 1; i < bsize; i++) {
            if(i % bsize === 0) break;
            if(board[i] === board[id]) ++cnt;
            else break;
        }
        if(cnt === bsize) {
            status.textContent = `Player ${board[id]} win!`;
            active = false;
            return;
        }

    }

    restart.addEventListener('click', init);

    diff.addEventListener('change', (e) => {
        bsize = parseInt(e.target.value);
        init();
    })


    init();
});
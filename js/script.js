// DOM ELEMENTS 
// GRIDS
const userGrid = document.querySelector('.grid-user');
const computerGrid = document.querySelector('.grid-computer');
const displayGrid = document.querySelector('.grid-display');

//SHIPS
const ships = document.querySelectorAll('.ship');
const destroyer = document.querySelector('.destroyer-container');
const submarine = document.querySelector('.submarine-container');
const cruiser = document.querySelector('.cruiser-container');
const battleship = document.querySelector('.battleship-container');
const carrier = document.querySelector('.carrier-container');

// BUTTONS / DISPLAYS
const startButton = document.getElementById('start');
const rotateButton = document.getElementById('rotate');
const turnDisplay = document.getElementById('whose-turn');
const infoDisplay = document.getElementById('info');

//PLAYER ARRAYS
const userSquares = [];
const computerSquares = [];

// SHIP ARRAY
const shipArray = [
    {
        name: 'destroyer',
        directions: [
            [0,1],
            [0,10]
        ]
    },
    {
        name: 'submarine',
        directions: [
            [0,1,2],
            [0,10,20]
        ]
    },
    {
        name: 'cruiser',
        directions: [
            [0,1,2],
            [0,10,20]
        ]
    },
    {
        name: 'battleship',
        directions: [
            [0,1,2,3],
            [0,10,20,30]
        ]
    },
    {
        name: 'carrier',
        directions: [
            [0,1,2,3,4],
            [0,10,20,30,40],
        ]
    },
]

//CREATE BOARD
const createBoard = (grid,squares) => {
    for (let i = 0; i < 100; i++){
        const square = document.createElement('div');
        square.dataset.id = i;
        grid.appendChild(square);
        squares.push(square);
    }
}


createBoard(userGrid, userSquares);
createBoard(computerGrid, computerSquares);

// MAKE THE COMPUTER PLACE PIECES RANDOMLY ON THE BOARD 

const generate = (ship) => {
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];
    if(randomDirection === 0) direction = 1;
    if(randomDirection === 1) direction = 10;
    let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)));
   
    // SHIPS CANT START IN A SPACE THAT IS TAKEN OR CLOSE TO AN EDGE
    const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'));
    const atRightEdge = current.some(index => (randomStart + index) % 10 === 9 );
    const atLeftEdge = current.some(index => (randomStart + index) % 10 === 0 );


    if(!isTaken && !atLeftEdge && !atRightEdge){
        current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name))
    }else {
        generate(ship);
    }
};

generate(shipArray[0]);
generate(shipArray[1]);
generate(shipArray[2]);
generate(shipArray[3]);
generate(shipArray[4]);
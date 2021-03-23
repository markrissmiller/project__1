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
    // find a random nuber for the ship to start
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

// MAKE YOUR SHIPS BE ABLE TO ROTATE
let isHorizontal = true;

const rotate = () => {
    if(isHorizontal){
        destroyer.classList.toggle('destroyer-container-verticle');
        submarine.classList.toggle('submarine-container-verticle');
        cruiser.classList.toggle('cruiser-container-verticle');
        battleship.classList.toggle('battleship-container-verticle');
        carrier.classList.toggle('carrier-container-verticle');
        isHorizontal = false;
        console.log(isHorizontal)
        return;
    } 
    if(!isHorizontal){
        destroyer.classList.toggle('destroyer-container-verticle');
        submarine.classList.toggle('submarine-container-verticle');
        cruiser.classList.toggle('cruiser-container-verticle');
        battleship.classList.toggle('battleship-container-verticle');
        carrier.classList.toggle('carrier-container-verticle');
        isHorizontal = true;
        console.log(isHorizontal)

        return;
    }
}

rotateButton.addEventListener('click',rotate);

//BE ABLE TO DRAG AND DROP SHIPS ON YOUR BOARD

ships.forEach(ship => ship.addEventListener('dragstart', dragStart));
userSquares.forEach(square => square.addEventListener('dragstart', dragStart));
userSquares.forEach(square => square.addEventListener('dragover', dragOver));
userSquares.forEach(square => square.addEventListener('dragenter', dragEnter));
userSquares.forEach(square => square.addEventListener('dragleave', dragLeave));
userSquares.forEach(square => square.addEventListener('drop', dragDrop));
userSquares.forEach(square => square.addEventListener('dragend', dragEnd));

let selectedShipNameWithIndex;
let draggedShip;


ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
    selectedShipNameWithIndex = e.target.id;
    console.log(selectedShipNameWithIndex)
}))

function dragStart()  {
    draggedShip = this;
    draggedShipLength = draggedShip.childNodes.length;
    console.log(draggedShip);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    
}

function dragLeave(e) {
    console.log('drag leave')
}

function dragDrop(){
    let shipNameWithLastId = draggedShip.lastChild.id;
    let shipClass = shipNameWithLastId.slice(0,-2)
    console.log(shipClass);
    console.log(shipNameWithLastId);
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1));
    let shipLastId = lastShipIndex + parseInt(this.dataset.id)
    console.log(shipLastId);
    selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
    console.log(selectedShipIndex);

    const notAllowedHorizontal = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,12,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93]
    const newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex)

    const notAllowedVerticle = [99,98,97,96,95,94,93,92,91,90,89,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60]
    const newNotAllowedVerticle = notAllowedVerticle.splice(0, 10 * lastShipIndex)


    shipLastId = shipLastId - selectedShipIndex;
    console.log(shipLastId);

    if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)){
        for (let i = 0; i < draggedShipLength; i++){
            userSquares[parseInt(this.dataset.id) -selectedShipIndex + i].classList.add('taken', shipClass);
        } 
            
    }else if(!isHorizontal && !newNotAllowedVerticle.includes(shipLastId)){
        for(let i = 0; i< draggedShipLength; i++){
            userSquares[parseInt(this.dataset.id) - selectedShipIndex + 10 * i].classList.add('taken', shipClass)
        }
    } else return

    displayGrid.removeChild(draggedShip);
}

function dragEnd() {
    
}
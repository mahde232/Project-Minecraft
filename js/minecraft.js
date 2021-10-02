// global game variables
let worldMatrix;
let gameSizeX = 0, gameSizeY = 0;

let invDirt = 0, invGrass = 0, invLeaves = 0, invWood = 0, invCobble = 0, invWater = 0, invLava = 0;
let selectedTool = '';
let selectedElement;
let availableBlocks = ['dirt', 'cobblestone', 'lava', 'water', 'grass', 'leaves', 'wood', 'sky'];

// global query grabs
let gameWindow = document.querySelector('#gameWindow');
let mainMenu = document.querySelector('#mainMenu');
let startBtn = document.querySelector('#startBtn');
let sizeInput = document.querySelector('#sizeInput');
let clickables = document.querySelectorAll('.clickable');
let invTools = document.querySelectorAll('.invTool');
let gameTiles = document.querySelectorAll('.gameTile');

let grassCnt = document.querySelector('#grassCnt');
let dirtCnt = document.querySelector('#dirtCnt');
let woodCnt = document.querySelector('#woodCnt');
let leavesCnt = document.querySelector('#leavesCnt');
let waterCnt = document.querySelector('#waterCnt');
let lavaCnt = document.querySelector('#lavaCnt');
let cobblestoneCnt = document.querySelector('#cobblestoneCnt');

let resetBtn = document.querySelector('#resetBtn');

//functions

function createWorld(x, y) {
    worldMatrix = Array.from(Array(parseInt(y)), () => new Array(parseInt(x)));

    for (let i = 0; i < worldMatrix.length; i++) { //randomize all
        for (let j = 0; j < worldMatrix[i].length; j++) {
            worldMatrix[i][j] = availableBlocks[Math.floor(Math.random() * 3)];
        }
    }

    for (let i = 0; i < 6; i++) { //add sky
        for (let j = 0; j < worldMatrix[i].length; j++) {
            worldMatrix[i][j] = 'sky';
        }
    }
    for (let i = 12; i < 13; i++) { //add grass
        for (let j = 0; j < worldMatrix[i].length; j++) {
            worldMatrix[i][j] = 'grass';
        }
    }
    for (let i = 13; i < 16; i++) { //add dirt
        for (let j = 0; j < worldMatrix[i].length; j++) {
            worldMatrix[i][j] = 'dirt';
        }
    }
    for (let i = 12; i < 15; i++) { //add random water
        let end = Math.floor(Math.random() * (gameSizeX - 7));
        let start = 7 + Math.floor(Math.random() * end);
        console.log('start', start);
        console.log('end', end);
        for (let j = end; j > start; j--) {
            worldMatrix[i][j] = 'water';
        }
    }
    for (let i = 6; i < 12; i++) { //add TREES
        for (let j = 0; j < worldMatrix[i].length; j++) {
            worldMatrix[i][j] = 'sky';
        }
    }
    generateTree(2, 11);
    generateTree(6, 11);
    generateTree(gameSizeX - 3, 11);
    generateTree(gameSizeX - 7, 11);

    for (let i = 2; i < gameSizeX - 5; i = i + 6) //generate clouds
    {
        let result = Math.round(Math.random() * 4)
        if (result == 0) {
            generateCloud1(i, 1);
        }
        else if (result == 1) {
            generateCloud2(i, 1);
        }
    }
    console.log(worldMatrix);
    drawWorld();
}
function generateTree(x, y) {
    worldMatrix[y][x] = 'wood';
    worldMatrix[y - 1][x] = 'wood';
    worldMatrix[y - 2][x] = 'leaves';
    worldMatrix[y - 2][x - 1] = 'leaves';
    worldMatrix[y - 2][x + 1] = 'leaves';
    worldMatrix[y - 3][x] = 'leaves';
    worldMatrix[y - 3][x - 1] = 'leaves';
    worldMatrix[y - 3][x + 1] = 'leaves';
    worldMatrix[y - 4][x] = 'leaves';
}
function generateCloud1(x, y) {
    worldMatrix[y][x] = 'cloud';
    worldMatrix[y][x + 1] = 'cloud';
    worldMatrix[y][x + 2] = 'cloud';
    worldMatrix[y][x + 3] = 'cloud';

    worldMatrix[y + 1][x] = 'cloud';
    worldMatrix[y + 1][x + 1] = 'cloud';
    worldMatrix[y + 1][x + 2] = 'cloud';
    worldMatrix[y + 1][x + 3] = 'cloud';

    worldMatrix[y + 2][x + 1] = 'cloud';
    worldMatrix[y + 2][x + 2] = 'cloud';
}
function generateCloud2(x, y) {
    worldMatrix[y][x + 1] = 'cloud';
    worldMatrix[y][x + 2] = 'cloud';

    worldMatrix[y + 1][x] = 'cloud';
    worldMatrix[y + 1][x + 1] = 'cloud';
    worldMatrix[y + 1][x + 2] = 'cloud';
    worldMatrix[y + 1][x + 3] = 'cloud';

    worldMatrix[y + 2][x] = 'cloud';
    worldMatrix[y + 2][x + 1] = 'cloud';
    worldMatrix[y + 2][x + 2] = 'cloud';
    worldMatrix[y + 2][x + 3] = 'cloud';
}
function drawWorld() {
    // gameWindow.style.gridTemplateColumns = `repeat(${gameSizeX},5fr)`;
    // gameWindow.style.gridTemplateRows = `repeat(20,1fr)`;
    for (let i = 0; i < gameSizeY; i++) {
        for (let j = 0; j < gameSizeX; j++) {
            let div = document.createElement('div');
            div.style.gridRowStart = i + 1;
            div.style.gridColumnStart = j + 1;
            div.style.height = `5vh`;
            div.style.minWidth = `5vh`;
            div.style.backgroundRepeat = 'no-repeat';
            div.style.backgroundPosition = 'center';
            div.style.backgroundSize = 'cover';
            gameWindow.appendChild(div);
            div.addEventListener('click', gameTileClicked);
            div.classList.add('gameTile');
            switch (worldMatrix[i][j]) {
                case 'dirt':
                    div.classList.add('dirt')
                    break;
                case 'grass':
                    div.classList.add('grass')
                    break;
                case 'wood':
                    div.classList.add('wood')
                    break;
                case 'cobblestone':
                    div.classList.add('cobblestone')
                    break;
                case 'water':
                    div.classList.add('water')
                    break;
                case 'leaves':
                    div.classList.add('leaves')
                    break;
                case 'sky':
                    div.classList.add('sky')
                    break;
                case 'cloud':
                    div.classList.add('cloud')
                    break;
                case 'lava':
                    div.classList.add('lava')
                    break;
            }
        }
    }
}
function gameTileClicked() {
    console.log(this.classList[1]);
    if (selectedTool == 'bucket' && (this.classList[1] == 'water' || this.classList[1] == 'lava')) {
        if (this.classList[1] == 'water') {
            invWater++;
            waterCnt.textContent = invWater;
            this.classList.remove('water')
            this.classList.add('sky')
        }
        else {
            invLava++;
            lavaCnt.textContent = invLava;
            this.classList.remove('lava')
            this.classList.add('sky')
        }
        console.log('delete ', this.classList[1]);
    }
    if (selectedTool == 'pickaxe' && this.classList[1] == 'cobblestone') {
        invCobble++;
        cobblestoneCnt.textContent = invCobble;
        this.classList.remove('cobblestone')
        this.classList.add('sky')
        console.log('delete ', this.classList[1]);
    }
    if (selectedTool == 'axe' && (this.classList[1] == 'wood' || this.classList[1] == 'leaves')) {
        if (this.classList[1] == 'wood') {
            invWood++;
            woodCnt.textContent = invWood;
            this.classList.remove('wood')
            this.classList.add('sky')
        }
        else {
            invLeaves++;
            leavesCnt.textContent = invLeaves;
            this.classList.remove('leaves')
            this.classList.add('sky')
        }
        console.log('delete ', this.classList[1]);
    }
    if (selectedTool == 'shovel' && (this.classList[1] == 'dirt' || this.classList[1] == 'grass')) {
        if (this.classList[1] == 'dirt') {
            invDirt++;
            dirtCnt.textContent = invDirt;
            this.classList.remove('dirt')
            this.classList.add('sky')
        }
        else {
            invGrass++;
            grassCnt.textContent = invGrass;
            this.classList.remove('grass')
            this.classList.add('sky')
        }
        console.log('delete ', this.classList[1]);
    }
    if(this.classList[1] == 'sky' && selectedElement.classList[1] == 'dirt' && invDirt >= 1)
    {
        invDirt--;
        dirtCnt.textContent = invDirt;
        this.classList.remove('sky')
        this.classList.add('dirt')
    }
    if(this.classList[1] == 'sky' && selectedElement.classList[1] == 'grass' && invGrass >= 1)
    {
        invGrass--;
        grassCnt.textContent = invGrass;
        this.classList.remove('sky')
        this.classList.add('grass')
    }
    if(this.classList[1] == 'sky' && selectedElement.classList[1] == 'water' && invWater >= 1)
    {
        invWater--;
        waterCnt.textContent = invWater;
        this.classList.remove('sky')
        this.classList.add('water')
    }
    if(this.classList[1] == 'sky' && selectedElement.classList[1] == 'lava' && invLava >= 1)
    {
        invLava--;
        lavaCnt.textContent = invLava;
        this.classList.remove('sky')
        this.classList.add('lava')
    }
    if(this.classList[1] == 'sky' && selectedElement.classList[1] == 'wood' && invWood >= 1)
    {
        invWood--;
        woodCnt.textContent = invWood;
        this.classList.remove('sky')
        this.classList.add('wood')
    }
    if(this.classList[1] == 'sky' && selectedElement.classList[1] == 'leaves' && invLeaves >= 1)
    {
        invLeaves--;
        leavesCnt.textContent = invLeaves;
        this.classList.remove('sky')
        this.classList.add('leaves')
    }
    if(this.classList[1] == 'sky' && selectedElement.classList[1] == 'cobblestone' && invCobble >= 1)
    {
        invCobble--;
        cobblestoneCnt.textContent = invCobble;
        this.classList.remove('sky')
        this.classList.add('cobblestone')
    }
}
function resetInventory() {
    invDirt = 0;
    dirtCnt.textContent = '00';

    invGrass = 0;
    grassCnt.textContent = '00';

    invLava = 0;
    lavaCnt.textContent = '00';

    invWater = 0;
    waterCnt.textContent = '00';

    invWood = 0;
    woodCnt.textContent = '00';

    invLeaves = 0;
    leavesCnt.textContent = '00';

    invCobble = 0;
    cobblestoneCnt.textContent = '00';
}

//event listeners
clickables.forEach((element) => {
    element.addEventListener('click', () => {
        if (selectedElement) //if there is an old selected element, remove it
            selectedElement.classList.remove('selected');
        element.classList.add('selected');
        selectedElement = element;
        selectedTool = element.classList[1];
        console.log(selectedTool);
    })
})
gameTiles.forEach((element) => {
    element.addEventListener('click', gameTileClicked);
})
startBtn.addEventListener('click', () => {
    if (parseInt(sizeInput.value) >= 20) {
        mainMenu.style.zIndex = '-1';
        mainMenu.style.visibility = 'hidden';
        gameSizeX = sizeInput.value;
        gameSizeY = 20;
        console.log('World Size: ', gameSizeX, gameSizeY);
        createWorld(gameSizeX, gameSizeY);
    }
    else {
        alert('Enter size bigger or equal to 20');
    }
})
resetBtn.addEventListener('click',() => {
    createWorld(gameSizeX, gameSizeY);
    resetInventory();

})
sizeInput.value = 70;
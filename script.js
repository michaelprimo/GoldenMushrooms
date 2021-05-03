let realBoard = [];
let mainBoard = [];
let goldenBoard = [];

let mushroom_nothing;
let mushroom_shield;
let mushroom_poison;
let mushroom_golden;

let levels = [
    [0,0,0,25,3],
    [0,0,24,1,3],
    [0,15,3,7,3],
    [16,5,0,4,3],
    [10,5,5,5,2],
    [2,8,12,3,2],
    [15,8,1,1,3],
    [1,10,9,5,1],
    [0,1,4,20,1],
    [10,0,12,3,3],
    [14,1,0,10,1],
    [1,1,20,3,3],
    [5,8,9,3,2],
    [11,8,3,3,2],
    [10,0,10,5,1],
    [4,4,12,5,2],
    [2,3,10,10,3],
    [1,4,13,7,3],
    [20,0,0,5,1],
    [2,2,5,16,2],
    [8,2,9,6,1],
    [13,8,0,5,2],
    [1,5,15,4,1],
    [0,12,8,5,2],
    [6,7,6,6,2],
    [7,6,6,6,2],
    [6,6,7,6,2],
    [6,6,6,7,2],
    [6,6,6,7,2],
    [6,3,7,9,1]
];

let level_reached;
let curLevel;
let story_level;

if(localStorage.getItem("level_reached") != null)
{
    level_reached = localStorage.getItem("level_reached");
}
else
{
    level_reached = 1;
}

setMaxLevel();

let points = 0;

let shield_find = 0;
let golden_find = 0;
let poison_find = 0;

let randTurns = Math.floor(Math.random() * 3 + 1);
let turns = randTurns;

let canReveal = true;
let canSelect = true;

let main_grid = document.querySelector("#main_grid");
const max_grid_elements = 25;




// Get the modal
var modal = document.getElementsByClassName('modal');


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");

// When the user clicks on <span> (x), close the modal
span[0].onclick = function() {
    modal[0].style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.onload = function(event) 
{
  modal[1].style.display = "block";
}






create_grid_elements();

function create_grid_elements()
{
   
    let created_grid_element; 
    let created_image; 
    for(let i = 0; i < max_grid_elements; i++)
    {
        created_grid_element = document.createElement("div");
        created_grid_element.classList.add("grid_element");
        created_grid_element.addEventListener("click", function() 
        {
            if(canReveal && canSelect)
            {
                grid_element[i].classList.add("selected_element");
                switch(mainBoard[i])
                {
                    case 1:
                    {
                        grid_element[i].classList.add("animateNothing");
                        grid_element[i].classList.add("opacityReduced");
                        f_mushroom_nothing(i);
                        break;
                    }
                    case 2:
                    {
                        grid_element[i].classList.add("animateShield");
                        revealMushrooms_full(true);
                        break;
                    }
                    case 3:
                    {
                        f_mushroom_poison();
                        grid_element[i].classList.add("animatePoison");
                        break;
                    }
                    case 4:
                    {
                        f_mushroom_golden();
                        grid_element[i].classList.add("animateGolden");
                        break;
                    }
                }
                canReveal = false;
                mainBoard[i] = 0;
                setTimeout(function(){ canReveal = true; }, 300);
                
            }
        });
        
        created_grid_element.addEventListener("animationend", function() 
        {
            switch(realBoard[i])
            {
                case 1:
                {
                    grid_element[i].classList.remove("animateNothing_full");
                    grid_element[i].classList.remove("animateNothing_radar");
                    break;
                }
                case 2:
                {
                    grid_element[i].classList.remove("animateShield_full");
                    grid_element[i].classList.remove("animateShield_radar");
                    break;
                }
                case 3:
                {
                    grid_element[i].classList.remove("animatePoison_full");
                    grid_element[i].classList.remove("animatePoison_radar");
                    break;
                }
                case 4:
                {
                    grid_element[i].classList.remove("animateGolden_full");
                    grid_element[i].classList.remove("animateGolden_radar");
                    break;
                }
            }
        });
        
        created_image = document.createElement("img");
        created_image.classList.add("ghost");
        created_image.src = "img/question.png";
        created_grid_element.appendChild(created_image);
        main_grid.appendChild(created_grid_element);
    }
}

let grid_element = document.querySelectorAll(".grid_element");
let ghost = document.querySelectorAll(".ghost");


let text_UI = document.querySelectorAll(".text_UI");
text_UI[text_UI.length-1].innerHTML = "";

let golden_UI = document.querySelector("#golden_UI");
let poison_UI = document.querySelector("#poison_UI");
let shield_UI = document.querySelector("#shield_UI");
let nothing_UI = document.querySelector("#nothing_UI");

function load_mainArray(a)
{
    for(let i = 0; i < mushroom_nothing; i++)
    {
        a.push(1);
    }
    for(let i = 0; i < mushroom_shield; i++)
    {
        a.push(2);
    }
    for(let i = 0; i < mushroom_poison; i++)
    {
        a.push(3);
    }
    for(let i = 0; i < mushroom_golden; i++)
    {
        a.push(4);
    }
}

function load_goldenArray(a)
{
    let randPoints = 24;
    let maxPoints = 8;
    let curPoints = 0;
    for(let i = 0; i < 3; i++)
    {
        curPoints = Math.floor(Math.random() * maxPoints);
        a.push(curPoints); 
        randPoints -= curPoints;
        curPoints = 0;
    }    
    randPoints++;
    a.push(randPoints);
    shuffleArray(a);
    while(a[3] == 0)
    {
        shuffleArray(a);
    }
}

function load_mainParameters()
{
    for(let i = 0; i < goldenBoard.length; i++)
    {
        switch(i)
        {
            case 0:
            {
                mushroom_nothing = goldenBoard[0];
                break;
            }
            case 1:
            {
                mushroom_shield = goldenBoard[1];
                break;
            }
            case 2:
            {
                mushroom_poison = goldenBoard[2];
                break;
            }
            case 3:
            {
                mushroom_golden = goldenBoard[3];
                break;
            }
        }
    }
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
 function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


function f_mushroom_shield()
{
    shield_find++;
    console.log("sending show_UI");
    show_UI(false, "");
}

function f_mushroom_nothing(i)
{
    //turns++;
    let randMushroom = Math.floor(Math.random() * 4 + 1);
    mainBoard[i] = randMushroom;
    switch(mainBoard[i])
            {
                case 1:
                {
                    grid_element[i].classList.add("animateNothing");
                    grid_element[i].classList.add("opacityReduced");
                    break;
                }
                case 2:
                {
                    grid_element[i].classList.add("animateShield");
                    grid_element[i].classList.add("opacityReduced");
                    revealMushrooms_full(true);
                    break;
                }
                case 3:
                {
                    grid_element[i].classList.add("animatePoison");
                    grid_element[i].classList.add("opacityReduced");
                    f_mushroom_poison();
                    break;
                }
                case 4:
                {
                    grid_element[i].classList.add("animateGolden");
                    grid_element[i].classList.add("opacityReduced");
                    f_mushroom_golden();
                    break;
                }
            } 
}

function f_mushroom_golden()
{
    points += goldenBoard[golden_find];
    golden_find++;
    if(golden_find >= mushroom_golden)
    {
        winGame();
    }
    console.log("sending show_UI");
    if(golden_find == mushroom_golden)
    {
        show_UI(true, "You win!");
    }
    else
    {
        show_UI(false, "");
    }
    
}

function f_mushroom_poison()
{
    removeTurn();
    poison_find++;
    console.log("sending show_UI");
    if(turns <= 0)
    {
        show_UI(true, "You lose!");
    }
    else
    {
        show_UI(false, "");
    }
    
}

function show_UI(gameResult, gameResult_message)
{
    console.log("gameResult: " + gameResult + " gameResult_message:" + gameResult_message );
    let created_image; 
    golden_UI.innerHTML = "" + golden_find + "/" + mushroom_golden;
    let life_UI = document.querySelector("#life_UI");
    //nothing_UI.innerHTML = "" + turns + " x";
    life_UI.innerHTML = "";
    
    for(let i = 0; i < randTurns; i++)
    {
        if(i < turns)
        {
            created_image = document.createElement("img");
            created_image.classList.add("img_UI_life");
            created_image.src = "img/life.png";
            life_UI.appendChild(created_image);
        }
        else
        {
            created_image = document.createElement("img");
            created_image.classList.add("img_UI_life");
            created_image.src = "img/life_empty.png";
            life_UI.appendChild(created_image);
        }
    }
    
    if(gameResult == true)
    {
        text_UI[text_UI.length-1].innerHTML = gameResult_message;
    }
    else if(story_level == true)
    {
        text_UI[text_UI.length-1].innerHTML = "Level " + curLevel;
    }
    else
    {
        text_UI[text_UI.length-1].innerHTML = "Random Level";
    }

}

function removeTurn()
{
    turns--;
    if(turns <= 0)
    {
        loseGame();
    }
    console.log("sending show_UI");
    show_UI(false, "");
}

function loseGame()
{
    console.log("sending show_UI");
    show_UI(true, "You lose!");
    revealMushrooms();
    disableMushrooms();
    check_level();
}

function winGame()
{
    /*
    if(story_level == true)
    {
        let skipLevel = document.querySelector("#skipLevel");
        skipLevel.innerHTML = 
    }
    */
    console.log("sending show_UI");
    show_UI(true, "You win!");
    revealMushrooms();
    disableMushrooms();
    check_level();
}

function revealMushrooms()
{
    for(let i = 0; i < grid_element.length; i++)
    {
        switch(realBoard[i])
        {
            case 0:
            {
               
                break;
            }
            case 1:
            {
                //grid_element[i].classList.remove("animateNothing");
                grid_element[i].classList.add("animateNothing");
                break;
            }
            case 2:
            {
                //grid_element[i].classList.remove("animateShield");
                grid_element[i].classList.add("animateShield");
                break;
            }
            case 3:
            {
                //grid_element[i].classList.remove("animatePoison");
                grid_element[i].classList.add("animatePoison");
                break;
            }
            case 4:
            {
                //grid_element[i].classList.remove("animateGolden");
                grid_element[i].classList.add("animateGolden");
                break;
            }
        } 
    }
}

function revealMushrooms_full(mushroomActivated)
{
    //let selected_element = document.querySelectorAll(".selected_element");
    if(mushroomActivated == true)
    {
        for(let i = 0; i < grid_element.length; i++)
        {
            if(!grid_element[i].classList.contains('selected_element'))
            {
                switch(realBoard[i])
                {
                    case 0:
                    {
                        break;
                    }
                    case 1:
                    {
                        grid_element[i].classList.add("animateNothing_full");
                        break;
                    }
                    case 2:
                    {
                        grid_element[i].classList.add("animateShield_full");
                        break;
                    }
                    case 3:
                    {
                        grid_element[i].classList.add("animatePoison_full");
                        break;
                    }
                    case 4:
                    {
                        grid_element[i].classList.add("animateGolden_full");
                        break;
                    }
                } 
            } 
        }
    }
    else
    {
        for(let i = 0; i < grid_element.length; i++)
        {
            switch(realBoard[i])
            {
                case 0:
                {
                   
                    break;
                }
                case 1:
                {
                    grid_element[i].classList.add("animateNothing_full");
                    break;
                }
                case 2:
                {
                    grid_element[i].classList.add("animateShield_full");
                    break;
                }
                case 3:
                {
                    grid_element[i].classList.add("animatePoison_full");
                    break;
                }
                case 4:
                {
                    grid_element[i].classList.add("animateGolden_full");
                    break;
                }
            } 
        }
    }
    
}

function revealMushrooms_radar()
{
    for(let i = 0; i < grid_element.length; i++)
    {
        switch(mainBoard[i])
        {
            case 0:
            {
               
                break;
            }
            case 1:
            {
                grid_element[i].classList.add("animateNothing_radar");
                break;
            }
            case 2:
            {
                grid_element[i].classList.add("animateShield_radar");
                break;
            }
            case 3:
            {
                grid_element[i].classList.add("animatePoison_radar");
                break;
            }
            case 4:
            {
                grid_element[i].classList.add("animateGolden_radar");
                break;
            }
        } 
    }
}


function disableMushrooms()
{
    canSelect = false;
    for(let i = 0; i < mainBoard.length; i++)
    {
        mainBoard[i] = 0;
    }
}

/*
function enableMushrooms()
{
    for(let i = 0; i < mainBoard.length; i++)
    {
        mainBoard[i] = 0;
    }
}
*/

function resetBoard()
{
    mainBoard.splice(0, mainBoard.length);
    realBoard.splice(0, realBoard.length);
    goldenBoard.splice(0, goldenBoard.length);
}
console.log("sending show_UI");
show_UI(false, "");

function restartLevel()
{
    shuffleArray(realBoard);
    mainBoard = [...realBoard];
    revealMushrooms_full(false);
    removeClass();
    removeClassOpacity();
    resetParameters();
    console.log("sending show_UI");
    show_UI(false, "");
}

function randomLevel()
{
    story_level = false; 
    resetBoard();
    removeClass();
    removeClassOpacity();
    load_goldenArray(goldenBoard);
    load_mainParameters();
    load_mainArray(realBoard);
    shuffleArray(realBoard);
    mainBoard = [...realBoard];
    revealMushrooms_full(false);
    resetParameters();
    console.log("sending show_UI");
    show_UI(false, "");
    modal[1].style.display = "none";
}

function generateLevel()
{
    story_level = true; 
    resetBoard();
    removeClass();
    removeClassOpacity();
    let selected_level = document.querySelector("#selected_level").value;
    goldenBoard.push(levels[selected_level-1][0]); 
    goldenBoard.push(levels[selected_level-1][1]); 
    goldenBoard.push(levels[selected_level-1][2]); 
    goldenBoard.push(levels[selected_level-1][3]); 
    load_mainParameters();
    load_mainArray(realBoard);
    shuffleArray(realBoard);
    mainBoard = [...realBoard];
    revealMushrooms_full(false);
    resetParameters();
    randTurns = levels[selected_level-1][4];
    turns = randTurns;
    curLevel = selected_level;
    console.log("sending show_UI");
    show_UI(false, "");
    modal[0].style.display = "none";
}

function editedLevel()
{
    let selected_golden = document.querySelector("#selected_golden").value;
    let selected_poison = document.querySelector("#selected_poison").value;
    let selected_shield = document.querySelector("#selected_shield").value;
    let selected_nothing = document.querySelector("#selected_nothing").value;
    let sum_mushrooms = parseFloat(selected_golden) + parseFloat(selected_poison) + parseFloat(selected_shield) + parseFloat(selected_nothing);
    let selected_lives = document.querySelector("#selected_lives").value;
    if( sum_mushrooms != "25")
    {
        alert("Mushrooms used for the level: " + sum_mushrooms + "/25. The sum of the mushrooms must be 25!");
    }
    else
    {
        story_level = false; 
        resetBoard();
        removeClass();
        removeClassOpacity();
        goldenBoard.push(selected_nothing);
        goldenBoard.push(selected_shield); 
        goldenBoard.push(selected_poison); 
        goldenBoard.push(selected_golden);
        load_mainParameters();
        load_mainArray(realBoard);
        shuffleArray(realBoard);
        mainBoard = [...realBoard];
        revealMushrooms_full(false);
        resetParameters();
        randTurns = selected_lives;
        turns = randTurns;
        curLevel = selected_level;
        console.log("sending show_UI");
        show_UI(true, "You win!");
        modal[2].style.display = "none";
    }
}

function removeClass()
{
    for(let i = 0; i < grid_element.length; i++)
    {
        grid_element[i].classList.remove("animateNothing");
        grid_element[i].classList.remove("animateShield");
        grid_element[i].classList.remove("animatePoison");
        grid_element[i].classList.remove("animateGolden");
    }
}

function removeClassOpacity()
{
    for(let i = 0; i < grid_element.length; i++)
    {
        grid_element[i].classList.remove("opacityReduced");
        grid_element[i].classList.remove("selected_element");
    }
}

function removeClass_full()
{
    for(let i = 0; i < grid_element.length; i++)
    {
        grid_element[i].classList.remove("animateNothing_full");
        grid_element[i].classList.remove("animateShield_full");
        grid_element[i].classList.remove("animatePoison_full");
        grid_element[i].classList.remove("animateGolden_full");
    }
}

function resetParameters()
{
    shield_find = 0;
    golden_find = 0;
    poison_find = 0;
    canSelect = true;
    turns = randTurns;
    mainBoard = [...realBoard];
    text_UI[text_UI.length-1].innerHTML = "";
}

function setMaxLevel()
{
    let selected_level = document.getElementById("selected_level");
    let selected_max_level = level_reached.toString();
    selected_level.setAttribute("max",level_reached);
    selected_level.value = selected_max_level;
}

function save_progress()
{
    localStorage.setItem("level_reached", level_reached);
}

function levelSolved()
{
    level_reached++;
    save_progress();
}

function check_level()
{
    let selected_level = document.getElementById("selected_level").value;
    if(story_level == true && selected_level == curLevel && level_reached < levels.length)
    {
        levelSolved();
        setMaxLevel();
    }
}

function resetLevel()
{
    level_reached = 1;
    localStorage.setItem("level_reached", level_reached);
    setMaxLevel();
}

revealMushrooms_full();

function createLevel()
{
    modal[1].style.display = "none";
    modal[2].style.display = "block";
}

function playLevel()
{
    modal[1].style.display = "none";
    modal[0].style.display = "block";
}

function menuLevel()
{
    modal[0].style.display = "none";
    modal[2].style.display = "none";
    modal[1].style.display = "block";
}

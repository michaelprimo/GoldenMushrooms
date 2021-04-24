let mainBoard = [];
let goldenBoard = [];

let mushroom_nothing = 6;
let mushroom_shield = 6;
let mushroom_poison = 6;
let mushroom_golden = 7;

let points = 0;

let shield_find = 0;
let golden_find = 0;
let poison_find = 0;

let randTurns = Math.floor(Math.random() * 3 + 1);
let turns = randTurns;

let main_grid = document.querySelector("#main_grid");
const max_grid_elements = 25;
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
                    revealMushrooms_full();
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
        });
        
        created_grid_element.addEventListener("animationend", function() 
        {
            switch(mainBoard[i])
            {
                case 1:
                {
                    grid_element[i].classList.remove("animateNothing_full");
                    
                    break;
                }
                case 2:
                {
                    grid_element[i].classList.remove("animateShield_full");
                    break;
                }
                case 3:
                {
                    grid_element[i].classList.remove("animatePoison_full");
                    break;
                }
                case 4:
                {
                    grid_element[i].classList.remove("animateGolden_full");
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


randomLevel();
/*
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "CLICK ME";
    btn.className = "test test2";
    document.body.main_grid.appendChild(btn);
*/

/*
function reveal(num)
{
    switch(mainBoard[num])
    {
        case 0:
        {
           
            break;
        }
        case 1:
        {
            grid_element[num].className = "grid_element animateNothing";
            f_mushroom_nothing();
            break;
        }
        case 2:
        {
            grid_element[num].className = "grid_element animateShield";
            f_mushroom_shield();
            break;
        }
        case 3:
        {
            f_mushroom_poison();
            grid_element[num].className = "grid_element animatePoison";
            break;
        }
        case 4:
        {
            f_mushroom_golden();
            grid_element[num].className = "grid_element animateGolden";
            break;
        }
    }
    //mainBoard[num] = 0;
}
*/

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
    for(let i = 0; i < 4; i++)
    {
        if(i == 3)
        {
            randPoints++;
            a.push(randPoints);
        }
        else
        {
            curPoints = Math.floor(Math.random() * maxPoints) + 1;
            if(curPoints < 1)
            {
                curPoints = 1;
            }
            a.push(curPoints);
            
            randPoints -= curPoints;
        }
        console.log("i: " + i + " curPoints: " + curPoints + " randPoints: " + randPoints);
        curPoints = 0;
    }    
    shuffleArray(a);
    console.log(randPoints);
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
    show_UI();
}

function f_mushroom_nothing(i)
{
    //turns++;
    let randMushroom = Math.floor(Math.random() * 4 + 1);
    switch(randMushroom)
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
                    revealMushrooms_full();
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

    show_UI();
}

function f_mushroom_golden()
{
    points += goldenBoard[golden_find];
    golden_find++;
    if(golden_find >= mushroom_golden)
    {
        winGame();
    }
    show_UI();
}

function f_mushroom_poison()
{
    removeTurn();
    poison_find++;
    show_UI();
}

function show_UI()
{
    golden_UI.innerHTML = "" + golden_find + "/" + mushroom_golden;
    poison_UI.innerHTML = "" + mushroom_poison - poison_find + " x";
    shield_UI.innerHTML = "x " + shield_find + "";
    nothing_UI.innerHTML = "" + turns + " x";
}

function removeTurn()
{
    turns--;
    if(turns <= 0)
    {
        loseGame();
    }
    show_UI();
}

function loseGame()
{
    show_UI();
    text_UI[text_UI.length-1].innerHTML = "You lose!";
    removeClass();
    revealMushrooms();
    
    //disableMushrooms();
    //setTimeout(function(){ window.location.reload(true); }, 3000);
}

function winGame()
{
    show_UI();
    text_UI[text_UI.length-1].innerHTML = "You win!";
    removeClass();
    revealMushrooms();
    
    //disableMushrooms();
    //setTimeout(function(){ window.location.reload(true); }, 3000);
}

function revealMushrooms()
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

function revealMushrooms_full()
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

/*
function disableMushrooms()
{
    for(let i = 0; i < mainBoard.length; i++)
    {
        mainBoard[i] = 0;
    }
}

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
}

show_UI();

function restartLevel()
{
    shuffleArray(mainBoard);
    revealMushrooms_full();
    removeClass();
    resetParameters();
    show_UI();
}

function randomLevel()
{
    resetBoard();
    load_goldenArray(goldenBoard);
    /*
    mushroom_nothing = 6;
    mushroom_shield = 6;
    mushroom_poison = 6;
    mushroom_golden = 7;
    */
    load_mainParameters();
    load_mainArray(mainBoard);
    shuffleArray(mainBoard);
    revealMushrooms_full();
    resetParameters();
    show_UI();
    console.log(mainBoard);
}

function removeClass()
{
    for(let i = 0; i < grid_element.length; i++)
    {
        grid_element[i].classList.remove("animateNothing");
        grid_element[i].classList.remove("animateShield");
        grid_element[i].classList.remove("animatePoison");
        grid_element[i].classList.remove("animateGolden");
        grid_element[i].classList.remove("opacityReduced");
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
    turns = randTurns;
    text_UI[text_UI.length-1].innerHTML = "";
}

revealMushrooms_full();

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
/*
window.onload = function(event) 
{
  modal[0].style.display = "block";
}
*/

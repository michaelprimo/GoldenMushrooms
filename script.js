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

load_goldenArray(goldenBoard);
load_mainParameters();
load_mainArray(mainBoard);
shuffleArray(mainBoard);

let max_turns = 26 - mushroom_golden;
let turns = mushroom_golden + Math.floor(Math.random() * (max_turns));

let grid_element = document.querySelectorAll(".grid_element");
let main_grid = document.querySelectorAll("#main_grid");

let text_UI = document.querySelectorAll(".text_UI");
text_UI[text_UI.length-1].innerHTML = "Random Level!";

let golden_UI = document.querySelector("#golden_UI");
let poison_UI = document.querySelector("#poison_UI");
let shield_UI = document.querySelector("#shield_UI");
let nothing_UI = document.querySelector("#nothing_UI");

/*
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "CLICK ME";
    btn.className = "test test2";
    document.body.main_grid.appendChild(btn);
*/

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
            removeTurn();
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
            removeTurn();
            break;
        }
    }
}

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

function f_mushroom_nothing()
{
    turns++;
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
    if(shield_find > 0)
    {
        shield_find--;
    }
    else if(turns > 0)
    {
        turns = Math.round(turns/2);
        removeTurn();
        if(turns < 1)
        {
            loseGame();
        }
    }
    else
    {
        loseGame();
    }
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
    text_UI[text_UI.length-1].innerHTML = "You lose!";
    revealMushrooms();
    setTimeout(function(){ window.location.reload(true); }, 3000);
}

function winGame()
{
    text_UI[text_UI.length-1].innerHTML = "You win!";
    revealMushrooms();
    setTimeout(function(){ window.location.reload(true); }, 3000);
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
                grid_element[i].className = "grid_element animateNothing";
                break;
            }
            case 2:
            {
                grid_element[i].className = "grid_element animateShield";
                break;
            }
            case 3:
            {
                grid_element[i].className = "grid_element animatePoison";
                break;
            }
            case 4:
            {
                grid_element[i].className = "grid_element animateGolden";
                break;
            }
        } 
    }
}

show_UI();

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
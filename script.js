let mainBoard = [];
let goldenBoard = [];

let mushroom_nothing = 6;
let mushroom_shield = 6;
let mushroom_poison = 6;
let mushroom_golden = 7;

let points = 0;
let shield_find = 0;
let golden_find = 0;

load_mainArray(mainBoard);
load_goldenArray(goldenBoard)
shuffleArray(mainBoard);

let grid_element = document.querySelectorAll(".grid_element");
let main_grid = document.querySelectorAll("#main_grid");


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
    mainBoard[num] = 0;
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
    let maxPoints = 10000;
    let curPoints = 0;
    for(let i = 1; i < mushroom_golden; i++)
    {
        curPoints = Math.floor(Math.random() * Math.floor(maxPoints/mushroom_golden)) + 1;
        a.push(curPoints);
        maxPoints -= curPoints;
        curPoints = 0;
    }
    a.push(maxPoints);
    a.reverse();
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
}

function f_mushroom_golden()
{
    points += goldenBoard[golden_find];
    golden_find++;
    if(golden_find >= mushroom_golden)
    {
        alert("you win with " + points + " points");
        window.location.reload(true);
    }
}

function f_mushroom_poison()
{
    if(shield_find > 0)
    {
        shield_find--;
    }
    else if(points > 0)
    {
        points = Math.floor(points/2);
    }
    else
    {
        alert("you lose");
        window.location.reload(true);
    }
}
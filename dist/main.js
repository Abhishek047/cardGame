let cards=[];
let winnerLog = new Array(4).fill(0);
let chance = 0;
let startChance=0;
let chanceType ='';
const clockElement = document.querySelector('.clock');
const user0Res = document.querySelector(".user0-res");
const user1Res = document.querySelector(".user1-res");
const user2Res = document.querySelector(".user2-res");
const user3Res = document.querySelector(".user3-res");
let clockID;
//PLAYNG AREA SELECTOR
const playArea = document.querySelector(".play");  
    

function initializeCards(){


let spade = new Array(13).fill(0);      //EMPTY ARRAY OF SPADE
let heart=new Array(13).fill(0);        //EMPTY ARRAY OF HEART
let diamond=new Array(13).fill(0);      //EMPTY ARRAY OF DIAMONDS
let club=new Array(13).fill(0);         //EMPTY ARRAY OF CLUBS

let isSpadeFull = spade.every((spade) => spade=== 1);   //CHECK FOR SPADES IF FULL OR NOT
let isHeartFull = heart.every((heart) => heart=== 1);   //CHECK FOR HEART IF FULL OR NOT
let isDiamondFull = diamond.every((diamond) => diamond === 1);   //CHECK FOR DIAMOND IF FULL OR NOT
let isClubFull = club.every((club) => club === 1);   //CHECK FOR CLUB IF FULL OR NOT

let person=0;

// GENRATE AN EMPTY CARD TYPE

function genrateType(){
    // return Math.floor(Math.random()*4);
    let type = Math.floor(Math.random()*4);

    if((type === 0) && !isSpadeFull)
        return type;
    else if((type === 1) && !isHeartFull)
        return type;
    else if((type === 2) && !isDiamondFull)
        return type;
    else if((type === 3) && !isClubFull)
        return type;
    else
        return genrateType();
}

//GENRATES EMPTY NUMBER FOR THE SPECIFIC TYPE

function genrateEmptyNumber(type)
{
    let num = Math.floor((Math.random()*13)+1);
    if(type[num-1] === 0){ 
    return num;
    }
    else { 
    return genrateEmptyNumber(type, num); 
    }
}

//MAKE A NEW CARD

let initialize = function()
{
    var number;
    var type = genrateType();

//SPADE = 0

    if(type === 0)
    {
        number = genrateEmptyNumber(spade);
        cards.push({
        id: `sp-${number}`,
        type:'SPADE',
        value: number,
        holder: person,
        isTrump: false,
        isPlayed: false
        });
        spade[number-1] = 1;
        person = (person + 1)%4;
        isSpadeFull = spade.every((spade) => spade === 1);
    }

//HEART = 1

    if(type === 1)
    {
        number = genrateEmptyNumber(heart);
        cards.push({
        id: `he-${number}`,
        type:'HEART',
        value: number,
        holder: person,
        isTrump:  false,
        isPlayed: false
        });
        heart[number-1] = 1;
        person = (person + 1)%4;
        isHeartFull = heart.every((heart) => heart === 1);
    }

//DIAMOND = 2

    if(type === 2)
    {
        number = genrateEmptyNumber(diamond);
        cards.push({
        id: `di-${number}`,
        type:'DIAMOND',
        value: number,
        holder: person,
        isTrump:  false,
        isPlayed: false
        });
        diamond[number-1] = 1;
        person = (person + 1)%4;
        isDiamondFull = diamond.every((diamond) => diamond === 1);
    }

//CLUB = 3

    if(type === 3)
    {
        number = genrateEmptyNumber(club);
        cards.push({
        id: `cl-${number}`,
        type:'CLUB',
        value: number,
        holder: person,
        isTrump: false,
        isPlayed: false
        });
        person = (person + 1)%4;
        club[number-1] = 1;
        isClubFull = club.every((club) => club === 1);
    }
}    
    
//INITIALIZES CARDS 52 LENGTH

for(var i = 0; i< 52;i++)
{
    initialize();
}

//TO CHECK ALL ARE FULL

// console.log( isSpadeFull);
// console.log( isDiamondFull);
// console.log( isHeartFull);
// console.log( isClubFull);

}

initializeCards();

//TO CHECK ALL ARE ALLOTTED EQUALLY
// console.log(cards.filter((card) => card.holder === 0));
// console.log(cards.filter((card) => card.holder === 1));
// console.log(cards.filter((card) => card.holder === 2));
// console.log(cards.filter((card) => card.holder === 3));


function displayAll()
{
    const containAll = document.querySelectorAll(".card-contain");
    let flag = 0;
    containAll.forEach((cle) => {

    let player = cards.filter((card) => card.holder === flag);

    player.forEach((personCard)=> {
    
        var newDiv = document.createElement('div');
        newDiv.className=`card user${personCard.holder}`;
        newDiv.id=personCard.id;
        var text = document.createTextNode(personCard.id);
        newDiv.appendChild(text);
        cle.appendChild(newDiv);
    
    });

    flag++;
    })
}

displayAll();


//PLAY CARD

function playCard(id){
    
        //PLAYED CARD SELECTOR
        const selected = document.getElementById(id);  
        

        //REMOVE FROM PLAYERS CARDS
        selected.parentNode.removeChild(selected);
       
        //ADD IN PLAY AREA
        playArea.appendChild(selected);
        
        //SET THE PLAYED CARD TO TRUE
        
  
        cards.forEach((card) => {
            if(card.id === id)
            {
                card.isPlayed = true;
            }
        })
        resetClock();
}





//CARD PLAYED USER 

function initializeUser(){
    //TAKES ALL THE PLAYERS CARD
    const playerCards = (document.querySelector(".player")).querySelectorAll('.card');

    //ADD LISTENER TO ALL CARD ELEMENT
    let listen = playerCards.forEach((card) => card.addEventListener('click', playerClick));

    function playerClick(e){    
        if(chance === 0)
        {
        //DOES HE HAVE THE CURRENT TYPE
        const availableCards = cards.filter((card)=> (card.holder === 0 && card.isPlayed === false));

        const typeAvail = (availableCards.filter((card) => card.type === chanceType)).map((card) => card.id);
        
        if(chance === startChance)
            {
                console.log();
                chanceType = availableCards.filter((card) => card.id === e.target.id)[0].type;
            }
        if(typeAvail.length > 0)
            {
                if(typeAvail.some(card => card === e.target.id))
                {
                    playCard(e.target.id);
                }
                else{
                    console.log('choseRightCard');
                }
            }
        else
            {
                playCard(e.target.id);
            }
        }
    }
}
//INITIALIZE PLAYER PLAYING CARD

initializeUser();


function computerPlayFunction(id){

    const compAvailableCards = cards.filter((card)=> (card.holder === id && card.isPlayed === false));
    let palyingCard;
    if(compAvailableCards.length>0)
    {   
        if(startChance === id){

                //FIRST PLAYER CHANCE

                palyingCard = compAvailableCards.reduce((card, cuurentLargerst) => {
                if(cuurentLargerst.value< card.value)
                return card
                else
                return cuurentLargerst
            },0);
            chanceType = palyingCard.type;
        }
        else{
            const typeAvail = compAvailableCards.filter((card) => card.type === chanceType)
            if(typeAvail.length !== 0)
            {
                //IF TYPE IS AVAILABLE FIND THE LARGEST POSSIBLE CARD OF THAT TYPE U HAVE
                    palyingCard = typeAvail.reduce((card, cuurentLargerst) => {
                        if(cuurentLargerst.value< card.value)
                        return card
                        else
                        return cuurentLargerst
                    },0);
           
           
                    //COMDITION FOR IF THE LARGEST YOU HAVE IS LESS THAN THE CURRENT LARGET THEN WHAT TO DO
           
           
                }
            else{
                palyingCard = compAvailableCards.reduce((card, cuurentSmallest) => {
                    if(cuurentSmallest.value> card.value)
                    return card
                    else
                    return cuurentSmallest
                },compAvailableCards[0]);
            }
        }
        //CALL TO INPUT THAT CARD

        playCard(palyingCard.id);
    }

}



function compPlay(){
    switch(chance){
        case 1:
            computerPlayFunction(1);
            break;
        case 2:
            computerPlayFunction(2);
            break;
        case 3:
            computerPlayFunction(3);
            break;
        default:
            break;
    }
}



let clearID;

function updateRes(){
    user0Res.innerHTML = winnerLog[0];
    user1Res.innerHTML = winnerLog[1];
    user2Res.innerHTML = winnerLog[2];
    user3Res.innerHTML = winnerLog[3];
    playArea.textContent = '';
}


function winnerName(value){
    if( winnerLog.indexOf(value) === 0 )
    {
        return('Player')
    }
    else{
        return (`Comp: ${winnerLog.indexOf(value)}`)
    }
}

function checkForBoutWinner(){
    
    
    const ids = [...playArea.children].map(card => card.id);
    let playedCards = cards.filter((card) => ids.includes(card.id));
    playedCards = playedCards.filter((card) => card.type === chanceType);
    
    winnerCard = playedCards.reduce((card, cuurentLargerst) => {
        if(cuurentLargerst.value< card.value)
        return card
        else
        return cuurentLargerst
    },playedCards[0]);

    winnerLog[winnerCard.holder] += 1;
    startChance = winnerCard.holder;
    chance = winnerCard.holder;
    chanceType = '';
    playedCards=[];

    setTimeout( () => { updateRes() ;}, 1000);


    if(cards.every(card => card.isPlayed === true ))
        {
            winner = winnerLog.reduce((value, newWinner) => {
                if(newWinner < value)
                return value
                else
                return newWinner
            },0);

            alert("winner is : "+winnerName(winner));
            console.log(winnerLog);
        }
    else
    setClock();

}



//FUNCTION TO RESET CLOCK

function clock(){
    clockElement.innerHTML = `${clockElement.innerHTML-1}`
    
    //PROVIDE 30sec for user

    if(chance === 0){
        if(clockElement.innerHTML === '-1')
        {
            computerPlayFunction(0);
        }    
    }
    //DEFAULT SECONDS FOR COMPUTER
    else
    {
        if(clockElement.innerHTML === '29')
        {
            compPlay(chance);
        }
    }
}


//START CLOCK
function setClock()
{
    clockID = setInterval(clock, 1000);
}
//RESET CLOCK
function resetClock()
{   
    chance=(chance+1)%4;
    clearInterval(clockID);
    clockElement.innerHTML='30';
    if(chance !== startChance)
    {
        setClock();
    }
    else{
        //DO CHECK FOR THE RESULT OF THE BOUT
        checkForBoutWinner();
    }
}

//Start the Clock
setClock();

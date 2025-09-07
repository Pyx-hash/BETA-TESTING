const ref = firebase.database().ref('Game');

firebase.auth().onAuthStateChanged((user) => {
    console.log('User: ',user);
    setupUI(user);
});


function setupUI(user){
    if (user) {
        joinGame();
        myScore();
    } 
    else {
    }
}

ref.on('value', snapshot => {
    getGameInfo(snapshot);
})

var btnLogout = document.getElementById('btnLogout');
btnLogout.addEventListener('click',giveup)

function giveup(){
        let checkST = `room-state`;
        ref.child('game-1').update({
            [checkST]: 5,
        });
        ref.child('game-1').remove();
        console.log("Give up")
}

function myScore(){
    const currentUser = firebase.auth().currentUser;
    ref.once("value")
            .then(function(snapshot) {
            var myid = currentUser.uid;
            var myscore = snapshot.child(`leaderboard/LeaderName-${myid}/SumScore`).val();
            if(myscore == null || myscore == undefined){
                myscore = 0
            }
            console.log(myscore,myid)
            document.querySelector('#myScore').innerHTML ='Your Score: ' + myscore;
            });
}

function joinGame(){
    const currentUser = firebase.auth().currentUser;
    console.log('[Join] Current user:', currentUser);
    var playerX = document.getElementById(`user-name-x`).innerText;
    if(currentUser){
        ref.once("value")
            .then(function(snapshot) {
            let roundCount = `round`;
            ref.child('game-1').update({
                [roundCount]: 1,
            });
            var room = snapshot.child("game-1/room-state").val();
            console.log(room)
        if(room == null){
            let tmpID = `user-x-id`;
            let tmpEmail =  `user-x-email`;
            let roomState = `room-state`
            let tmpImg = `user-x-img`
            let dpName =  `user-x-name`
            let roundCount = `round`;
            ref.child('game-1').update({
                [roundCount]: 1,
                [tmpID]: currentUser.uid,
                [tmpEmail]: currentUser.email,
                [tmpImg]:currentUser.photoURL,
                [roomState]: 1,
                [dpName]:currentUser.displayName,
            });
            console.log(currentUser.email+' added.');
        }
        else if(room == 1 && currentUser.email != snapshot.child("game-1/user-x-email").val()){
            let tmpID = `user-o-id`;
            let tmpEmail =  `user-o-email`;
            let roomState = `room-state`
            let tmpImg = `user-o-img`
            let dpName =  `user-o-name`
            let roundCount = `round`;
            ref.child('game-1').update({
                [roundCount]: 1,
                [tmpID]: currentUser.uid,
                [tmpEmail]: currentUser.email,
                [tmpImg]:currentUser.photoURL,
                [roomState]: 2,
                [dpName]:currentUser.displayName,
            });
            console.log(currentUser.email+' added.',snapshot.child("game-1/user-x-email").val());        
        }
        ref.once("value")
            .then(function(snapshot) {
            var usero = snapshot.child("game-1/user-o-name").val();
            var userx = snapshot.child("game-1/user-x-name").val();
            var imgX = snapshot.child("game-1/user-x-img").val();
            var imgO = snapshot.child("game-1/user-o-img").val();

            document.querySelector('#user-name-x').innerHTML = userx;
            document.querySelector('#user-name-o').innerHTML = usero;
            document.querySelector('#user-profile-x').innerHTML = `<img src="${imgX}" class="display-img1" id="profile-img" ></img>`;
            document.querySelector('#user-profile-o').innerHTML = `<img src="${imgO}" class="display-img2" id="profile-img" ></img>`;
            });
        })
    }
}

window.onload = joinGame;

function loadImg(){
    ref.once("value")
    .then(function(snapshot) {
    var usero = snapshot.child("game-1/user-o-name").val();
    var userx = snapshot.child("game-1/user-x-name").val();
    var imgX = snapshot.child("game-1/user-x-img").val();
    var imgO = snapshot.child("game-1/user-o-img").val();

    document.querySelector('#user-name-x').innerHTML = userx;
    document.querySelector('#user-name-o').innerHTML = usero;
    document.querySelector('#user-profile-x').innerHTML = `<img src="${imgX}" class="display-img1" id="profile-img" ></img>`;
    document.querySelector('#user-profile-o').innerHTML = `<img src="${imgO}" class="display-img2" id="profile-img" ></img>`;
    });
}

//random

let randomImg;

var numbers = ['gun-h','gun-p','gun-s'];
  function generateNumber() {
  var duration = 2000;

  var output = $('#output'); // Start ID with letter
  var started = new Date().getTime();
  randomImg = numbers[Math.floor(Math.random()*numbers.length)]

  animationTimer = setInterval(function() {
    if (new Date().getTime() - started > duration) {
      clearInterval(animationTimer); // Stop the loop
      output.html(`<img id="gun" src='assets/${randomImg}.png' style="width:4.5vw;top: -0.8vw;position: relative; max-width: 6.2vw;
        max-height: 6.2vw;margin-left:18vw";> `);
      clearInterval(animationTimer); // Stop the loop
    } else {
        output.html(`<img id="gun" src='assets/${numbers[Math.floor(Math.random()*numbers.length)]}.png' style="width:4.5vw;top: -0.8vw;position: relative; max-width: 6.2vw;
          max-height: 6.2vw;margin-left:18vw;"> `);
    }
    
  }, 100);
}

generateNumber(0);

//arrow fucntion
    let click_left = 0;
    let click_right = 0;
    function left(){
        if(click_left = 1){
            document.getElementById('gun').style.marginLeft = '4.5vw';
            click_left = 0;
        }
        if(click_right == 1){
            document.getElementById('gun').style.marginLeft = '18vw';
            click_right = 0;
            click_left = 0;
        }
        document.getElementById('gun').style.transitionDuration = "0.3s";
        document.getElementById('gun').webkitTransitionTimingFunction = "ease-out";
        click_left++;
    }


    function right(){
        if(click_right = 1){
            document.getElementById('gun').style.marginLeft = '30vw';
            click_right = 0;
        }
        if(click_left == 1){
            document.getElementById('gun').style.marginLeft = '18vw';
            click_right = 0;
            click_left = 0;
        }
        document.getElementById('gun').style.transitionDuration = "0.3s";
        document.getElementById('gun').webkitTransitionTimingFunction = "ease-out";
        click_right++;
    }

//Hold Events


//Select Column Function

var gunPosit = 18;

function selectCol(){
    gunPosit = parseInt(document.getElementById('gun').style.marginLeft);
    console.log(gunPosit)

    if(gunPosit == 4){
        console.log('Col1');
    }
    if(gunPosit == 18){
        console.log('Col2');
    }
    if(gunPosit == 30){
        console.log('Col3');
    }
    return gunPosit;
}

$(document).bind("contextmenu",function(e){
    return false;
      });

let mouseState = 0;

const btnHold = document.querySelectorAll('.holdbutt');
btnHold.forEach((btnHold) => btnHold.addEventListener('mousedown', charge));

var timer = 0,
    timerInterval;

const btnUp = document.querySelectorAll('.holdbutt');
btnUp.forEach((btnUp) => btnUp.addEventListener('mouseup', release));

var powerValue = 0;
var cbar = 0;

function NextGenerate() {
    var duration = 2000;
  
    var output = $('#output'); // Start ID with letter
    var started = new Date().getTime();
    randomImg = numbers[Math.floor(Math.random()*numbers.length)]
  
    animationTimer = setInterval(function() {
      if (new Date().getTime() - started > duration) {
        clearInterval(animationTimer); // Stop the loop
        output.html(`<img id="gun" src='assets/${randomImg}.png' style="width:4.5vw;top: -0.8vw;position: relative; max-width: 6.2vw;
          max-height: 6.2vw;margin-left:${document.getElementById('gun').style.marginLeft};"> `);
        clearInterval(animationTimer); // Stop the loop
      } else {
          output.html(`<img id="gun" src='assets/${numbers[Math.floor(Math.random()*numbers.length)]}.png' style="width:4.5vw;top: -0.8vw;position: relative; max-width: 6.2vw;
            max-height: 6.2vw;margin-left:${document.getElementById('gun').style.marginLeft};"> `);
      }
      
    }, 100);
  }

function charge(event){
    const btnJoinID = event.currentTarget.getAttribute("id");
    const player = btnJoinID[btnJoinID.length - 1];
    let heightbar =  document.getElementById(`hold-${player}`);
    var startTime = new Date().getTime();
    var round = 1;
    timerInterval = setInterval(function(){
            for (let i = -2.3; i < (new Date().getTime()/1000 - startTime/1000) ; i++) {
                    if(round == 0) {
                        timer += 1;
                    }
                    if((timer/100) == 2.99){
                        round = 2;
                    }
                    if(round == 2){
                        timer -= 1;
                    }
                    if(timer == 0){
                        round = 0;
                    }
                    powerValue = document.querySelector(`.power-${player}`).offsetHeight;
                    cbar = document.querySelector(`.chargeBar-${player}`).offsetHeight
                    return powerValue,cbar;
                    
            }
  });
    console.log(powerValue,cbar,(powerValue/cbar)*100)
    heightbar.classList.add("play-anim");
    heightbar.classList.remove("paused");
}

var countXO;

function putXO(){
    if(countXO % 2 == 0){
        if(gunPosit == 4 && (powerValue/cbar)*100 > 66 ){
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-1-col-1',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countXO,
            });
        }
        else if(gunPosit == 4 && (powerValue/cbar)*100 < 66 && (powerValue/cbar)*100 >= 33){
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-2-col-1',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countXO,
            });        
        }
        else if(gunPosit == 4 && (powerValue/cbar)*100 >= 0  && (powerValue/cbar)*100 < 33){
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-3-col-1',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countXO,
            });        
        }
        
        else if(gunPosit == 18 && (powerValue/cbar)*100 > 66 ){
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-1-col-2',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countXO,
            });        
        }
        else if(gunPosit == 18 && (powerValue/cbar)*100 < 66 && (powerValue/cbar)*100 >= 33){
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-2-col-2',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countXO,
            });        
        }
        else if(gunPosit == 18 && (powerValue/cbar)*100 >= 0  && (powerValue/cbar)*100 < 66){
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-3-col-2',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countXO,
            });        
        }
        
        else if(gunPosit == 30 && (powerValue/cbar)*100 > 66 ){
            console.log((powerValue/cbar)*100)
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-1-col-3',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countXO,
            });        
        }
        else if(gunPosit == 30 && (powerValue/cbar)*100 < 66 && (powerValue/cbar)*100 >= 33){
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-2-col-3',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countXO,
            });        
        }
        else if(gunPosit == 30 && (powerValue/cbar)*100 >= 0  && (powerValue/cbar)*100 < 33){
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-3-col-3',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'O',
                [roundCount]: countXO,
            });        
        }   
    }
    else if (countXO % 2 != 0){
        if(gunPosit == 4 && (powerValue/cbar)*100 > 66 ){
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-1-col-1',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countXO,
            });
        }
        else if(gunPosit == 4 && (powerValue/cbar)*100 < 66 && (powerValue/cbar)*100 >= 33){
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-2-col-1',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countXO,
            });
        }
        else if(gunPosit == 4 && (powerValue/cbar)*100 >= 0  && (powerValue/cbar)*100 < 33){
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-3-col-1',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countXO,
            });        
        }

        else if(gunPosit == 18 && (powerValue/cbar)*100 > 66 ){
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-1-col-2',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countXO,
            });        
        }
        else if(gunPosit == 18 && (powerValue/cbar)*100 < 66 && (powerValue/cbar)*100 >= 33){
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-2-col-2',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countXO,
            });        
        }
        else if(gunPosit == 18 && (powerValue/cbar)*100 >= 0  && (powerValue/cbar)*100 < 33){
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-3-col-2',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countXO,
            });        
        }

        else if(gunPosit == 30 && (powerValue/cbar)*100 > 66 ){
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-1-col-3',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countXO,
            });        
        }
        else if(gunPosit == 30 && (powerValue/cbar)*100 < 66 && (powerValue/cbar)*100 >= 33){
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-2-col-3',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countXO,
            });        
        }
        else if(gunPosit == 30 && (powerValue/cbar)*100 >= 0  && (powerValue/cbar)*100 < 33){
            countXO += 1;
            let onBoard = `onBoard`
            let onBoard_img = `onBoard_img`;
            let onBoard_sym = `onBoard_sym`;
            let roundCount = `round`;
            ref.child('game-1').update({
                [onBoard]: 'row-3-col-3',
                [onBoard_img]: randomImg+'1',
                [onBoard_sym]: 'X',
                [roundCount]: countXO,
            });        
        }

    }
}

function release(event){
    mouseState = 1;
    setTimeout(NextGenerate,600);  
    const btnJoinID = event.currentTarget.getAttribute("id");
    const player = btnJoinID[btnJoinID.length - 1];
    let heightbar =  document.getElementById(`hold-${player}`);
    //console.log(timer)
    heightbar.classList.add("paused");
    clearInterval(timerInterval);
    timer = 0;
    setTimeout(putXO,200);  
    setTimeout(function(){
    heightbar.classList.remove("play-anim");
    heightbar.classList.remove("paused"); 
    }, 1000);
}

ref.on('value', snapshot => {
    getGameInfo(snapshot);
})
function getGameInfo(snapshot){
    const users = firebase.auth().currentUser;

    snapshot.forEach((data) => {
        const gameInfos = data.val();
        Object.keys(gameInfos).forEach(key => {
            switch (key) {
                case 'room-state':
                    state = gameInfos[key];
                    countXO = snapshot.child("game-1/round").val();
                    if (state == 0){
                        document.querySelector('#statusText').innerText = 'Waiting...';
                        document.querySelector(`#button-x`).disabled = true;
                        document.querySelector(`#button-o`).disabled = true;
                        document.getElementById('button-x').style.backgroundColor = 'grey';
                        document.getElementById('button-o').style.backgroundColor = 'grey';
                    }
                    if (state == 1){
                        document.querySelector('#statusText').innerText = 'Waiting...';
                        document.querySelector(`#button-x`).disabled = true;
                        document.querySelector(`#button-o`).disabled = true;
                        document.getElementById('button-x').style.backgroundColor = 'grey';
                        document.getElementById('button-o').style.backgroundColor = 'grey';
                    }
                    if (state == 2){
                        loadImg();
                        document.querySelector('#statusText').innerText = 'Ready!';
                        if(countXO == null){
                            document.querySelector('#statusText').innerText = 'Turn X';
                        }
                        if(countXO % 2 != 0){
                            document.querySelector('#statusText').innerText = 'Turn X';
                            document.querySelector(`#button-x`).disabled = false;
                            document.querySelector(`#button-o`).disabled = true;
                            document.getElementById('button-o').style.backgroundColor = 'grey';
                            document.getElementById('button-x').style.backgroundColor = '#c3001e';
                            document.getElementById('butStyle2').style.border = '0px solid white';
                            document.getElementById('butStyle1').style.border = '5px solid #c3001e';

                        }
                        else if(countXO % 2 == 0){
                            document.querySelector('#statusText').innerText = 'Turn O';
                            document.querySelector(`#button-o`).disabled = false;
                            document.querySelector(`#button-x`).disabled = true;
                            document.getElementById('button-x').style.backgroundColor = 'grey';
                            document.getElementById('button-o').style.backgroundColor = '#c3001e';
                            document.getElementById('butStyle1').style.border = '0px solid white';
                            document.getElementById('butStyle2').style.border = '5px solid #c3001e';

                        }
                        ref.once("value")
                            .then(function(snapshot) {
                            var onBoard = snapshot.child("game-1/onBoard").val();
                            const writeonBoard  = document.getElementById(onBoard);
                            var whatSym = writeonBoard.innerText;
                            var whatImg = writeonBoard.getElementsByTagName('img')[0];
                            var ImgSym = whatImg.src[whatImg.src.length - 6];
                            var onBoard_img = snapshot.child("game-1/onBoard_img").val();
                            var onBoard_sym = snapshot.child("game-1/onBoard_sym").val(); 
                            var ImgSym_onBoard = onBoard_img[onBoard_img.length - 2];
                            var checkBoard = snapshot.child(`game-1/checkBoard-${onBoard}`).val();
                            if(whatSym == ''){
                                writeonBoard.innerHTML = `<img id="${onBoard+'-'+onBoard_img}" class="align-self-center"  src="assets/${onBoard_img}.png" style="width:33%;;"><p style="font-size: 2vw;">${onBoard_sym}</p>`;
                                writeonBoard.classList.add('active');
                                console.log('writed');
                                checkWin();
                            }
                            else if( whatSym == 'X' &&  onBoard_sym == 'O' ){
                                if(ImgSym == 'h' && ImgSym_onBoard == "p" && checkBoard != 1){
                                    writeonBoard.innerHTML = `<img id="${onBoard+'-'+onBoard_img}" class="align-self-center"  src="assets/${onBoard_img}.png" style="width:33%;"><p style="font-size: 2vw;">${onBoard_sym}</p>`;
                                    writeonBoard.classList.add('active');
                                    document.querySelector(`#${onBoard}`).classList.add('gray-bg');
                                    console.log('win');
                                    let onBoardOverlap = `checkBoard-${onBoard}`;
                                    ref.child('game-1').update({
                                        [onBoardOverlap]: '1',
                                    });
                                    checkWin();
                                }
                                else if(ImgSym == 's' && ImgSym_onBoard == "h" && checkBoard != 1){
                                    writeonBoard.innerHTML = `<img id="${onBoard+'-'+onBoard_img}" class="align-self-center"  src="assets/${onBoard_img}.png" style="width:33%;"><p style="font-size: 2vw;">${onBoard_sym}</p>`;
                                    writeonBoard.classList.add('active');
                                    document.querySelector(`#${onBoard}`).classList.add('gray-bg');
                                    console.log('win');
                                    let onBoardOverlap = `checkBoard-${onBoard}`;
                                    ref.child('game-1').update({
                                        [onBoardOverlap]: '1',
                                    });
                                    checkWin();
                                }
                                else if(ImgSym == 'p' && ImgSym_onBoard == "s" && checkBoard != 1){
                                    writeonBoard.innerHTML = `<img id="${onBoard+'-'+onBoard_img}" class="align-self-center"  src="assets/${onBoard_img}.png" style="width:33%;"><p style="font-size: 2vw;">${onBoard_sym}</p>`;
                                    writeonBoard.classList.add('active');
                                    document.querySelector(`#${onBoard}`).classList.add('gray-bg');
                                    console.log('win');
                                    let onBoardOverlap = `checkBoard-${onBoard}`;
                                    ref.child('game-1').update({
                                        [onBoardOverlap]: '1',
                                    });
                                    checkWin();
                                }
                            }
                            else if( whatSym == 'O' &&  onBoard_sym == 'X' && checkBoard != 1){
                                if(ImgSym == 'h' && ImgSym_onBoard == "p"){
                                    writeonBoard.innerHTML = `<img id="${onBoard+'-'+onBoard_img}" class="align-self-center"  src="assets/${onBoard_img}.png" style="width:33%;"><p style="font-size: 2vw;">${onBoard_sym}</p>`;
                                    writeonBoard.classList.add('active');
                                    document.querySelector(`#${onBoard}`).classList.add('gray-bg');
                                    console.log('win');
                                    let onBoardOverlap = `checkBoard-${onBoard}`;
                                    ref.child('game-1').update({
                                        [onBoardOverlap]: '1',
                                    });
                                    checkWin();
                                }
                                else if(ImgSym == 's' && ImgSym_onBoard == "h" && checkBoard != 1){
                                    writeonBoard.innerHTML = `<img id="${onBoard+'-'+onBoard_img}" class="align-self-center"  src="assets/${onBoard_img}.png" style="width:33%;"><p style="font-size: 2vw;">${onBoard_sym}</p>`;
                                    writeonBoard.classList.add('active');
                                    document.querySelector(`#${onBoard}`).classList.add('gray-bg');
                                    console.log('win');
                                    let onBoardOverlap = `checkBoard-${onBoard}`;
                                    ref.child('game-1').update({
                                        [onBoardOverlap]: '1',
                                    });
                                    checkWin();
                                }
                                else if(ImgSym == 'p' && ImgSym_onBoard == "s" && checkBoard != 1){
                                    writeonBoard.innerHTML = `<img id="${onBoard+'-'+onBoard_img}" class="align-self-center"  src="assets/${onBoard_img}.png" style="width:33%;"><p style="font-size: 2vw;">${onBoard_sym}</p>`;
                                    writeonBoard.classList.add('active')
                                    document.querySelector(`#${onBoard}`).classList.add('gray-bg');
                                    console.log('win');
                                    let onBoardOverlap = `checkBoard-${onBoard}`;
                                    ref.child('game-1').update({
                                        [onBoardOverlap]: '1',
                                    });
                                    checkWin();
                                }
                            }

                            });
                    }
                    if (state == 3){
                        var winner = snapshot.child("game-1/WinnerIs").val();
                        document.querySelector('#statusText').innerText = winner;
                        document.querySelector('#whowin').innerText = winner;
                        document.querySelector(`#button-x`).disabled = true;
                        document.querySelector(`#button-o`).disabled = true;
                        document.getElementById('button-x').style.backgroundColor = 'grey';
                        document.getElementById('button-o').style.backgroundColor = 'grey';
                        document.getElementById('butStyle1').style.border = '0px solid white';
                        document.getElementById('butStyle2').style.border = '0px solid white';
                        console.log(winner);

                    }
                    if (state == 4){
                        alert("Play Again.");
                        let checkST = `room-state`;
                        ref.child('game-1').update({
                            [checkST]: 2,
                        });       
                        location.reload();                 
                    }
                    if (state == 5){
                        alert("A player has left the game");
                        location.href = 'index.html'
                    }
                case 'HowWin':
                    how = gameInfos[key];
                    if(how == 'a'){
                        document.querySelector('#row-1-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-1').classList.add('red-bg');
                        document.querySelector('#row-1-col-2').classList.add('red-bg');
                        document.querySelector('#row-1-col-3').classList.add('red-bg');
                        $(document).ready(function(){
                            $("#winModal").modal('show');
                        });
                    }
                    else if(how == 'b'){
                        document.querySelector('#row-2-col-1').classList.add('red-bg');
                        document.querySelector('#row-2-col-2').classList.add('red-bg');
                        document.querySelector('#row-2-col-3').classList.add('red-bg');
                        document.querySelector('#row-1-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-3').classList.remove('gray-bg');
                        $(document).ready(function(){
                            $("#winModal").modal('show');
                        });
                    }
                    else if(how == 'c'){
                        document.querySelector('#row-3-col-1').classList.add('red-bg');
                        document.querySelector('#row-3-col-2').classList.add('red-bg');
                        document.querySelector('#row-3-col-3').classList.add('red-bg');
                        document.querySelector('#row-1-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-3').classList.remove('gray-bg');
                        $(document).ready(function(){
                            $("#winModal").modal('show');
                        });
                    }
                    else if(how == 'd'){
                        document.querySelector('#row-1-col-1').classList.add('red-bg');
                        document.querySelector('#row-2-col-1').classList.add('red-bg');
                        document.querySelector('#row-3-col-1').classList.add('red-bg');
                        document.querySelector('#row-1-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-3').classList.remove('gray-bg');
                        $(document).ready(function(){
                            $("#winModal").modal('show');
                        });
                    }
                    else if(how == 'e'){
                        document.querySelector('#row-1-col-2').classList.add('red-bg');
                        document.querySelector('#row-2-col-2').classList.add('red-bg');
                        document.querySelector('#row-3-col-2').classList.add('red-bg');
                        document.querySelector('#row-1-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-3').classList.remove('gray-bg');
                        $(document).ready(function(){
                            $("#winModal").modal('show');
                        });
                    }
                    else if(how == 'f'){
                        document.querySelector('#row-1-col-3').classList.add('red-bg');
                        document.querySelector('#row-2-col-3').classList.add('red-bg');
                        document.querySelector('#row-3-col-3').classList.add('red-bg');
                        document.querySelector('#row-1-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-3').classList.remove('gray-bg');
                        $(document).ready(function(){
                            $("#winModal").modal('show');
                        });
                    }
                    else if(how == 'g'){
                        document.querySelector('#row-1-col-2').classList.add('red-bg');
                        document.querySelector('#row-2-col-2').classList.add('red-bg');
                        document.querySelector('#row-3-col-2').classList.add('red-bg');
                        document.querySelector('#row-1-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-3').classList.remove('gray-bg');
                        $(document).ready(function(){
                            $("#winModal").modal('show');
                        });
                    }
                    else if(how == 'h'){
                        document.querySelector('#row-1-col-1').classList.add('red-bg');
                        document.querySelector('#row-2-col-2').classList.add('red-bg');
                        document.querySelector('#row-3-col-3').classList.add('red-bg');
                        document.querySelector('#row-1-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-3').classList.remove('gray-bg');
                        $(document).ready(function(){
                            $("#winModal").modal('show');
                        });
                    }
                    else if(how == 'i'){
                        document.querySelector('#row-1-col-3').classList.add('red-bg');
                        document.querySelector('#row-2-col-2').classList.add('red-bg');
                        document.querySelector('#row-3-col-1').classList.add('red-bg');
                        document.querySelector('#row-1-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-3').classList.remove('gray-bg');
                        $(document).ready(function(){
                            $("#winModal").modal('show');
                        });
                        
                    }
                    else if(how == 'j'){
                        document.querySelector('#row-1-col-1').classList.add('gray-bg');
                        document.querySelector('#row-1-col-2').classList.add('gray-bg');
                        document.querySelector('#row-1-col-3').classList.add('gray-bg');
                        document.querySelector('#row-2-col-1').classList.add('gray-bg');
                        document.querySelector('#row-2-col-2').classList.add('gray-bg');
                        document.querySelector('#row-2-col-3').classList.add('gray-bg');
                        document.querySelector('#row-3-col-1').classList.add('gray-bg');
                        document.querySelector('#row-3-col-2').classList.add('gray-bg');
                        document.querySelector('#row-3-col-3').classList.add('gray-bg');
                        document.querySelector('#row-1-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-3').classList.remove('gray-bg');
                        $(document).ready(function(){
                            $("#winModal").modal('show');
                        });
                    }
                    else if(how == ''){
                        document.querySelector('#row-1-col-1').classList.remove('red-bg');
                        document.querySelector('#row-1-col-2').classList.remove('red-bg');
                        document.querySelector('#row-1-col-3').classList.remove('red-bg');
                        document.querySelector('#row-2-col-1').classList.remove('red-bg');
                        document.querySelector('#row-2-col-2').classList.remove('red-bg');
                        document.querySelector('#row-2-col-3').classList.remove('red-bg');
                        document.querySelector('#row-3-col-1').classList.remove('red-bg');
                        document.querySelector('#row-3-col-2').classList.remove('red-bg');
                        document.querySelector('#row-3-col-3').classList.remove('red-bg');

                        document.querySelector('#row-1-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-1-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-2-col-3').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-1').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-2').classList.remove('gray-bg');
                        document.querySelector('#row-3-col-3').classList.remove('gray-bg');
                    }
                    break;
            }
        });
    });
}

var no = 0;
var tbody = document.getElementById('tbody1')
function AddRankItem(name,imgProfile,sumPlay,winRate,point){
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');

    let sumRate = parseInt((winRate/sumPlay)*100)
    console.log(sumRate,winRate,sumPlay)
    if(winRate == undefined || winRate == null){
        sumRate = 0;
    }
    console.log(sumRate,winRate,sumPlay)

    td1.innerHTML = ++no;
    td2.innerHTML = `<img src='${imgProfile}' style='width:3vw;border-radius:50px;'/>`;
    td3.innerHTML = name;
    td4.innerHTML = sumPlay;
    td5.innerHTML = sumRate + ' %';
    td6.innerHTML = point;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);


    tbody.appendChild(tr);
    
    
}


function GetAllData(){
    ref.child('leaderboard').orderByChild(`reverseScore`).on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var name = childSnapshot.val().LeaderName;
            var point = (childSnapshot.val().SumScore);
            var winRate = childSnapshot.val().countWin;
            var sumPlay = childSnapshot.val().countPlay;
            var imgProfile = childSnapshot.val().imgProfile;
            AddRankItem(name,imgProfile,sumPlay,winRate,point);
            console.log('Name In!',name,point)
        })
    })
}

window.onload = GetAllData;


var whoWin;
var howWin = '';
function checkWin(){
    var GridRow1 = [];
    var GridRow2 = [];
    var GridRow3 = [];
    for (var i = 1 ; i < 4 ; i++){
            GridRow1[i] = document.querySelector('#row-1-col-'+i).innerText;
            GridRow2[i] = document.querySelector('#row-2-col-'+i).innerText;
            GridRow3[i] = document.querySelector('#row-3-col-'+i).innerText;

        }
    // row check
    if(GridRow1[1] != '' & GridRow1[2] != '' & GridRow1[3] != ''){
        if (GridRow1[1] == 'X' & GridRow1[2] == 'X' & GridRow1[3] == 'X'){
            whoWin = 'Winner: X';
            howWin = 'a';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX += 100;
                RTScoreO -= 30;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinX +=1 ;
                if(RTcountWinO == undefined){
                    RTcountWinO = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
            
        }
        else if (GridRow1[1] == 'O' & GridRow1[2] == 'O' & GridRow1[3] == 'O'){
            whoWin = 'Winner: O';
            howWin = 'a';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX -= 30;
                RTScoreO += 100;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinO +=1 ;
                if(RTcountWinX === undefined){
                    RTcountWinX = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
        }
    }
    if(GridRow2[1] != '' & GridRow2[2] != '' & GridRow2[3] != ''){
        if (GridRow2[1] == 'X' & GridRow2[2] == 'X' & GridRow2[3] == 'X'){
            whoWin = 'Winner: X';
            howWin = 'b';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX += 100;
                RTScoreO -= 30;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinX +=1 ;
                if(RTcountWinO === undefined){
                    RTcountWinO = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
        }
        else if (GridRow2[1] == 'O' & GridRow2[2] == 'O' & GridRow2[3] == 'O'){
            whoWin = 'Winner: O';
            howWin = 'b';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX -= 30;
                RTScoreO += 100;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinO +=1 ;
                if(RTcountWinX === undefined){
                    RTcountWinX = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
        }        
    }
    if(GridRow3[1] != '' & GridRow3[2] != '' & GridRow3[3] != ''){
        if (GridRow3[1] == 'X' & GridRow3[2] == 'X' & GridRow3[3] == 'X'){
            whoWin = 'Winner: X';
            howWin = 'c';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX += 100;
                RTScoreO -= 30;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinX +=1 ;
                if(RTcountWinO === undefined){
                    RTcountWinO = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
        }
        else if (GridRow3[1] == 'O' & GridRow3[2] == 'O' & GridRow3[3] == 'O'){
            whoWin = 'Winner: O';
            howWin = 'c';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX -= 30;
                RTScoreO += 100;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinO +=1 ;
                if(RTcountWinX === undefined){
                    RTcountWinX = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
        }        
    }
    //col check
    if(GridRow1[1] != '' & GridRow2[1] != '' & GridRow3[1] != ''){
        if (GridRow1[1] == 'X' & GridRow2[1] == 'X' & GridRow3[1] == 'X'){
            whoWin = 'Winner: X';
            howWin = 'd';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX += 100;
                RTScoreO -= 30;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinX +=1 ;
                if(RTcountWinO === undefined){
                    RTcountWinO = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
        }
        else if (GridRow1[1] == 'O' & GridRow2[1] == 'O' & GridRow3[1] == 'O'){
            whoWin = 'Winner: O';
            howWin = 'd';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX -= 30;
                RTScoreO += 100;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinO +=1 ;
                if(RTcountWinX === undefined){
                    RTcountWinX = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
        }        
    }
    if(GridRow1[2] != '' & GridRow2[2] != '' & GridRow3[2] != ''){
        if (GridRow1[2] == 'X' & GridRow2[2] == 'X' & GridRow3[2] == 'X'){
            whoWin = 'Winner: X';
            howWin = 'e';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX += 100;
                RTScoreO -= 30;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinX +=1 ;
                if(RTcountWinO === undefined){
                    RTcountWinO = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
        }
        else if (GridRow1[2] == 'O' & GridRow2[2] == 'O' & GridRow3[2] == 'O'){
            whoWin = 'Winner: O';
            howWin = 'e';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX -= 30;
                RTScoreO += 100;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinO +=1 ;
                if(RTcountWinX === undefined){
                    RTcountWinX = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
        }        
    }
    if(GridRow1[3] != '' & GridRow2[3] != '' & GridRow3[3] != ''){
        if (GridRow1[3] == 'X' & GridRow2[3] == 'X' & GridRow3[3] == 'X'){
            whoWin = 'Winner: X';
            howWin = 'f';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX += 100;
                RTScoreO -= 30;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinX +=1 ;
                if(RTcountWinO === undefined){
                    RTcountWinO = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
        }
        else if (GridRow1[3] == 'O' & GridRow2[3] == 'O' & GridRow3[3] == 'O'){
            whoWin = 'Winner: O';
            howWin = 'f';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX -= 30;
                RTScoreO += 100;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinO +=1 ;
                if(RTcountWinX === undefined){
                    RTcountWinX = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
        }        
    }
    if(GridRow1[2] != '' & GridRow2[2] != '' & GridRow3[2] != ''){
        if (GridRow1[2] == 'X' & GridRow2[2] == 'X' & GridRow3[2] == 'X'){
            whoWin = 'Winner: X';
            howWin = 'g';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX += 100;
                RTScoreO -= 30;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinX +=1 ;
                if(RTcountWinO === undefined){
                    RTcountWinO = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
        }
        else if (GridRow1[2] == 'O' & GridRow2[2] == 'O' & GridRow3[2] == 'O'){
            whoWin = 'Winner: O';
            howWin = 'g';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX -= 30;
                RTScoreO += 100;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinO +=1 ;
                if(RTcountWinX === undefined){
                    RTcountWinX = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
        }        
    }
    if(GridRow1[1] != '' & GridRow2[2] != '' & GridRow3[3] != ''){
        if (GridRow1[1] == 'X' & GridRow2[2] == 'X' & GridRow3[3] == 'X'){
            whoWin = 'Winner: X';
            howWin = 'h';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX += 100;
                RTScoreO -= 30;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinX +=1 ;
                if(RTcountWinO === undefined){
                    RTcountWinO = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
        }
        else if (GridRow1[1] == 'O' & GridRow2[2] == 'O' & GridRow3[3] == 'O'){
            whoWin = 'Winner: O';
            howWin = 'h';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX -= 30;
                RTScoreO += 100;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinO +=1 ;
                if(RTcountWinX === undefined){
                    RTcountWinX = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
        }        
    }
    if(GridRow1[3] != '' & GridRow2[2] != '' & GridRow3[1] != ''){
        if (GridRow1[3] == 'X' & GridRow2[2] == 'X' & GridRow3[1] == 'X'){
            whoWin = 'Winner: X';
            howWin = 'i';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX += 100;
                RTScoreO -= 30;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinX +=1 ;
                if(RTcountWinO === undefined){
                    RTcountWinO = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
        }
        else if (GridRow1[3] == 'O' & GridRow2[2] == 'O' & GridRow3[1] == 'O'){
            whoWin = 'Winner: O';
            howWin = 'i';
            let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX -= 30;
                RTScoreO += 100;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                RTcountWinO +=1 ;
                if(RTcountWinX === undefined){
                    RTcountWinX = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });
        }        
    }
    if (GridRow1[1] != '' && GridRow1[2] != '' && GridRow1[3] != '' && GridRow2[1] != '' && GridRow2[2] != '' && GridRow2[3] != '' && GridRow3[1] != '' && GridRow3[2] != '' && GridRow3[3] != ''){
        whoWin = 'Draw';
        howWin = 'j';
        let checkST = `room-state`;
            let who_Win = `WinnerIs`;
            let how_win = `HowWin`;
            ref.once("value")
            .then(function(snapshot) {
                var userx = snapshot.child("game-1/user-x-name").val();
                var usero = snapshot.child("game-1/user-o-name").val();
                var userxid = snapshot.child("game-1/user-x-id").val();
                var useroid = snapshot.child("game-1/user-o-id").val();
                let SumScore = `SumScore`;
                let countPlay = `countPlay`;
                let countWin = `countWin`
                var RTScoreX = snapshot.child(`leaderboard/LeaderName-${userxid}/SumScore`).val();
                var RTScoreO = snapshot.child(`leaderboard/LeaderName-${useroid}/SumScore`).val();
                var RTcountPlayX = snapshot.child(`leaderboard/LeaderName-${userxid}/countPlay`).val();
                var RTcountPlayO = snapshot.child(`leaderboard/LeaderName-${useroid}/countPlay`).val();
                var RTcountWinX = snapshot.child(`leaderboard/LeaderName-${userxid}/countWin`).val();
                var RTcountWinO = snapshot.child(`leaderboard/LeaderName-${useroid}/countWin`).val();
                let LeaderNameX = `LeaderName-${userxid}`;
                let LeaderNameO = `LeaderName-${useroid}`;
                let LeaderName = `LeaderName`;
                let reverseScore = `reverseScore`;

                let imgProfile = `imgProfile`;
                var imgX = snapshot.child("game-1/user-x-img").val();
                var imgO = snapshot.child("game-1/user-o-img").val();
                RTScoreX += 30;
                RTScoreO += 30;
                RTcountPlayX += 1;
                RTcountPlayO += 1;
                if(RTcountWinX === undefined){
                    RTcountWinX = 0;
                }
                if(RTcountWinO === undefined){
                    RTcountWinO = 0;
                }
                console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                    ref.child('game-1').update({
                        [checkST]: 3,
                        [who_Win]:whoWin,
                        [how_win]: howWin,
                    });
                    ref.child(`leaderboard/${LeaderNameX}`).update({
                        [LeaderName]: userx,
                        [SumScore]: RTScoreX,
                        [countPlay]: RTcountPlayX,
                        [countWin]: RTcountWinX,
                        [imgProfile]:imgX,
                        [reverseScore]:RTScoreX * -1,
                    });
                    ref.child(`leaderboard/${LeaderNameO}`).update({
                        [LeaderName]: usero,
                        [SumScore]: RTScoreO,
                        [countPlay]: RTcountPlayO,
                        [countWin]: RTcountWinO,
                        [imgProfile]:imgO,
                        [reverseScore]:RTScoreO * -1,
                    });
                    console.log(RTScoreX,RTScoreO,RTcountPlayX,RTcountPlayO,RTcountWinX);
                });

    }
    console.log('Check',GridRow1[1],GridRow1[2],GridRow1[3],howWin)

}

const playAgian = document.querySelector('#AgainBtn') 
playAgian.addEventListener('click' , rematch)

function rematch(){
    round = 1;
    ref.child('game-1/WinnerIs').remove();
    ref.child('game-1/OnBoard_img').remove();
    ref.child('game-1/onBoard_sym').remove();
    let onBoard = `onBoard`;
    let HowWin = `HowWin`;
    let checkST = `room-state`;
    let roundCount = `round`;
    ref.child('game-1').update({
        [onBoard]:'',
        [HowWin]: '',
        [checkST]: 4,
        [roundCount]:round,
    });
    console.log('Rematch')
}


const exittt = document.querySelector('#ExitBtn') 
exittt.addEventListener('click' , exits)

function exits(){
    let checkST = `room-state`;
    ref.child('game-1').update({
        [checkST]: 5,
    });
    ref.child('game-1').remove();
    location.href = 'index.html';
}
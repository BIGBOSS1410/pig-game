'use strict';

// เลือก elements
const score0El = document.querySelector('#score--0')
const score1El = document.querySelector('#score--1')
const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold= document.querySelector('.btn--hold')
const current0El = document.querySelector('#current--0')
const current1El = document.querySelector('#current--1')
const player0EL = document.querySelector('.player--0')
const player1EL = document.querySelector('.player--1')

// สร้าง array เก็บคะแนนทั้งสองฝ่าย
let scores = [0, 0]

// ตั้งให้แสดงผลคะแนนเริ่มต้นเป็น 0 และซ่อนลูกเต๋า
score0El.textContent = 0
score1El.textContent = 0
diceEl.classList.add('hidden')

//กำหนดคะแนนปัจจุบันให้เป็น 0
let currentScore = 0
let activePlayer = 0

// กำหนดสถานะการเล่นเพื่อดักจับเมื่อคะแนนถึงเป้าหมายของเกมจะเปลี่ยนเป็น false และจะไม่สามารถดำเนินกดปุ่มต่างๆได้
let playing = true;

const switchPlayer = () =>{
    currentScore = 0 // ปรับคะแนนปัจจุบันให้เป็น 0 
    document.getElementById(`current--${activePlayer}`).textContent = 0; // ปรับการแสดงผลคะแนนปัจจุบันให้เป็น 0
    activePlayer = activePlayer === 0 ? 1 : 0 ;     // ถ้าสถานะ activePlayer มีค่าเป็น 0 ถ้าจริงให้ปรับเป็น 1 ถ้าไม่จริงให้เป็น 0
    // ให้พื้นหลังของ player 0 และ 1 สลับค่า
    player0EL.classList.toggle('player--active')
    player1EL.classList.toggle('player--active')
}


btnRoll.addEventListener('click', function(){
    // เช็คสถานะว่า playing เป็น true หรือไม่
    if(playing){

   // 1. สร้างตัวสุ่มเลข 1-6 
   let dice = Math.trunc((Math.random() * 6) + 1)

   // 2. สั่งให้แสดงลูกเต๋า
    diceEl.classList.remove('hidden')
    diceEl.src = `dice-${dice}.png`

   // 3. เช็คเมื่อผู้เล่นทอยได้ 1
    if(dice !==1){
       // ให้นำคะแนนปัจจุบันบวกกับคะแนนตามที่ทอยลูกเต๋าได้
        currentScore = currentScore + dice
        //ให้คะแนนล่าสุดใส่ไปที่หน้าแสดงผลคะแนนล่าสุด
        document.getElementById(`current--${activePlayer}`).textContent = currentScore
        console.log(currentScore)

    // 4. ถ้าทอยแล้วได้ 1
    }else{ 
        switchPlayer()
    }
    }



})

// ปุ่ม Hold
btnHold.addEventListener('click',function(){
    if(playing){
            // ให้คะแนนรวมทั้งหมด คือ คะแนนรวมทั้งหมด + ด้วยคะแนนปัจจุบัน
    scores[activePlayer] = scores[activePlayer] + currentScore
    // นำคะแนนรวมทั้งหมดมาโชว์ผล
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer]
    // สลับผู้เล่น

    if(scores[activePlayer] >= 100){
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        diceEl.classList.add('hidden')
    }else{
        switchPlayer()
    }
    }
})

// ปุ่มเริ่มเกมใหม่

btnNew.addEventListener('click',function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
  
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
  
    diceEl.classList.add('hidden');
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');
    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
})



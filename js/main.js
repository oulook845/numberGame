// 랜덤 숫자 고르기
function randomNumber() {
  let randomNum = Math.floor(Math.random() * 100) + 1; // 1 ~ 100 구하기
  return randomNum;
}
let answer = randomNumber(); // 정답 숫자 저장
console.log(answer);

// dom 요소 선택 ###########################
const wrapElem = document.getElementById("wrap");
//인트로 영역
const introElem = document.getElementById("intro"),
  startBtn = document.getElementById("startBtn");
// 게임 영역
const gameWrapElem = document.getElementById("gameWrap"),
  wrongAnswerElem = document.getElementById("wrongAnswer"),
  wrongAnswer_list = wrongAnswerElem.querySelectorAll("li"),
  totalCount = wrongAnswerElem.querySelectorAll("li").length - 1,
  usersNumber = document.getElementById("usersNumber"),
  submitBtnElem = document.getElementById("submit"),
  minNumElem = gameWrapElem.querySelector(".minNum"),
  maxNumElem = gameWrapElem.querySelector(".maxNum"),
  gameBottomElem = gameWrapElem.querySelector(".bottom"),
  ueserLifeElem = gameBottomElem.querySelector(".life"),
  ueserLife_list = ueserLifeElem.querySelectorAll("li");

// 팝업 상태창
const popupAreaElem = document.getElementById("popupArea"),
  popupElem = popupAreaElem.querySelectorAll(".popup"),
  popupBtnElem = popupAreaElem.querySelectorAll(".checkBtn");
// ########################### dom 요소 선택

// 버튼 누르면 게임 시작
startBtn.addEventListener("click", function () {
  wrapElem.style.transform = "translateY(-50%)";
});

// 정답체크 컴포넌트
let chance = 0;
let maxNum = 100;
let minNum = 0;

function checkAnswer() {
  let usersValue = Number(usersNumber.value); // 입력된 숫자 가져옴
  if (usersValue !== "") {
    // 빈칸이 아닐때만 정답확인
    if (usersValue === answer) {
      // 정답일 경우
      wrongAnswer(usersValue);
      popupAreaElem.style.display = "block";
      popupAreaElem.querySelector(".correctAns").style.display = "block";
      popupAreaElem.querySelector(".correctAns .number").textContent = answer;
    } else if (usersValue > answer) {
      // 정답보다 클 경우
      wrongAnswer(usersValue); // 오답 표시
      chanceCount(); // 기회 소모
      if (usersValue < maxNum) {
        maxNum = usersValue;
        maxNumElem.querySelector("span").textContent = usersValue;
      }
    } else if (usersValue < answer) {
      // 정답보다 작을 경우
      wrongAnswer(usersValue);
      chanceCount();
      if (usersValue > minNum) {
        minNum = usersValue;
        minNumElem.querySelector("span").textContent = usersValue;
      }
    }
  }
  usersNumber.value = ""; // 입력칸 초기화
}

// 남은 기회 카운트 (5회까지)
function chanceCount() {
  if (chance >= 0 && chance < totalCount) {
    chance++;
    gameBottomElem.style.backgroundPosition = `-${chance * 200}px 0`;
  } else if (chance >= totalCount) {
    popupAreaElem.style.display = "block";
    popupAreaElem.querySelector(".errAns").style.display = "block";
    popupAreaElem.querySelector(".errAns .number").textContent = answer;
  }
}

// 이전 오답 표시
function wrongAnswer(usersValue) {
  let spanElem = document.createElement("span");
  spanElem.textContent = usersValue;
  wrongAnswer_list[chance].appendChild(spanElem);
  if (usersValue === answer) {
    wrongAnswer_list[chance].classList.add("able");
  } else {
    wrongAnswer_list[chance].classList.add("unable");
    ueserLife_list[chance].classList.add("unable");
  }
}

// 게임 리셋
function gameReset() {
  chance = 0; // 기회 초기화
  answer = randomNumber(); // 숫자 리셋
  console.log(answer);
  wrongAnswer_list.forEach((list) => {
    list.innerHTML = ""; // 모든 자식 삭제
    list.removeAttribute("class"); // class 모두 삭제
  });
  ueserLife_list.forEach((list) => {
    list.classList.remove("unable");; // class 모두 삭제
  });
  minNumElem.querySelector("span").textContent = 0;
  maxNumElem.querySelector("span").textContent = 100;
  gameBottomElem.style.backgroundPosition = `0 0`; // 배경 이미지 초기화
}

// 확인 버튼 누르면 정답 확인
submitBtnElem.addEventListener("click", function () {
  checkAnswer();
});

// 팝업 상태창 확인 클릭시 팝업 닫기
popupBtnElem.forEach((btnElem) => {
  btnElem.addEventListener("click", function () {
    popupAreaElem.style.display = "none";
    popupElem.forEach((elem) => {
      elem.style.display = "none";
    });
  });
});

// enter 누르면 정답 확인
window.addEventListener("keydown", function (e) {
  if (e.code === "Enter" || e.location === 3) {
    // 일반 엔터: e.location === 0 또는 1
    // 숫자패드 엔터: e.location === 3
    checkAnswer();
  }
});

// 리셋 버튼 누르면 게임 재시작
// resetBtn.addEventListener("click", function () {
//   game_restart();
//   button_switch(false);
// });
// function game_restart() {
//   answer = randomNumber(); // 새로운 정답 숫자 저장
//   commentElem.textContent = "숫자를 입력하세요"; // 코멘트 초기화
//   wrongNumber.innerHTML = ""; // 틀린 숫자 초기화
//   console.log(answer);
// }

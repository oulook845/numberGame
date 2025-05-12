// a href="#" 클릭 막기
const aHref = document.querySelectorAll("a[href='#']");
aHref.forEach((aElem) => {
  aElem.addEventListener("click", function (e) {
    e.preventDefault();
  });
});

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
  wrapElem.style.transform = "translateY(-100vh)";
});

// 정답체크 컴포넌트
let chance = 0;
let maxNum = 100;
let minNum = 0;
let answerArray = [];

function checkAnswer() {
  let usersValue = usersNumber.value.trim();

  // 1~100 숫자가 아니라면 반환
  if (usersValue !== "" && usersValue <= 100 && usersValue >= 0) {
    usersValue = Number(usersValue); // 입력된 숫자 가져옴
  } else {
    // alert("정확한 숫자를 입력해주세요");
    usersNumber.value = ""; // 입력칸 초기화
    popupAreaElem.style.display = "block";
    popupAreaElem.querySelector(".outlierAns").style.display = "block";
    popupAreaElem.querySelector(".outlierAns p").textContent = `${minNum} ~ ${maxNum} 중 정답이 있어요`;
    popupAreaElem.querySelector(".outlierAns button").focus();
    return;
  }

  // 빈칸이 아닐때만 정답확인
  // 입력한 답이 중복됐는지 확인
  if (!answerArray.includes(usersValue)) {
    // 입력한 답이 정답인지 확인
    if (usersValue === answer) {
      // 정답일 경우
      wrongAnswer(usersValue);
      popupAreaElem.style.display = "block";
      popupAreaElem.querySelector(".correctAns").style.display = "block";
      popupAreaElem.querySelector(".correctAns .number").textContent = answer;
      popupAreaElem.querySelector(".correctAns button").focus();
    } else if (usersValue > answer) {
      // 정답보다 클 경우
      if (usersValue < maxNum) {
        wrongAnswer(usersValue); // 오답 카운트
        chanceCount(); // 기회 소모
        maxNum = usersValue;
        maxNumElem.querySelector("span").textContent = usersValue;
      } else if (usersValue > maxNum) {
        // 최대값 보다 큰 값을 입력했을 경우
        popupAreaElem.style.display = "block";
        popupAreaElem.querySelector(".outlierAns").style.display = "block";
        popupAreaElem.querySelector(".outlierAns p").textContent = `${minNum} ~ ${maxNum} 중 정답이 있어요`;
        popupAreaElem.querySelector(".outlierAns button").focus();
      }
    } else if (usersValue < answer) {
      // 정답보다 작을 경우
      if (usersValue > minNum) {
        wrongAnswer(usersValue); // 오답 카운트
        chanceCount(); // 기회 소모
        minNum = usersValue;
        minNumElem.querySelector("span").textContent = usersValue;
      } else if (usersValue < minNum) {
        // 최소값 보다 작은 값을 입력했을 경우
        popupAreaElem.style.display = "block";
        popupAreaElem.querySelector(".outlierAns").style.display = "block";
        popupAreaElem.querySelector(".outlierAns p").textContent = `${minNum} ~ ${maxNum} 중 정답이 있어요!`;
        popupAreaElem.querySelector(".outlierAns button").focus();
      }
    }
  } else {
    // 입력한 답이 중복된 숫자라면
    popupAreaElem.style.display = "block";
    popupAreaElem.querySelector(".duplicAns").style.display = "block";
    popupAreaElem.querySelector(".duplicAns .number").textContent = usersValue;
    popupAreaElem.querySelector(".duplicAns button").focus();
  }

  answerArray.push(usersValue); // 배열에 입력한 숫자 추가
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
    popupAreaElem.querySelector(".errAns button").focus();
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
  minNum = 0;
  maxNum = 100;
  answer = randomNumber(); // 숫자 리셋
  console.log(answer);
  answerArray = [];
  wrongAnswer_list.forEach((list) => {
    list.innerHTML = ""; // 모든 자식 삭제
    list.removeAttribute("class"); // class 모두 삭제
  });
  ueserLife_list.forEach((list) => {
    list.classList.remove("unable"); // class 모두 삭제
  });
  minNumElem.querySelector("span").textContent = minNum;
  maxNumElem.querySelector("span").textContent = maxNum;
  gameBottomElem.style.backgroundPosition = `0 0`; // 배경 이미지 초기화
}

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
usersNumber.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.keyCode === 3) {
    e.preventDefault();
    submitBtnElem.click();
  }
});

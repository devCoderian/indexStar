//호버 상태에 따른 이미지 맵핑 검색
const starCnt = {
    empty:'../src/image/empty.png',
    half:'../src/image/half.png',
    full:'../src/image/full.png',
}
const allEl = document.querySelector(".main-content")
const starsEl = document.querySelector(".star");
const starEl = document.querySelectorAll(".star__img");
const starBtn = document.querySelector('.removeBtn');
let starCheck = false;

function stopStarCheck(){
    starCheck = true;
}
function moveStarCheck(){
    starCheck = false;
}

function isStarCheck(){
    return starCheck;   
}
isStarCheck();
console.log(isStarCheck());

starsEl.addEventListener('click', (e) =>{
    stopStarCheck();
});
starsEl.addEventListener('mouseout', (e) =>{
    !isStarCheck&& moveStarCheck();
})
allEl.addEventListener('mousemove', (e) =>{
    if(isStarCheck()){
        return;
    }
    const {target, offsetX} = e;
    const data = target.dataset.star;
    // console.log(offsetX);
    
    const starNum = data-1;
    //타겟 요소의 좌표와 크기에 대한 정보를 반환
    // console.log(target.getClientRects());
    const [starPos] =target.getClientRects();
    // console.log(starPos);
    const isStarPos = starPos.width / 2 >  offsetX;
    // console.log(starNum);
    // console.log(isStarPos);
    drawStar({starNum,isStarPos});
});

starBtn.addEventListener('click', (e)=>{
    moveStarCheck();
    remove();
});

function drawStar(payload={}){
    const {starNum = -1, isStarPos = false} = payload; //초기값 할당;
    console.log(starNum);
    console.log(isStarPos);
    starEl.forEach((el, i) =>{
        let result = i <starNum ? starCnt.full : starCnt.empty;

        if(i === starNum){
            result = isStarPos? starCnt.full : starCnt.half;
        }
        // console.log(starNum);
        // console.log(isStarPos);
        // console.log(el);
        // console.log(result);
        el.src = result
    });
}
function remove(){
    console.log('초기화')
    drawStar();
}

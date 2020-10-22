// ISO Date - 2020-10-20 21:04:10 이 ISO 날짜 표기법임
// 2020년 10월 20일 21시 04분 10초 로 만들고싶다면


const moment = require('moment'); //npm i moment로 설치하면 node_modules에 설치됨 / require로 불러오면 이제 쓸 수 있음
//moment 모듈은 날짜를 내가 원하는대로 만들수있음

const nowDateIso = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}
const nowDateKorean = () => {
    return moment().format('YYYY년 MM월 DD일 HH시 mm분 ss초');
}

// ES5 문법 - 리터럴객체는 변수와 값 쌍으로 저장
/* const obj = { //obj라는 객체에 
    moment: moment, //moment 변수에 moment객체를 담고
    nowDateIso: nowDateIso,
    nowDateKorean: nowDateKorean
} */
// ES6 문법
/* const obj = { //변수와 값이 같으면 이렇게 쓸 수 있다
    moment,
    nowDateIso,
    nowDateKorean
} */
//module.exports = obj; //나를 호출하는 애한테 obj를 추출해서 주겠다 는 뜻

//es6에서는 함수를 만들고 바로 이런 식으로 한줄로 호출한다고 함 => 모듈화!
module.exports = { moment, nowDateIso, nowDateKorean } //나를 호출하는 애한테 이 객체들을 주겠다는 뜻. 어떤 JS에서든 이 함수를 require()로 불러올 수 있다
  


//var nowDate = moment().format('YYYY-MM-DD HH:mm:ss');
//var nowDate2 = moment().format('YYYY년 MM월 DD일 HH시 mm분 ss초');
//console.log( nowDate );
//console.log( nowDate2 );

//console.log( new Date() ); 
//node ./modules/sample 로 실행해보면 2020-10-20T12:05:43.997Z (로컬라이제이션 안된 표기) 라고 cmd창에 뜸

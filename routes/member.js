const express = require('express');
const router = express.Router(); //express모듈이 가진 router 객체

router.get('/join', (req, res, next) => {
    res.send('<h1>회원 가입</h1>');
});

router.get(['/', '/login'], (req, res, next) => { //첫번째 인자에 문자열은 물론 배열이나 정규표현식이 들어갈 수도 있다 / 배열은 그 안에 들어간 것들을 다 받아주는 것
    res.send('<h1>회원 로그인</h1>');
});

module.exports = router;  //라우터를 만드는 기본 문법 
const path = require('path'); //node가 가진 내장 모듈 불러오기
const express = require('express'); //express 모듈 불러오기 / 경로안붙으면 node_modules폴더에서 불러옴

//내가 만든 modules 폴더의 date.js 불러오기
//const dt = require('./modules/sample'); //modules에 있는 sample.js를 불러오기 / dt 안에 moment, nowDateIso, nowDateKorean 들이 들어간 것
//console.log(dt);
//console.log(dt.nowDateIso() );
//console.log(dt.nowDateKorean() );

//구조분해할당(비구조화할당) - 더 편함
const { moment, nowDateIso, nowDateKorean } = require('./modules/date');
//console.log( nowDateIso() );
//console.log( nowDateKorean() );
//console.log( moment );

const memberRouter = require('./routes/member'); //routes폴더 안의 member.js 불러오기

const notFound = path.join(__dirname, './public/404.html');

//서버 만들기
const app = express();
app.listen(3000, () => { console.log('http://127.0.0.1:3000'); }); //서버 구동 / node app하면 포트 열리고 서버 돎. 근데 구현해서 res한건 없으니까 cannot get이 뜸

//pug 사용하기
//app.set('view engine', 'ejs');
app.set('view engine', 'pug'); //use는 미들웨어고 set은 app 객체에서 쓰이는 변수를 등록하는 것 / view page를 해석하는 엔진을 퍼그로 쓸 것이다
app.set('views', './views'); //view들은 어느 폴더에 담겨있냐 / 퍼그파일들은 views 디렉토리 안에 있다 - 익스프레스한테 다 알려주는 것임
app.locals.pretty = true; //클라이언트에게 응답하는 코드들을 이쁘게 보내주겠다는 뜻..(웹에서 우클릭 > 소스코드해서 볼 때 예쁘게 정렬됨)


//얘들도 미들웨어라고 할 수 있음
app.use(express.json()); //post 방식으로 들어온 걸 json방식으로 바꿔주는 것 => express.json
app.use(express.urlencoded({extended: false})); //대칭구조로 만들어주는 것.


//미들웨어
app.use((req, res, next) => { //주소가 없으면 모든 게 여길 통과함 / 주소없이 use로 콜백함수를 넣으면 이게 미들웨어가 된다.(앱의 중간에서 항상 거쳐가게 만드는 것. 익스프레스는 모든 게 다 미들웨어라고 보면 된다)
	req.greeting = 'Hello'; //req에 변수 심음
	next(); //res가 있으면 next()쓸 필요없는듯? res있으면 next가 안먹음. 예외처리할 떄 next를 쓴다고 함. 막 쓰는 애가 아닌가보다. next가 위에있고 res가 있으먄 next밑으로 내려와소 res 실행되고 res밑에 next있으면 next는 실행안됨
});

//미들웨어
app.use('/', express.static(path.join(__dirname, './public'))); //절대경로로 폴더이름 합쳐주기 (/로 요청이 들어오면 public 폴더로 보내는 것 거기서 index.html찾음)

app.get('/sample', (req, res, next) => {
	//res.send(''); //'안의 내용을 내보내는 것
	//res.sendFile('절대경로');//절대경로 상의 파일을 내보내는 것
	//res.redirect('/member') //요청을 다시 member로 하라는 것
	res.render('./sample.pug', {title: "PUG 연습"}); //render()는 view 엔진을 사용해서 보여주겠다는 뜻임 / view폴더 안의 sample.pug를찾아서 걔를 render(표현)해주는 것
															//pug 연습이라는 내용을 title에 담음 > sample.pug 안에 title=title이라고 하면 문서 제목에 pug연습이 뜬다
															//정적인 페이지는 그냥 퍼블리셔가 만든 html파일을 넣기만 하면 된다 
		//pug는 두 번째 인자(객체), 세번째(콜백. 보통 생략) 넣을 수 있음
});

//동적인 페이지는 pug나 ejs로 만들게 된다
app.get('/book', (req, res, next) => {
	const pug = { books: [
		{id: 1, title: "별주부전", content:"거북이가 간을..."},
		{id: 2, title: "홍길동전", content:"아버지를 아버지라..."},
		{id: 3, title: "심청전", content:"아버지 심청이가..."},
	] };
	res.render('./book.pug', pug); //book이라는 퍼그를 클라이언트에게 보내줄 것임 그리고 pug 변수를 여기에 보냄. 그럼 pug가 이 변수를 받음. book.pug에서 perin문으로 books안의 내용을 돌려서 테이블에 넣음
});

app.use('/member', memberRouter); // /member로 요청이 들어오면 memberRouter(이건 member.js파일임)로 보내줘


//얘도 미들웨어라고할수있고
app.get('/time', (req, res, next) => { //이것만 하면 또 cannot get이 뜸. 왜냐. 서버를 껐다 켜야 하니까. 이런 불편함을 해결하기 위해 nodemon을 깐 거고, nodemon app 치면 이제 자동으로 서버 껐다 켜짐
	res.send(`<h1>${req.greeting} / ${nowDateIso()}</h1>`); 
	//next(); //express의 콜백 펑션의 세 번째 인자 => next 는 다음 번으로 넘길 때 쓴다. /time을 치고 들어가면 이 다음인 app.use(req, res)가 적용되는 것
})
//root로 들어오면 public으로 보내겠다는 거랑 hellow 보내주겠다는 거 두개가 있음. 지금은 get이 실행됨. index파일이 없기 때문에 app.use 다음인 app.get으로 간 것임
//public에 index.html을 만들었다면 app.use에 걸려서 요게 실행이 될 것임(브라우저 화면 상). 
//근데 res.send를 만나면 더 이상 밑으로 안 내려감(무슨 소스가 있든 안감. 응답하면 끝이니까(종결). 함수 안의 return이라고 보면 됨)
//자바스크립트는 인터프리트라서 위에서부터 해석해서 실행됨. app.use, app.get(get으로만 받음), app.post(post로만 받음) 세개가 있음


app.use((req, res) => { //선택자 없이 함수만 있는 상태임 => 위에서 걸린 게 없다면 내가 구현한 것이 없다는 뜻. 무조건 이리로 들어옴. 그래서 맨 밑에 써준 것. 주소에 / 뒤에 무슨 주소를 보내든 없는 주소를 보내면 404.html 페이지가 뜬다
	//res.redirect('/404.html'); //다시 리턴시켜주라는 것 404.html을. redirect는 다시 요청이 들어가는 것. 서버는 redirect로 응답을 한 거고 클라이언트는 /404.html로 다시 요청하게되고
															 //그러면 app.use에서 public안에 404.html이 있으므로 여기서 걸려서 응답을 해주게 된다. (2번 왕복한 셈)
	res.sendFile(notFound); //이건 파일을 보내주는 것 (1번만 왕복한다) 잘 안쓰는 명령이라고 하긴 함. 파일을 보내주는 거라 경로 필요함-절대 경로로 표현해야함(path.join~~)
}); //app.use는 get이든 post든 다 받아주는 것임

const express = require('express');  
//const cors = require('cors');                // 🚀 ##별도로 했음 CORS에러(같은 도메인명을 써서를 방지하기 위해 추가 
const bodyParser = require('body-parser');   //body-parser는 클라이언트에서 req.body에 실어 보낸 JSON 등의 데이터를 Express에서 해석하고 사용할 수 있도록 변환해 주는 미들웨어이다.
const cookieParser = require('cookie-parser');  // ***🚀 쿠키를 사용하기 위해 추가
const jwt=require('jsonwebtoken');  // ***🚀 JWT를 사용하기 위해 추가

const app = express();
const port = 3000;

//app.use(cors());  // ##별도로 했음 ✅ CORS 설정 추가
app.use(bodyParser.json());    //json데이터를 사용할 수 있도록 함
app.use(cookieParser());  // ***🚀 쿠키를 사용하기 위해 추가
//app.use(jwt());  // ***🚀 JWT를 사용하기 위해 추가

const members=[
  { 
    id:1,
    name:'마종호',
    loginId:"erlia",
    loginPassword:'5291',
  }, 
  { 
    id:2,
    name:'마준형',
    loginId:"coco",
    loginPassword:'coco',
  },
]

app.get('/api/account', (req, res) => {
  if(req.cookies && req.cookies.token){  //쿠키사용시:req.cookies.account 쿠키에 데이터가 있는지 확인
    jwt.verify(req.cookies.token, "abc1234567", (err, decoded)=>{  //verify메서드를 사용하여 토큰을 해독, 1인자(토큰), 2인자(암호화된 키), 3인자(콜백함수)
        if(err){
          res.send('로그인을 하세요');
        }
        res.send(decoded);   //에러가 없으면 해독된 데이터를 클라이언트에 보냄
      })
    }
     //*** 쿠키사용시 
    // const member = JSON.parse(req.cookies.account); //쿠키에 저장된 데이터를 가져올 때는 JSON.parse()메서드를 사용하여 객체로 변환, 
    // 
    //  if(member.id){
    //   return res.send(member);
    //  }
    else{   //
      res.send('로그인을 하세요');  //최초 접속을 할 때 보내는 기본 메세지
   }
  })

app.post('/api/account', (req, res) => {
  const loginId=req.body.loginId;   //클라이언트에서 보낸 데이터를 req.body.속성명으로 사용
  const loginPassword=req.body.loginPassword;

  const member=members.find((m)=>m.loginId===loginId && m.loginPassword===loginPassword);  //보낸 데이터와 members배열의 객체(m)을 비교
  //상단애 members 배열에서 배열메서드 find메소드를 사용하여 memberid와 memberName이 일치하는 데이터를 찾아서 member에 저장

  if(member){
    const options={
      domain:"localhost",
      path:"/",
      httpOnly:true,
     
    }

    const token=jwt.sign(//***🚀 JWT를 사용하기 위해 추가, 1인자(객체), 2번째 인자값(asfasdasf123)은 암호화된 키, 3인자(객체)
              {id:member.id, name:member.name },   //1인자(객체):멤버정보            
               "abc1234567",                     //2인자 :암호화된 키
               {expiresIn: "15m", issuer: "erlia"} //3인자(객체) :유효시간, 발급자
    );  //token
    
    //***새로 고침시 로그인이 풀리는 것을 방지->토큰(보안 강화), 쿠키 두가지를 사용할 수 있다.
    //쿠키에 저장할 때는 jwt대신 JSON.stringify(member)사용->쿠키는 문자열만 저장할 수 있으므로 객체를 JSON 문자열로 변환해야 한다.
    res.cookie("token", token, options);    //쿠키사용시: res.cookie("account", JSON.stringify(member), options);  
    res.send(member);
   
  }else{
    res.send("로그인에 실패했습니다");
  }
  console.log("id:"+loginId,", password:"+loginPassword);
});//post방식

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/api/account', (req, res) => {
//   res.send({
//             memberId:3,
//             memberName:"erlia",

//   });
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

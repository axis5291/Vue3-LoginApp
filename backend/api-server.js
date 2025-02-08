
const express = require('express');  
const cors = require('cors');  // 🚀 CORS에러를 방지하기 위해 추가

const app = express();
const port = 3000;

const bodyParser = require('body-parser');  //클라아이언트에서 보낸 데이터를 서버에서 사용하기 위해 필요

const members=[
  { 
    id:1,
    lib:'axis',
    loginId:"erlia",
    loginPassword:'erlia',
  }, 
  { 
    id:2,
    lib:'axis',
    loginId:"coco",
    loginPassword:'coco',
  },
]

app.use(cors());  // ✅ CORS 설정 추가
app.use(bodyParser.json());    //json데이터를 사용할 수 있도록 함

app.get('/api/account', (req, res) => {
  res.send('로그인을 하세요');  //최초 접속을 할 때 보내는 기본 메세지
});

app.post('/api/account', (req, res) => {
  const loginId=req.body.loginId;   //클라이언트에서 보낸 데이터를 req.body.속성명으로 사용
  const loginPassword=req.body.loginPassword;

  const member=members.find((m)=>m.loginId===loginId && m.loginPassword===loginPassword);  //보낸 데이터와 members배열의 객체(m)을 비교
  //상단애 members 배열에서 배열메서드 find메소드를 사용하여 memberid와 memberName이 일치하는 데이터를 찾아서 member에 저장
  if(member){
    res.send(member);
   
  }else{
    res.send("로그인에 살패했습니다");
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

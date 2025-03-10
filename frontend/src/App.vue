<template>
  <div class="app">
    <h1>{{ state.message }}</h1>
    <div v-if="state.account.id">  <!-- 처음페이지 접속시 state.account.id에 값이 있으면 로그인 상태로 간주 -->
       
      <h1>
        <p>안녕하세요? <span style="color: blue">{{ state.account.name }}!</span>님 로그인 하셨습니다.</p>
        <button @click="logout">로그아웃</button>
      </h1>
    </div>

    <div v-else>                   <!-- 처음페이지 접속시 state.account.id에 값이 없으면 아래것 실행 -->
      <label for="loginId"></label>
      <span>아이디</span>
      <input type="text" name="" id="loginId" v-model="state.form.loginId" />  <!-- v-model은 양방향 바인딩 -->

      <label for="loginPassword"></label>
      <span>패스워드</span>
      <input
        type="password" name="" id="loginPassword" v-model="state.form.loginPassword"
      />
      <hr />
      <button @click="submit">로그인</button>
    </div>
    <div>서버에서 넘어온 사용자 정보: {{ state.account }}</div>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";

export default {
  setup() {
    const state = reactive({
      message: "Hello Vue 3!",
      account: {
        id: null,
        name: "",
      },

      form: {
        loginId: "",
        loginPassword: "",
      },
    }); //state

    axios.get("/api/account").then((res) => {
      state.account = res.data;               // ***로그인 상태 유지
      alert("서버에서 보낸 메세지 : "+res.data.name+"님 환영합니다.");
     
    }); //axios.get

    const submit = () => {        //로그인 버튼 클릭시 실행되는 함수, axis.post로 서버로 데이터 전송
      const args = {              //form에 입력된 데이터를 args에 저장
        loginId: state.form.loginId,
        loginPassword: state.form.loginPassword,
      };
      console.log("서버로 보내는 데이터 사전 검증->", args);

      axios
        .post("/api/account", args)  //로그인 정보가 저장된 args를 서버로 전송
        .then((res) => {             // 전송애 성공하고 나면 서버에서 보내온 데이터를 state.account에 저장
          state.account = res.data;  //로그인 성공시 서버에서 받은 데이터를 state.account에 저장
          console.log("로그인 버튼 누른후 서버에서 받은 데이터 :", res.data);
        })
        .catch((err) => {            //전송에 실패하면 에러메세지 출력
          alert("로그인 실패");
          console.log("로그인 정보 서버로부터 받은 데이터:", err);
        }); //axios.post
    }; //submit

    const logout=()=>{
      axios.delete("/api/account").then(() => {
      alert("로그아웃 되었습니다.");
      state.account = { id: null, name: "" };  //***이것을 해주어야 v-else로 돌아가게 되서 로그인화면으로 돌아가게 된다.   매우중요!!!
      }); 
    }; //logout

    return { state, submit, logout}; 
  }, //setup   함수를 변수에 할당하는 것처럼 사용하면 ;이 필요하지만, 함수를 정의하는 것처럼 사용하면 ;이 필요없다.
};
</script>

<template>
  <div class="app">
    <h1>{{ state.message }}</h1>
    <div v-if="state.login">
      <h1>안녕하세요? 마종호님! 로그인 하셨습니다.</h1>
    </div>
    <div v-else>
      <label for="loginId"></label>
      <span>아이디</span>
      <input type="text" name="" id="loginId">
      <label for="loginPassword"></label>
      <span>패스워드</span>
      <input type="password" name="" id="loginPassword">
      <hr />
      <button>로그인</button>
    </div>  
    <div>
      서버에서 넘어온 멤버정보: {{ state.info }}
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from 'axios';

export default {
  setup() {
    const state = reactive({
      message: "Hello Vue 3!",
      login: false,
      info:[],  // 서버에서 넘어온 멤버정보
    });

    axios.get('/api/account').then((res) => {
        console.log("res데이타->", res);
        state.info = res.data;
      });

    return { state };
  },
};
</script>

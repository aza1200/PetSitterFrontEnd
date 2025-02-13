<template>
  <v-container>
    <!-- 네비게이션 바 -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Main Page</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="toggleRole">{{ isUser ? 'Switch to PetSitter' : 'Switch to User' }}</v-btn>
      <v-btn text @click="logout">로그아웃</v-btn>
    </v-app-bar>

    <!-- 메인 콘텐츠 -->
    <v-row>
      <!-- 사용자 화면 -->
      <v-col v-if="isUser" cols="12">
        <h2 class="text-center">MainPage - User</h2>
        <v-tabs v-model="tab">
          <v-tab>펫시터</v-tab>
          <v-tab>쇼핑몰</v-tab>
          <v-tab>채팅룸</v-tab>
          <v-tab>펫 등록</v-tab>
          <v-tab>내 일정</v-tab>
        </v-tabs>

        <v-container class="mt-4">
          <v-card class="pa-4">
            <h3>펫시터 서비스 신청하기</h3>
            <v-card class="pa-4 mt-2">
              <p>펫시터 찾기 창 생성</p>
              <p>가능 시간대</p>
              <p>펫 종류 / 크기 / 요청 사항</p>
              <v-btn color="primary">신청하기</v-btn>
            </v-card>
          </v-card>
        </v-container>
      </v-col>

      <!-- 펫시터 화면 -->
      <v-col v-else cols="12">
        <h2 class="text-center">MainPage - PetSitter</h2>
        <v-tabs v-model="tab">
          <v-tab>펫시터 요청</v-tab>
          <v-tab>채팅룸</v-tab>
          <v-tab>알림</v-tab>
        </v-tabs>

        <v-container class="mt-4">
          <v-card class="pa-4">
            <h3>펫시터를 해주세요~</h3>
            <v-card class="pa-4 mt-2">
              <p>유저 정보</p>
              <p>가능 시간대</p>
              <p>펫 종류 / 크기 / 요청 사항</p>
              <v-btn color="success">수락</v-btn>
              <v-btn color="error">거절</v-btn>
            </v-card>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const logout = () => {
      // 로그아웃 처리 (예: 토큰 삭제, 상태 초기화)
      console.log("로그아웃됨!");
      router.push("/login"); // 로그인 페이지로 이동
    };

    return {
      isUser: true, // 기본적으로 User 화면
      tab: null, // Vuetify 탭을 위한 변수
      toggleRole() {
        this.isUser = !this.isUser;
      },
      logout,
    };
  },
};



</script>

<style scoped>
h2 {
  font-weight: bold;
}
</style>

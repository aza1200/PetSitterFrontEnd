<template>
  <v-container class="fill-height">
    <Vue3Lottie
      class="dog-animation"
      :animationData="animationData"
      :loop="true"
      :autoplay="true"
    />
    <!-- 로딩 바 -->
    <v-progress-linear
      class="loader"
      color="primary"
      height="10"
      :model-value="progress"
      rounded
    ></v-progress-linear>
  </v-container>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Vue3Lottie } from "vue3-lottie";
import animationData from "@/assets/Animation.json"; // 애니메이션 JSON 불러오기

export default defineComponent({
  name: "SplashScreen",
  components: { Vue3Lottie },
  setup() {
    const router = useRouter();
    const progress = ref(0); // 프로그레스 바 값 (0~100)

    onMounted(() => {
      let interval = setInterval(() => {
        progress.value += 4; // 2.5초 동안 0 → 100% 진행
        if (progress.value >= 100) {
          clearInterval(interval);
        }
      }, 100); // 100ms마다 업데이트 (2.5초 동안 100%)

      setTimeout(() => {
        router.push("/main"); // 2.5초 후 /main으로 이동
      }, 2500);
    });

    return { animationData, progress };
  }
});
</script>

<style scoped>
/* 전체 화면 채우기 */
.fill-height {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 로딩 바가 아래쪽에 위치하도록 설정 */
  align-items: center;
  background: linear-gradient(to bottom, #87CEEB, #FFFFFF);
  overflow: hidden;
}

/* 강아지 애니메이션이 화면 전체를 덮도록 설정 */
.dog-animation {
  width: 100vw;
  height: 100vh;
  object-fit: cover; /* 애니메이션 비율 유지하며 전체 덮기 */
  position: absolute;
  top: 0;
  left: 0;
}

/* 로딩 바 스타일 */
.loader {
  width: 100%; /* 가로 전체 채우기 */
  height: 10px; /* 두께 증가 */
  position: absolute;
  bottom: 0; /* 화면 하단에 배치 */
}
</style>

<template>
  <div class="signup-container flex h-screen">
    <!-- 좌측 이미지 -->
    <div class="image-section">
      <img :src="signupImage" alt="MungNyanTok Logo" class="image-responsive" />
    </div>

    <!-- 우측 회원가입 폼 -->
    <div class="form-section">
      <div class="form-box">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">회원가입 페이지</h2>

        <div class="input-group">
          <label for="login" class="input-label">Login</label>
          <input id="login" v-model="loginId" placeholder="ID" class="input-field" />
        </div>

        <div class="input-group">
            <label for="password" class="input-label">Password</label>
            <div class="password-input">
                <input
                    id="password"
                    :type="showPasswords ? 'text' : 'password'"
                    v-model="password"
                    placeholder="Enter password"
                    class="input-field pr-10"
                />
                <div class="password-toggle-container" @click="togglePasswords">
                    <span class="password-toggle">{{ showPasswords ? '👁️' : '🙈' }}</span>
                </div>
            </div>
        </div>

        <div class="input-group">
            <label for="password-check" class="input-label">Password Check</label>
            <div class="password-input">
                <input
                    id="password-check"
                    :type="showPasswords ? 'text' : 'password'"
                    v-model="passwordCheck"
                    placeholder="Enter password"
                    class="input-field pr-10"
                />
                <div class="password-toggle-container" @click="togglePasswords">
                    <span class="password-toggle">{{ showPasswords ? '👁️' : '🙈' }}</span>
                </div>
            </div>
        </div>

        <div class="input-group">
          <label for="nickname" class="input-label">NickName</label>
          <input id="nickname" v-model="nickname" placeholder="NickName" class="input-field" />
        </div>
        
        <!-- 회원가입 유형 선택 -->
        <div class="input-group">
          <label class="input-label">회원가입 유형</label>
          <div class="flex gap-2">
            <button type="button" @click="toggleUserType('user')" :class="{'selected': isUser}">유저</button>
            <button type="button" @click="toggleUserType('petsitter')" :class="{'selected': isPetsitter}">펫시터</button>
          </div>
        </div>
        

        <!-- 회원가입 버튼 -->
        <button class="signup-button" @click="signUp">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import signupImage from '@/assets/login-image.png'
import { useRouter } from 'vue-router'

const loginId = ref('')
const password = ref('')
const passwordCheck = ref('')
const nickname = ref('')
const showPasswords = ref(false)
// const showConfirmPassword = ref(false)
const isUser = ref(false)
const isPetsitter = ref(false)
const router = useRouter()

const togglePasswords = () => {
  showPasswords.value = !showPasswords.value
}

// const toggleConfirmPassword = () => {
//   showConfirmPassword.value = !showConfirmPassword.value
// }

const toggleUserType = (type) => {
  if (type === 'user') {
    isUser.value = true;
    isPetsitter.value = false;
  } else if (type === 'petsitter') {
    isPetsitter.value = true;
    isUser.value = false;
  }
}

// const userTypeButtonClass = (type) => {
//   const isSelected = (type === 'user' && isUser.value) || (type === 'petsitter' && isPetsitter.value);
//   return `w-full px-4 py-2 border rounded transition duration-300 text-lg font-semibold ${
//     isSelected ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-800 hover:border-gray-500'
//   }`
// }



const signUp = async() => {
  const signUpData = {
    loginId: loginId.value,
    password: password.value,
    passwordCheck: passwordCheck.value,
    nickname: nickname.value,
    isUser: isUser.value,
    isPetsitter: isPetsitter.value
  };
  try {
    const response = await fetch('http://localhost:8080/api/v1/users', { // ✅ 여기에 실제 API URL을 입력하세요
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpData),
    });

    const data = await response.json();
    console.log('회원가입 응답 데이터:', data);

    if (response.ok) {
      alert('회원가입이 성공적으로 완료되었습니다!');
      // 성공 후 리디렉션 (예: 로그인 페이지로 이동)
      // router.push('/login'); (Vue Router 사용 시)
      router.push('/login');
    } else {
      alert(data.message || '회원가입에 실패하였습니다.');
    }
  } catch (error) {
    console.error('회원가입 요청 오류:', error);
    alert('회원가입 요청 중 오류가 발생했습니다.');
  }
}
</script>

<style scoped>
/* 전체 컨테이너 스타일 */
.signup-container {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

/* 좌측 이미지 섹션 */
.image-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 20px;
}

.image-section img {
  width: 80%;
  max-width: 500px;
  height: auto;
}

/* 우측 폼 섹션 */
.form-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  max-width: 400px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

/* 입력 필드 스타일 */
.input-group {
  width: 100%;
  margin-bottom: 15px;
  position: relative;
}

.input-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

/* 비밀번호 필드 스타일 */
.password-group {
  position: relative;
}

.password-input {
  display: flex;
  align-items: center;
  position: relative;
}

.password-input input {
  flex: 1;
  padding-right: 35px;
}

.password-toggle {
  position: absolute;
  right: 10px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 16px;
  top: 50%;
  transform: translateY(-50%);
}

/* 회원가입 유형 버튼 */
.signup-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.signup-button:hover {
  background-color: #0056b3;
}

/* 회원가입 유형 선택 버튼 */
.flex.gap-2 button {
  width: 50%;
  padding: 15px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.flex.gap-2 button:hover {
  border-color: #007bff;
  transform: scale(1.05);
}

.flex.gap-2 button.selected {
  background-color: #000;
  color: #fff;
  border: 3px solid #000;
  transform: scale(1.1);
}
.password-input {
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  position: relative;
  height: 45px; /* 입력창 높이 고정 */
}

.input-field {
  flex: 1;
  padding-right: 40px; /* 아이콘 자리 확보 */
  height: 100%; /* 부모 요소에 맞춤 */
}

.password-toggle-container {
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* 부모 높이에 맞춤 */
  width: 35px; /* 아이콘 크기 조정 */
  cursor: pointer;
}

.password-toggle {
  font-size: 22px; /* 아이콘 크기 증가 */
  line-height: 1; /* 라인 높이 조정 */
}

</style>

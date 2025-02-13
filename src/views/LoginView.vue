<template>
  <div class="login-container">
    <!-- 좌측 이미지 -->
    <div class="image-section">
      <img :src="loginImage" alt="Login Illustration" />
    </div>

    <!-- 우측 로그인 폼 -->
    <div class="form-section">
      <h2><strong>로그인</strong> 페이지</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="loginId">Login</label>
          <input type="text" id="loginId" v-model="loginId" placeholder="ID" required />
        </div>

    <div class="input-group password-group">
      <label for="password">Password</label>
      <div class="password-input">
        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" placeholder="Enter password" required />
        <span class="toggle-password" @click="togglePassword">
          {{ showPassword ? '👁️' : '🙈' }}
        </span>
      </div>
    </div>

        <div class="options">
          <label class="toggle-container">
            <input type="checkbox" v-model="rememberMe" />
            <span class="slider round"></span>
            Remember me
          </label>
          <a href="#" class="forgot-password">Forgot password?</a>
        </div>

        <button type="submit" class="login-button">Sign in</button>
      </form>

      <p class="signup-text">
        Don't have an account?
        <a href="#" class="signup-link" @click.prevent="goToSignUp">Sign up now</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import loginImage from '@/assets/login-image.png'
// import eyeOpen from '@/assets/eye-svgrepo-com.svg' // SVG 파일 사용
// import eyeClosed from '@/assets/eye-svgrepo-com.svg' // SVG 파일 사용

const loginId = ref('') // 변경: email → id
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginId: loginId.value, // 변경: email → id
        password: password.value,
      }),
    }
//     {
//     "loginId": "testUser123",
//     "password": "securePassword123"
// }
    )

    const data = await response.json()
    console.log(data);
    if (response.ok) {
      alert('Login successful!')
      
      // 로그인 성공 시 토큰 저장 (예: 로컬 스토리지)
      localStorage.setItem('token', data.token)

      // 홈 화면으로 이동
      router.push('/')
    } else {
      alert(data.message || 'Invalid credentials')
    }
  } catch (error) {
    console.error('Login error:', error)
    alert('Login failed. Please try again later.')
  }
}

const goToSignUp = () => {
  router.push('/signup')
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<style scoped>
/* 전체 컨테이너 */
.login-container {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  gap: 0;
}

/* 이미지 섹션 */
.image-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 20px;
}

.image-section img {
  width: 100%;
  max-width: 600px;
  height: auto;
}

/* 로그인 폼 */
.form-section {
  flex: 1;
  padding: 50px;
  max-width: 400px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: left;
  margin-bottom: 20px;
}

/* 입력 필드 */
.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

/* 비밀번호 필드 */
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
  padding-right: 35px; /* 눈 아이콘 자리 확보 */
}

.toggle-password {
  position: absolute;
  right: 10px;
  cursor: pointer;
}

.toggle-password img {
  width: 20px;
  height: 20px;
}

/* Remember me 토글 버튼 */
.toggle-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
}

.toggle-container input {
  display: none;
}

.slider {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: #ccc;
  border-radius: 20px;
  transition: background-color 0.3s;
}

.slider:before {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  transition: 0.3s;
}

input:checked + .slider {
  background-color: #007bff;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

/* Forgot password */
.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}

.forgot-password {
  color: #007bff;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

/* 로그인 버튼 */
.login-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #0056b3;
}

/* 회원가입 */
.signup-text {
  margin-top: 15px;
  text-align: center;
}

.signup-link {
  color: #007bff;
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}

/* 전체 컨테이너 */
.login-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 이미지와 로그인 폼 균등 배치 */
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

/* 이미지 섹션 */
.image-section {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  height: 100%;
}

.image-section img {
  width: 90%;
  max-width: 500px;
  height: auto;
}

/* 로그인 폼 */
.form-section {
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
</style>

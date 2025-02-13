import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import MainPage from '../views/MainPage.vue'
import SplashScreen from '../components/SplashScreen.vue'

const routes = [
  { path: '/', component: SplashScreen },  // 스플래시 화면
  { path: '/main', component: MainPage },
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/signup', component: SignUpView }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

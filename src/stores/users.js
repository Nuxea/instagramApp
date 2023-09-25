import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', () => {
  const user = ref(null);

  const handleLogin = () => {}
  const handleRegister = () => {}
  const handleLogout = () => {}
  const getUser = () => {}

  return { user, handleRegister, handleLogin, handleLogout, getUser }
})

import { ref } from 'vue'
import { defineStore } from 'pinia'
import {supabase} from "@/supabase";

export const useUserStore = defineStore('users', () => {
  const user = ref(null);
  const errorMessage = ref("")
  const loading = ref(false)

  const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
  };

  const handleLogin = () => {}
  const handleRegister = async (credentials) => {
    const {email, password, username} = credentials;

    if (password.length < 6) {
      return errorMessage.value = "Votre mot de passe doit faire plus de 6 caractères"
    }

    if (username.length < 4) {
      return errorMessage.value = "Votre pseudo doit faire plus de 4 caractères"
    }

    if (!validateEmail(email)) {
      return errorMessage.value = "Le format de l'email est invalide"
    }

    loading.value = true

    // VALIDATE IF USER EXISTS //
    const { data: usernameAlreadyExists} = await supabase
        .from("users")
        .select()
        .eq('username', username)
        .single()

    if (usernameAlreadyExists) {
      loading.value = false
      return errorMessage.value = "Ce pseudo existe déjà..."
    }

    errorMessage.value = ""

    const { error} = await supabase.auth.signUp({
      email, password
    })

    if (error) {
      loading.value = false
      return errorMessage.value = error.message
    }

    await supabase.from("users").insert({
      username, email
    })

    const { data: newUser} = await supabase
        .from("users")
        .select()
        .eq('email', email)
        .single()

    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    }

    loading.value = false
  }
  const handleLogout = () => {}
  const getUser = () => {}

  const clearErrorMessage = () => {
    errorMessage.value = ""
  }

  return {
    user,
    errorMessage,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
    getUser,
    clearErrorMessage
  }
})

<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="close">
      <div class="modal">
        <button class="close-button" @click="close">X</button>
        <div class="modal-content">
          <h2 class="modal-title">Регистрация</h2>
          <form class="register-modal__from" @submit.prevent="submitForm">
            <input
              v-model="formData.username"
              placeholder="Введите логин"
              type="text"
              class="register-modal__from-input"
              :class="{'input-error': errors.username}"
            >
            <input
              v-model="formData.password"
              placeholder="Введите пароль"
              type="password"
              class="register-modal__from-input"
              :class="{'input-error': errors.password}"
            >
            <button type="submit" class="register-modal__from-btn">Зарегистрироваться</button>
            <div v-if="formErrors.length" class="form-errors">
              <ul class="errors">
                <li v-for="(error, index) in formErrors" :key="index">{{ error }}</li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="showNotification" class="notification">
    <p>Вы успешно зарегистрировались!</p>
  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isVisible = ref(false);
  
  const formData = ref({
    username: '',
    password: '',
  });
  
  const errors = ref({
    username: '',
    password: '',
  });
  
  const formErrors = ref([]);
  const showNotification = ref(false);
  
  const open = () => {
    isVisible.value = true;
    document.body.style.overflow = 'hidden';
  };
  
  const close = () => {
    isVisible.value = false;
    document.body.style.overflow = 'auto';
  };
  
  const validateForm = () => {
    errors.value.username = '';
    errors.value.password = '';
    formErrors.value = [];
  
    if (!formData.value.username) {
      errors.value.username = 'Логин не может быть пустым';
      formErrors.value.push('Логин не может быть пустым');
    }
  
    if (!formData.value.password) {
      errors.value.password = 'Пароль не может быть пустым';
      formErrors.value.push('Пароль не может быть пустым');
    } else if (formData.value.password.length < 6) {
      errors.value.password = 'Пароль должен содержать не менее 6 символов';
      formErrors.value.push('Пароль должен содержать не менее 6 символов');
    }
  
    return formErrors.value.length === 0;
  };
  
  const submitForm = () => {
    if (validateForm()) {
      // Здесь имитируем отправку данных на сервер
    setTimeout(() => {
      // Показать уведомление
      showNotification.value = true;

      // Скрыть уведомление через 3 секунды
      setTimeout(() => {
        showNotification.value = false;

      }, 3000);


    }, 500);
    }
  };
  
  defineExpose({
    open,
    close,
  });
  </script>
  
  <style lang="scss" scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050; /* Увеличиваем z-index */
    opacity: 0;
    animation: fadeIn 0.3s forwards;
  }
  
  .modal {
    background: $primary-body-bg;
    padding: 25px;
    width: 450px;
    margin: 0 15px;
    border-radius: 10px;
    position: relative;
    z-index: 1060;
    transform: scale(0.8);
    animation: scaleUp 0.3s forwards;
  }
  
  .modal-content {
  }
  
  .modal-title {
    font-size: 25px;
    font-weight: 700;
    color: white;
    @media (max-width: 850px) {
      font-size: 20px;
    }
  }
  
  .register-modal__from {
    margin-top: 20px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .register-modal__from-input {
    border: 1px solid $primary-border-bg;
    border-radius: 10px;
    width: 100%;
    padding: 15px;
    font-size: 14px;
    color: white;
    font-weight: 500;
    @media (max-width: 850px) {
      font-size: 12px;
    }
  }
  
  .register-modal__from-btn {
    background-color: $primary-bg;
    font-size: 14px;
    color: white;
    font-weight: 600;
    padding: 15px;
    border-radius: 10px;
    @media (max-width: 850px) {
      font-size: 12px;
    }
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: transparent;
    font-size: 14px;
    cursor: pointer;
    color: $primary-modal-close;
  }
  .errors {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }
  .form-errors {
    color: red;
    font-size: 14px;
    @media (max-width: 850px) {
      font-size: 12px;
    }
  }
  
  .input-error {
    border-color: red;
  }

  .notification {
  position: fixed;
  top: 15px;
  right: 15px;
  background-color: #35af64;
  color: white;
  padding: 15px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  z-index: 1100;
  opacity: 0;
  animation: slideDown 0.5s forwards;
  @media (max-width: 850px) {
      font-size: 12px;
  }
}

@keyframes slideDown {
  0% {
    top: -60px;
    opacity: 0;
  }
  100% {
    top: 20px;
    opacity: 1;
  }
}

  
  /* Анимация плавного появления */
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  /* Анимация увеличения модального окна */
  @keyframes scaleUp {
    0% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }
  </style>
  
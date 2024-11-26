<template>
    <div class="game-container">
      <h2 class="babls-title">Баблс</h2>
      <div class="babls">
        <div class="babls-left">
          <div class="babls-row">
            <label for="winChance">Шанс победы (%):</label>
            <input v-model.number="winChance" type="number" id="winChance" min="1" max="100" />
          </div>
          <div class="babls-row">
            <label for="targetMultiplier">Цель (x):</label>
            <input 
              v-model.number="targetMultiplier" 
              type="number" 
              id="targetMultiplier" 
              min="1" 
              :max="maxMultiplier"
              step="0.1" 
            />
          </div>
          <div class="babls-row">
            <label for="betAmount">Ставка:</label>
            <input v-model.number="betAmount" type="number" id="betAmount" min="1" />
          </div>
          <button class="babls-btn" @click="startGame">Играть</button>
        </div>
        <div class="babls-right">
          <div class="babls-result">
            <span :class="['babls-multiplier', resultColor]">
              {{ resultText || 'x1.0' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  
  useSeoMeta({
    title: 'LuckyCrystal | Баблс',
    description: 'Финансовый игровой проект с честным исходом игры и быстрыми выплатами.'
  });
  
  // Переменные с типами
  const winChance = ref<number>(50); // Шанс победы в процентах
  const betAmount = ref<number>(100); // Ставка
  const targetMultiplier = ref<number>(2); // Целевой множитель
  const resultColor = ref<'green' | 'red' | ''>(''); // Цвет результата
  const resultText = ref<string>(''); // Текст результата
  
  const maxMultiplier = computed(() => {
    // Максимальный множитель зависит от шанса победы
    if (winChance.value >= 90) {
      return 2;
    } else if (winChance.value >= 50) {
      return 5;
    } else if (winChance.value >= 20) {
      return 8;
    } else {
      return 10;
    }
  });
  
  // Реактивные вычисляемые значения для синхронизации между шансом и множителем
  const computedWinChance = computed(() => {
    // Если цель x100, шанс должен быть 1%
    if (targetMultiplier.value === 100) {
      return 1;
    }
    // Если цель меньше x100, то мы вычисляем шанс пропорционально
    return (100 / targetMultiplier.value);
  });
  
  const computedTargetMultiplier = computed(() => {
    // Если шанс 100%, цель должна быть 1x
    if (winChance.value === 100) {
      return 1;
    }
    // Если шанс меньше 100%, то вычисляем цель пропорционально
    return (100 / winChance.value);
  });
  
  // Слежение за изменениями для корректного обновления значений
  watch(winChance, (newValue) => {
    // Если шанс изменился, пересчитываем цель
    targetMultiplier.value = computedTargetMultiplier.value;
  });
  
  watch(targetMultiplier, (newValue) => {
    // Если цель изменена, пересчитываем шанс
    winChance.value = computedWinChance.value;
  });
  
  const intervalId = ref<NodeJS.Timeout | null>(null); // Идентификатор интервала
  const hasGameEnded = ref<boolean>(false); // Флаг для предотвращения повторных проверок
  
  function startGame(): void {
    // Останавливаем предыдущую игру
    if (intervalId.value !== null) {
      clearInterval(intervalId.value);
    }
  
    // Сбрасываем параметры игры
    resultColor.value = '';
    resultText.value = '';
    hasGameEnded.value = false;
  
    // Генерация случайного числа от 1 до 100 для шанса победы
    const randomChance = Math.random() * 100;
  
    // Генерация случайного числа для отображения в случае проигрыша
    const randomMultiplier = Math.random() * maxMultiplier.value;
  
    // Имитация игры, которая завершится сразу после генерации числа
    setTimeout(() => {
      // Проверяем, выиграл ли пользователь
      if (randomChance <= winChance.value) {
        resultColor.value = 'green'; // Победа
        resultText.value = `x${targetMultiplier.value}`;
      } else {
        resultColor.value = 'red'; // Поражение
        resultText.value = `x${randomMultiplier.toFixed(2)}`;
      }
    }, 500); // Немного задержки для имитации процесса игры
  }
  </script>
  


<style lang="scss" scoped>
.game-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 100px 15px;
  @media (max-width: 850px) {
    padding: 50px 15px;
  }
}
.babls-title {
    font-size: 30px;
    font-weight: 700;
    color: white;
    margin-bottom: 50px;
    @media (max-width: 850px) {
        font-size: 25px;
        margin-bottom: 25px;
    }
}
.babls {
    display: flex;
    align-items: center;
    gap: 150px;
    @media (max-width: 1000px) {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 50px;
    }
}
.babls-left {
    width: 500px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    @media (max-width: 1000px) {
        width: 100%;
    }
    @media (max-width: 850px) {
        order: 1;
    }
}
.babls-row {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.babls-row label {
    color: $text-color;
    font-weight: 500;
    font-size: 14px;
    @media (max-width: 850px) {
        font-size: 12px;
    }
}
.babls-row input {
    border: 1px solid $primary-border-bg;
    border-radius: 10px;
    padding: 15px;
    font-size: 14px;
    font-weight: 500;
    color: white;
    cursor: pointer;
    @media (max-width: 850px) {
        font-size: 12px;
    }
}
.babls-btn {
    border-radius: 10px;
    padding: 15px;
    font-size: 14px;
    font-weight: 600;
    color: white;
    background-color: $primary-bg;
    @media (max-width: 850px) {
        font-size: 12px;
    }
}
.babls-right {
}
.babls-result {
}
.babls-multiplier {
    display: inline-block;
    font-size: 250px;
    font-weight: 600;
    color: white;
    text-align: center;
    transition: color 0.5s ease;
    @media (max-width: 1000px) {
        font-size: 100px;
    }
    @media (max-width: 850px) {
        font-size: 18px;
        text-align: center;
    }
}
.green {
  color: rgb(16, 185, 87);
}
.red {
  color: rgb(255, 71, 71);
}
</style>

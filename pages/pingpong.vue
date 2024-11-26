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
  import { inject } from 'vue';
  
  const gameState = inject('gameState');  // Получаем переданное состояние
  
  if (!gameState) {
    throw new Error('gameState is not provided!');
  }
  
  const winChance = ref<number>(50);
  const betAmount = ref<number>(100);
  const targetMultiplier = ref<number>(2);
  const resultColor = ref<'green' | 'red' | ''>('');
  const resultText = ref<string>('');
  
  const maxMultiplier = computed(() => {
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
  
  const computedWinChance = computed(() => {
    if (targetMultiplier.value === 100) {
      return 1;
    }
    return +(100 / targetMultiplier.value).toFixed(2);
  });
  
  const computedTargetMultiplier = computed(() => {
    if (winChance.value === 100) {
      return 1;
    }
    return +(100 / winChance.value).toFixed(2);
  });
  
  watch(winChance, () => {
    targetMultiplier.value = +computedTargetMultiplier.value.toFixed(2);
  });
  
  watch(targetMultiplier, () => {
    winChance.value = +computedWinChance.value.toFixed(2);
  });
  
  const startGame = (): void => {
    resultColor.value = '';
    resultText.value = '';
  
    const randomChance = Math.random() * 100;
    const randomMultiplier = Math.random() * maxMultiplier.value;
  
    setTimeout(() => {
      if (randomChance <= winChance.value) {
        resultColor.value = 'green';
        resultText.value = `x${targetMultiplier.value}`;
        gameState.updateBalance(betAmount.value * (targetMultiplier.value - 1)); // Add winnings
      } else {
        resultColor.value = 'red';
        resultText.value = `x${randomMultiplier.toFixed(2)}`;
        gameState.updateBalance(-betAmount.value); // Subtract bet amount
      }
    }, 500);
  };
  </script>
  
  


<style lang="scss" scoped>
.game-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 100px 15px;
  @media (max-width: 850px) {
    padding: 35px 15px;
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

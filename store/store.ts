import { reactive } from 'vue';
import Cookies from 'js-cookie'; // Импортируем библиотеку js-cookie

export const useGameState = () => {
  // Загружаем баланс из кук, если он существует
  const storedBalance = Cookies.get('balance'); // Получаем значение из куки
  const state = reactive({
    balance: storedBalance ? parseFloat(storedBalance) : 1000, // Если куки нет, устанавливаем дефолтный баланс
    updateBalance(amount: number) {
      state.balance += amount;
      Cookies.set('balance', state.balance.toString(), { expires: 7 }); // Сохраняем новый баланс в куки с истечением через 7 дней
    },
  });

  return state;
};

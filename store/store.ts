import { reactive } from 'vue';
import Cookies from 'js-cookie'; // Импортируем библиотеку js-cookie

export const useGameState = () => {
  // Загружаем баланс из кук, если он существует
  const storedBalance = Cookies.get('balance');
  
  // Если баланс в куках существует и больше 0, используем его, иначе устанавливаем дефолтный баланс 1000
  const initialBalance = storedBalance && parseFloat(storedBalance) > 0 ? parseFloat(storedBalance) : 0;

  const state = reactive({
    balance: initialBalance, // Устанавливаем баланс (или дефолтный, если его нет или он меньше или равен 0)
    updateBalance(amount: number) {
      state.balance += amount;
      Cookies.set('balance', state.balance.toString(), { expires: 7 }); // Сохраняем новый баланс в куки с истечением через 7 дней
    },
  });

  return state;
};

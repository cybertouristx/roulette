// roulette.js

// Получаем WebApp-объект
const tg = window.Telegram.WebApp;
tg.expand();

// набор призов в рублях
const prizes = [50, 100, 500, 1000, 25000];

// сколько миллисекунд длится прокрутка
const SPIN_DURATION = 3000;

// финальный приз (всегда 100 ₽)
const FINAL_PRIZE = 100;

// находим индекс финального приза
const finalIndex = prizes.indexOf(FINAL_PRIZE);

// элементы DOM
const btn  = document.getElementById('spin');
const msg  = document.getElementById('msg');
const wheel= document.getElementById('wheel');

// вешаем обработчик на кнопку
btn.addEventListener('click', () => {
  btn.disabled = true;
  msg.textContent = 'Крутится…';

  const start = Date.now();
  const tick  = () => {
    // рекурсивно обновляем случайный сектор
    const idx = Math.floor(Math.random() * prizes.length);
    wheel.textContent = prizes[idx] + ' ₽';

    if (Date.now() - start < SPIN_DURATION) {
      requestAnimationFrame(tick);
    } else {
      // по окончании анимации показываем именно FINAL_PRIZE
      wheel.textContent = FINAL_PRIZE + ' ₽';
      msg.textContent = `🎉 Вы выиграли ${FINAL_PRIZE} ₽!`;

      // уведомляем Telegram-бота
      tg.sendData(JSON.stringify({
        event: 'roulette_result',
        prize: FINAL_PRIZE
      }));
    }
  };

  tick();
});

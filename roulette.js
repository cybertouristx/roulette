const prizes = ["50₽","100₽","500₽","1 000₽","5 000₽","25 000₽"];
let tries = 1;

const r1 = document.getElementById("r1");
const r2 = document.getElementById("r2");
const r3 = document.getElementById("r3");
const btn = document.getElementById("spin");
const msg = document.getElementById("msg");
const triesLabel = document.getElementById("tries");

// Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

btn.addEventListener("click", () => {
  if (tries <= 0) return;
  btn.disabled = true;
  msg.textContent = "";

  // функция анимации одного барабана
  function spinReel(el) {
    return new Promise(res => {
      let count = 0;
      const interval = setInterval(() => {
        el.textContent = prizes[Math.floor(Math.random() * prizes.length)];
        if (++count > 15) {
          clearInterval(interval);
          setTimeout(res, 200);
        }
      }, 60);
    });
  }

  spinReel(r1)
    .then(() => spinReel(r2))
    .then(() => spinReel(r3))
    .then(() => {
      tries--;
      triesLabel.textContent = tries;
      const won = r2.textContent; // средний барабан

      if (tries === 0) {
        msg.innerHTML = `🎉 Вы выиграли <b>${won}</b>!`;
        tg.sendData(JSON.stringify({
          event: "bonus_roulette",
          prize: won
        }));
      }

      btn.disabled = tries === 0;
    });
});
document.addEventListener('DOMContentLoaded', function () {
  const form = document.createElement('form');
  const cardsNumberLabel = document.createElement('label');
  const cardsLabelSpan = document.createElement('span');
  const cardsNumberInput = document.createElement('input');
  const startGameBtn = document.createElement('button');

  form.classList.add('form');
  cardsNumberLabel.classList.add('cards-label');
  cardsLabelSpan.classList.add('label-span');
  cardsNumberInput.classList.add('cards-number');
  startGameBtn.classList.add('start-btn');

  cardsNumberLabel.textContent = 'Выберите количество карточек по вертикали и горизонтали: ';
  cardsLabelSpan.textContent = 'Введите четное число от 2 до 10';
  cardsNumberInput.placeholder = '4';
  startGameBtn.textContent = 'Начать игру';

  document.body.append(form);
  form.append(cardsNumberLabel);
  cardsNumberLabel.append(cardsLabelSpan);
  cardsNumberLabel.append(cardsNumberInput);
  form.append(startGameBtn);

  startGameBtn.onclick = function (event) {

    if (((cardsNumberInput.value < 2) || (cardsNumberInput.value > 10)) || ((cardsNumberInput.value % 2 !== 0))) {
      cardsNumberInput.value = 4;
    }

    let cardsNumber = cardsNumberInput.value;

    event.preventDefault();
    form.remove();

    const cardsContainer = document.createElement('div');
    const cards = document.createElement('ul');
    const moreBtn = document.createElement('button');


    cardsContainer.classList.add('cards-container');
    cards.classList.add('cards');
    moreBtn.classList.add("more-btn");

    moreBtn.textContent = "Сыграть еще раз!"

    document.body.append(cardsContainer);
    cardsContainer.append(cards);

    let cardsArray = [];
    let card;

    for (let i = 1; i <= ((cardsNumber * cardsNumber) / 2); i++) {
      cardsArray.push(i);
      cardsArray.push(i);
    }


    cards.classList.add('cards' + cardsNumber);

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    shuffle(cardsArray);

    for (let i = 0; i < cardsArray.length; i++) {
      card = document.createElement('li');
      card.classList.add('card');
      card.classList.add('card' + cardsNumber);
      card.style.width = (100 / cardsNumber - 1) + '%';
      cards.append(card);
      let cardName = cardsArray[i];
      card.textContent = cardName;
    }

    document.querySelectorAll('.card').forEach(el => {
      let cardCover = document.createElement('div');
      cardCover.classList.add('card-cover');
      el.prepend(cardCover);
      cardCover.style.display = "block";
    });

    let clickCounter = [];

    function showCard(el) {
      if (clickCounter.length % 2 == 0) {
        hideCard(el)
      }
      el.querySelector('.card-cover').style.display = "none";
      clickCounter.push(el.textContent);
    }

    function hideCard() {
      document.querySelectorAll('.card-cover').forEach(el => {
        if (!el.closest('.card').classList.contains('pairs')) {
          el.style.display = "block";
          clickCounter = [];
        }
      });
    }

    document.querySelectorAll('.card').forEach(el => {
      el.addEventListener('click', function () {
        if (el.querySelector('.card-cover').style.display == 'block') {
          showCard(el);
          if (clickCounter.length % 2 == 0) {
            if (clickCounter[0] == clickCounter[1]) {
              document.querySelectorAll('.card').forEach(e => {
                if (e.textContent == clickCounter[0]) {
                  e.classList.add('pairs');
                }
              });
              clickCounter = [];
            } else {
              hideCard;
            }
          }
          if ((document.querySelectorAll('.card').length) == (document.querySelectorAll('.pairs').length)) {
            document.body.append(moreBtn);
            moreBtn.scrollIntoView();
          }
        }
      });
    });

    moreBtn.onclick = function () {
      window.location.reload();
    }

  }



});

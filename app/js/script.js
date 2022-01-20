const btns = document.querySelectorAll('.nav-item');
const cardsEl = document.querySelector('.activity-cards');

let arr = [];
let html = '';



fetch('/data.json')
  .then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    arr = jsonData;
    arr.forEach(item => {

      const bgClass = item.title.toLowerCase().split(' ')[0];

      html += `<article class="activity-card activity-card__${bgClass} border-radius">
            <div class="card-content border-radius">
            
            <div class="card-content__top flex">
            <h2>${item.title}</h2>
            <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
            <path
            d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
            fill="#BBC0FF"
            fill-rule="evenodd"
            />
            </svg>
            </div>
            
            <div class="card-content__bottom flex">
            <p>${item.timeframes["daily"].current}hrs</p>
            <p><span>Last day -</span> ${item.timeframes["daily"].previous}hrs</p>
            
            </div >
            </div >
            </article > `

    })
    cardsEl.innerHTML = html;

  })


btns.forEach(btn => {

  btn.addEventListener('click', function (e) {
    const currentItem = e.currentTarget.innerText.toLowerCase();
    html = '';
    let timeframe = '';

    // if(currentItem === 'daily') {
    //   timeframe = 'Day';
    // }
    // if(currentItem === 'weekly') {
    //   timeframe = 'Week';
    // }
    // if(currentItem === 'monthly') {
    //   timeframe = 'Month';
    // }



    switch (currentItem) {
      case 'daily':
        timeframe = 'Day';

        break;
      case 'weekly':
        timeframe = 'Week';

        break;
      case 'monthly':
        timeframe = 'Month';

        break;
      default:
        timeframe = 'error';
    }

    arr.forEach(item => {
      const bgClass = item.title.toLowerCase().split(' ')[0];
      html += `<article class="activity-card activity-card__${bgClass} border-radius">
              <div class="card-content border-radius">
              
              <div class="card-content__top flex">
              <h2>${item.title}</h2>
              <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
              <path
              d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
              fill="#BBC0FF"
              fill-rule="evenodd"
              />
              </svg>
              </div>
              
              <div class="card-content__bottom flex">
              <p>${item.timeframes[currentItem].current}hrs</p>
              <p><span>Last ${timeframe}</span> - ${item.timeframes[currentItem].previous}hrs</p>
              
              </div >
              </div >
              </article > `

    })
    cardsEl.innerHTML = html;

    btns.forEach(btn => {
      if (btn.innerText.toLowerCase() === currentItem) {
        btn.style.color = '#fff'
      } else {
        btn.style.color = 'hsl(235, 45%, 61%)'
      }
    })
  })
})
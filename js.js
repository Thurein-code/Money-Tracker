const confirmBtn  = document.getElementById('confirm-btn');
const inputYsd  = document.getElementById('inputYsd');
const inputTdy  = document.getElementById('inputTdy');
const firstScreen = document.getElementById('first');
const secondScreen = document.getElementById('second-screen');
const totalBalance = document.getElementById('Total-balance');
const totalProfit = document.getElementById('Total-profit');
const checkBtn = document.getElementById('history');
const totalSpan = document.getElementById('totalysd');
const backBtn = document.getElementById('backButton');
const historyUl = document.getElementById('HistoryUl');
const profitHistory1 =document.getElementById('checkHistory');

let profitHistory = JSON.parse(localStorage.getItem('profitHistory')) || [];
let yesterdayTotalp = JSON.parse(localStorage.getItem('yesterdayTotalp'));

backBtn.addEventListener('click', back)

profitHistory1.addEventListener('click', viewSavedHistory)

confirmBtn.addEventListener('click',screenChange);

checkBtn.addEventListener('click', showHistory)


if (yesterdayTotalp !== null) {
    totalSpan.textContent = yesterdayTotalp;
}

function viewSavedHistory() {
  const profitList = document.getElementById('profitHistory');
  profitList.innerHTML = '';

  if (profitHistory.length === 0) {
    const emptyMsg = document.createElement('li');
    emptyMsg.textContent = 'No profit history is recorded.';
    profitList.appendChild(emptyMsg);
    backBtn.classList.add('activate')
  } else {
    profitHistory.forEach((entry) => {
      const li = document.createElement('li');
      li.textContent = `${entry.date} => Profit: ${entry.profits} MMK`;

      li.addEventListener('click', () => {
        profitHistory = profitHistory.filter(e => e.id !== entry.id);
        localStorage.setItem('profitHistory', JSON.stringify(profitHistory));
        li.remove();
      });

      profitList.appendChild(li);
      backBtn.classList.add('activate')
    });
  }

  // Show the history screen from first screen
  firstScreen.classList.remove('active');
  secondScreen.classList.remove('active');
  historyUl.classList.add('active');
}

function back(){
  if(secondScreen.classList.contains('active')){
    inputTdy.value = '';
    inputYsd.value = '';
    secondScreen.classList.remove('active');
    firstScreen.classList.add('active');
    backBtn.classList.remove('activate')
  }

  if(historyUl.classList.contains('active')) {
    secondScreen.classList.add('active');
    historyUl.classList.remove('active');
  }
}

function screenChange() {
  const todayTotal = parseFloat(inputTdy.value.trim());
  const yesterdayTotal = parseFloat(inputYsd.value.trim());

  if(isNaN(todayTotal) || isNaN(yesterdayTotal)) {
    alert('Please enter valid number');
    return;
  }totalBalance.textContent= todayTotal
  const profit = todayTotal - yesterdayTotal;
  totalProfit.textContent = profit
  

  profitHistory.push({
    id: Date.now(),
    date:new Date().toLocaleDateString(),
    profits: profit
  })

  localStorage.setItem('profitHistory', JSON.stringify(profitHistory))

  totalSpan.textContent = todayTotal;
  
  localStorage.setItem('yesterdayTotalp', JSON.stringify(todayTotal))

  firstScreen.classList.remove('active');
  secondScreen.classList.add('active');
  backBtn.classList.add('activate')
}


function showHistory() {
  const profitList = document.getElementById('profitHistory')
  profitList.innerHTML = ''

   profitHistory.forEach((entry) => {
    const li = document.createElement('li')
    li.textContent = `${entry.date} => Profit: ${entry.profits} MMK`;


    li.addEventListener('click', () => {

      //Remove from array
      profitHistory = profitHistory.filter(e => e.id !== entry.id)

      localStorage.setItem('profitHistory', JSON.stringify(profitHistory))

      li.remove();
    });

    profitList.appendChild(li)
   });

   secondScreen.classList.remove('active')
   historyUl.classList.add('active')
}
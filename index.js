const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.btn[data-val]');
const clearBtn = document.getElementById('clear');
const delBtn = document.getElementById('del');
const equalsBtn = document.getElementById('equals');

// numbers & operators
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.getAttribute('data-val');
    screen.value += val;
  });
});

// clear
clearBtn.addEventListener('click', () => {
  screen.value = '';
});

// delete last
delBtn.addEventListener('click', () => {
  screen.value = screen.value.slice(0, -1);
});

// faulty evaluate
equalsBtn.addEventListener('click', () => {
  const expr = screen.value;
  if (!expr) return;

  try {
    let result = Function('return ' + expr)(); // normal result

    // yahan se calculator faulty ban raha hai:
    // 50% chance thoda galat answer dega
    const random = Math.random();
    if (random < 0.5) {
      const errorOffset = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
      result = result + errorOffset;
    }

    screen.value = result;
  } catch (e) {
    screen.value = 'Error';
  }
});

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

// ===== FAULTY EVALUATE (edited) =====

// operator mapping (faulty style)
const faultyOpsMap = {
  '+': '-',
  '-': '/',
  '*': '+',
  '/': '**' // power
};

equalsBtn.addEventListener('click', () => {
  const expr = screen.value;
  if (!expr) return;

  try {
    // pehle normal result
    let correctResult = Function('return ' + expr)();

    // random decide karega sahi ya galat
    const random = Math.random();

    let finalResult = correctResult;

    // ~30% time bilkul alag operation / galat value
    if (random < 0.3) {
      // 1) try karo simple a op b pattern pe operator flip karna
      const match = expr.match(/^(\d+(\.\d+)?)([+\-*/])(\d+(\.\d+)?)$/);

      if (match) {
        // agar expression simple type ka hai (like 5+3, 10*2, 7-4)
        let a = match[1];
        let op = match[3];
        let b = match[4];

        const wrongOp = faultyOpsMap[op] || op;
        finalResult = eval(`${a} ${wrongOp} ${b}`);
      } else {
        // agar expression complex hai (jaise 2+3*4), to thoda random error lagao
        const errorOffset = Math.floor(Math.random() * 5) - 2; // -2..+2
        finalResult = correctResult + errorOffset;
      }
    } else if (random < 0.6) {
      // next 30% time sirf chota offset add/subtract
      const errorOffset = Math.floor(Math.random() * 7) - 3; // -3..+3
      finalResult = correctResult + errorOffset;
    }
    // bachi hui ~40% time bilkul sahi answer

    screen.value = finalResult;
  } catch (e) {
    screen.value = 'Error';
  }
});

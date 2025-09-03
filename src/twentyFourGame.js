let currentCards = [];
let usedCardIndices = new Set();
let expression = "";

let cardsEl;
let exprEl;
let resultEl;
let historyEl;

export function judgePoint24(cards) {
  const EPSILON = 1e-6;

  function dfs(nums) {
    if (nums.length === 1) {
      return Math.abs(nums[0] - 24) < EPSILON;
    }
    const n = nums.length;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const a = nums[i];
        const b = nums[j];
        const rest = nums.filter((_, idx) => idx !== i && idx !== j);

        const candidates = [a + b, a - b, b - a, a * b];
        if (Math.abs(b) > EPSILON) candidates.push(a / b);
        if (Math.abs(a) > EPSILON) candidates.push(b / a);

        for (const val of candidates) {
          if (dfs([...rest, val])) return true;
        }
      }
    }
    return false;
  }

  return dfs(cards.map(Number));
}

export function dealNewCards() {
  expression = "";
  usedCardIndices.clear();
  historyEl.innerHTML = "";

  do {
    currentCards = Array.from({ length: 4 }, () => Math.floor(Math.random() * 9) + 1);
  } while (!judgePoint24(currentCards));

  renderCards();
  updateExpressionDisplay();
}

function renderCards() {
  cardsEl.innerHTML = "";
  currentCards.forEach((n, i) => {
    const btn = document.createElement("button");
    btn.className = "card";
    btn.textContent = n;
    btn.dataset.value = n;
    btn.dataset.index = i;
    btn.setAttribute("data-testid", `card-${i}`);
    btn.addEventListener("click", () => {
      expression += n;
      usedCardIndices.add(i);
      updateExpressionDisplay();
      btn.disabled = true;
    });
    cardsEl.appendChild(btn);
  });
}

function updateExpressionDisplay() {
  exprEl.textContent = expression;
  try {
    const val = eval(expression);
    resultEl.textContent = "= " + val;
  } catch {
    resultEl.textContent = "= ?";
  }
}

function clearExpression() {
  expression = "";
  usedCardIndices.clear();
  updateExpressionDisplay();
  document.querySelectorAll(".card").forEach(btn => (btn.disabled = false));
}

function undo() {
  const lastChar = expression.slice(-1);
  expression = expression.slice(0, -1);

  if (!isNaN(parseInt(lastChar, 10))) {
    for (let i = currentCards.length - 1; i >= 0; i--) {
      if (currentCards[i] === parseInt(lastChar, 10) && usedCardIndices.has(i)) {
        document.querySelector(`[data-index='${i}']`).disabled = false;
        usedCardIndices.delete(i);
        break;
      }
    }
  }
  updateExpressionDisplay();
}

function addHistory(move) {
  const li = document.createElement("li");
  li.textContent = move;
  li.setAttribute("data-testid", `history-item-${historyEl.children.length}`);
  historyEl.appendChild(li);
}

export function init() {
  cardsEl = document.getElementById("cards");
  exprEl = document.getElementById("expression");
  resultEl = document.getElementById("result");
  historyEl = document.getElementById("history");

  document.getElementById("btn-add").onclick = () => { expression += "+"; updateExpressionDisplay(); };
  document.getElementById("btn-sub").onclick = () => { expression += "-"; updateExpressionDisplay(); };
  document.getElementById("btn-mul").onclick = () => { expression += "*"; updateExpressionDisplay(); };
  document.getElementById("btn-div").onclick = () => { expression += "/"; updateExpressionDisplay(); };
  document.getElementById("btn-lp").onclick = () => { expression += "("; updateExpressionDisplay(); };
  document.getElementById("btn-rp").onclick = () => { expression += ")"; updateExpressionDisplay(); };

  document.getElementById("btn-undo").onclick = undo;
  document.getElementById("btn-clear").onclick = clearExpression;

  document.getElementById("btn-check").onclick = () => {
    if (usedCardIndices.size !== 4) {
      alert("You must use all four cards.");
      return;
    }
    try {
      const val = eval(expression);
      if (Math.abs(val - 24) < 1e-6) {
        resultEl.textContent = "= 24 🎉";
        addHistory(expression + " = 24 ✅");
      } else {
        resultEl.textContent = "= " + val + " ❌";
        addHistory(expression + " = " + val);
      }
    } catch {
      resultEl.textContent = "Invalid Expression ❌";
      addHistory(`Invalid: ${expression}`);
    }
  };

  document.getElementById("btn-new").onclick = dealNewCards;
  document.getElementById("btn-shuffle").onclick = dealNewCards;

  document.getElementById("btn-giveup").onclick = () => {
    const solvable = judgePoint24(currentCards);
    if (solvable) {
      alert("This set is solvable. Try again!");
    } else {
      alert("This set is NOT solvable. Let's deal new cards.");
      dealNewCards();
    }
  };
}


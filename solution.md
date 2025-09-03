## 📝 `solution.md`

````md
# 24 Game – Known Solutions

This file documents **known working expressions** for solvable test cases.
Useful for hint generation, automated verification, or debugging.

---

## Solutions

### TC-001
**Cards:** [4, 1, 8, 7]  
**Solution:** `(8 - 4) * (7 - 1)`

---

### TC-002
**Cards:** [6, 3, 9, 4]  
**Solution:** `((9 - 6) + 3) * 4`

---

### TC-003
**Cards:** [3, 3, 8, 8]  
**Solution:** `8 / (3 - 8/3)`

---

### TC-004
**Cards:** [1, 3, 4, 6]  
**Solution:** `(6 / (1 - 3/4))` → `6 ÷ (0.25) = 24`

---

## Usage in Game

When a player presses **Give Up**, you can either:
1. Generate a fresh solution using `findOneSolution(cards)`
2. Or match the dealt cards against this file and display a stored solution.

Example (UI alert):

```js
alert("Hint: Try ((9 - 6) + 3) * 4 = 24");
````

```


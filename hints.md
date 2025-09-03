# 🧩 24 Game – Hints & Sample Solutions

This file contains **sample solvable sets** and their **valid solutions**.  
Use these for:

- Verifying the correctness of `judgePoint24`.
- Displaying hints when the player presses **Give Up**.
- Creating automated tests with known solutions.

---

## 🎯 Solvable Examples

### Example 1
**Cards:** `[4, 1, 8, 7]`  
**Solution:**
```text
(8 - 4) * (7 - 1) = 24
```

---

### Example 2
**Cards:** `[6, 3, 9, 4]`  
**Solution:**
```text
((9 - 6) + 3) * 4 = 24
```

---

### Example 3
**Cards:** `[3, 3, 8, 8]`  
**Solution:**
```text
8 / (3 - 8/3) = 24
```

Step-by-step:
- 8 ÷ 3 ≈ 2.67  
- 3 − 2.67 ≈ 0.33  
- 8 ÷ 0.33 ≈ 24 ✅

---

## ❌ Unsolvable Examples

- `[1, 1, 1, 1]` → **Not solvable**
- `[9, 1, 1, 7]` → **Not solvable**

---

## 💡 Usage in Game

When a player presses **Give Up**, show a valid solution (if one exists):

```js
alert("Hint: Try ((9 - 6) + 3) * 4 = 24");
```

Or generate it dynamically using a solver function.

---

## 📝 Notes

- Each card must be used exactly once.
- Parentheses are required when order of operations matters.
- Division is floating-point (e.g., 8 / 3 = 2.67).
- Not all 4-number combinations have a solution.


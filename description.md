### 🧮 **24 Game**

### 1. Requirements

**Functional Requirements:**

* The game should deal **4 random numbers (1–9)** on each new round.
* Players must use **all 4 numbers exactly once** to form an expression that evaluates to 24.
* Players can click numbers and operators (`+`, `−`, `×`, `÷`, `(`, `)`) to build an expression.
* The current expression and its live evaluation should be displayed.
* A **"Check"** button must validate if the expression equals 24 (✅ or ❌ feedback).
* A **"Clear"** button resets the current expression without dealing new numbers.
* A **"Undo"** button removes the last character/operator/number entered.
* A **"New Deal"** button generates a new set of numbers.
* A **"Shuffle"** button reorders the current 4 numbers randomly.
* A **"Give Up"** button checks if the current set is solvable:
  * If solvable → prompts user to try again.
  * If unsolvable → deals a new set automatically.
* A move history should log previous attempts (e.g., `3+8+8+5 = 24 ✅`).
* Optionally, a **"Hint"** button can show a small tip (like pairing largest/smallest numbers).

### 2. Edge Cases & Constraints

* Users **must** use all four numbers exactly once — partial solutions are invalid.
* Clicking a number twice should not be allowed (button is disabled after first use).
* Invalid mathematical expressions should show `Invalid Expression ❌` instead of crashing.
* Division by zero must be handled gracefully (skip or ignore invalid divisions in solver).
* The game must reset all buttons to enabled state when a new deal is generated.
* Undo must properly re-enable a card button if the last input was a number.
* Move history should persist across new deals (optional) but can be cleared on reset.
* Game should work on desktop and mobile (responsive layout).

### 3. Testing Identifiers (`data-testid`)

The following elements use `data-testid` for automated testing:

* **Cards:** `card-0`, `card-1`, `card-2`, `card-3`
* **Buttons:** `btn-add`, `btn-sub`, `btn-mul`, `btn-div`, `btn-lp`, `btn-rp`, `btn-undo`, `btn-clear`, `btn-check`, `btn-new`, `btn-shuffle`, `btn-giveup`
* **Displays:** `expression-display`, `result`
* **Containers:** `cards-container`, `history-container`
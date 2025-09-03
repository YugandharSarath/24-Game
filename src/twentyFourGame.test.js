import { render, screen, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { dealNewCards, judgePoint24, init } from "./twentyFourGame";

jest.mock("./twentyFourGame", () => ({
  ...jest.requireActual("./twentyFourGame"),
  judgePoint24: jest.fn(() => true), 
}));

beforeEach(() => {

  document.body.innerHTML = `
    <div id="cards" data-testid="cards-container"></div>
    <div id="expression" data-testid="expression-display"></div>
    <div id="result" data-testid="result"></div>
    <ul id="history" data-testid="history-container"></ul>
    <button id="btn-add" data-testid="btn-add">+</button>
    <button id="btn-sub" data-testid="btn-sub">-</button>
    <button id="btn-mul" data-testid="btn-mul">*</button>
    <button id="btn-div" data-testid="btn-div">/</button>
    <button id="btn-lp" data-testid="btn-lp">(</button>
    <button id="btn-rp" data-testid="btn-rp">)</button>
    <button id="btn-undo" data-testid="btn-undo">Undo</button>
    <button id="btn-clear" data-testid="btn-clear">Clear</button>
    <button id="btn-check" data-testid="btn-check">Check</button>
    <button id="btn-new" data-testid="btn-new">New</button>
    <button id="btn-shuffle" data-testid="btn-shuffle">Shuffle</button>
    <button id="btn-giveup" data-testid="btn-giveup">Give Up</button>
  `;

  init();

  dealNewCards();
});

describe("24 Game UI", () => {
  test("renders 4 cards with test IDs", () => {
    const cards = screen.getAllByTestId(/card-\d/);
    expect(cards).toHaveLength(4);
    cards.forEach((c, i) => {
      expect(c).toHaveAttribute("data-testid", `card-${i}`);
      expect(c).toBeEnabled();
    });
  });

  test("selecting a card updates expression-display", () => {
    const card0 = screen.getByTestId("card-0");
    fireEvent.click(card0);
    expect(screen.getByTestId("expression-display")).toHaveTextContent(card0.textContent);
  });

  test("adds operator using + button", () => {
    const card0 = screen.getByTestId("card-0");
    fireEvent.click(card0);
    fireEvent.click(screen.getByTestId("btn-add"));
    expect(screen.getByTestId("expression-display")).toHaveTextContent(card0.textContent + "+");
  });

  test("undo removes last character and re-enables card", () => {
    const card0 = screen.getByTestId("card-0");
    const cardValue = card0.textContent;
    fireEvent.click(card0);
    expect(card0).toBeDisabled();
    fireEvent.click(screen.getByTestId("btn-undo"));
    expect(screen.getByTestId("expression-display")).not.toHaveTextContent(cardValue);
    expect(card0).toBeEnabled();
  });

  test("clear button resets expression and re-enables all cards", () => {
    const card0 = screen.getByTestId("card-0");
    fireEvent.click(card0);
    fireEvent.click(screen.getByTestId("btn-clear"));
    expect(screen.getByTestId("expression-display")).toHaveTextContent("");
    expect(card0).toBeEnabled();
  });

  test("check button evaluates expression and updates result", () => {
    const card0 = screen.getByTestId("card-0");
    const card1 = screen.getByTestId("card-1");
    fireEvent.click(card0);
    fireEvent.click(screen.getByTestId("btn-add"));
    fireEvent.click(card1);
    fireEvent.click(screen.getByTestId("btn-check"));
    expect(screen.getByTestId("result").textContent).toMatch(/= \d+|= 24/);
  });

  test("new button deals fresh cards", () => {
    const firstSet = screen.getAllByTestId(/card-\d/).map(c => c.textContent);
    fireEvent.click(screen.getByTestId("btn-new"));
    const secondSet = screen.getAllByTestId(/card-\d/).map(c => c.textContent);
    expect(secondSet.join(",")).not.toEqual(firstSet.join(","));
  });

  test("shuffle button also deals fresh cards", () => {
    const firstSet = screen.getAllByTestId(/card-\d/).map(c => c.textContent);
    fireEvent.click(screen.getByTestId("btn-shuffle"));
    const secondSet = screen.getAllByTestId(/card-\d/).map(c => c.textContent);
    expect(secondSet.join(",")).not.toEqual(firstSet.join(","));
  });

});
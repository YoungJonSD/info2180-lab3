const checkWin = (grid) => {
  const size = 3; // 3x3 grid
  let winner = null;

  // Check rows
  for (let row = 0; row < size; row++) {
    if (grid[row][0] !== "" && grid[row][0] === grid[row][1] && grid[row][1] === grid[row][2]) {
      winner = grid[row][0]; // Return the winner ("X" or "O")
      break; // Exit loop if a winner is found
    }
  }

  // Check columns
  for (let col = 0; col < size; col++) {
    if (grid[0][col] !== "" && grid[0][col] === grid[1][col] && grid[1][col] === grid[2][col]) {
      winner = grid[0][col]; // Return the winner ("X" or "O")
      break; // Exit loop if a winner is found
    }
  }

  // Check main diagonal
  if (grid[0][0] !== "" && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
    winner = grid[0][0]; // Return the winner ("X" or "O")
  }

  // Check anti-diagonal
  if (grid[0][2] !== "" && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
    winner = grid[0][2]; // Return the winner ("X" or "O")
  }

  // Display the winner message if a winner is found
  if (winner) {
    const status = document.getElementById("status");
    status.textContent = `Congratulations! ${winner} is the Winner!`;
    status.classList.add("you-won");
  }
};

const loadFunction = () => {
  const divs = document.querySelectorAll("#board > div");
  let row = 0;
  let col = 0;

  divs.forEach((div) => {
    div.className = "square";
    div.setAttribute("data-row", row);
    div.setAttribute("data-col", col);
    
    col = (col + 1) % 3;
    row += col === 0 ? 1 : 0;

    div.addEventListener("mouseover", () => div.classList.add("hover"));
    div.addEventListener("mouseleave", () => div.classList.remove("hover"));
  });
};

window.onload = () => {
  loadFunction();

  const grid = Array.from({ length: 3 }, () => ["", "", ""]);
  const divs = document.querySelectorAll("#board > div");
  let availableOption = "X"; // Alternates when user clicks on a square

  divs.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.textContent === "") {
        element.classList.remove("X", "O");
        element.classList.add(availableOption);
        element.textContent = availableOption;
        availableOption = availableOption === "X" ? "O" : "X";

        const row = element.getAttribute("data-row");
        const col = element.getAttribute("data-col");
        grid[row][col] = element.textContent;

        checkWin(grid);
      }
    });
  });

  document.querySelector(".btn").addEventListener("click", () => {
    grid.forEach((row) => row.fill("")); // Reset grid
    divs.forEach((div) => {
      div.textContent = "";
      div.classList.remove("X", "O");
    });

    const status = document.getElementById("status");
    status.textContent = "Move your mouse over a square and click to play an X or an O.";
    status.classList.remove("you-won");
  });
};

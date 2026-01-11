const sketchPad = document.querySelector(".sketch-pad");
const pixelSlider = document.getElementById("pixel-slider");
const gridSize = document.getElementById("grid-size");
const color = document.getElementById("color");
const penBtn = document.getElementById("pen");
const eraserBtn = document.getElementById("eraser");
const rainbowBtn = document.getElementById("rainbow");
const clearBtn = document.getElementById("clear");
const gridLineBtn = document.getElementById("grid-line");

let isPenMode = true;
let isEraserMode = false;
let isRainbowMode = false;

pixelSlider.addEventListener("input", () => {
  gridSize.textContent = `${pixelSlider.value} x ${pixelSlider.value}`;
});

pixelSlider.addEventListener("click", () => {
  sketchPad.innerHTML = "";
  createGrid();
});

penBtn.addEventListener("click", () => {
  isPenMode = true;
  isEraserMode = false;
  isRainbowMode = false;

  currentMode();
});

eraserBtn.addEventListener("click", () => {
  isPenMode = false;
  isEraserMode = true;
  isRainbowMode = false;

  currentMode();
});

rainbowBtn.addEventListener("click", () => {
  isPenMode = false;
  isEraserMode = false;
  isRainbowMode = true;

  currentMode();
});

clearBtn.addEventListener("click", () => {
  sketchPad.innerHTML = "";
  createGrid();
});

currentMode();

createGrid();

function createGrid() {
  let isToggleGridLines = true;
  let isMouseDown = false;

  for (let i = 0; i < pixelSlider.value; i++) {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");
    sketchPad.appendChild(gridContainer);

    for (let j = 0; j < pixelSlider.value; j++) {
      const grid = document.createElement("div");
      grid.classList.add("grid");

      grid.addEventListener("mousedown", () => {
        isMouseDown = true;
        if (isPenMode) {
          grid.style.backgroundColor = `${color.value}`;
        } else if (isEraserMode) {
          grid.style.backgroundColor = "#ffffff";
        } else {
          grid.style.backgroundColor = `rgba(${randomNumber()}, ${randomNumber()}, ${randomNumber()}, ${randomNumberDecimal()})`;
        }
      });

      grid.addEventListener("mouseover", () => {
        if (isPenMode && isMouseDown) {
          grid.style.backgroundColor = `${color.value}`;
        } else if (isEraserMode && isMouseDown) {
          grid.style.backgroundColor = "#ffffff";
        } else if (isRainbowMode && isMouseDown) {
          grid.style.backgroundColor = `rgba(${randomNumber()}, ${randomNumber()}, ${randomNumber()}, ${randomNumberDecimal()})`;
        }
      });

      grid.addEventListener("mouseup", () => {
        isMouseDown = false;
      });

      gridContainer.appendChild(grid);

      if (i === pixelSlider.value - 1 && j === pixelSlider.value - 1) {
        const gridLine = document.querySelectorAll(".grid");
        gridLineBtn.classList.add("highlight");
        gridLine.forEach((grid) => {
          grid.classList.add("grid-border");
        });
        gridLineBtn.addEventListener("click", () => {
          if (isToggleGridLines) {
            isToggleGridLines = false;
            gridLineBtn.classList.remove("highlight");
            gridLine.forEach((grid) => {
              grid.classList.remove("grid-border");
            });
          } else {
            isToggleGridLines = true;
            gridLineBtn.classList.add("highlight");
            gridLine.forEach((grid) => {
              grid.classList.add("grid-border");
            });
          }
        });
      }
    }
  }

  return;
}

function randomNumber() {
  return Math.floor(Math.random() * 255 + 1);
}

function randomNumberDecimal() {
  return Math.round(Math.random() * 10) / 10;
}

function currentMode() {
  if (isPenMode) {
    penBtn.classList.add("highlight");
    eraserBtn.classList.remove("highlight");
    rainbowBtn.classList.remove("highlight");
  } else if (isEraserMode) {
    penBtn.classList.remove("highlight");
    eraserBtn.classList.add("highlight");
    rainbowBtn.classList.remove("highlight");
  } else {
    penBtn.classList.remove("highlight");
    eraserBtn.classList.remove("highlight");
    rainbowBtn.classList.add("highlight");
  }
}

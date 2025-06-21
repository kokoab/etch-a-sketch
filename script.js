const utColors = [
  "rgba(191, 87, 0, .1)",     // Burnt Orange
  "rgba(0, 0, 0, .1)",        // Black (for contrast)
  "rgba(230, 230, 230, .1)",  // Light Gray (accent)
  "rgba(140, 66, 0, .1)",     // Darker Burnt Orange (shadow)
  "rgba(255, 205, 160, .1)",  // Light Orange (highlight)
];

function createGrid(size) {
    const container = document.querySelector(".container");

    let numSquares = size * size;
    for (let i = 0; i < numSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        // square.style.opacity = 0;

        const sideSize = 512 / size;
        square.style.height = `${sideSize}px`
        square.style.width = `${sideSize}px`
        container.appendChild(square);
    }
}

// initilize etch-a-sketch with 16x16 grid
createGrid(16);

function deleteGrid() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.remove());
}

function clearGrid() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.style.backgroundColor = "rgba(0, 0, 0, 0)");
}

const container = document.querySelector(".container");

container.addEventListener("mouseover", (event) => {
    let target = event.target.closest(".square");

    // if the current box is empty, fill it in with color
    const randomColor = utColors[Math.floor(Math.random() * utColors.length)];
    const currentColor = window.getComputedStyle(target).backgroundColor;
    if (currentColor === "rgba(0, 0, 0, 0)") {
        target.style.backgroundColor = randomColor;
    } else {
        // increase opacity of current color by 10%
        const rgbaMatch = currentColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (rgbaMatch) {
            const r = rgbaMatch[1];
            const g = rgbaMatch[2];
            const b = rgbaMatch[3];
            const a = parseFloat(rgbaMatch[4]) || 1;

            let newAlpha = Math.min(a + .1, 1);

            const newColor = `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
            target.style.backgroundColor = newColor;
        } else {
            console.warn("Element's background color is not in rgba() format.");
        }
    }

    // target.style.opacity += .1;
    console.log(target);
}
);

const changeGridSizeBtn = document.querySelector(".change-grid-size");
changeGridSizeBtn.addEventListener("click", () => {
    let size = 0; 
    do {
        size = prompt("Please enter the number of squares for the new grid:");
        if (size > 100) {
            alert("Please enter a side length below 100!");
        }
    } while (size > 100);
    deleteGrid();
    createGrid(size);
})

const clearGridBtn = document.querySelector(".clear-grid");
clearGridBtn.addEventListener("click", clearGrid);




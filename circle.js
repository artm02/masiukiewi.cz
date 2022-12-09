// Get a reference to the element that will contain the circle
const container = document.querySelector("#container");

// Create a new element to hold the circle
const circle = document.createElement("div");
circle.classList.add("circle");

// Add the circle to the container
container.appendChild(circle);

// Listen for mouse movement on the container
container.addEventListener("mousemove", (event) => {
    // Get the current mouse position
    const x = event.clientX;
    const y = event.clientY;

    // Update the circle's position
    circle.style.left = x + "px";
    circle.style.top = y + "px";
});

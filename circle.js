// get a reference to the circle element
const circle = document.getElementById("circle");

// add an event listener to track the cursor's movement
document.addEventListener("mousemove", event => {
  // update the circle's position to match the cursor's position
  circle.style.top = `${event.pageY - 25}px`;
  circle.style.left = `${event.pageX - 25}px`;
});

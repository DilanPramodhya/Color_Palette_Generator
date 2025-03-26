// Selecting all labels and copy buttons
const labels = document.querySelectorAll("label");
const copy_btns = document.querySelectorAll("label .copy");

// Change color after pressing the space bar
document.addEventListener("keypress", (e) => {
  if (e.key === " ") {
    generateColor();
  }
});

function generateColor() {
  for (const label of labels) {
    // Generate random color
    let color_1 = "#" + Math.random().toString(16).substr(2, 6);
    let color_2 = "#" + Math.random().toString(16).substr(2, 6);

    label.style.backgroundColor = color_1;
    document.body.style.backgroundImage = `linear-gradient(to bottom left, ${color_1}, ${color_2})`;

    // Update color code text
    const color_value = label.querySelector(".color-value");
    color_value.innerText = color_1;

    // Update color picker
    const color_picker = label.nextElementSibling;
    color_picker.value = color_1;

    // Change color when input is updated
    color_picker.oninput = function () {
      this.previousElementSibling.style.backgroundColor = this.value;
      this.previousElementSibling.querySelector(".color-value").innerText =
        this.value;
    };
  }
}

// Copy button functionality
for (const copy_btn of copy_btns) {
  copy_btn.onclick = () => {
    copy_btn.innerText = "Copied!";
    setTimeout(() => (copy_btn.innerText = "Copy"), 1500);

    // Fix: Select the correct color value
    const color_code =
      copy_btn.parentElement.querySelector(".color-value").innerText;

    // Check if clipboard API is available
    if (!navigator.clipboard) {
      console.log(navigator.clipboard);
      console.error("Clipboard API not supported!");
      return;
    }

    // Copy to clipboard with error handling
    navigator.clipboard
      .writeText(color_code)
      .then(() => {
        console.log("Copied to clipboard: " + color_code);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
}

// Generate colors on page load
generateColor();

const link = document.createElement("link");
link.href = chrome.runtime.getURL("../style.css"); // Assuming style.css is in the same directory
link.rel = "stylesheet";
document.head.appendChild(link);

document.addEventListener("mouseup", function (event) {
  const selectedText = window.getSelection().toString().trim();
  console.log(selectedText);
  // Check if there's any selected text
  if (selectedText.length > 0) {
    // Proceed with showing the pencil icon and options
    showPencilIcon(selectedText, event.clientX, event.clientY);
  }
  // else {
  //   // Hide any existing pencil icon if there's no selection
  //   hidePencilIcon();
  // }
});

function showPencilIcon(text, x, y) {
  // Create the pencil icon element
  const pencilIcon = document.createElement("div");
  pencilIcon.classList.add("pencil-icon"); // Add a class for styling
  pencilIcon.innerHTML = "&#128393;"; // Unicode for a pencil icon

  // Calculate position based on selected text bounding rectangle
  const selectionRect = window
    .getSelection()
    .getRangeAt(0)
    .getBoundingClientRect();

  // Handle potential errors (if no selection rectangle is available)
  if (!selectionRect) {
    console.warn(
      "No selection rectangle found. Icon positioning might be inaccurate."
    );
    return;
  }

  let bottomRightX = selectionRect.right + 5; // Adjust offset as needed
  let bottomRightY = selectionRect.bottom + 5; // Adjust offset as needed

  // Ensure positioning stays within viewport (optional)
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  bottomRightX = Math.min(bottomRightX, windowWidth - pencilIcon.offsetWidth); // Clamp to viewport right
  bottomRightY = Math.min(bottomRightY, windowHeight - pencilIcon.offsetHeight); // Clamp to viewport bottom

  // Update the icon's position
  pencilIcon.style.left = bottomRightX + "px";
  pencilIcon.style.top = bottomRightY + "px";

  // Add event listener for clicking the icon (you'll define this later)
  pencilIcon.addEventListener("click", function () {
    handlePencilClick(text);
  });

  // Append the icon to the document body
  document.body.appendChild(pencilIcon);
}

function hidePencilIcon() {
  const existingIcon = document.querySelector(".pencil-icon");
  if (existingIcon) {
    existingIcon.remove();
  }
}

function handlePencilClick(text) {
  console.log("pencil clicked");
  chrome.runtime.sendMessage({
    action: "getImageFromBackend",
    selectedText: text,
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("this is chrome runtime from content.js file");
  console.log(message.action);
  console.log(message.error);

  if (message.action === "imageReceived") {
    console.log("this is imageReceived section");
    const imageUrl = message.imageUrl;
    console.log(imageUrl);

    const image = document.createElement("img");
    image.src = imageUrl;
    document.getElementsByTagName("body")[0].appendChild(image);

    // Adjust positioning based on the selectione.blob;
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectionRect = range.getBoundingClientRect();

      image.style.position = "absolute";
      image.style.top = selectionRect.bottom + 10 + "px";
      image.style.left = selectionRect.right + 10 + "px";
    } else {
      // Fallback positioning if no selection is available
      image.style.position = "absolute";
      image.style.top = "10px";
      image.style.left = "10px";
    }

    // Append the image to the document body
    document.body.appendChild(image);
  } else if (message.action === "imageError") {
    console.log(message.error);
    console.error("Error fetching image from backend.");
  }
});

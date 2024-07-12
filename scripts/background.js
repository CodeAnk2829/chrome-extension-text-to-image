chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "getImageFromBackend") {
    const selectedText = request.selectedText;
    console.log(selectedText);
    const formData = new FormData();
    formData.append("prompt", selectedText);

    const URL = "https://49ad-104-196-250-181.ngrok-free.app/generate";
    try {
      const response = await fetch(URL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
              const activeTab = tabs[0];
              chrome.tabs.sendMessage(activeTab.id, {
                action: "imageReceived",
                imageUrl: base64data,
              });
            } else {
              console.error("No active tabs found");
            }
          });
        };
        reader.readAsDataURL(blob);
      } else {
        console.log("something went wrong");
      }
    } catch (err) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          const activeTab = tabs[0];
          chrome.tabs.sendMessage(activeTab.id, {
            action: "imageError",
            error: err.error,
          });
        }
      });
    }
    return true;
  }
});

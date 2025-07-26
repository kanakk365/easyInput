// Background script for MV3
chrome.runtime.onInstalled.addListener(() => {
  // Create context menu item
  chrome.contextMenus.create({
    id: "polish-with-llm",
    title: "Polish with LLM",
    contexts: ["editable"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "polish-with-llm" && tab?.id) {
    // Send message to content script
    chrome.tabs.sendMessage(tab.id, {
      action: "polishText",
      data: {
        selectionText: info.selectionText || ""
      }
    });
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === "getActiveTab") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ tabId: tabs[0]?.id });
    });
    return true; // Keep message channel open for async response
  }
}); 
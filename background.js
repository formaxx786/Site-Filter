
chrome.runtime.onInstalled.addListener(() => {
  const DEFAULT_KEYWORDS = ["porn","Porn"];
  chrome.storage.local.get({ keywords: [] }, (data) => {
    const mergedKeywords = [...new Set([...DEFAULT_KEYWORDS, ...data.keywords])];
    chrome.storage.local.set({ keywords: mergedKeywords });
  });
});
chrome.storage.local.get({ keywords: [] }, (data) => {
  const keywords = data.keywords;
  const pageText = document.body?.innerText?.toLowerCase() || "";
  const pageUrl = window.location.href.toLowerCase();

  const hasKeyword = keywords.some(keyword => 
    pageUrl.includes(keyword.toLowerCase()) || 
    pageText.includes(keyword.toLowerCase())
  );

  if (hasKeyword) {
    window.location.href = chrome.runtime.getURL("blocked.html");
  }
});
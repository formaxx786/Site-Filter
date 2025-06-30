document.getElementById('addKeyword').addEventListener('click', () => {
  const keyword = document.getElementById('keywordInput').value.trim();
  if (keyword) {
    chrome.storage.local.get({ keywords: [] }, (data) => {
      const updatedKeywords = [...data.keywords, keyword];
      chrome.storage.local.set({ keywords: updatedKeywords }, () => {
        updateKeywordList(updatedKeywords);
        document.getElementById('keywordInput').value = '';
      });
    });
  }
});

function updateKeywordList(keywords) {
  const list = document.getElementById('keywordList');
  list.innerHTML = keywords
    .filter(k => !["porn","Porn"].includes(k)) 
    .map(k => `<li>${k} <button class="remove" data-keyword="${k}">×</button></li>`)
    .join('');

  document.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const keywordToRemove = e.target.getAttribute('data-keyword');
      const updatedKeywords = keywords.filter(k => k !== keywordToRemove);
      chrome.storage.local.set({ keywords: updatedKeywords }, () => {
        updateKeywordList(updatedKeywords);
      });
    });
  });
}

chrome.storage.local.get({ keywords: [] }, (data) => {
  updateKeywordList(data.keywords);
});
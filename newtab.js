document.addEventListener('DOMContentLoaded', function () {
  chrome.bookmarks.getTree(function (bookmarks) {
    const bookmarksContainer = document.getElementById('bookmarks-container');

    function renderBookmarkTree(container, bookmarks) {
      bookmarks.forEach(function (bookmark) {
        if (bookmark.children && bookmark.children.length > 0) {
          const folderCard = renderFolderCard(container, bookmark);
          renderBookmarkTree(folderCard, bookmark.children);
        } else if (bookmark.url) {
          renderBookmarkCard(container, bookmark);
        }
      });
    }

    renderBookmarkTree(bookmarksContainer, bookmarks[0].children);
  });

  function renderFolderCard(container, folder) {
    const folderCard = document.createElement('div');
    folderCard.classList.add('bookmark-folder');
    folderCard.innerHTML = `
      <div class="folder-header">${folder.title}</div>
      <div class="folder-content"></div>
    `;

    const folderContent = folderCard.querySelector('.folder-content');
    folderCard.addEventListener('click', function (event) {
      event.stopPropagation();
      chrome.tabs.update({ url: folder.url });
    });

    container.appendChild(folderCard);
    return folderContent;
  }

  function renderBookmarkCard(container, bookmark) {
    const card = document.createElement('div');
    card.classList.add('bookmark-card');
    card.innerHTML = `
      <div class="card-title">${bookmark.title}</div>
      <div class="card-url">${bookmark.url}</div>
    `;
    card.addEventListener('click', function () {
      chrome.tabs.update({ url: bookmark.url });
    });

    container.appendChild(card);
  }
});

fetch("https://v1.hitokoto.cn/")
	.then((response) => response.json())
	.then((data) => {
		document.getElementById("hitokoto").innerHTML = data.hitokoto;
		document.getElementById("from_who").innerHTML = data.from_who;
		document.getElementById("from").innerHTML = data.from;
	})
	.catch(console.error);

  function BingSearch() {  
    const input = document.getElementById('search-input').value;    
    const url = `https://www.bing.com/search?q=${encodeURIComponent(input)}`;    
    window.open(url, '_self');    
}  

document.addEventListener('DOMContentLoaded', (event) => {  
    let SearchButton = document.getElementById('search-button');  
    let SearchInput = document.getElementById('search-input');

    if (SearchButton && SearchInput) {  
        SearchButton.addEventListener('click', BingSearch);
        SearchInput.addEventListener('keydown', function (event) {
            // Check if the pressed key is Enter (key code 13)
            if (event.keyCode === 13) {
                BingSearch();
            }
        });
    } else {  
        console.error('Element with id "search-button" or "search-input" not found');  
    }  
});

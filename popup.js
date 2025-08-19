chrome.storage.local.get({ playlist: [] }, (result) => {
  const list = document.getElementById("results");
  result.playlist.forEach((album) => {
    const item = document.createElement("div");
    const iframe = `<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=${album.id}/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="${album.url}">${album.title}</a></iframe>`;
    item.innerHTML = iframe;
    list.appendChild(item);
    console.log(result);
  });
});

document.getElementById("add").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        func: () => {
          const data = document
            .querySelector("meta[name=bc-page-properties]")
            ?.getAttribute("content");
          const title = document
            .querySelector("meta[name=title]")
            ?.getAttribute("content");
          const url = document
            .querySelector("meta[property='og:url']")
            ?.getAttribute("content");
          const parsed = JSON.parse(data);
          const id = parsed.item_id;
          console.log("content" + id, title, url);
          return { id, title, url };
        },
      },
      (results) => {
        const response = results[0].result;
        chrome.storage.local.get({ playlist: [] }, (result) => {
          const alreadyExists = result.playlist.some(
            (a) => a.id === response.id
          );
          if (alreadyExists) {
            console.log("Already in playlist");
            return;
          }

          const item = document.createElement("div");
          const iframe = `<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=${response.id}/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="${response.url}">${response.title}</a></iframe>`;
          item.innerHTML = iframe;
          document.getElementById("results").appendChild(item);
          console.log(item);
          console.log(response.id, response.title, response.url);

          const updated = [...result.playlist, response];
          chrome.storage.local.set({ playlist: updated }, () => {
            console.log("Playlist Saved ok");
          });
        });
      }
    );
  });
});

document.getElementById("clear").addEventListener("click", () => {
  chrome.storage.local.set({ playlist: [] }, () => {
    document.getElementById("results").innerHTML = "";
  });
});

document.getElementById("open-player").addEventListener("click", () => {
  chrome.windows.create({
    url: chrome.runtime.getURL("player.html"),
    type: "popup",
    width: 420,
    height: 600,
  });
});

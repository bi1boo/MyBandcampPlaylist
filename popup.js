chrome.storage.local.get({ playlist: [] }, (result) => {
  const list = document.getElementById("results");
  result.playlist.forEach((album) => {
    const item = document.createElement("div");
    let iframe;
    if (!album.is_album) {
      iframe = `<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/track=${album.id}/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="${album.url}">${album.title}</a></iframe>`;
    } else if (album.is_album) {
      iframe = `<iframe style="border: 0; width: 365px; height: 178px;" src="https://bandcamp.com/EmbeddedPlayer/album=${album.id}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true/" seamless><a href="${album.url}">${album.title}</a></iframe>`;
      // iframe = `<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=${album.id}/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="${album.url}">${album.title}</a></iframe>`;
    }
    item.innerHTML = iframe;
    list.appendChild(item);
  });
});

document.getElementById("add").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        func: () => {
          const current_url = window.location.href;
          const is_album = !current_url.includes("/track/");

          if (is_album) {
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
            return { is_album, id, title, url };
          } else {
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
            return { is_album, id, title, url };
          }
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
          let iframe = "";
          if (!response.is_album) {
            iframe = `<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/track=${response.id}/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="${response.url}">${response.title}</a></iframe>`;
          } else if (response.is_album) {
            iframe = `<iframe style="border: 0; width: 400px; height: 208px;" src="https://bandcamp.com/EmbeddedPlayer/album=${response.id}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/" seamless><a href="${response.url}">${response.title}</a></iframe>`;

            // iframe = `<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=${response.id}/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="${response.url}">${response.title}</a></iframe>`;
          }

          item.innerHTML = iframe;
          document.getElementById("results").appendChild(item);
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

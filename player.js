chrome.storage.local.get({ playlist: [] }, (result) => {
  const list = document.getElementById("results");
  result.playlist.forEach((album) => {
    const item = document.createElement("div");
    let iframe = "";
    if (album.is_album) {
      iframe = `<iframe style="border: 0; width: 400px; height: 208px;" src="https://bandcamp.com/EmbeddedPlayer/album=${album.id}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/" seamless><a href=“${album.url}”>${album.title}</a></iframe>`;
    } else {
      iframe = `<iframe style="border: 0; width: 400px; height: 208px;" src="https://bandcamp.com/EmbeddedPlayer/track=${album.id}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/" seamless><a href=“${album.url}”>${album.title}</a></iframe>`;
    }
    item.innerHTML = iframe;
    list.appendChild(item);
    console.log(result);
  });
});

document.getElementById("clear").addEventListener("click", () => {
  chrome.storage.local.set({ playlist: [] }, () => {
    document.getElementById("results").innerHTML = "";
  });
});

document.getElementById("refresh").addEventListener("click", () => {
  chrome.storage.local.get({ playlist: [] }, (result) => {
    const list = document.getElementById("results");
    list.innerHTML = "";
    result.playlist.forEach((album) => {
      const item = document.createElement("div");
      let iframe = "";
      if (album.is_album) {
        iframe = `<iframe style="border: 0; width: 400px; height: 208px;" src="https://bandcamp.com/EmbeddedPlayer/album=${album.id}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/" seamless><a href=“${album.url}”>${album.title}</a></iframe>`;
      } else {
        iframe = `<iframe style="border: 0; width: 400px; height: 208px;" src="https://bandcamp.com/EmbeddedPlayer/track=${album.id}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/" seamless><a href=“${album.url}”>${album.title}</a></iframe>`;
      }
      item.innerHTML = iframe;
      list.appendChild(item);
      console.log(result);
      console.log("clicked");
    });
  });
});

// chrome.storage.onChanged.addListener((changes, areaName) => {
//   console.log("something changed");
//   if (areaName === "local" && changes.playlist) {
//     const newValue = changes.playlist.newValue;
//     const oldValue = changes.playlist.oldValue || [];
//     const addedValue = newValue.slice(oldValue.length);
//     // chrome.storage.local.get({playlist:[]}, result =>{
//     const list = document.getElementById("results");
//     // list.innerHTML = ""
//     addedValue.forEach((album) => {
//       const item = document.createElement("div");
//       const iframe = `<iframe style="border: 0; width: 400px; height: 208px;" src="https://bandcamp.com/EmbeddedPlayer/album=${album.id}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/" seamless><a href="${album.url}">${album.title}</a></iframe>`;
//       item.innerHTML = iframe;
//       list.appendChild(item);
//       console.log(result);
//       console.log("clicked");
//     });
//   }
// });

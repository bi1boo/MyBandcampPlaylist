// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "extractLinks"){
//         console.log("clicked")
//         const data = document.querySelector("meta[name=bc-page-properties]")?.getAttribute("content")
//         const title = document.querySelector("meta[name=title]")?.getAttribute("content")
//         const url = document.querySelector("meta[property='og:url']")?.getAttribute("content")
//         const parsed = JSON.parse(data)
//         const id = parsed.item_id
//         console.log("content" + id, title, url)
//         sendResponse({id: id, title: title, url: url})
//         return true
//                 }})


        // link = Array.from(document.querySelectorAll("a")).find(bc => bc.href.includes("bandcamp"))
        // fetch(link.href).then(res => res.text())
        // .then(html => {
        //     const parser = new DOMParser()
        //     const doc = parser.parseFromString(html, "text/html")
        //     }
        
        
        

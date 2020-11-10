export const observeDOM = (function () {
    let MutationObserver = window.MutationObserver;

    if (!MutationObserver) {
        MutationObserver = (window as any).WebKitMutationObserver;
    }

    return function (obj, callback) {
        if (!obj || obj.nodeType !== 1) return;

        if (MutationObserver) {
            // define a new observer
            const mutationObserver = new MutationObserver(callback)

            // have the observer observe foo for changes in children
            mutationObserver.observe(obj, { childList: true, subtree: true })
            return mutationObserver
        }

        // browser support fallback
        else if (window.addEventListener) {
            obj.addEventListener('DOMNodeInserted', callback, false)
            obj.addEventListener('DOMNodeRemoved', callback, false)
        }
    }
})()

/*
//------------< DEMO BELOW >----------------

// add item
var itemHTML = "<li><button>list item (click to delete)</button></li>",
    listElm = document.querySelector('ol');

let btn = document.querySelector('body > button') as HTMLElement;
btn.onclick = function (e) {
    listElm.insertAdjacentHTML("beforeend", itemHTML);
}

// delete item
listElm.onclick = function (e: any) {
    if (e.target.nodeName == "BUTTON")
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
}

// Observe a specific DOM element:
observeDOM(listElm, function (m) {
    var addedNodes = [], removedNodes = [];

    m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))

    m.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes))

    console.clear();
    console.log('Added:', addedNodes, 'Removed:', removedNodes);
});


// Insert 3 DOM nodes at once after 3 seconds
setTimeout(function () {
    listElm.removeChild(listElm.lastElementChild);
    listElm.insertAdjacentHTML("beforeend", Array(4).join(itemHTML));
}, 3000);

*/
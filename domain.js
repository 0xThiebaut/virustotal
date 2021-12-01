const sha256 = /^[A-Fa-f0-9]{64}$/
const ip = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const domain = /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/
browser.webRequest.onBeforeRequest.addListener(
    search,
    {
        urls: [
            "*://www.virustotal.com/gui/search/*",
        ],
        types: ["main_frame"]
    },
    ["blocking"]
);

function search(details) {
    // Create a new URL object
    const url = new URL(details.url);
    // Get the path
    const search = url.pathname.slice("/gui/search/".length)
    // Redirect SHA256 and IPs
    if (search.match(sha256)) {
        // Update the path to point to the file directly
        url.pathname = "/gui/file/" + search
        // Remove the search terms
        url.search = ""
        return {redirectUrl: url.toString()}
    } else if (search.match(ip)) {
        // Update the path to point to the IP directly
        url.pathname = "/gui/ip-address/" + search
        // Remove the search terms
        url.search = ""
        return {redirectUrl: url.toString()}
    } else if (search.match(domain)) {
        // Update the path to point to the domain directly
        url.pathname = "/gui/domain/" + search
        // Remove the search terms
        url.search = ""
        return {redirectUrl: url.toString()}
    }
}
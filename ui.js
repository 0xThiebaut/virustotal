// Create a new script block
vtgc_script = document.createElement("script")
// Populate the detection logic
vtgc_script.text = `
// Get the home search bar
function vtgc_get_home_bar() {
    try {
        return document.querySelector("home-view").shadowRoot
            .querySelector("vt-ui-search-bar").shadowRoot
            .querySelector("vt-ui-text-input").shadowRoot
            .querySelector("#input:not([data-vtgc])")
    } catch (_) {
        return null
    }
}

// Get the shell search bar
function vtgc_get_shell_bar() {
    try {
        return document.querySelector("vt-ui-shell").shadowRoot
            .querySelector("vt-ui-search-bar").shadowRoot
            .querySelector("vt-ui-text-input").shadowRoot
            .querySelector("#input:not([data-vtgc])")
    } catch (_) {
        return null
    }
}

// Redirect on search
function vtgc_on_search(event) {
    const sha256 = /^[A-Fa-f0-9]{64}$/
    const ip = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    const_domain = /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\\.(xn--)?([a-z0-9\\-]{1,61}|[a-z0-9-]{1,30}\\.[a-z]{2,})$/
    if (event.key === "Enter") {
        // Redirect SHA256, IPs and Domains
        if (this.value.match(sha256)) {
            // Update the path to point to the file directly
            event.preventDefault()
            event.stopImmediatePropagation()
            document.location.pathname = "/gui/file/" + this.value
        } else if (this.value.match(ip)) {
            // Update the path to point to the IP directly
            event.preventDefault()
            event.stopImmediatePropagation()
            document.location.pathname = "/gui/ip-address/" + this.value
        } else if (this.value.match(domain)) {
            // Update the path to point to the domain directly
            event.preventDefault()
            event.stopImmediatePropagation()
            document.location.pathname = "/gui/domain/" + this.value
        }
    }
}

// Search for hook-able inputs and hook
function vtgc_hook() {
    let bar = vtgc_get_home_bar()
    if (bar) {
        bar.setAttribute("data-vtgc", "garbage-collected")
        bar.addEventListener("keydown", vtgc_on_search)
    }
    bar = vtgc_get_shell_bar()
    if (bar) {
        bar.setAttribute("data-vtgc", "garbage-collected")
        bar.addEventListener("keydown", vtgc_on_search)
    }
}

// Hook on document changes
const observer = new MutationObserver(vtgc_hook)
observer.observe(document, {childList: true, subtree: true})`

// Inject the script
document.documentElement.appendChild(vtgc_script)
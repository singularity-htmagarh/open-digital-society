function renderNavbar(activePage) {
    return `
    <div class="navbar-floating">
        <img src="/static/ods-logo-new.png" alt="Open Digital Society Logo" class="navbar-logo-img" style="height:48px;width:auto;border-radius:16px;background:#fff;padding:4px;margin-right:2em;" />
        <div class="navbar-links">
            <a href="/"${activePage === 'home' ? ' class="active"' : ''}>Home</a>
            <a href="/features"${activePage === 'features' ? ' class="active"' : ''}>Features</a>
            <a href="/pricing"${activePage === 'pricing' ? ' class="active"' : ''}>Pricing</a>
            <a href="/faqs"${activePage === 'faqs' ? ' class="active"' : ''}>FAQs</a>
            <a href="/signup"${activePage === 'signup' ? ' class="active"' : ''}>Sign Up</a>
        </div>
        <a href="/signup" class="navbar-cta">Start For Free</a>
    </div>
    `;
}

function injectNavbar(activePage) {
    document.body.insertAdjacentHTML('afterbegin', renderNavbar(activePage));
}

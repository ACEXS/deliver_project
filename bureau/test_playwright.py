from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    print('Playwright installed successfully')
    # Try to launch chromium
    try:
        browser = p.chromium.launch(headless=True)
        print('Chromium launched successfully')
        browser.close()
    except Exception as e:
        print('Error launching chromium:', e)

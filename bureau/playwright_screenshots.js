const { chromium } = require('playwright');

async function takeScreenshots() {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // 登录页面
    await page.goto('http://localhost:8000');
    await page.waitForSelector('#loginForm');
    await page.screenshot({ path: 'screenshots/login_page.png', fullPage: true });
    console.log('Login page screenshot taken');

    // 登录
    await page.fill('#username', 'admin');
    await page.fill('#password', '123456');
    await page.click('#loginForm button[type="submit"]');
    await page.waitForSelector('.main-layout');
    console.log('LoggedIn successfully');

    // 首页
    await page.screenshot({ path: 'screenshots/dashboard_page.png', fullPage: true });
    console.log('Dashboard page screenshot taken');

    // 商品管理
    await page.click('.nav-item[data-page="products"]');
    await page.waitForSelector('#products-page');
    await page.screenshot({ path: 'screenshots/products_page.png', fullPage: true });
    console.log('Products page screenshot taken');

    // 订单管理
    await page.click('.nav-item[data-page="orders"]');
    await page.waitForSelector('#orders-page');
    await page.screenshot({ path: 'screenshots/orders_page.png', fullPage: true });
    console.log('Orders page screenshot taken');

    // 农户管理
    await page.click('.nav-item[data-page="farmers"]');
    await page.waitForSelector('#farmers-page');
    await page.screenshot({ path: 'screenshots/farmers_page.png', fullPage: true });
    console.log('Farmers page screenshot taken');

    // 资讯管理
    await page.click('.nav-item[data-page="news"]');
    await page.waitForSelector('#news-page');
    await page.screenshot({ path: 'screenshots/news_page.png', fullPage: true });
    console.log('News page screenshot taken');

    // 数据统计
    await page.click('.nav-item[data-page="statistics"]');
    await page.waitForSelector('#statistics-page');
    await page.screenshot({ path: 'screenshots/statistics_page.png', fullPage: true });
    console.log('Statistics page screenshot taken');

    // 帮扶项目
    await page.click('.nav-item[data-page="projects"]');
    await page.waitForSelector('#projects-page');
    await page.screenshot({ path: 'screenshots/projects_page.png', fullPage: true });
    console.log('Projects page screenshot taken');

    // 系统设置
    await page.click('.nav-item[data-page="settings"]');
    await page.waitForSelector('#settings-page');
    await page.screenshot({ path: 'screenshots/settings_page.png', fullPage: true });
    console.log('Settings page screenshot taken');

    await browser.close();
    console.log('All screenshots taken successfully');
}

takeScreenshots().catch(console.error);
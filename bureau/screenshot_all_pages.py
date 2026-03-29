from playwright.sync_api import sync_playwright
import time
import os

def screenshot_all_pages():
    # 创建image目录
    if not os.path.exists('image'):
        os.makedirs('image')
    
    with sync_playwright() as p:
        # 启动浏览器
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({'width': 1920, 'height': 1080})
        
        try:
            # 访问登录页面
            page.goto('http://localhost:8001')
            time.sleep(1)
            # 截图登录页面
            page.screenshot(path='image/login_page.png', full_page=True)
            print('登录页面截图完成')
            
            # 登录
            page.fill('#username', 'admin')
            page.fill('#password', 'admin')
            page.click('button[type="submit"]')
            time.sleep(2)
            
            # 测试首页
            print('测试首页...')
            page.click('a.nav-item[data-page="dashboard"]')
            time.sleep(1)
            # 截图首页
            page.screenshot(path='image/dashboard_page.png', full_page=True)
            print('首页截图完成')
            
            # 测试商品管理页面
            print('测试商品管理页面...')
            page.click('a.nav-item[data-page="products"]')
            time.sleep(1)
            # 截图商品管理页面
            page.screenshot(path='image/products_page.png', full_page=True)
            print('商品管理页面截图完成')
            
            # 测试订单管理页面
            print('测试订单管理页面...')
            page.click('a.nav-item[data-page="orders"]')
            time.sleep(1)
            # 截图订单管理页面

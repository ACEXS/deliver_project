from playwright.sync_api import sync_playwright
import time
import os

def test_all_pages():
    # 创建screenshots目录
    if not os.path.exists('screenshots'):
        os.makedirs('screenshots')
    
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
            page.screenshot(path='screenshots/login_page.png', full_page=True)
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
            page.screenshot(path='screenshots/dashboard_page.png', full_page=True)
            print('首页截图完成')
            
            # 测试商品管理页面
            print('测试商品管理页面...')
            page.click('a.nav-item[data-page="products"]')
            time.sleep(1)
            # 截图商品管理页面
            page.screenshot(path='screenshots/products_page.png', full_page=True)
            print('商品管理页面截图完成')
            # 点击添加商品按钮
            page.click('#addProductBtn')
            time.sleep(1)
            # 关闭模态框
            page.click('#modalClose')
            time.sleep(1)
            
            # 测试订单管理页面
            print('测试订单管理页面...')
            page.click('a.nav-item[data-page="orders"]')
            time.sleep(1)
            # 截图订单管理页面
            page.screenshot(path='screenshots/orders_page.png', full_page=True)
            print('订单管理页面截图完成')
            
            # 测试农户管理页面
            print('测试农户管理页面...')
            page.click('a.nav-item[data-page="farmers"]')
            time.sleep(1)
            # 截图农户管理页面
            page.screenshot(path='screenshots/farmers_page.png', full_page=True)
            print('农户管理页面截图完成')
            # 点击添加农户按钮
            page.click('#addFarmerBtn')
            time.sleep(1)
            # 关闭模态框
            page.click('#modalClose')
            time.sleep(1)
            
            # 测试资讯管理页面
            print('测试资讯管理页面...')
            page.click('a.nav-item[data-page="news"]')
            time.sleep(1)
            # 截图资讯管理页面
            page.screenshot(path='screenshots/news_page.png', full_page=True)
            print('资讯管理页面截图完成')
            # 点击发布资讯按钮
            page.click('#addNewsBtn')
            time.sleep(1)
            # 关闭模态框
            page.click('#modalClose')
            time.sleep(1)
            
            # 测试数据统计页面
            print('测试数据统计页面...')
            page.click('a.nav-item[data-page="statistics"]')
            time.sleep(1)
            # 截图数据统计页面
            page.screenshot(path='screenshots/statistics_page.png', full_page=True)
            print('数据统计页面截图完成')
            
            # 测试帮扶项目页面
            print('测试帮扶项目页面...')
            page.click('a.nav-item[data-page="projects"]')
            time.sleep(1)
            # 截图帮扶项目页面
            page.screenshot(path='screenshots/projects_page.png', full_page=True)
            print('帮扶项目页面截图完成')
            # 点击新增项目按钮
            page.click('#addProjectBtn')
            time.sleep(1)
            # 关闭模态框
            page.click('#modalClose')
            time.sleep(1)
            
            # 测试系统设置页面
            print('测试系统设置页面...')
            page.click('a.nav-item[data-page="settings"]')
            time.sleep(1)
            # 截图系统设置页面
            page.screenshot(path='screenshots/settings_page.png', full_page=True)
            print('系统设置页面截图完成')
            
            # 测试退出登录
            print('测试退出登录...')
            page.click('#logoutBtn')
            time.sleep(1)
            
            print('所有页面测试完成！')
            print('所有页面截图完成！')
            
        finally:
            # 关闭浏览器
            browser.close()

if __name__ == '__main__':
    test_all_pages()

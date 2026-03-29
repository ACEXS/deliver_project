from playwright.sync_api import sync_playwright
import time

def test_tourism_monitoring_system():
    with sync_playwright() as p:
        # 启动浏览器
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        
        try:
            # 1. 测试登录页面
            print("=== 测试登录页面 ===")
            page.goto('http://localhost:3000/')
            page.wait_for_load_state('networkidle')
            
            # 截图登录页面
            page.screenshot(path='tests/login_page.png', full_page=True)
            print("登录页面加载成功")
            
            # 填写登录表单
            page.fill('input[name="username"]', 'admin')
            page.fill('input[name="password"]', '123456')
            
            # 点击登录按钮
            page.click('button[type="submit"]')
            page.wait_for_load_state('networkidle')
            
            # 2. 测试仪表盘页面
            print("=== 测试仪表盘页面 ===")
            page.screenshot(path='tests/dashboard_page.png', full_page=True)
            print("仪表盘页面加载成功")
            
            # 3. 测试实时监控页面
            print("=== 测试实时监控页面 ===")
            page.click('text=实时监控')
            page.wait_for_load_state('networkidle')
            page.screenshot(path='tests/realtime_monitoring_page.png', full_page=True)
            print("实时监控页面加载成功")
            
            # 4. 测试历史数据页面
            print("=== 测试历史数据页面 ===")
            page.click('text=历史数据')
            page.wait_for_load_state('networkidle')
            page.screenshot(path='tests/historical_data_page.png', full_page=True)
            print("历史数据页面加载成功")
            
            # 5. 测试趋势预测页面
            print("=== 测试趋势预测页面 ===")
            page.click('text=趋势预测')
            page.wait_for_load_state('networkidle')
            page.screenshot(path='tests/trend_prediction_page.png', full_page=True)
            print("趋势预测页面加载成功")
            
            # 6. 测试景区分析页面
            print("=== 测试景区分析页面 ===")
            page.click('text=景区分析')
            page.wait_for_load_state('networkidle')
            page.screenshot(path='tests/scenic_spot_analysis_page.png', full_page=True)
            print("景区分析页面加载成功")
            
            # 7. 测试退出登录
            print("=== 测试退出登录 ===")
            page.click('text=退出登录')
            page.wait_for_load_state('networkidle')
            page.screenshot(path='tests/logout_page.png', full_page=True)
            print("退出登录成功")
            
            # 检查是否返回登录页面
            if "登录" in page.title():
                print("系统测试全部通过！")
            else:
                print("退出登录后未返回登录页面")
                
        finally:
            # 关闭浏览器
            browser.close()

if __name__ == "__main__":
    test_tourism_monitoring_system()

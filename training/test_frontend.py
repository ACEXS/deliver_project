from playwright.sync_api import sync_playwright
import os

# 创建image目录
image_dir = 'image'
if not os.path.exists(image_dir):
    os.makedirs(image_dir)

def test_frontend():
    with sync_playwright() as p:
        # 启动浏览器
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        
        try:
            # 1. 测试登录页面
            print("测试登录页面...")
            page.goto('http://localhost:5173')
            page.wait_for_load_state('networkidle')
            page.screenshot(path=os.path.join(image_dir, 'login.png'), full_page=True)
            
            # 打印页面内容以调试
            print("页面内容:")
            print(page.content())
            
            # 登录系统
            print("尝试登录...")
            page.fill('input[id="username"]', 'admin')
            page.fill('input[id="password"]', 'admin123')
            
            # 点击登录按钮
            login_button = page.locator('button[type="submit"]')
            print(f"登录按钮是否可见: {login_button.is_visible()}")
            print(f"登录按钮是否启用: {login_button.is_enabled()}")
            
            # 使用click方法登录
            login_button.click()
            print("点击登录按钮后...")
            
            # 等待页面跳转
            page.wait_for_load_state('networkidle')
            print(f"当前URL: {page.url}")
            
            # 2. 测试仪表盘
            print("测试仪表盘页面...")
            page.screenshot(path=os.path.join(image_dir, 'dashboard.png'), full_page=True)
            
            # 3. 测试培训管理
            print("测试培训管理页面...")
            page.click('a[href="/training"]')
            page.wait_for_load_state('networkidle')
            page.screenshot(path=os.path.join(image_dir, 'training_management.png'), full_page=True)
            
            # 4. 测试学员管理
            print("测试学员管理页面...")
            page.click('a[href="/students"]')
            page.wait_for_load_state('networkidle')
            page.screenshot(path=os.path.join(image_dir, 'student_management.png'), full_page=True)
            
            # 5. 测试打卡记录
            print("测试打卡记录页面...")
            page.click('a[href="/checkin"]')
            page.wait_for_load_state('networkidle')
            page.screenshot(path=os.path.join(image_dir, 'checkin_records.png'), full_page=True)
            
            # 6. 测试培训报表
            print("测试培训报表页面...")
            page.click('a[href="/reports"]')
            page.wait_for_load_state('networkidle')
            page.screenshot(path=os.path.join(image_dir, 'training_reports.png'), full_page=True)
            
            # 7. 测试系统设置
            print("测试系统设置页面...")
            page.click('a[href="/settings"]')
            page.wait_for_load_state('networkidle')
            page.screenshot(path=os.path.join(image_dir, 'system_settings.png'), full_page=True)
            
            print("所有页面测试完成，截图已保存到image目录")
            
        except Exception as e:
            print(f"测试过程中出错: {e}")
            # 保存错误截图
            page.screenshot(path=os.path.join(image_dir, 'error.png'), full_page=True)
            raise
        finally:
            # 关闭浏览器
            browser.close()

if __name__ == "__main__":
    test_frontend()
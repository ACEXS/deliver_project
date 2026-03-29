from docx2pdf import convert
import os

# 定义文件路径
input_docx = "f:\\Technology\\Code\\Trae\\Scenic\\产品使用说明书_最终版.docx"
output_pdf = "f:\\Technology\\Code\\Trae\\Scenic\\产品使用说明书_最终版.pdf"

print(f"正在将 {input_docx} 转换为 PDF...")

try:
    # 执行转换
    convert(input_docx, output_pdf)
    print(f"转换成功！PDF文件已保存为：{output_pdf}")
    
    # 验证文件是否存在
    if os.path.exists(output_pdf):
        file_size = os.path.getsize(output_pdf) / 1024 / 1024  # 转换为MB
        print(f"PDF文件大小：{file_size:.2f} MB")
    else:
        print("转换失败，PDF文件未生成")
        
except Exception as e:
    print(f"转换过程中出错：{str(e)}")

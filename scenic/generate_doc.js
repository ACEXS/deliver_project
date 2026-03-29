const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
        Header, Footer, AlignmentType, PageOrientation, LevelFormat, ExternalHyperlink,
        TableOfContents, HeadingLevel, BorderStyle, WidthType, ShadingType,
        VerticalAlign, PageNumber, PageBreak } = require('docx');
const fs = require('fs');

// 创建文档
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 240, after: 240 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 180, after: 180 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 120, after: 120 }, outlineLevel: 2 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: {
          width: 12240,
          height: 15840
        },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({ children: [new Paragraph({ children: [new TextRun({ text: "泰宁县旅游监控系统 - 产品使用说明书", bold: true, size: 20 })] })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({ children: [new TextRun("第 "), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun(" 页")] })] })
    },
    children: [
      new Paragraph({ children: [new TextRun({ text: "泰宁县旅游监控系统", bold: true, size: 48 })], alignment: AlignmentType.CENTER }),
      new Paragraph({ children: [new TextRun({ text: "产品使用说明书", bold: true, size: 36 })], alignment: AlignmentType.CENTER }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      new Paragraph({ children: [new TextRun({ text: "版本：V1.0" })] }),
      new Paragraph({ children: [new TextRun({ text: "日期：2026年3月" })] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 目录
      new TableOfContents("目录", { hyperlink: true, headingStyleRange: "1-3" }),
      new Paragraph({ children: [new PageBreak()] }),
      
      // 1. 系统概述
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. 系统概述")] }),
      new Paragraph({ children: [new TextRun("泰宁县旅游监控系统是一套专门为福建省泰宁县开发的旅游数据监控平台，旨在为景区管理部门提供实时、全面的旅游数据监测和分析能力。系统通过整合多源数据，实现了对景区游客流量、车辆数量、环境指标等关键数据的实时监控、历史数据分析和趋势预测，为景区管理决策提供科学依据。")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 1.1 系统架构
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.1 系统架构")] }),
      new Paragraph({ children: [new TextRun("系统采用前后端分离架构，主要由以下部分组成：")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("前端：React + TypeScript + Vite + Ant Design + ECharts")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("后端：Node.js + Express + MySQL + Redis")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("认证：JWT 令牌")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("数据可视化：ECharts")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("响应式设计：适配多种设备屏幕")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 1.2 系统功能
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.2 系统功能")] }),
      new Paragraph({ children: [new TextRun("系统提供以下核心功能：")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("实时监控：实时展示景区游客数量、车辆数量、环境指标等数据，支持自动刷新")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("历史数据：查询和分析历史旅游数据，支持按日期范围筛选")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("趋势预测：基于历史数据进行未来7天的游客流量预测")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("景点分析：分析各景点的游客分布和热门程度")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("数据可视化：通过图表直观展示各类旅游数据")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 2. 页面功能说明
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. 页面功能说明")] }),
      
      // 2.1 登录页面
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 登录页面")] }),
      new Paragraph({ children: [new TextRun("登录页面是系统的入口，用户需要输入正确的用户名和密码才能进入系统。")] }),
      new Paragraph({ children: [new TextRun("主要功能：")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("用户身份认证")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("表单验证")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("登录失败提示")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      new Paragraph({ children: [new ImageRun({ type: "png", data: fs.readFileSync("f:\\Technology\\Code\\Trae\\Scenic\\image\\login_page_full-2026-03-27T20-21-33-296Z.png"), transformation: { width: 600, height: 400 } })] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 2.2 仪表盘页面
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 仪表盘页面")] }),
      new Paragraph({ children: [new TextRun("仪表盘页面展示系统的核心指标和概览数据，帮助用户快速了解景区整体情况。")] }),
      new Paragraph({ children: [new TextRun("主要功能：")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("核心指标展示：游客总数、车辆总数、平均停留时间等")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("实时数据概览")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("关键数据可视化")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      new Paragraph({ children: [new ImageRun({ type: "png", data: fs.readFileSync("f:\\Technology\\Code\\Trae\\Scenic\\image\\dashboard_full-2026-03-27T20-22-37-766Z.png"), transformation: { width: 700, height: 500 } })] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 2.3 实时监控页面
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.3 实时监控页面")] }),
      new Paragraph({ children: [new TextRun("实时监控页面是系统的默认页面，展示景区的实时数据，支持自动刷新功能。")] }),
      new Paragraph({ children: [new TextRun("主要功能：")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("实时游客数量监控")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("实时车辆数量监控")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("环境指标监测")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("自动刷新功能")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      new Paragraph({ children: [new ImageRun({ type: "png", data: fs.readFileSync("f:\\Technology\\Code\\Trae\\Scenic\\image\\realtime_monitoring_full.png"), transformation: { width: 700, height: 500 } })] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 2.4 历史数据页面
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.4 历史数据页面")] }),
      new Paragraph({ children: [new TextRun("历史数据页面用于查询和分析景区的历史旅游数据，支持按日期范围进行筛选。")] }),
      new Paragraph({ children: [new TextRun("主要功能：")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("日期范围选择")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("历史数据查询")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("数据导出")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("历史趋势分析")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      new Paragraph({ children: [new ImageRun({ type: "png", data: fs.readFileSync("f:\\Technology\\Code\\Trae\\Scenic\\image\\historical_data_full-2026-03-27T20-22-54-917Z.png"), transformation: { width: 700, height: 500 } })] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 2.5 趋势预测页面
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.5 趋势预测页面")] }),
      new Paragraph({ children: [new TextRun("趋势预测页面基于历史数据，使用预测算法对未来7天的游客流量进行预测。")] }),
      new Paragraph({ children: [new TextRun("主要功能：")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("7天游客流量预测")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("趋势图表展示")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("预测准确度评估")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      new Paragraph({ children: [new ImageRun({ type: "png", data: fs.readFileSync("f:\\Technology\\Code\\Trae\\Scenic\\image\\trend_prediction_full_correct-2026-03-27T20-26-29-090Z.png"), transformation: { width: 700, height: 500 } })] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 2.6 景点分析页面
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.6 景点分析页面")] }),
      new Paragraph({ children: [new TextRun("景点分析页面展示各景点的游客分布和热门程度，支持多维度分析。")] }),
      new Paragraph({ children: [new TextRun("主要功能：")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("景点游客分布分析")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("热门景点排行")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("多维度数据展示")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      new Paragraph({ children: [new ImageRun({ type: "png", data: fs.readFileSync("f:\\Technology\\Code\\Trae\\Scenic\\image\\scenic_analysis_full-2026-03-27T20-23-29-183Z.png"), transformation: { width: 700, height: 500 } })] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 3. 操作指南
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. 操作指南")] }),
      
      // 3.1 登录系统
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 登录系统")] }),
      new Paragraph({ children: [new TextRun("1. 打开浏览器，访问系统地址：http://localhost:3002")] }),
      new Paragraph({ children: [new TextRun("2. 在登录页面输入用户名和密码")] }),
      new Paragraph({ children: [new TextRun("3. 点击登录按钮，系统验证通过后会自动跳转到实时监控页面")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 3.2 导航系统
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.2 导航系统")] }),
      new Paragraph({ children: [new TextRun("系统左侧为导航菜单，包含以下选项：")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("仪表盘：查看系统核心指标")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("实时监控：查看实时数据")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("历史数据：查询历史数据")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("趋势预测：查看未来趋势预测")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("景点分析：分析各景点数据")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("退出登录：退出系统")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 3.3 实时监控操作
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.3 实时监控操作")] }),
      new Paragraph({ children: [new TextRun("1. 系统默认进入实时监控页面")] }),
      new Paragraph({ children: [new TextRun("2. 页面会自动刷新数据，显示最新的实时数据")] }),
      new Paragraph({ children: [new TextRun("3. 可以通过页面上的图表直观查看各项实时指标")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 3.4 历史数据查询
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.4 历史数据查询")] }),
      new Paragraph({ children: [new TextRun("1. 点击左侧导航菜单中的历史数据选项")] }),
      new Paragraph({ children: [new TextRun("2. 在日期选择器中选择要查询的开始日期和结束日期")] }),
      new Paragraph({ children: [new TextRun("3. 点击查询按钮，系统会显示指定日期范围内的历史数据")] }),
      new Paragraph({ children: [new TextRun("4. 可以通过图表查看数据趋势")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 3.5 趋势预测查看
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.5 趋势预测查看")] }),
      new Paragraph({ children: [new TextRun("1. 点击左侧导航菜单中的趋势预测选项")] }),
      new Paragraph({ children: [new TextRun("2. 系统会自动显示未来7天的游客流量预测数据")] }),
      new Paragraph({ children: [new TextRun("3. 可以通过图表查看预测趋势")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 3.6 景点分析查看
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.6 景点分析查看")] }),
      new Paragraph({ children: [new TextRun("1. 点击左侧导航菜单中的景点分析选项")] }),
      new Paragraph({ children: [new TextRun("2. 系统会显示各景点的游客分布和热门程度数据")] }),
      new Paragraph({ children: [new TextRun("3. 可以通过不同的图表和选项卡查看多维度的分析数据")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 4. 技术配置
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. 技术配置")] }),
      
      // 4.1 系统要求
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 系统要求")] }),
      new Paragraph({ children: [new TextRun("前端系统要求：")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("现代浏览器（Chrome、Firefox、Edge等）")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("网络连接")] }),
      new Paragraph({ children: [new TextRun("后端系统要求：")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Node.js 14+")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("MySQL 5.7+")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Redis 6.0+")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 4.2 部署说明
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2 部署说明")] }),
      new Paragraph({ children: [new TextRun("前端部署：")] }),
      new Paragraph({ children: [new TextRun("1. 进入前端目录：cd frontend")] }),
      new Paragraph({ children: [new TextRun("2. 安装依赖：npm install")] }),
      new Paragraph({ children: [new TextRun("3. 构建项目：npm run build")] }),
      new Paragraph({ children: [new TextRun("4. 部署dist目录到web服务器")] }),
      new Paragraph({ children: [new TextRun("后端部署：")] }),
      new Paragraph({ children: [new TextRun("1. 进入后端目录：cd backend")] }),
      new Paragraph({ children: [new TextRun("2. 安装依赖：npm install")] }),
      new Paragraph({ children: [new TextRun("3. 配置数据库连接")] }),
      new Paragraph({ children: [new TextRun("4. 启动服务：npm start")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 5. 故障排除
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. 故障排除")] }),
      
      // 5.1 常见问题
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.1 常见问题")] }),
      new Paragraph({ children: [new TextRun("1. 登录失败")] }),
      new Paragraph({ children: [new TextRun("   可能原因：用户名或密码错误，网络连接问题")] }),
      new Paragraph({ children: [new TextRun("   解决方法：检查用户名和密码是否正确，检查网络连接")] }),
      new Paragraph({ children: [new TextRun("\n" )] }),
      new Paragraph({ children: [new TextRun("2. 页面加载缓慢")] }),
      new Paragraph({ children: [new TextRun("   可能原因：网络连接问题，服务器负载过高")] }),
      new Paragraph({ children: [new TextRun("   解决方法：检查网络连接，联系系统管理员")] }),
      new Paragraph({ children: [new TextRun("\n" )] }),
      new Paragraph({ children: [new TextRun("3. 数据不显示")] }),
      new Paragraph({ children: [new TextRun("   可能原因：数据库连接问题，数据查询错误")] }),
      new Paragraph({ children: [new TextRun("   解决方法：联系系统管理员检查数据库连接")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 5.2 联系支持
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.2 联系支持")] }),
      new Paragraph({ children: [new TextRun("如有其他问题，请联系系统管理员：")] }),
      new Paragraph({ children: [new TextRun("电话：1234567890")] }),
      new Paragraph({ children: [new TextRun("邮箱：support@tainingscenic.com")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 6. 附录
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("6. 附录")] }),
      
      // 6.1 术语解释
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.1 术语解释")] }),
      new Paragraph({ children: [new TextRun("1. 实时监控：实时获取和展示景区数据")] }),
      new Paragraph({ children: [new TextRun("2. 历史数据：过去一段时间内的景区数据")] }),
      new Paragraph({ children: [new TextRun("3. 趋势预测：基于历史数据预测未来趋势")] }),
      new Paragraph({ children: [new TextRun("4. 景点分析：对各景点数据进行分析")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] }),
      
      // 6.2 快捷键
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.2 快捷键")] }),
      new Paragraph({ children: [new TextRun("1. Ctrl + K：快速导航")] }),
      new Paragraph({ children: [new TextRun("2. Ctrl + R：刷新页面")] }),
      new Paragraph({ children: [new TextRun("3. Ctrl + S：保存数据")] }),
      new Paragraph({ children: [new TextRun({ text: "\n" })] })
    ]
  }]
});

// 生成文档
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("f:\\Technology\\Code\\Trae\\Scenic\\产品使用说明书_最终版.docx", buffer);
  console.log("文档生成成功！");
}).catch(err => {
  console.error("文档生成失败：", err);
});

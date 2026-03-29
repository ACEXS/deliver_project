import { Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType, WidthType, Table, TableRow, TableCell, BorderStyle, ShadingType } from 'docx';
import fs from 'fs';
import path from 'path';

// 读取图片文件
function readImage(imagePath) {
  return fs.readFileSync(imagePath);
}

// 获取图片文件名列表
const imageDir = 'f:\\Technology\\Code\\Trae\\Training\\image';
const imageFiles = fs.readdirSync(imageDir).filter(file => file.endsWith('.png'));

// 按页面顺序排序图片
const imageOrder = [
  'login_page',
  'dashboard_page',
  'training_management_page',
  'student_management_page',
  'checkin_records_page',
  'training_reports_page',
  'system_settings_page'
];

const sortedImages = imageOrder.map(page => {
  const imageFile = imageFiles.find(file => file.includes(page));
  return imageFile ? path.join(imageDir, imageFile) : null;
}).filter(Boolean);

// 创建文档
const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: "Arial",
          size: 24
        }
      }
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: {
          size: 32,
          bold: true,
          font: "Arial"
        },
        paragraph: {
          spacing: {
            before: 240,
            after: 240
          },
          outlineLevel: 0
        }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: {
          size: 28,
          bold: true,
          font: "Arial"
        },
        paragraph: {
          spacing: {
            before: 180,
            after: 180
          },
          outlineLevel: 1
        }
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: {
          size: 24,
          bold: true,
          font: "Arial"
        },
        paragraph: {
          spacing: {
            before: 120,
            after: 120
          },
          outlineLevel: 2
        }
      }
    ]
  },
  sections: [
    {
      properties: {
        page: {
          size: {
            width: 12240,  // US Letter
            height: 15840
          },
          margin: {
            top: 1440,
            right: 1440,
            bottom: 1440,
            left: 1440
          }
        }
      },
      children: [
        // 标题
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "泰宁县新实践培训中心", bold: true })
          ]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "党校培训打卡系统", bold: true })
          ]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "产品使用说明书", bold: true })
          ]
        }),
        
        // 版本信息
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({ text: "版本: 1.0" }),
            new TextRun({ text: "\t" }),
            new TextRun({ text: "日期: " + new Date().toLocaleDateString('zh-CN') })
          ]
        }),
        
        // 目录
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({ text: "目录" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "1. 系统概述" }),
            new TextRun({ text: "\t\t\t\t" }),
            new TextRun({ text: "1" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "2. 登录系统" }),
            new TextRun({ text: "\t\t\t\t" }),
            new TextRun({ text: "2" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "3. 功能模块" }),
            new TextRun({ text: "\t\t\t\t" }),
            new TextRun({ text: "3" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "3.1 仪表盘" }),
            new TextRun({ text: "\t\t\t\t" }),
            new TextRun({ text: "3" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "3.2 培训管理" }),
            new TextRun({ text: "\t\t\t\t" }),
            new TextRun({ text: "4" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "3.3 学生管理" }),
            new TextRun({ text: "\t\t\t\t" }),
            new TextRun({ text: "5" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "3.4 打卡记录" }),
            new TextRun({ text: "\t\t\t\t" }),
            new TextRun({ text: "6" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "3.5 培训报告" }),
            new TextRun({ text: "\t\t\t\t" }),
            new TextRun({ text: "7" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "3.6 系统设置" }),
            new TextRun({ text: "\t\t\t\t" }),
            new TextRun({ text: "8" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "4. 操作流程" }),
            new TextRun({ text: "\t\t\t\t" }),
            new TextRun({ text: "9" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "5. 常见问题" }),
            new TextRun({ text: "\t\t\t\t" }),
            new TextRun({ text: "10" })
          ]
        }),
        
        // 系统概述
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({ text: "1. 系统概述" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "泰宁县新实践培训中心党校培训打卡系统是一款专为党校培训管理设计的信息化系统，旨在简化培训流程、提高管理效率、确保培训质量。系统采用现代化的前后端分离架构，前端使用React和Tailwind CSS构建，后端使用Flask和SQLAlchemy实现，具有良好的用户体验和系统性能。" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "系统主要功能包括：" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "• 培训管理：创建、编辑、删除培训课程，管理培训计划" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "• 学生管理：添加、编辑、删除学生信息，管理学生档案" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "• 打卡记录：记录学生培训打卡情况，支持查询和统计" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "• 培训报告：生成培训统计报告，分析培训效果" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "• 系统设置：配置系统参数，管理用户权限" })
          ]
        }),
        
        // 登录系统
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({ text: "2. 登录系统" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "2.1 登录页面" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "打开浏览器，输入系统地址，进入登录页面。登录页面包含用户名和密码输入框，以及登录按钮。" })
          ]
        }),
        
        // 登录页面截图
        new Paragraph({
          children: [
            new ImageRun({
              type: "png",
              data: readImage(sortedImages[0]),
              transformation: {
                width: 600,
                height: 400
              },
              altText: {
                title: "登录页面",
                description: "系统登录页面",
                name: "登录页面"
              }
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "图 2.1 登录页面" })
          ]
        }),
        
        new Paragraph({
          children: [
            new TextRun({ text: "2.2 登录操作" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "1. 在用户名输入框中输入管理员账号：admin" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "2. 在密码输入框中输入密码：admin123" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "3. 点击" }),
            new TextRun({ text: "登录系统", bold: true }),
            new TextRun({ text: "按钮" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "4. 登录成功后，系统将自动跳转到仪表盘页面" })
          ]
        }),
        
        // 功能模块
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({ text: "3. 功能模块" })
          ]
        }),
        
        // 仪表盘
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [
            new TextRun({ text: "3.1 仪表盘" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "仪表盘页面显示系统的关键指标和最新信息，包括培训统计数据、近期培训安排和通知公告等。通过仪表盘，管理员可以快速了解系统的整体运行状况。" })
          ]
        }),
        
        // 仪表盘截图
        new Paragraph({
          children: [
            new ImageRun({
              type: "png",
              data: readImage(sortedImages[1]),
              transformation: {
                width: 700,
                height: 450
              },
              altText: {
                title: "仪表盘页面",
                description: "系统仪表盘页面",
                name: "仪表盘页面"
              }
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "图 3.1 仪表盘页面" })
          ]
        }),
        
        // 培训管理
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [
            new TextRun({ text: "3.2 培训管理" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "培训管理模块用于创建、编辑和删除培训课程，管理培训计划。管理员可以设置培训名称、时间、地点、内容等信息，并查看培训的详细情况。" })
          ]
        }),
        
        // 培训管理截图
        new Paragraph({
          children: [
            new ImageRun({
              type: "png",
              data: readImage(sortedImages[2]),
              transformation: {
                width: 700,
                height: 450
              },
              altText: {
                title: "培训管理页面",
                description: "系统培训管理页面",
                name: "培训管理页面"
              }
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "图 3.2 培训管理页面" })
          ]
        }),
        
        // 学生管理
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [
            new TextRun({ text: "3.3 学生管理" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "学生管理模块用于添加、编辑和删除学生信息，管理学生档案。管理员可以录入学生的基本信息、所属单位、联系方式等，并查看学生的培训记录。" })
          ]
        }),
        
        // 学生管理截图
        new Paragraph({
          children: [
            new ImageRun({
              type: "png",
              data: readImage(sortedImages[3]),
              transformation: {
                width: 700,
                height: 450
              },
              altText: {
                title: "学生管理页面",
                description: "系统学生管理页面",
                name: "学生管理页面"
              }
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "图 3.3 学生管理页面" })
          ]
        }),
        
        // 打卡记录
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [
            new TextRun({ text: "3.4 打卡记录" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "打卡记录模块用于记录学生培训打卡情况，支持按培训名称、学生姓名、打卡时间等条件进行查询和筛选。管理员可以查看详细的打卡记录，了解学生的出勤情况。" })
          ]
        }),
        
        // 打卡记录截图
        new Paragraph({
          children: [
            new ImageRun({
              type: "png",
              data: readImage(sortedImages[4]),
              transformation: {
                width: 700,
                height: 450
              },
              altText: {
                title: "打卡记录页面",
                description: "系统打卡记录页面",
                name: "打卡记录页面"
              }
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "图 3.4 打卡记录页面" })
          ]
        }),
        
        // 培训报告
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [
            new TextRun({ text: "3.5 培训报告" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "培训报告模块用于生成培训统计报告，分析培训效果。系统提供了培训参与率、出勤率、培训时长等统计数据，并以图表形式直观展示。管理员可以根据需要导出报告。" })
          ]
        }),
        
        // 培训报告截图
        new Paragraph({
          children: [
            new ImageRun({
              type: "png",
              data: readImage(sortedImages[5]),
              transformation: {
                width: 700,
                height: 450
              },
              altText: {
                title: "培训报告页面",
                description: "系统培训报告页面",
                name: "培训报告页面"
              }
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "图 3.5 培训报告页面" })
          ]
        }),
        
        // 系统设置
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [
            new TextRun({ text: "3.6 系统设置" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "系统设置模块用于配置系统参数，管理用户权限。管理员可以设置系统标题、Logo、默认密码等，以及添加和管理系统用户，分配不同的权限角色。" })
          ]
        }),
        
        // 系统设置截图
        new Paragraph({
          children: [
            new ImageRun({
              type: "png",
              data: readImage(sortedImages[6]),
              transformation: {
                width: 700,
                height: 450
              },
              altText: {
                title: "系统设置页面",
                description: "系统设置页面",
                name: "系统设置页面"
              }
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "图 3.6 系统设置页面" })
          ]
        }),
        
        // 操作流程
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({ text: "4. 操作流程" })
          ]
        }),
        
        new Paragraph({
          children: [
            new TextRun({ text: "4.1 培训管理流程" })
          ]
        }),
        
        new Table({
          width: {
            size: 9360,
            type: WidthType.DXA
          },
          columnWidths: [1560, 7800],
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 1560,
                    type: WidthType.DXA
                  },
                  shading: {
                    fill: "D5E8F0",
                    type: ShadingType.CLEAR
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "步骤", bold: true })
                      ]
                    })
                  ]
                }),
                new TableCell({
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 7800,
                    type: WidthType.DXA
                  },
                  shading: {
                    fill: "D5E8F0",
                    type: ShadingType.CLEAR
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "操作说明", bold: true })
                      ]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders: {
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 1560,
                    type: WidthType.DXA
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "1" })
                      ]
                    })
                  ]
                }),
                new TableCell({
                  borders: {
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 7800,
                    type: WidthType.DXA
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "登录系统，进入仪表盘页面" })
                      ]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders: {
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 1560,
                    type: WidthType.DXA
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "2" })
                      ]
                    })
                  ]
                }),
                new TableCell({
                  borders: {
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 7800,
                    type: WidthType.DXA
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "点击左侧导航栏的" }),
                        new TextRun({ text: "培训管理", bold: true }),
                        new TextRun({ text: "进入培训管理页面" })
                      ]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders: {
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 1560,
                    type: WidthType.DXA
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "3" })
                      ]
                    })
                  ]
                }),
                new TableCell({
                  borders: {
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 7800,
                    type: WidthType.DXA
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "点击" }),
                        new TextRun({ text: "添加培训", bold: true }),
                        new TextRun({ text: "按钮，填写培训信息并保存" })
                      ]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders: {
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 1560,
                    type: WidthType.DXA
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "4" })
                      ]
                    })
                  ]
                }),
                new TableCell({
                  borders: {
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 7800,
                    type: WidthType.DXA
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "培训创建成功后，可以在培训列表中查看和管理培训" })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        }),
        
        // 常见问题
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({ text: "5. 常见问题" })
          ]
        }),
        
        new Table({
          width: {
            size: 9360,
            type: WidthType.DXA
          },
          columnWidths: [3120, 6240],
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 3120,
                    type: WidthType.DXA
                  },
                  shading: {
                    fill: "D5E8F0",
                    type: ShadingType.CLEAR
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "问题", bold: true })
                      ]
                    })
                  ]
                }),
                new TableCell({
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 6240,
                    type: WidthType.DXA
                  },
                  shading: {
                    fill: "D5E8F0",
                    type: ShadingType.CLEAR
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "解决方案", bold: true })
                      ]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders: {
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 3120,
                    type: WidthType.DXA
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "登录失败，提示用户名或密码错误" })
                      ]
                    })
                  ]
                }),
                new TableCell({
                  borders: {
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 6240,
                    type: WidthType.DXA
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "请检查用户名和密码是否正确，默认管理员账号为admin，密码为admin123" })
                      ]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders: {
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 3120,
                    type: WidthType.DXA
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "点击按钮无反应" })
                      ]
                    })
                  ]
                }),
                new TableCell({
                  borders: {
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 6240,
                    type: WidthType.DXA
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "请检查浏览器是否支持JavaScript，以及网络连接是否正常" })
                      ]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders: {
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 3120,
                    type: WidthType.DXA
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "页面显示异常" })
                      ]
                    })
                  ]
                }),
                new TableCell({
                  borders: {
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
                  },
                  width: {
                    size: 6240,
                    type: WidthType.DXA
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "请尝试刷新页面，或清除浏览器缓存后重新登录" })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        }),
        
        // 结束语
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({ text: "6. 结束语" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "本产品使用说明书旨在帮助管理员快速了解和使用泰宁县新实践培训中心党校培训打卡系统。系统设计简洁直观，功能完善，能够满足党校培训管理的各种需求。" })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "如有任何疑问或建议，请联系系统管理员。" })
          ]
        })
      ]
    }
  ]
});

// 生成文档
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('f:\\Technology\\Code\\Trae\\Training\\产品使用说明书.docx', buffer);
  console.log('产品使用说明书生成成功！');
}).catch(err => {
  console.error('生成文档时出错:', err);
});

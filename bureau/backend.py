from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

products = [
    {"id": 1, "name": "泰宁有机大米", "category": "粮食类", "price": 68, "stock": 456, "status": "上架"},
    {"id": 2, "name": "大金湖有机鱼", "category": "水产类", "price": 128, "stock": 189, "status": "上架"},
    {"id": 3, "name": "上清酒", "category": "酒水类", "price": 168, "stock": 276, "status": "上架"},
    {"id": 4, "name": "泰宁笋干", "category": "干货类", "price": 45, "stock": 789, "status": "上架"},
    {"id": 5, "name": "丹霞岩茶", "category": "茶叶类", "price": 258, "stock": 145, "status": "下架"},
    {"id": 6, "name": "农家土鸡蛋", "category": "畜禽类", "price": 38, "stock": 987, "status": "上架"},
    {"id": 7, "name": "泰宁锥栗", "category": "干货类", "price": 58, "stock": 654, "status": "上架"},
    {"id": 8, "name": "金湖银鱼", "category": "水产类", "price": 88, "stock": 123, "status": "上架"},
    {"id": 9, "name": "泰宁红米", "category": "粮食类", "price": 78, "stock": 345, "status": "上架"},
    {"id": 10, "name": "有机蜂蜜", "category": "畜禽类", "price": 98, "stock": 234, "status": "上架"},
    {"id": 11, "name": "泰宁红茶", "category": "茶叶类", "price": 288, "stock": 167, "status": "上架"},
    {"id": 12, "name": "泰宁铁皮石斛", "category": "中药材", "price": 398, "stock": 89, "status": "上架"},
    {"id": 13, "name": "泰宁魔芋", "category": "蔬菜类", "price": 28, "stock": 567, "status": "上架"},
    {"id": 14, "name": "泰宁香菇", "category": "干货类", "price": 68, "stock": 432, "status": "上架"},
    {"id": 15, "name": "泰宁黑木耳", "category": "干货类", "price": 58, "stock": 389, "status": "上架"},
    {"id": 16, "name": "泰宁山茶油", "category": "油脂类", "price": 128, "stock": 234, "status": "上架"},
    {"id": 17, "name": "泰宁地瓜干", "category": "干货类", "price": 38, "stock": 678, "status": "上架"},
    {"id": 18, "name": "泰宁青梅", "category": "水果类", "price": 48, "stock": 345, "status": "上架"},
    {"id": 19, "name": "泰宁脐橙", "category": "水果类", "price": 58, "stock": 567, "status": "上架"},
    {"id": 20, "name": "泰宁竹筒饭", "category": "食品类", "price": 25, "stock": 890, "status": "上架"},
    {"id": 21, "name": "泰宁豆腐皮", "category": "干货类", "price": 45, "stock": 567, "status": "上架"},
    {"id": 22, "name": "泰宁薏米", "category": "粮食类", "price": 58, "stock": 432, "status": "上架"},
    {"id": 23, "name": "泰宁野生猕猴桃", "category": "水果类", "price": 68, "stock": 234, "status": "上架"},
    {"id": 24, "name": "泰宁高山蔬菜", "category": "蔬菜类", "price": 25, "stock": 789, "status": "上架"},
    {"id": 25, "name": "泰宁土猪肉", "category": "畜禽类", "price": 88, "stock": 123, "status": "上架"},
    {"id": 26, "name": "泰宁手工面", "category": "粮食类", "price": 38, "stock": 654, "status": "上架"},
    {"id": 27, "name": "泰宁腊鸭", "category": "畜禽类", "price": 98, "stock": 189, "status": "上架"},
    {"id": 28, "name": "泰宁冬笋", "category": "蔬菜类", "price": 35, "stock": 456, "status": "上架"},
    {"id": 29, "name": "泰宁锥栗粉", "category": "食品类", "price": 68, "stock": 276, "status": "上架"},
    {"id": 30, "name": "泰宁银耳", "category": "干货类", "price": 58, "stock": 345, "status": "上架"},
]

orders = [
    {"id": "20260327001", "product": "泰宁有机大米 × 5kg", "buyer": "张明", "amount": 340, "time": "2026-03-27 10:30", "status": "已完成", "address": "泰宁县杉城镇和平路123号", "payment": "微信支付", "farmerId": "F001", "phone": "13859876543", "notes": "需要礼盒包装"},
    {"id": "20260327002", "product": "大金湖有机鱼 × 2条", "buyer": "李强", "amount": 256, "time": "2026-03-27 11:20", "status": "待发货", "address": "泰宁县朱口镇文化路45号", "payment": "支付宝", "farmerId": "F002", "phone": "13956789012", "notes": "新鲜送达"},
    {"id": "20260327003", "product": "上清酒 × 2瓶", "buyer": "王芳", "amount": 336, "time": "2026-03-27 09:15", "status": "配送中", "address": "泰宁县上青乡崇际村", "payment": "微信支付", "farmerId": "F003", "phone": "13754321678", "notes": "送朋友的礼物"},
    {"id": "20260328004", "product": "泰宁笋干 × 2kg", "buyer": "赵伟", "amount": 90, "time": "2026-03-28 16:45", "status": "已完成", "address": "泰宁县新桥乡枫源村", "payment": "现金", "farmerId": "F003", "phone": "13657890123", "notes": "长期合作"},
    {"id": "20260328005", "product": "农家土鸡蛋 × 30枚", "buyer": "陈丽", "amount": 38, "time": "2026-03-28 14:30", "status": "待付款", "address": "泰宁县梅口乡梅口村", "payment": "未支付", "farmerId": "F004", "phone": "13556789012", "notes": "请尽快配送"},
    {"id": "20260328006", "product": "泰宁锥栗 × 3kg", "buyer": "刘军", "amount": 174, "time": "2026-03-28 13:20", "status": "已完成", "address": "泰宁县大龙乡大龙村", "payment": "微信支付", "farmerId": "F005", "phone": "13457890123", "notes": "品质好的话会再买"},
    {"id": "20260329007", "product": "丹霞岩茶 × 1盒", "buyer": "周婷", "amount": 258, "time": "2026-03-29 15:10", "status": "已完成", "address": "泰宁县杉城镇梅桥村", "payment": "支付宝", "farmerId": "F009", "phone": "13156789012", "notes": "送给长辈"},
    {"id": "20260329008", "product": "金湖银鱼 × 1kg", "buyer": "吴刚", "amount": 88, "time": "2026-03-29 11:05", "status": "待发货", "address": "泰宁县朱口镇音山村", "payment": "微信支付", "farmerId": "F002", "phone": "13956789012", "notes": "新鲜银鱼"},
    {"id": "20260329009", "product": "泰宁红茶 × 2盒", "buyer": "郑华", "amount": 576, "time": "2026-03-29 10:30", "status": "已完成", "address": "泰宁县大田乡大田村", "payment": "支付宝", "farmerId": "F009", "phone": "13156789012", "notes": "公司采购"},
    {"id": "20260330010", "product": "泰宁铁皮石斛 × 1盒", "buyer": "孙丽", "amount": 398, "time": "2026-03-30 16:20", "status": "已完成", "address": "泰宁县开善乡余源村", "payment": "微信支付", "farmerId": "F010", "phone": "13057890123", "notes": "保健养生"},
    {"id": "20260330011", "product": "泰宁山茶油 × 3瓶", "buyer": "马强", "amount": 384, "time": "2026-03-30 14:15", "status": "待发货", "address": "泰宁县杉城镇长兴村", "payment": "支付宝", "farmerId": "F008", "phone": "13257890123", "notes": "家庭使用"},
    {"id": "20260330012", "product": "泰宁香菇 × 2kg", "buyer": "朱芳", "amount": 136, "time": "2026-03-30 11:45", "status": "配送中", "address": "泰宁县上青乡崇际村", "payment": "微信支付", "farmerId": "F003", "phone": "13754321678", "notes": "做香菇炖鸡"},
    {"id": "20260331013", "product": "泰宁地瓜干 × 5kg", "buyer": "胡明", "amount": 190, "time": "2026-03-31 15:30", "status": "已完成", "address": "泰宁县新桥乡枫源村", "payment": "现金", "farmerId": "F001", "phone": "13859876543", "notes": "孩子爱吃"},
    {"id": "20260331014", "product": "泰宁脐橙 × 10kg", "buyer": "林燕", "amount": 580, "time": "2026-03-31 10:20", "status": "待付款", "address": "泰宁县梅口乡梅口村", "payment": "未支付", "farmerId": "F005", "phone": "13556789012", "notes": "公司福利"},
    {"id": "20260401015", "product": "泰宁竹筒饭 × 10份", "buyer": "黄伟", "amount": 250, "time": "2026-04-01 16:40", "status": "已完成", "address": "泰宁县大田乡大田村", "payment": "微信支付", "farmerId": "F007", "phone": "13356789012", "notes": "团建活动"},
    {"id": "20260401016", "product": "有机蜂蜜 × 2瓶", "buyer": "罗丽", "amount": 196, "time": "2026-04-01 14:20", "status": "已完成", "address": "泰宁县开善乡余源村", "payment": "支付宝", "farmerId": "F008", "phone": "13257890123", "notes": "天然蜂蜜"},
    {"id": "20260402017", "product": "泰宁红米 × 3kg", "buyer": "谢强", "amount": 234, "time": "2026-04-02 15:15", "status": "已完成", "address": "泰宁县杉城镇和平路67号", "payment": "微信支付", "farmerId": "F001", "phone": "13859876543", "notes": "健康食品"},
    {"id": "20260402018", "product": "泰宁魔芋 × 5kg", "buyer": "吴婷", "amount": 140, "time": "2026-04-02 11:30", "status": "待发货", "address": "泰宁县朱口镇王坑村", "payment": "微信支付", "farmerId": "F010", "phone": "13057890123", "notes": "减肥食品"},
    {"id": "20260403019", "product": "泰宁黑木耳 × 2kg", "buyer": "陈明", "amount": 116, "time": "2026-04-03 16:40", "status": "配送中", "address": "泰宁县上青乡崇际村", "payment": "支付宝", "farmerId": "F003", "phone": "13754321678", "notes": "做汤用"},
    {"id": "20260403020", "product": "泰宁青梅 × 5kg", "buyer": "杨丽", "amount": 240, "time": "2026-04-03 10:20", "status": "已完成", "address": "泰宁县梅口乡梅口村", "payment": "微信支付", "farmerId": "F005", "phone": "13556789012", "notes": "做青梅酒"},
    {"id": "20260404021", "product": "泰宁豆腐皮 × 3kg", "buyer": "张伟", "amount": 135, "time": "2026-04-04 15:30", "status": "已完成", "address": "泰宁县杉城镇和平路89号", "payment": "微信支付", "farmerId": "F001", "phone": "13859876543", "notes": "家庭食用"},
    {"id": "20260404022", "product": "泰宁薏米 × 2kg", "buyer": "李娜", "amount": 116, "time": "2026-04-04 11:20", "status": "待发货", "address": "泰宁县朱口镇文化路67号", "payment": "支付宝", "farmerId": "F007", "phone": "13356789012", "notes": "祛湿保健"},
    {"id": "20260405023", "product": "泰宁野生猕猴桃 × 5kg", "buyer": "王强", "amount": 340, "time": "2026-04-05 16:45", "status": "已完成", "address": "泰宁县上青乡崇际村", "payment": "微信支付", "farmerId": "F005", "phone": "13556789012", "notes": "新鲜水果"},
    {"id": "20260405024", "product": "泰宁高山蔬菜 × 10kg", "buyer": "陈华", "amount": 250, "time": "2026-04-05 14:30", "status": "配送中", "address": "泰宁县新桥乡枫源村", "payment": "支付宝", "farmerId": "F010", "phone": "13057890123", "notes": "餐馆采购"},
    {"id": "20260406025", "product": "泰宁土猪肉 × 5kg", "buyer": "林华", "amount": 440, "time": "2026-04-06 15:10", "status": "已完成", "address": "泰宁县梅口乡梅口村", "payment": "微信支付", "farmerId": "F011", "phone": "13956789013", "notes": "农家猪肉"},
    {"id": "20260406026", "product": "泰宁手工面 × 5kg", "buyer": "吴芳", "amount": 190, "time": "2026-04-06 10:30", "status": "待发货", "address": "泰宁县大田乡大田村", "payment": "微信支付", "farmerId": "F007", "phone": "13356789012", "notes": "传统手工面"},
    {"id": "20260407027", "product": "泰宁腊鸭 × 2只", "buyer": "郑强", "amount": 196, "time": "2026-04-07 16:20", "status": "已完成", "address": "泰宁县开善乡余源村", "payment": "支付宝", "farmerId": "F011", "phone": "13956789013", "notes": "过年送礼"},
    {"id": "20260407028", "product": "泰宁冬笋 × 5kg", "buyer": "马丽", "amount": 175, "time": "2026-04-07 11:45", "status": "配送中", "address": "泰宁县杉城镇长兴村", "payment": "微信支付", "farmerId": "F003", "phone": "13754321678", "notes": "新鲜冬笋"},
    {"id": "20260408029", "product": "泰宁锥栗粉 × 3kg", "buyer": "黄明", "amount": 204, "time": "2026-04-08 15:30", "status": "已完成", "address": "泰宁县大龙乡大龙村", "payment": "支付宝", "farmerId": "F005", "phone": "13457890123", "notes": "做糕点用"},
    {"id": "20260408030", "product": "泰宁银耳 × 2kg", "buyer": "罗强", "amount": 116, "time": "2026-04-08 10:20", "status": "待付款", "address": "泰宁县朱口镇王坑村", "payment": "未支付", "farmerId": "F003", "phone": "13754321678", "notes": "银耳羹"},
]

farmers = [
    {"id": "F001", "name": "林德发", "phone": "13859876543", "village": "杉城镇长兴村", "products": ["有机大米", "红米", "地瓜干", "竹筒饭", "手工面", "薏米"], "status": "正常", "level": "一级"},
    {"id": "F002", "name": "王水金", "phone": "13956789012", "village": "朱口镇音山村", "products": ["有机鱼", "银鱼", "金湖银鱼"], "status": "正常", "level": "二级"},
    {"id": "F003", "name": "张木生", "phone": "13754321678", "village": "上青乡崇际村", "products": ["笋干", "香菇", "黑木耳", "上清酒", "冬笋", "银耳"], "status": "正常", "level": "一级"},
    {"id": "F004", "name": "李火旺", "phone": "13657890123", "village": "新桥乡枫源村", "products": ["土鸡蛋", "蜂蜜", "山茶油"], "status": "禁用", "level": "三级"},
    {"id": "F005", "name": "陈美华", "phone": "13556789012", "village": "梅口乡梅口村", "products": ["锥栗", "青梅", "脐橙", "有机蜂蜜", "野生猕猴桃", "锥栗粉"], "status": "正常", "level": "一级"},
    {"id": "F006", "name": "黄永强", "phone": "13457890123", "village": "大龙乡大龙村", "products": ["银鱼", "有机鱼", "金湖银鱼"], "status": "正常", "level": "二级"},
    {"id": "F007", "name": "叶秀兰", "phone": "13356789012", "village": "大田乡大田村", "products": ["红米", "有机大米", "竹筒饭", "地瓜干", "手工面"], "status": "正常", "level": "二级"},
    {"id": "F008", "name": "刘德福", "phone": "13257890123", "village": "开善乡余源村", "products": ["蜂蜜", "山茶油", "有机蜂蜜"], "status": "正常", "level": "三级"},
    {"id": "F009", "name": "郑美英", "phone": "13156789012", "village": "杉城镇梅桥村", "products": ["丹霞岩茶", "泰宁红茶", "有机大米", "红米"], "status": "正常", "level": "一级"},
    {"id": "F010", "name": "吴永华", "phone": "13057890123", "village": "朱口镇王坑村", "products": ["铁皮石斛", "魔芋", "山茶油", "有机蜂蜜", "高山蔬菜"], "status": "正常", "level": "二级"},
    {"id": "F011", "name": "黄丽芳", "phone": "13956789013", "village": "梅口乡梅口村", "products": ["土猪肉", "腊鸭", "土鸡蛋"], "status": "正常", "level": "三级"},
    {"id": "F012", "name": "吴德福", "phone": "13859876544", "village": "杉城镇长兴村", "products": ["豆腐皮", "手工面", "有机大米", "红米", "地瓜干"], "status": "正常", "level": "一级"},
]

news = [
    {"id": 1, "title": "泰宁县2026年乡村振兴补助政策发布", "tag": "政策通知", "date": "2026-03-27", "views": 1234},
    {"id": 2, "title": "大金湖有机鱼养殖基地喜获丰收", "tag": "工作动态", "date": "2026-03-28", "views": 987},
    {"id": 3, "title": "农村电商技能培训班即将开班", "tag": "培训信息", "date": "2026-03-29", "views": 756},
    {"id": 4, "title": "泰宁锥栗产业发展座谈会召开", "tag": "工作动态", "date": "2026-03-30", "views": 654},
    {"id": 5, "title": "金湖银鱼品牌建设培训会", "tag": "培训信息", "date": "2026-03-31", "views": 543},
    {"id": 6, "title": "泰宁:草莓变身\"甜蜜致富果\"农旅融合激活乡村经济", "tag": "工作动态", "date": "2026-04-01", "views": 892},
    {"id": 7, "title": "三明泰宁:洋芋加工\"智\"变 串起乡村振兴\"黄金链\"", "tag": "工作动态", "date": "2026-04-02", "views": 765},
    {"id": 8, "title": "泰宁:农文旅项目加速推进 打造乡村振兴新地标", "tag": "工作动态", "date": "2026-04-03", "views": 921},
    {"id": 9, "title": "关于2026年度省级乡村振兴示范村申报名单的公示", "tag": "政策通知", "date": "2026-04-04", "views": 1056},
    {"id": 10, "title": "泰宁县有机大米种植技术培训班成功举办", "tag": "培训信息", "date": "2026-04-05", "views": 678},
    {"id": 11, "title": "大金湖生态旅游区获评国家5A级旅游景区", "tag": "工作动态", "date": "2026-04-06", "views": 1345},
    {"id": 12, "title": "泰宁县2026年农业产业发展专项资金申报指南", "tag": "政策通知", "date": "2026-04-07", "views": 987},
    {"id": 13, "title": "泰宁:上清溪小流域综合治理项目全面开工", "tag": "工作动态", "date": "2026-04-08", "views": 1123},
    {"id": 14, "title": "泰宁县2025年度衔接推进乡村振兴资金项目计划情况的公告", "tag": "政策通知", "date": "2026-04-09", "views": 1089},
    {"id": 15, "title": "泰宁县农业农村局乡村振兴资金项目财政补助政策\"小指南\"", "tag": "政策通知", "date": "2026-04-10", "views": 956},
    {"id": 16, "title": "福建泰宁:微改造+精提升 \"农旅双驱\"促振兴", "tag": "工作动态", "date": "2026-04-11", "views": 876},
    {"id": 17, "title": "泰宁:家庭农场成乡村振兴新引擎", "tag": "工作动态", "date": "2026-04-12", "views": 789},
    {"id": 18, "title": "泰宁:农业发展驶入快车道 乡村振兴成效显著", "tag": "工作动态", "date": "2026-04-13", "views": 923},
    {"id": 19, "title": "\"2025年度传统村落保护利用与乡村振兴\"学术研讨会召开", "tag": "工作动态", "date": "2026-04-14", "views": 854},
    {"id": 20, "title": "泰宁:春季茶园管护忙 蓄势待茶香", "tag": "工作动态", "date": "2026-04-15", "views": 765},
]

# 项目投票数据
project_votes = {
    "P001": 15,
    "P002": 12,
    "P003": 18,
    "P004": 9,
    "P005": 11
}

projects = [
    {
        "id": "P001",
        "name": "泰宁县有机大米种植基地建设",
        "description": "建设500亩有机大米种植基地，配备现代化灌溉设施和病虫害防治系统",
        "budget": 500000,
        "startDate": "2026-01-01",
        "endDate": "2026-12-31",
        "progress": 65,
        "implementationProcess": [
            "2026年1月：完成土地平整与规划，确定种植区域和灌溉系统布局",
            "2026年2月：完成灌溉系统设计与安装，采购有机种子",
            "2026年3月：完成春季播种，开展种植技术培训",
            "2026年4-8月：进行病虫害绿色防治和夏季田间管理",
            "2026年9-10月：秋季收获，进行产品质量检测",
            "2026年11-12月：产品加工与包装，品牌注册与推广"
        ],
        "completedItems": [
            "土地平整与规划",
            "灌溉系统设计与安装",
            "有机种子采购",
            "春季播种",
            "种植技术培训"
        ],
        "tasks": [
            {"id": "T001-01", "name": "土地平整与规划", "status": "已完成", "percentage": 100, "startDate": "2026-01-01", "endDate": "2026-01-31", "responsible": "林德发"},
            {"id": "T001-02", "name": "灌溉系统设计与安装", "status": "已完成", "percentage": 100, "startDate": "2026-02-01", "endDate": "2026-02-28", "responsible": "县农业局技术团队"},
            {"id": "T001-03", "name": "有机种子采购", "status": "已完成", "percentage": 100, "startDate": "2026-02-15", "endDate": "2026-02-28", "responsible": "张木生"},
            {"id": "T001-04", "name": "春季播种", "status": "已完成", "percentage": 100, "startDate": "2026-03-01", "endDate": "2026-03-15", "responsible": "林德发、吴德福"},
            {"id": "T001-05", "name": "病虫害绿色防治", "status": "进行中", "percentage": 70, "startDate": "2026-04-01", "endDate": "2026-08-31", "responsible": "县植保站"},
            {"id": "T001-06", "name": "夏季田间管理", "status": "进行中", "percentage": 50, "startDate": "2026-05-01", "endDate": "2026-08-31", "responsible": "林德发、吴德福"},
            {"id": "T001-07", "name": "秋季收获", "status": "未开始", "percentage": 0, "startDate": "2026-09-15", "endDate": "2026-10-15", "responsible": "林德发、吴德福"},
            {"id": "T001-08", "name": "产品加工与包装", "status": "未开始", "percentage": 0, "startDate": "2026-10-20", "endDate": "2026-11-30", "responsible": "县农产品加工中心"},
            {"id": "T001-09", "name": "品牌注册与推广", "status": "未开始", "percentage": 0, "startDate": "2026-11-01", "endDate": "2026-12-31", "responsible": "县电商办"},
        ]
    },
    {
        "id": "P002",
        "name": "大金湖有机鱼养殖项目",
        "description": "在大金湖周边建设200亩有机鱼养殖基地，推广生态养殖技术",
        "budget": 350000,
        "startDate": "2026-02-01",
        "endDate": "2026-11-30",
        "progress": 45,
        "implementationProcess": [
            "2026年2-3月：完成鱼塘选址与建设，采购鱼苗并进行检疫",
            "2026年3-4月：安装养殖设备，进行鱼苗投放",
            "2026年5-10月：开展日常饲养管理，进行水质监测与管理",
            "2026年10-11月：成鱼捕捞，进行市场销售与渠道建设"
        ],
        "completedItems": [
            "鱼塘选址与建设",
            "鱼苗采购与检疫",
            "养殖设备安装",
            "鱼苗投放"
        ],
        "tasks": [
            {"id": "T002-01", "name": "鱼塘选址与建设", "status": "已完成", "percentage": 100, "startDate": "2026-02-01", "endDate": "2026-03-15", "responsible": "王水金"},
            {"id": "T002-02", "name": "鱼苗采购与检疫", "status": "已完成", "percentage": 100, "startDate": "2026-03-01", "endDate": "2026-03-31", "responsible": "县水产站"},
            {"id": "T002-03", "name": "养殖设备安装", "status": "已完成", "percentage": 100, "startDate": "2026-03-15", "endDate": "2026-04-15", "responsible": "黄永强"},
            {"id": "T002-04", "name": "鱼苗投放", "status": "已完成", "percentage": 100, "startDate": "2026-04-20", "endDate": "2026-04-30", "responsible": "王水金、黄永强"},
            {"id": "T002-05", "name": "日常饲养管理", "status": "进行中", "percentage": 60, "startDate": "2026-05-01", "endDate": "2026-10-31", "responsible": "王水金"},
            {"id": "T002-06", "name": "有机饲料采购", "status": "进行中", "percentage": 50, "startDate": "2026-05-01", "endDate": "2026-09-30", "responsible": "黄永强"},
            {"id": "T002-07", "name": "水质监测与管理", "status": "进行中", "percentage": 70, "startDate": "2026-05-01", "endDate": "2026-10-31", "responsible": "县水产站"},
            {"id": "T002-08", "name": "成鱼捕捞", "status": "未开始", "percentage": 0, "startDate": "2026-10-01", "endDate": "2026-11-15", "responsible": "王水金、黄永强"},
            {"id": "T002-09", "name": "市场销售与渠道建设", "status": "未开始", "percentage": 0, "startDate": "2026-11-01", "endDate": "2026-11-30", "responsible": "县电商办"},
        ]
    },
    {
        "id": "P003",
        "name": "泰宁红茶产业升级",
        "description": "升级改造红茶加工厂，引进先进加工设备，提高产品质量和产量",
        "budget": 420000,
        "startDate": "2026-03-01",
        "endDate": "2026-10-31",
        "progress": 30,
        "implementationProcess": [
            "2026年3月：完成加工厂选址与规划",
            "2026年4-5月：采购先进加工设备",
            "2026年5-6月：进行厂房改造与装修",
            "2026年6-7月：安装与调试设备",
            "2026年7-8月：开展技术人员培训",
            "2026年8月：进行试生产与质量检测",
            "2026年9月：正式投产",
            "2026年9-10月：进行品牌推广与市场开拓"
        ],
        "completedItems": [
            "加工厂选址与规划",
            "先进加工设备采购"
        ],
        "tasks": [
            {"id": "T003-01", "name": "加工厂选址与规划", "status": "已完成", "percentage": 100, "startDate": "2026-03-01", "endDate": "2026-03-31", "responsible": "郑美英"},
            {"id": "T003-02", "name": "先进加工设备采购", "status": "已完成", "percentage": 100, "startDate": "2026-04-01", "endDate": "2026-05-15", "responsible": "县茶产业办"},
            {"id": "T003-03", "name": "厂房改造与装修", "status": "进行中", "percentage": 70, "startDate": "2026-05-01", "endDate": "2026-06-30", "responsible": "郑美英"},
            {"id": "T003-04", "name": "设备安装与调试", "status": "进行中", "percentage": 40, "startDate": "2026-06-15", "endDate": "2026-07-31", "responsible": "设备供应商"},
            {"id": "T003-05", "name": "技术人员培训", "status": "未开始", "percentage": 0, "startDate": "2026-07-15", "endDate": "2026-08-15", "responsible": "县茶产业办"},
            {"id": "T003-06", "name": "试生产与质量检测", "status": "未开始", "percentage": 0, "startDate": "2026-08-01", "endDate": "2026-08-31", "responsible": "郑美英"},
            {"id": "T003-07", "name": "正式投产", "status": "未开始", "percentage": 0, "startDate": "2026-09-01", "endDate": "2026-09-30", "responsible": "郑美英"},
            {"id": "T003-08", "name": "品牌推广与市场开拓", "status": "未开始", "percentage": 0, "startDate": "2026-09-15", "endDate": "2026-10-31", "responsible": "县电商办"},
        ]
    },
    {
        "id": "P004",
        "name": "泰宁铁皮石斛种植基地",
        "description": "建设100亩铁皮石斛种植基地，采用现代化温室大棚技术",
        "budget": 600000,
        "startDate": "2026-01-15",
        "endDate": "2026-12-31",
        "progress": 50,
        "implementationProcess": [
            "2026年1-2月：完成基地选址与土地流转",
            "2026年3-4月：建设温室大棚，采购铁皮石斛种苗",
            "2026年5-8月：进行种植与初期管理",
            "2026年5-10月：开展病虫害防治",
            "2026年9-11月：进行中期管理与养护",
            "2026年12月：收获与加工，进行产品检测与认证，开展市场销售"
        ],
        "completedItems": [
            "基地选址与土地流转",
            "温室大棚建设",
            "铁皮石斛种苗采购"
        ],
        "tasks": [
            {"id": "T004-01", "name": "基地选址与土地流转", "status": "已完成", "percentage": 100, "startDate": "2026-01-15", "endDate": "2026-02-28", "responsible": "吴永华"},
            {"id": "T004-02", "name": "温室大棚建设", "status": "已完成", "percentage": 100, "startDate": "2026-03-01", "endDate": "2026-04-30", "responsible": "县农业局"},
            {"id": "T004-03", "name": "铁皮石斛种苗采购", "status": "已完成", "percentage": 100, "startDate": "2026-04-01", "endDate": "2026-04-30", "responsible": "吴永华"},
            {"id": "T004-04", "name": "种植与初期管理", "status": "进行中", "percentage": 60, "startDate": "2026-05-01", "endDate": "2026-08-31", "responsible": "吴永华"},
            {"id": "T004-05", "name": "病虫害防治", "status": "进行中", "percentage": 50, "startDate": "2026-05-01", "endDate": "2026-10-31", "responsible": "县植保站"},
            {"id": "T004-06", "name": "中期管理与养护", "status": "进行中", "percentage": 40, "startDate": "2026-09-01", "endDate": "2026-11-30", "responsible": "吴永华"},
            {"id": "T004-07", "name": "收获与加工", "status": "未开始", "percentage": 0, "startDate": "2026-12-01", "endDate": "2026-12-31", "responsible": "吴永华"},
            {"id": "T004-08", "name": "产品检测与认证", "status": "未开始", "percentage": 0, "startDate": "2026-12-15", "endDate": "2026-12-31", "responsible": "县农产品检测中心"},
            {"id": "T004-09", "name": "市场销售", "status": "未开始", "percentage": 0, "startDate": "2026-12-01", "endDate": "2026-12-31", "responsible": "县电商办"},
        ]
    },
    {
        "id": "P005",
        "name": "泰宁锥栗产业发展项目",
        "description": "建设锥栗种植基地，推广高产品种和科学种植技术",
        "budget": 300000,
        "startDate": "2026-02-15",
        "endDate": "2026-12-31",
        "progress": 40,
        "implementationProcess": [
            "2026年2-3月：完成基地选址与规划，采购优质锥栗苗",
            "2026年4-6月：进行种植与初期管理",
            "2026年5-9月：开展病虫害防治",
            "2026年6-8月：进行夏季管理与施肥",
            "2026年9-10月：秋季收获",
            "2026年10-11月：产品加工与包装",
            "2026年11-12月：市场销售"
        ],
        "completedItems": [
            "基地选址与规划",
            "优质锥栗苗采购"
        ],
        "tasks": [
            {"id": "T005-01", "name": "基地选址与规划", "status": "已完成", "percentage": 100, "startDate": "2026-02-15", "endDate": "2026-03-15", "responsible": "陈美华"},
            {"id": "T005-02", "name": "优质锥栗苗采购", "status": "已完成", "percentage": 100, "startDate": "2026-03-01", "endDate": "2026-03-31", "responsible": "陈美华"},
            {"id": "T005-03", "name": "种植与初期管理", "status": "进行中", "percentage": 60, "startDate": "2026-04-01", "endDate": "2026-06-30", "responsible": "陈美华"},
            {"id": "T005-04", "name": "病虫害防治", "status": "进行中", "percentage": 50, "startDate": "2026-05-01", "endDate": "2026-09-30", "responsible": "县植保站"},
            {"id": "T005-05", "name": "夏季管理与施肥", "status": "进行中", "percentage": 40, "startDate": "2026-06-01", "endDate": "2026-08-31", "responsible": "陈美华"},
            {"id": "T005-06", "name": "秋季收获", "status": "未开始", "percentage": 0, "startDate": "2026-09-15", "endDate": "2026-10-15", "responsible": "陈美华"},
            {"id": "T005-07", "name": "产品加工与包装", "status": "未开始", "percentage": 0, "startDate": "2026-10-20", "endDate": "2026-11-30", "responsible": "县农产品加工中心"},
            {"id": "T005-08", "name": "市场销售", "status": "未开始", "percentage": 0, "startDate": "2026-11-01", "endDate": "2026-12-31", "responsible": "县电商办"},
        ]
    },
]

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if username and password:
        return jsonify({"success": True, "message": "登录成功"})
    return jsonify({"success": False, "message": "用户名或密码错误"}), 401

@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    return jsonify({
        "products": 1234,
        "orders": 5678,
        "farmers": 890,
        "sales": 234567,
        "productsTrend": "+12%",
        "ordersTrend": "+8%",
        "farmersTrend": "+5%",
        "salesTrend": "+18%"
    })

@app.route('/api/dashboard/recent-orders', methods=['GET'])
def get_recent_orders():
    return jsonify(orders[:3])

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(products)

@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.json
    new_id = max([p['id'] for p in products]) + 1 if products else 1
    data['id'] = new_id
    products.append(data)
    return jsonify({"success": True, "product": data})

@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.json
    for product in products:
        if product['id'] == product_id:
            product.update(data)
            return jsonify({"success": True, "product": product})
    return jsonify({"success": False, "message": "商品不存在"}), 404

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    global products
    products = [p for p in products if p['id'] != product_id]
    return jsonify({"success": True})

@app.route('/api/orders', methods=['GET'])
def get_orders():
    status = request.args.get('status')
    if status:
        filtered_orders = [o for o in orders if o['status'] == status]
        return jsonify(filtered_orders)
    return jsonify(orders)

@app.route('/api/orders/<order_id>', methods=['PUT'])
def update_order_status(order_id):
    data = request.json
    for order in orders:
        if order['id'] == order_id:
            order['status'] = data.get('status', order['status'])
            return jsonify({"success": True, "order": order})
    return jsonify({"success": False, "message": "订单不存在"}), 404

@app.route('/api/farmers', methods=['GET'])
def get_farmers():
    return jsonify(farmers)

@app.route('/api/farmers', methods=['POST'])
def add_farmer():
    data = request.json
    new_id = f"F{str(len(farmers) + 1).zfill(3)}"
    data['id'] = new_id
    farmers.append(data)
    return jsonify({"success": True, "farmer": data})

@app.route('/api/farmers/<farmer_id>', methods=['PUT'])
def update_farmer(farmer_id):
    data = request.json
    for farmer in farmers:
        if farmer['id'] == farmer_id:
            farmer.update(data)
            return jsonify({"success": True, "farmer": farmer})
    return jsonify({"success": False, "message": "农户不存在"}), 404

@app.route('/api/farmers/<farmer_id>', methods=['DELETE'])
def delete_farmer(farmer_id):
    global farmers
    farmers = [f for f in farmers if f['id'] != farmer_id]
    return jsonify({"success": True})

@app.route('/api/news', methods=['GET'])
def get_news():
    return jsonify(news)

@app.route('/api/news', methods=['POST'])
def add_news():
    data = request.json
    new_id = max([n['id'] for n in news]) + 1 if news else 1
    data['id'] = new_id
    data['date'] = datetime.now().strftime('%Y-%m-%d')
    data['views'] = 0
    news.append(data)
    return jsonify({"success": True, "news": data})

@app.route('/api/projects', methods=['GET'])
def get_projects():
    return jsonify(projects)

@app.route('/api/projects', methods=['POST'])
def add_project():
    data = request.json
    new_id = f"P{str(len(projects) + 1).zfill(3)}"
    data['id'] = new_id
    data['progress'] = 0
    data['tasks'] = []
    projects.append(data)
    return jsonify({"success": True, "project": data})

@app.route('/api/projects/<project_id>', methods=['PUT'])
def update_project(project_id):
    data = request.json
    for project in projects:
        if project['id'] == project_id:
            project.update(data)
            return jsonify({"success": True, "project": project})
    return jsonify({"success": False, "message": "项目不存在"}), 404

@app.route('/api/statistics/sales-trend', methods=['GET'])
def get_sales_trend():
    return jsonify({
        "months": ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
        "sales": [15000, 20000, 18000, 28000, 25000, 32000, 30000]
    })

@app.route('/api/statistics/category-distribution', methods=['GET'])
def get_category_distribution():
    return jsonify([
        {"name": "粮食类", "percentage": 35},
        {"name": "水产类", "percentage": 30},
        {"name": "畜禽类", "percentage": 20},
        {"name": "其他", "percentage": 15}
    ])

@app.route('/api/settings', methods=['GET'])
def get_settings():
    return jsonify({
        "systemName": "泰宁县乡村振兴局后台管理系统",
        "phone": "0598-1234567",
        "address": "福建省三明市泰宁县和平中街25号",
        "notifications": {
            "newOrder": True,
            "stockAlert": True,
            "systemAnnouncement": False
        }
    })

@app.route('/api/settings', methods=['PUT'])
def update_settings():
    data = request.json
    return jsonify({"success": True, "settings": data})

@app.route('/api/settings/password', methods=['PUT'])
def change_password():
    data = request.json
    return jsonify({"success": True, "message": "密码修改成功"})

if __name__ == '__main__':
    app.run(debug=True, port=5001)

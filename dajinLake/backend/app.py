from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 商品数据
products = [
    {
        "id": 1,
        "name": "大金湖特色明信片套装",
        "price": 38.00,
        "description": "包含12张精美大金湖风光明信片，采用高质量铜版纸印刷，是收藏和送礼的佳品。",
        "image": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20postcard%20set%20with%20lake%20scenery%2C%20blue%20water%2C%20mountains%2C%20tourism%20souvenir&image_size=square_hd",
        "category": "文创产品",
        "specs": {
            "size": "10cm x 15cm",
            "quantity": "12张/套",
            "material": "铜版纸"
        }
    },
    {
        "id": 2,
        "name": "泰宁岩茶礼盒装",
        "price": 128.00,
        "description": "精选泰宁本地岩茶，香气浓郁，口感醇厚，礼盒装包含200g茶叶，是馈赠亲友的理想选择。",
        "image": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20tea%20gift%20box%2C%20traditional%20chinese%20packaging%2C%20tea%20leaves%2C%20souvenir&image_size=square_hd",
        "category": "特产",
        "specs": {
            "weight": "200g",
            "origin": "福建泰宁",
            "shelf_life": "18个月"
        }
    },
    {
        "id": 3,
        "name": "大金湖钥匙扣",
        "price": 15.00,
        "description": "金属材质，激光雕刻大金湖标志性景点，小巧精致，便于携带，是旅游纪念的好选择。",
        "image": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=metal%20keychain%20with%20lake%20scenery%20engraving%2C%20tourist%20souvenir%2C%20small%20and%20delicate&image_size=square_hd",
        "category": "文创产品",
        "specs": {
            "material": "金属",
            "size": "4cm x 3cm",
            "weight": "20g"
        }
    },
    {
        "id": 4,
        "name": "泰宁笋干",
        "price": 68.00,
        "description": "采用泰宁本地新鲜竹笋，传统工艺晒干，保留原汁原味，口感鲜嫩，是烹饪的优质食材。",
        "image": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dried%20bamboo%20shoots%2C%20traditional%20chinese%20food%20product%2C%20packaged%20in%20paper%20bag&image_size=square_hd",
        "category": "特产",
        "specs": {
            "weight": "500g",
            "origin": "福建泰宁",
            "shelf_life": "12个月"
        }
    },
    {
        "id": 5,
        "name": "大金湖风光画册",
        "price": 88.00,
        "description": "精选大金湖最美风光照片，全彩印刷，硬壳装帧，是了解大金湖自然风光的精美画册。",
        "image": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20photo%20album%20with%20lake%20scenery%2C%20hardcover%2C%20colorful%20pages%2C%20tourism%20souvenir&image_size=square_hd",
        "category": "文创产品",
        "specs": {
            "pages": "80页",
            "size": "21cm x 28cm",
            "binding": "硬壳精装"
        }
    },
    {
        "id": 6,
        "name": "泰宁金湖米酒",
        "price": 58.00,
        "description": "采用本地优质糯米，传统工艺酿造，口感醇厚，香气四溢，是泰宁特色饮品。",
        "image": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20chinese%20rice%20wine%20bottle%2C%20ceramic%20container%2C%20local%20specialty&image_size=square_hd",
        "category": "特产",
        "specs": {
            "volume": "500ml",
            "alcohol_content": "12%",
            "origin": "福建泰宁"
        }
    },
    {
        "id": 7,
        "name": "大金湖主题T恤",
        "price": 59.00,
        "description": "100%纯棉材质，印制大金湖标志性景点图案，舒适透气，是旅游纪念的时尚选择。",
        "image": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tourist%20t-shirt%20with%20lake%20scenery%20print%2C%20cotton%2C%20comfortable%2C%20souvenir&image_size=square_hd",
        "category": "文创产品",
        "specs": {
            "material": "100%纯棉",
            "sizes": "S, M, L, XL",
            "color": "白色"
        }
    },
    {
        "id": 8,
        "name": "泰宁莲子",
        "price": 45.00,
        "description": "选自泰宁本地优质莲子，颗粒饱满，口感软糯，营养丰富，是滋补佳品。",
        "image": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dried%20lotus%20seeds%2C%20premium%20quality%2C%20packaged%20in%20transparent%20bag&image_size=square_hd",
        "category": "特产",
        "specs": {
            "weight": "400g",
            "origin": "福建泰宁",
            "shelf_life": "18个月"
        }
    }
]

# 购物车数据（模拟）
carts = {}

# 订单数据（模拟）
orders = []
order_id = 1

# 商品相关接口
@app.route('/api/products', methods=['GET'])
def get_products():
    """获取商品列表"""
    category = request.args.get('category')
    if category:
        filtered_products = [p for p in products if p['category'] == category]
        return jsonify(filtered_products)
    return jsonify(products)

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """获取商品详情"""
    product = next((p for p in products if p['id'] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({'error': '商品不存在'}), 404

@app.route('/api/products/search', methods=['GET'])
def search_products():
    """搜索商品"""
    keyword = request.args.get('keyword', '').lower()
    if not keyword:
        return jsonify(products)
    filtered_products = [
        p for p in products 
        if keyword in p['name'].lower() or 
           keyword in p['description'].lower() or 
           keyword in p['category'].lower()
    ]
    return jsonify(filtered_products)

# 购物车相关接口
@app.route('/api/cart/<string:user_id>', methods=['GET'])
def get_cart(user_id):
    """获取购物车"""
    cart = carts.get(user_id, [])
    return jsonify(cart)

@app.route('/api/cart/<string:user_id>', methods=['POST'])
def add_to_cart(user_id):
    """添加商品到购物车"""
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    
    # 查找商品
    product = next((p for p in products if p['id'] == product_id), None)
    if not product:
        return jsonify({'error': '商品不存在'}), 404
    
    # 初始化购物车
    if user_id not in carts:
        carts[user_id] = []
    
    # 检查商品是否已在购物车
    existing_item = next((item for item in carts[user_id] if item['id'] == product_id), None)
    if existing_item:
        existing_item['quantity'] += quantity
    else:
        cart_item = {
            'id': product['id'],
            'name': product['name'],
            'price': product['price'],
            'image': product['image'],
            'quantity': quantity
        }
        carts[user_id].append(cart_item)
    
    return jsonify(carts[user_id])

@app.route('/api/cart/<string:user_id>/<int:product_id>', methods=['PUT'])
def update_cart_item(user_id, product_id):
    """更新购物车商品数量"""
    if user_id not in carts:
        return jsonify({'error': '购物车不存在'}), 404
    
    data = request.get_json()
    quantity = data.get('quantity', 1)
    
    if quantity <= 0:
        # 删除商品
        carts[user_id] = [item for item in carts[user_id] if item['id'] != product_id]
    else:
        # 更新数量
        existing_item = next((item for item in carts[user_id] if item['id'] == product_id), None)
        if existing_item:
            existing_item['quantity'] = quantity
        else:
            return jsonify({'error': '商品不在购物车中'}), 404
    
    return jsonify(carts[user_id])

@app.route('/api/cart/<string:user_id>/<int:product_id>', methods=['DELETE'])
def remove_from_cart(user_id, product_id):
    """从购物车移除商品"""
    if user_id not in carts:
        return jsonify({'error': '购物车不存在'}), 404
    
    carts[user_id] = [item for item in carts[user_id] if item['id'] != product_id]
    return jsonify(carts[user_id])

# 订单相关接口
@app.route('/api/orders', methods=['POST'])
def create_order():
    """创建订单"""
    global order_id
    data = request.get_json()
    user_id = data.get('user_id')
    shipping_info = data.get('shipping_info')
    payment_method = data.get('payment_method')
    
    if user_id not in carts or not carts[user_id]:
        return jsonify({'error': '购物车为空'}), 400
    
    # 计算订单金额
    cart_items = carts[user_id]
    total_amount = sum(item['price'] * item['quantity'] for item in cart_items)
    
    # 创建订单
    order = {
        'id': order_id,
        'user_id': user_id,
        'items': cart_items,
        'total_amount': total_amount,
        'shipping_info': shipping_info,
        'payment_method': payment_method,
        'status': '待支付',
        'created_at': '2026-03-27 00:00:00'
    }
    
    orders.append(order)
    order_id += 1
    
    # 清空购物车
    carts[user_id] = []
    
    return jsonify(order)

@app.route('/api/orders/<string:user_id>', methods=['GET'])
def get_user_orders(user_id):
    """获取用户订单"""
    user_orders = [order for order in orders if order['user_id'] == user_id]
    return jsonify(user_orders)

@app.route('/api/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    """获取订单详情"""
    order = next((o for o in orders if o['id'] == order_id), None)
    if order:
        return jsonify(order)
    return jsonify({'error': '订单不存在'}), 404

# 健康检查
@app.route('/api/health', methods=['GET'])
def health_check():
    """健康检查"""
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
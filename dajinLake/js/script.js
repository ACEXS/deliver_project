// 商品数据
const products = [
  {
    id: 1,
    name: '大金湖特色明信片套装',
    price: 38.00,
    description: '包含12张精美大金湖风光明信片，采用高质量铜版纸印刷，是收藏和送礼的佳品。',
    image: 'images/大金湖特色明信片套装.jpeg',
    category: '文创产品',
    specs: {
      size: '10cm x 15cm',
      quantity: '12张/套',
      material: '铜版纸'
    }
  },
  {
    id: 2,
    name: '泰宁岩茶礼盒装',
    price: 128.00,
    description: '精选泰宁本地岩茶，香气浓郁，口感醇厚，礼盒装包含200g茶叶，是馈赠亲友的理想选择。',
    image: 'images/泰宁岩茶礼盒装.jpg',
    category: '特产',
    specs: {
      weight: '200g',
      origin: '福建泰宁',
      shelf_life: '18个月'
    }
  },
  {
    id: 3,
    name: '大金湖钥匙扣',
    price: 15.00,
    description: '金属材质，激光雕刻大金湖标志性景点，小巧精致，便于携带，是旅游纪念的好选择。',
    image: 'images/大金湖钥匙扣.jpeg',
    category: '文创产品',
    specs: {
      material: '金属',
      size: '4cm x 3cm',
      weight: '20g'
    }
  },
  {
    id: 4,
    name: '泰宁笋干',
    price: 68.00,
    description: '采用泰宁本地新鲜竹笋，传统工艺晒干，保留原汁原味，口感鲜嫩，是烹饪的优质食材。',
    image: 'images/泰宁笋干.jpeg',
    category: '特产',
    specs: {
      weight: '500g',
      origin: '福建泰宁',
      shelf_life: '12个月'
    }
  },
  {
    id: 5,
    name: '大金湖风光画册',
    price: 88.00,
    description: '精选大金湖最美风光照片，全彩印刷，硬壳装帧，是了解大金湖自然风光的精美画册。',
    image: 'images/大金湖风光画册.jpeg',
    category: '文创产品',
    specs: {
      pages: '80页',
      size: '21cm x 28cm',
      binding: '硬壳精装'
    }
  },
  {
    id: 6,
    name: '泰宁金湖米酒',
    price: 58.00,
    description: '采用本地优质糯米，传统工艺酿造，口感醇厚，香气四溢，是泰宁特色饮品。',
    image: 'images/泰宁金湖米酒jpeg.jpeg',
    category: '特产',
    specs: {
      volume: '500ml',
      alcohol_content: '12%',
      origin: '福建泰宁'
    }
  },
  {
    id: 7,
    name: '大金湖主题T恤',
    price: 59.00,
    description: '100%纯棉材质，印制大金湖标志性景点图案，舒适透气，是旅游纪念的时尚选择。',
    image: 'images/大金湖主题T恤.jpeg',
    category: '文创产品',
    specs: {
      material: '100%纯棉',
      sizes: 'S, M, L, XL',
      color: '白色'
    }
  },
  {
    id: 8,
    name: '泰宁莲子',
    price: 45.00,
    description: '选自泰宁本地优质莲子，颗粒饱满，口感软糯，营养丰富，是滋补佳品。',
    image: 'images/泰宁莲子.jpeg',
    category: '特产',
    specs: {
      weight: '400g',
      origin: '福建泰宁',
      shelf_life: '18个月'
    }
  },
  {
    id: 9,
    name: '泰宁尚书第文创手账本',
    price: 42.00,
    description: '以泰宁尚书第为设计元素的文创手账本，采用优质纸张，精美印刷，是记录生活的好伙伴。',
    image: 'images/泰宁尚书第文创手账本.jpeg',
    category: '文创产品',
    specs: {
      size: '14.5cm x 21cm',
      pages: '120页',
      material: '优质纸张'
    }
  },
  {
    id: 10,
    name: '泰宁暖菇包',
    price: 25.00,
    description: '泰宁传统特色小吃，以糯米和暖菇为原料，口感软糯，香气扑鼻，是当地的传统美食。',
    image: 'images/泰宁暖菇包.jpeg',
    category: '特产',
    specs: {
      weight: '200g',
      origin: '福建泰宁',
      shelf_life: '6个月'
    }
  },
  {
    id: 11,
    name: '泉州开元寺文创书签',
    price: 18.00,
    description: '以泉州开元寺东西塔为设计元素的金属书签，精美镂空工艺，是阅读的好伴侣。',
    image: 'images/泉州开元寺文创书签.jpeg',
    category: '文创产品',
    specs: {
      material: '金属',
      size: '12cm x 3cm',
      weight: '15g'
    }
  },
  {
    id: 12,
    name: '泉州安溪铁观音',
    price: 158.00,
    description: '精选泉州安溪铁观音，香气馥郁，口感醇厚，是中国十大名茶之一。',
    image: 'images/泉州安溪铁观音.jpeg',
    category: '特产',
    specs: {
      weight: '250g',
      origin: '福建泉州',
      shelf_life: '24个月'
    }
  },
  {
    id: 13,
    name: '泉州德化白瓷茶具套装',
    price: 298.00,
    description: '采用泉州德化优质白瓷，手工制作，细腻光滑，是品茶的理想选择。',
    image: 'images/泉州德化白瓷茶具套装.jpeg',
    category: '文创产品',
    specs: {
      material: '德化白瓷',
      pieces: '6件套装',
      origin: '福建泉州'
    }
  },
  {
    id: 14,
    name: '泉州永春老醋',
    price: 38.00,
    description: '泉州永春特产，传统工艺酿造，酸味醇厚，是烹饪和调味的佳品。',
    image: 'images/泉州永春老醋.jpeg',
    category: '特产',
    specs: {
      volume: '500ml',
      origin: '福建泉州',
      shelf_life: '36个月'
    }
  },
  {
    id: 15,
    name: '泰宁上清溪漂流纪念T恤',
    price: 68.00,
    description: '以上清溪漂流为主题的纪念T恤，100%纯棉材质，舒适透气，是旅游纪念的好选择。',
    image: 'images/泰宁上清溪漂流纪念T恤.jpeg',
    category: '文创产品',
    specs: {
      material: '100%纯棉',
      sizes: 'S, M, L, XL',
      color: '蓝色'
    }
  },
  {
    id: 16,
    name: '泉州惠安女文创钥匙扣',
    price: 22.00,
    description: '以泉州惠安女传统服饰为设计元素的钥匙扣，小巧精致，是旅游纪念的好选择。',
    image: 'images/泉州惠安女文创钥匙扣.jpeg',
    category: '文创产品',
    specs: {
      material: '金属',
      size: '4cm x 5cm',
      weight: '20g'
    }
  }
];

// 购物车
let cart = [];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 初始化页面
  initPage();
  
  // 绑定事件
  bindEvents();
});

// 检查用户是否已登录
function checkLogin() {
  const userStr = localStorage.getItem('user');
  if (!userStr) {
    return false;
  }
  
  const user = JSON.parse(userStr);
  const now = new Date().getTime();
  
  if (now > user.expiresAt) {
    // 登录已过期
    localStorage.removeItem('user');
    return false;
  }
  
  return true;
}

// 初始化页面
function initPage() {
  // 根据当前页面执行不同的初始化操作
  const currentPage = window.location.pathname;
  
  if (currentPage.includes('index.html') || currentPage === '/') {
    // 首页
    loadFeaturedProducts();
  } else if (currentPage.includes('products.html')) {
    // 商品列表页
    loadAllProducts();
  } else if (currentPage.includes('product-detail.html')) {
    // 商品详情页
    loadProductDetail();
  } else if (currentPage.includes('cart.html')) {
    // 购物车页面
    loadCart();
  }
  
  // 更新购物车数量
  updateCartCount();
}

// 检查登录状态，未登录则跳转到登录页面
function requireLogin() {
  if (!checkLogin()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// 绑定事件
function bindEvents() {
  // 导航栏滚动效果
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
  
  // 搜索功能
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      if (!requireLogin()) return;
      const searchInput = document.querySelector('.search-input');
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        alert(`搜索: ${searchTerm}`);
        // 实际项目中这里会跳转到搜索结果页面
      }
    });
  }
  
  // 购物车相关事件
  const addToCartBtns = document.querySelectorAll('.add-to-cart');
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (!requireLogin()) return;
      const productId = parseInt(this.getAttribute('data-id'));
      addToCart(productId);
    });
  });
  
  // 数量控制
  const quantityBtns = document.querySelectorAll('.quantity-control button');
  quantityBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.parentElement.querySelector('input');
      let quantity = parseInt(input.value);
      
      if (this.textContent === '+') {
        quantity++;
      } else if (this.textContent === '-' && quantity > 1) {
        quantity--;
      }
      
      input.value = quantity;
    });
  });
}

// 加载推荐商品
function loadFeaturedProducts() {
  const productGrid = document.querySelector('.product-grid');
  if (!productGrid) return;
  
  // 随机选择4个商品作为推荐
  const featuredProducts = products.sort(() => 0.5 - Math.random()).slice(0, 4);
  
  productGrid.innerHTML = '';
  
  featuredProducts.forEach(product => {
    const productCard = createProductCard(product);
    productGrid.appendChild(productCard);
  });
}

// 加载所有商品
function loadAllProducts() {
  const productGrid = document.querySelector('.product-grid');
  if (!productGrid) return;
  
  productGrid.innerHTML = '';
  
  products.forEach(product => {
    const productCard = createProductCard(product);
    productGrid.appendChild(productCard);
  });
}

// 创建商品卡片
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card fade-in';
  
  card.innerHTML = `
    <div class="product-link" data-id="${product.id}">
      <img src="${product.image}?v=1" alt="${product.name}" class="product-image">
    </div>
    <div class="product-info">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-price">¥${product.price.toFixed(2)}</p>
      <p class="product-description">${product.description.substring(0, 80)}...</p>
      <button class="btn add-to-cart" data-id="${product.id}">加入购物车</button>
    </div>
  `;
  

  
  // 绑定商品卡片点击事件
  const productLink = card.querySelector('.product-link');
  productLink.addEventListener('click', function() {
    if (!requireLogin()) return;
    const productId = parseInt(this.getAttribute('data-id'));
    window.location.href = `product-detail.html?id=${productId}`;
  });
  
  return card;
}

// 加载商品详情
function loadProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  
  if (!productId) {
    alert('商品不存在');
    window.location.href = 'products.html';
    return;
  }
  
  const product = products.find(p => p.id === productId);
  if (!product) {
    alert('商品不存在');
    window.location.href = 'products.html';
    return;
  }
  
  // 填充商品详情
  const productDetail = document.querySelector('.product-detail');
  if (productDetail) {
    productDetail.innerHTML = `
      <div class="product-detail-image-container">
        <img src="${product.image}?v=1" alt="${product.name}" class="product-detail-image">
      </div>
      <div class="product-detail-info">
        <h1>${product.name}</h1>
        <p class="product-detail-price">¥${product.price.toFixed(2)}</p>
        <p class="product-detail-description">${product.description}</p>
        <div class="product-detail-specs">
          <h3>商品规格</h3>
          <ul>
            ${Object.entries(product.specs).map(([key, value]) => `
              <li>${key}: ${value}</li>
            `).join('')}
          </ul>
        </div>
        <div class="quantity-control">
          <button>-</button>
          <input type="number" value="1" min="1">
          <button>+</button>
        </div>
        <button class="btn btn-primary add-to-cart" data-id="${product.id}">加入购物车</button>
      </div>
    `;
    
    // 绑定事件
    const addToCartBtn = productDetail.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', function() {
      if (!requireLogin()) return;
      const quantity = parseInt(productDetail.querySelector('.quantity-control input').value);
      addToCart(product.id, quantity);
    });
    
    // 数量控制
    const quantityBtns = productDetail.querySelectorAll('.quantity-control button');
    quantityBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        let quantity = parseInt(input.value);
        
        if (this.textContent === '+') {
          quantity++;
        } else if (this.textContent === '-' && quantity > 1) {
          quantity--;
        }
        
        input.value = quantity;
      });
    });
  }
}

// 加入购物车
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  // 检查购物车中是否已有该商品
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    // 如果已有，增加数量
    existingItem.quantity += quantity;
  } else {
    // 如果没有，添加新商品
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }
  
  // 保存到本地存储
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // 更新购物车数量
  updateCartCount();
  
  // 显示添加成功提示
  alert('商品已添加到购物车');
}

// 更新购物车数量
function updateCartCount() {
  // 从本地存储获取购物车数据
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
  
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalQuantity;
  }
}

// 加载购物车
function loadCart() {
  // 从本地存储获取购物车数据
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
  
  const cartContainer = document.querySelector('.cart-container');
  if (!cartContainer) return;
  
  const cartItems = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total-amount');
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; padding: 2rem; color: #6c757d;">购物车为空</p>';
    cartTotal.textContent = '¥0.00';
    return;
  }
  
  // 计算总金额
  let total = 0;
  
  cartItems.innerHTML = '';
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    cartItem.innerHTML = `
      <img src="${item.image}?v=1" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-name">${item.name}</div>
      <div class="cart-item-price">¥${item.price.toFixed(2)}</div>
      <div class="cart-item-quantity">
        <button class="decrease" data-id="${item.id}">-</button>
        <input type="number" value="${item.quantity}" min="1">
        <button class="increase" data-id="${item.id}">+</button>
      </div>
      <div class="cart-item-total">¥${itemTotal.toFixed(2)}</div>
      <button class="cart-item-remove" data-id="${item.id}">&times;</button>
    `;
    
    cartItems.appendChild(cartItem);
  });
  
  cartTotal.textContent = `¥${total.toFixed(2)}`;
  
  // 绑定购物车操作事件
  bindCartEvents();
}

// 绑定购物车操作事件
function bindCartEvents() {
  // 增加数量
  const increaseBtns = document.querySelectorAll('.increase');
  increaseBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      const item = cart.find(item => item.id === productId);
      if (item) {
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        updateCartCount();
      }
    });
  });
  
  // 减少数量
  const decreaseBtns = document.querySelectorAll('.decrease');
  decreaseBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      const item = cart.find(item => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        updateCartCount();
      }
    });
  });
  
  // 删除商品
  const removeBtns = document.querySelectorAll('.cart-item-remove');
  removeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      cart = cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      loadCart();
      updateCartCount();
    });
  });
  
  // 数量输入框变化
  const quantityInputs = document.querySelectorAll('.cart-item-quantity input');
  quantityInputs.forEach(input => {
    input.addEventListener('change', function() {
      const productId = parseInt(this.parentElement.querySelector('button').getAttribute('data-id'));
      const item = cart.find(item => item.id === productId);
      if (item) {
        let quantity = parseInt(this.value);
        if (isNaN(quantity) || quantity < 1) {
          quantity = 1;
        }
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        updateCartCount();
      }
    });
  });
}

// 表单提交
function submitForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // 模拟表单提交
    alert('表单提交成功！');
    form.reset();
    
    // 实际项目中这里会发送AJAX请求
  });
}

// 页面滚动动画
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

// 搜索商品
function searchProducts() {
  const searchInput = document.querySelector('.search-input');
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  if (!searchTerm) {
    loadAllProducts();
    return;
  }
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
  
  const productGrid = document.querySelector('.product-grid');
  if (!productGrid) return;
  
  productGrid.innerHTML = '';
  
  if (filteredProducts.length === 0) {
    productGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; padding: 2rem; color: #6c757d;">没有找到相关商品</p>';
    return;
  }
  
  filteredProducts.forEach(product => {
    const productCard = createProductCard(product);
    productGrid.appendChild(productCard);
  });
}

// 分类筛选
function filterByCategory(category) {
  const productGrid = document.querySelector('.product-grid');
  if (!productGrid) return;
  
  let filteredProducts;
  
  if (category === 'all') {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(product => product.category === category);
  }
  
  productGrid.innerHTML = '';
  
  filteredProducts.forEach(product => {
    const productCard = createProductCard(product);
    productGrid.appendChild(productCard);
  });
}

// 平滑滚动
function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({ 
    behavior: 'smooth' 
  });
}

// 图片懒加载
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// 响应式导航
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

// 初始化所有功能
function initAll() {
  initPage();
  bindEvents();
  animateOnScroll();
  lazyLoadImages();
  
  // 监听滚动事件
  window.addEventListener('scroll', animateOnScroll);
  
  // 监听表单提交
  submitForm('contact-form');
  submitForm('checkout-form');
}
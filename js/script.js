  const initCarousel = () => {
    const carousel = document.querySelector('.lunbotu');
    const wrapper = document.querySelector('.lunbotu-wrapper');
    const items = document.querySelectorAll('.lunbotu-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // 若轮播图元素不全，直接终止初始化（避免控制台报错）
    if (!carousel || !wrapper || items.length === 0 || !prevBtn || !nextBtn) {
      return;
    }

    let currentIndex = 0;
    const itemCount = items.length;
    const interval = 1500;
    let timer = null;

    // 切换到指定轮播图
    const goToSlide = (index) => {
      if (index < 0) index = itemCount - 1;
      if (index >= itemCount) index = 0;
      currentIndex = index;
      const offset = -currentIndex * carousel.offsetWidth;
      wrapper.style.transform = `translateX(${offset}px)`;
    };

    // 下一张
    const nextSlide = () => goToSlide(currentIndex + 1);
    // 上一张
    const prevSlide = () => goToSlide(currentIndex - 1);
    // 开始自动播放
    const startAutoPlay = () => {
      timer = setInterval(nextSlide, interval);
    };
    // 停止自动播放
    const stopAutoPlay = () => {
      clearInterval(timer);
    };

    // 绑定轮播图事件
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    window.addEventListener('resize', () => {
      const offset = -currentIndex * carousel.offsetWidth;
      wrapper.style.transform = `translateX(${offset}px)`;
    });

    // 初始化自动播放
    startAutoPlay();
  };

  // 初始化轮播图
  initCarousel();


document.addEventListener('DOMContentLoaded', function() {
  // 获取所有图片元素（注意用 querySelectorAll）
  const collImgs = document.querySelectorAll('.coll-img');
  
  // 遍历每个图片，为每个图片绑定事件
  collImgs.forEach(img => {
    // 找到当前图片对应的文本块（同一容器内的 .coll-text）
    const collText = img.nextElementSibling; // 假设文本块是图片的下一个兄弟元素
    
    // 鼠标悬浮：显示一小段
    img.addEventListener('mouseenter', function() {
      if (!collText.classList.contains('show')) {
        collText.classList.add('hover-show');
      }
    });

    // 鼠标离开：隐藏小段（未点击时）
    img.addEventListener('mouseleave', function() {
      if (!collText.classList.contains('show')) {
        collText.classList.remove('hover-show');
      }
    });

    // 点击：展开/收起全部
    img.addEventListener('click', function() {
      collText.classList.toggle('show');
      collText.classList.remove('hover-show'); // 避免冲突
    });
  });
});


// 获取所有章节、按钮和索引项
const chapters = document.querySelectorAll('.jiyi');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indexItems = document.querySelectorAll('.index-item-new');
let currentIndex = 0; // 当前章节索引（默认第1章）

// 更新章节显示状态（包含章节切换、按钮状态控制、索引项同步及滚动逻辑）
function updateChapter() {
  // 隐藏所有章节，显示当前章节
  chapters.forEach(chapter => chapter.classList.remove('active'));
  chapters[currentIndex].classList.add('active');

  // 控制上下页按钮禁用状态
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === chapters.length - 1;

  // 同步索引项active状态
  updateIndexActive();

  // 非第一页时平滑滚动到章节顶部
  if (currentIndex !== 0) {
    setTimeout(() => {
        chapters[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
  }
}

// 根据当前章节更新索引项active状态
function updateIndexActive() {
  indexItems.forEach(item => item.classList.remove('active'));
  // 章节与索引项的对应规则
  if (currentIndex >= 0 && currentIndex <= 2) {
    // 营造技艺相关章节（第1-3章）对应第一个索引项
    indexItems[0].classList.add('active');
  } else if (currentIndex >= 3 && currentIndex <= 6) {
    // 手工制作技艺相关章节（第4-7章）对应第二个索引项
    indexItems[1].classList.add('active');
  } else if (currentIndex >= 7 && currentIndex <= 9) {
    // 表演技艺相关章节（第8-10章）对应第三个索引项
    indexItems[2].classList.add('active');
  } else if (currentIndex === 10) {
    // 传承与价值章节（最后一章）默认选中最后一个索引项
    indexItems[2].classList.add('active');
  }
}

// 绑定索引项点击事件（实现索引项跳转功能）
function bindIndexClick() {
  indexItems.forEach((item, itemIndex) => {
    item.addEventListener('click', () => {
      // 根据索引项设置对应的起始章节索引
      switch (itemIndex) {
        case 0:
          currentIndex = 0; // 点击"营造技艺"，跳转到第1章
          break;
        case 1:
          currentIndex = 3; // 点击"手工制作技艺"，跳转到第4章
          break;
        case 2:
          currentIndex = 7; // 点击"表演技艺"，跳转到第8章
          break;
      }
      updateChapter(); // 更新章节显示
    });
  });
}

// 上下页按钮点击事件
nextBtn.addEventListener('click', () => {
  if (currentIndex < chapters.length - 1) {
    currentIndex++;
    updateChapter();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateChapter();
  }
});

// 初始化：绑定索引事件 + 显示默认章节
bindIndexClick();
updateChapter();

function typeFullContent(targetId, btn) {
  // 第一步：先获取元素，判断是否存在
  const contentEl = document.getElementById(targetId);
  if (!contentEl) return;
  
  // 检查是否已展开，若已展开则执行收缩逻辑
  if (contentEl.classList.contains('expanded')) {
    contentEl.classList.remove('expanded');
    contentEl.style.display = "none";
    btn.disabled = false;
    btn.textContent = "展开全文";
    
    const parentText = contentEl.closest('.wenxue-text');
    const shortText = parentText.querySelector('p:not(.hidden-content p)');
    if (shortText) shortText.style.display = "block";
    
    return;
  }

  // 移除所有额外样式设置，仅保留功能逻辑
  const fullHtml = contentEl.innerHTML;
  const parentText = contentEl.closest('.wenxue-text');
  const shortText = parentText.querySelector('p:not(.hidden-content p)');
  if (shortText) shortText.style.display = "none";

  contentEl.innerHTML = "";
  contentEl.style.display = "block";
  btn.disabled = true;
  btn.textContent = "正在加载全文...";
  contentEl.classList.add('expanded');

  const parts = fullHtml.split(/(<[^>]+>)/).filter(part => part);
  let partIndex = 0;
  let charIndex = 0;
  let interval;

  function typeNext() {
    if (partIndex >= parts.length) {
      clearInterval(interval);
      btn.textContent = "收起全文";
      btn.disabled = false;
      return;
    }

    const currentPart = parts[partIndex];
    if (currentPart.startsWith('<')) {
      contentEl.innerHTML += currentPart;
      partIndex++;
      charIndex = 0;
    } else {
      if (charIndex < currentPart.length) {
        contentEl.innerHTML += currentPart.charAt(charIndex);
        charIndex++;
      } else {
        partIndex++;
        charIndex = 0;
      }
    }
  }

  interval = setInterval(typeNext, 30);
}
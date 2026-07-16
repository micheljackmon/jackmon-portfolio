let currentIndex = 0;
let currentImages = [];
let modal = null;
let modalImg = null;

document.addEventListener('DOMContentLoaded', function () {
  // 创建弹窗
  modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-close">×</div>
    <div class="modal-arrow modal-left">←</div>
    <div class="modal-arrow modal-right">→</div>
    <img class="modal-img" />
  `;
  document.body.appendChild(modal);
  modalImg = modal.querySelector('.modal-img');

  // 关闭按钮
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  // 左右箭头（只保留一次）
  modal.querySelector('.modal-left').addEventListener('click', prevImg);
  modal.querySelector('.modal-right').addEventListener('click', nextImg);

  // 键盘切换
  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('show')) return;
    if (e.key === 'ArrowLeft') prevImg();
    if (e.key === 'ArrowRight') nextImg();
    if (e.key === 'Escape') closeModal();
  });

  // 绑定当前页面的作品
  initGallery();
});

function initGallery() {
  const items = document.querySelectorAll('.work-item img');
  currentImages = Array.from(items).map(img => img.src);

  items.forEach((img, index) => {
    img.parentElement.addEventListener('click', function () {
      openModal(index);
    });
  });
}

function openModal(index) {
  currentIndex = index;
  modalImg.src = currentImages[currentIndex];
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function prevImg() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  modalImg.src = currentImages[currentIndex];
}

function nextImg() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  modalImg.src = currentImages[currentIndex];
}
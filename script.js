// 加载留言
function loadMessages() {
    let list = document.getElementById('messageList');
    list.innerHTML = '';
    let messages = JSON.parse(localStorage.getItem('jackmonMessages') || '[]');
    
    messages.forEach(item => {
        let div = document.createElement('div');
        div.className = 'message-item';
        div.innerHTML = `
            <strong>${item.name}</strong> · ${item.time}
            <p>${item.content}</p>
        `;
        list.appendChild(div);
    });
}

// 保存留言
function saveMessage() {
    let name = document.getElementById('name').value.trim();
    let content = document.getElementById('content').value.trim();
    
    if(!name || !content) {
        alert('请填写称呼和留言内容');
        return;
    }
    
    let time = new Date().toLocaleString();
    let messages = JSON.parse(localStorage.getItem('jackmonMessages') || '[]');
    
    messages.unshift({ name, content, time });
    localStorage.setItem('jackmonMessages', JSON.stringify(messages));
    
    document.getElementById('name').value = '';
    document.getElementById('content').value = '';
    loadMessages();
    alert('留言成功！');
}

// 页面加载时显示留言
window.onload = loadMessages;
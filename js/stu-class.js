function send(ItemName,element){
    var name = ItemName;
    var tempprice = element.querySelector('.price');
    var lessonID = element.getAttribute('id');
    var price = tempprice.textContent.slice(2);
    var url ='../image/class.jpg';
    var time = new Date();
    var dueDate = new Date(time);
    var content = element.querySelector('.Content').innerText;
    dueDate.setFullYear(time.getFullYear()+1);
    var time = dueDate.toLocaleDateString();
    var product = {
        name,
        price,
        url,
        time,
        content};
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    var aa = new Date();
    var temptime = new Date(aa);
    temptime.setFullYear(aa.getFullYear()+1);
    var endTime = temptime.toLocaleDateString();
    var startTime = aa.toLocaleDateString();
    var account = element.getAttribute('account');
    console.log("account:",account);
    var temp ={
        lessonID
    }
    localStorage.setItem('book',JSON.stringify(temp));
    cart.push(product);
    console.log(product);
    console.log(temp);
    localStorage.setItem('product', JSON.stringify(product));
    const max = 5;
    if(cart.length >5){
        localStorage.removeItem('cart');
    }
    window.location.href="../html/buyclass.html";
}


document.addEventListener('DOMContentLoaded',function(){
    var token = localStorage.getItem('JwtToken');
    var userInfo = localStorage.getItem('userInfo');
    const login = document.getElementById("login");
    const register = document.getElementById("register");

    if(userInfo){
        var user = JSON.parse(userInfo);

        if(login) login.style.display = 'none';
        if(register) register.style.display ='none';
        document.getElementById('userid').innerHTML=("歡迎:")+user.account;
        // localStorage.removeItem('userInfo');
        // localStorage.removeItem('JwtToken');
    }

    fetch('http://localhost:5062/api/lesson/GetAllLessons',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        }
    })
    .then(res => {
        if (!res.ok)
        {
            throw new  Error('Failed to fetch lesson');
        }
        return res.json();
    })
    .then(data => {
        const container = document.getElementById("AAAA");
        if (!container) {
            console.error('Could not find element with id "body-class".');
            return;}
        console.log(data);
        data.forEach(DD => {
            const divtemp = document.createElement('div');
            function takeName(){
            if(DD.type == 1)
            return  '國文';
            else if(DD.type == 2)
            return '英文';
            else if (DD.type == 3)
            return '數學';
            else if (DD.type == 4)
            return '自然';
            else if (DD.type == 5)
            return '社會';
            }
            divtemp.innerHTML = `
            <div class="body-block">
                    <div class="block-content" id="${DD.lessonID}" account=${DD.account} data-name="英文課程" onclick="send('${takeName()}',this)">
                        <img data-src="../image/class.jpg" src="../image/class.jpg" alt="">                        
                        <div class="block-title">
                            <h2>${takeName()}</h2>
                            <h3 class='Content' name='內容' style="display: none;">${DD.content}</h3>
                            <h3 class='year' name='年份'>${DD.year}年</h3>
                            <h3 class="price" data-price="3000" >NT${DD.price}</h3>
                        </div> 
                    </div>
                </div>
            `;
            container.appendChild(divtemp);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });


});

function logout(){
    fetch("http://localhost:5062/api/member/logout",{
        method:'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('JwtToken')}`
        },
    })
    .then(response => {
        // 检查响应状态
        if (!response.ok) {
            // 如果响应状态不是 200 OK，则抛出错误
            throw new Error('登出失败');
        }
        else{
        // 返回 JSON 格式的响应数据
        return response.text();
        
        }
    })
    .then(data => {
        // 处理成功登出的逻辑
        console.log('response:', data);
        
        // 删除客户端上的 JwtToken 和用户信息
        localStorage.removeItem('JwtToken');
        localStorage.removeItem('userInfo');
        // 可选：重定向到登录页面或其他页面
        window.location.href = '../html/login.html';
    })
    .catch(error => {
        // 处理请求中的错误
        console.error('登出操作中发生错误:', error);
    });
    }

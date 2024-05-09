function logout(){
    fetch("http://localhost:5062/api/member/logout",{
        method:'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JwtToken')
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
        
        var temp = localStorage.getItem('data');
        var data = JSON.parse(temp);
        var price = data.price;
        var content =data.content;
        var account = data.account;
        var id = data.id;
        var year = data.year;
        const container = document.getElementById("AAAA");
        const divtemp = document.createElement('div');
        divtemp.innerHTML = `
                    <div class="content-up">
                    <div class="content-left">
                        <div class="up-topic">
                            更新課程
                        </div>
                        <div class="down-body">
                            <div class="down-body1">
                                選擇科目
                            </div>
                            <div class="down-body2">
                                <select name="" id="select">
                                    <option>請選擇</option>
                                    <option id="1">國文</option>
                                    <option id="2">英文</option>
                                    <option id="3">數學</option>
                                    <option id="4">自然</option>
                                    <option id="5">社會</option>
                                </select>
                            </div>
                        </div>
                        <div class="down-body">
                            <div class="down-body1">
                                課程價格
                            </div>
                            <div class="down-body2">
                                <input type="text" placeholder="${price}" id="price">
                            </div>
                        </div>
                        <div class="down-body">
                            <div class="down-body1">
                                課程介紹
                            </div>
                            <div class="down-body2">
                                <input type="text"  placeholder="${content}" id="content">
                            </div>
                        </div>
                        <div class="down-body">
                            <div class="down-body1">
                                課程年分
                            </div>
                            <div class="down-body3">
                                <input type="text" placeholder="${year}" id="year">
                            </div>
                        </div>
                        <div class="down-body">
                            <div class="down-body1">
                                影片連結
                            </div>
                            <div class="down-body2">
                                <input type="text" id="video" id="video">
                            </div>
                        </div>
                    </div>
                    <div class="content-right">
                    <a href="">
                        <div class="right1">
                            <iframe width="300px" height="250px" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                        </a>
                        <div class="right2">
                            影片預覽
                        </div>
                    </div>
                </div>
                <div class="up-button">
                    <div class="button1" type="button">
                        <input type="button" value="更新" class="block-input" onclick="edit(${id})">
                        <input type="button" value="上一頁" class="block-input" onclick="goback()">
                    </div>
                </div>
                    `;
                    container.appendChild(divtemp);



                    const selectElement = document.getElementById('select');
                    selectElement.addEventListener('change', function() {
                        const selectedOption = selectElement.options[selectElement.selectedIndex];
                        const selectedId = selectedOption.id;
                        console.log(selectedId);
                        var temp = localStorage.setItem('type',selectedId);
                    });
    });
    function goback()
{
    window.location.href="../html/tea-class.html";    
}    
function edit(id){
    var price = document.getElementById('price').value;
    var content = document.getElementById('content').value;
    var year =document.getElementById('year').value;
    var type = localStorage.getItem('type');
    var temp = new Date();
    var EditTime = temp.toLocaleDateString();
    var lessonId = id;
    var Video = document.getElementById('video').value;
    var data = {
        price,
        content,
        year,
        type,
        lessonId,
        Video
    }
    var token = localStorage.getItem('JwtToken');
    var jsondata =JSON.stringify(data);
    console.log( jsondata);
    fetch ('http://localhost:5062/api/lesson/edit',{
        method:'POST',
        headers:{
            'Content-Type' : 'Application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: jsondata
    })
    .then(res =>{
        if(!res.ok){
            throw new Error('失敗拉幹');
        }
        return res.text();
    })
    .then(data => {
        console.log(data);
        window.alert("更新成功");
        window.location.href = '../html/tea-class.html';
    })
}
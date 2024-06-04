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
document.addEventListener('DOMContentLoaded',function(){
    
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
    var token = localStorage.getItem('JwtToken');
    var jsondata ={

    }
    var data = JSON.stringify(jsondata);
    fetch('http://localhost:5062/api/Book/GetBooks',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:data
    })
    .then(res => {
        console.log("res:",res);
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
            <div class="body-block" year=${DD.year} content=${DD.content} startTime=${DD.startTime} endTime=${DD.endTime} video=${DD.video} object=${DD.type} onclick="gotoclassdata(this)">
                    <div class="block-content">
                        <img data-src="../image/class.jpg" src="../image/class.jpg" alt="">                        
                        <div class="block-title">
                            <h2>${takeName()}</h2>
                            <h3 class='Content' name='年份'>課程年分:${DD.year}</h3>
                            <h3 class='Content'>${DD.content}</h3>
                            <h3>結束時間:${DD.endTime.slice(0,10)}</h3>
                        </div> 
                    </div>
                </div>
            `;
            container.appendChild(divtemp);
        });
    })


});

function gotoclassdata(element){
    var year = element.getAttribute('year');
    var content = element.getAttribute('content');
    var startTime = element.getAttribute('startTime').slice(0,10);
    var endTime = element.getAttribute('endTime').slice(0,10);
    var video = element.getAttribute('video');
    var object = element.getAttribute('object');
    var temp ={
        year,
        content,
        startTime,
        endTime,
        video,
        object
    }
    var data = JSON.stringify(temp);
    localStorage.setItem('classData',data);
    window.location.href="../html/classdata.html";
}

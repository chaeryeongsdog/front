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
    var token = localStorage.getItem('JwtToken');
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
    var data = JSON.parse(localStorage.getItem('classData'));
    console.log(data);
    
    var Datacontainer = document.getElementById('AAAA');
    var temp = document.createElement('div');
    function takeName(){
        if(data.object == 1)
        return  '國文';
        else if(data.object == 2)
        return '英文';
        else if (data.object == 3)
        return '數學';
        else if (data.object == 4)
        return '自然';
        else if (data.object == 5)
        return '社會';
        }
    Datacontainer.innerHTML=`
                <div class="left">
                    <iframe width="840px" height="480px" src="${data.video}"></iframe>
                    <div class="left-down">
                        <h3>課程內容：</h3>
                        <p>${data.content}
                        </p>
                    </div>
                </div>
            <div class="right">
                <div class="block"> 
                    <h3>課程名稱</h3>
                    <p>${takeName()}</p>
                </div>
                <div class="block">
                    <h3>課程老師</h3>
                    <p>江宜陞</p>
                </div>
                <div class="block">
                    <h3>購買日</h3>
                    <p>${data.startTime}</p>
                </div>
                <div class="block">
                    <h3>到期日</h3>
                    <p>${data.endTime}</p>
                </div>
                <button year="${data.year}" type="${data.object}" onclick="gotoexam(this)">前往考試</button>
            </div>
    `
});
function gotoexam(element){
    var year = element.getAttribute('year');
    var type = element.getAttribute("type");
    var isdelete = false;
    var data ={
        year,
        type,
        isdelete
    }
    var jsondata = JSON.stringify(data);
    
    fetch('http://localhost:5062/api/question/Quiz',{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body:jsondata
    })
    .then(res => {
        if(!res.ok){
            throw new Error("錯誤囉")
        }
        return res.json();
    })
    .then(data => {
        localStorage.setItem("QUIZ",JSON.stringify(data));
        window.location.href="../html/exam.html";
    })
}
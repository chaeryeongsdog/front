function send(){
    var password = document.getElementById('username').value;
    var newPassword = document.getElementById('password').value;
    var newPasswordcheck = document.getElementById('comfirm_password').value;
    var password ={
        password,
        newPassword,
        newPasswordcheck,
        account:""
    }
    var data = JSON.stringify(password);
    console.log(data);
    var token = localStorage.getItem('JwtToken');
    fetch('http://localhost:5062/api/member/changepassword',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        },
        body: data
    })  
    .then(response => {
        if (!response.ok) {
            window.alert("輸入錯誤!");
            return Promise.reject(new Error('帳號或信箱輸入錯誤'));
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
        window.alert(data);
        window.location.href = '../html/tea-index.html';
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // document.getElementById("TT").innerHTML = error.message;
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

});

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
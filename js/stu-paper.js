var chinese = document.getElementById("chinese");
var math = document.getElementById("math");
var english = document.getElementById("english");
var natural = document.getElementById("natural");
var society = document.getElementById("society");

chinese.addEventListener("click",function(){
    document.getElementById("tab-chinese").style.display="flex";
    document.getElementById("tab-math").style.display="none";
    document.getElementById("tab-english").style.display="none";
    document.getElementById("tab-natural").style.display="none";
    document.getElementById("tab-society").style.display="none";
    chinese.style.backgroundColor="#034A8C";
    chinese.style.color="white";
    math.style.backgroundColor="#d9d9d9";
    math.style.color="black"
    english.style.backgroundColor="#d9d9d9";
    english.style.color="black"
    natural.style.backgroundColor="#d9d9d9";
    natural.style.color="black"
    society.style.backgroundColor="#d9d9d9";
    society.style.color="black"
});

math.addEventListener("click",function(){
    document.getElementById("tab-chinese").style.display="none";
    document.getElementById("tab-math").style.display="flex";
    document.getElementById("tab-english").style.display="none";
    document.getElementById("tab-natural").style.display="none";
    document.getElementById("tab-society").style.display="none";
    chinese.style.backgroundColor="#d9d9d9";
    chinese.style.color="black"
    math.style.backgroundColor="#034A8C";
    math.style.color="white";
    english.style.backgroundColor="#d9d9d9";
    english.style.color="black"
    natural.style.backgroundColor="#d9d9d9";
    natural.style.color="black"
    society.style.backgroundColor="#d9d9d9";
    society.style.color="black"
});

english.addEventListener("click",function(){
    document.getElementById("tab-chinese").style.display="none";
    document.getElementById("tab-math").style.display="none";
    document.getElementById("tab-english").style.display="flex";
    document.getElementById("tab-natural").style.display="none";
    document.getElementById("tab-society").style.display="none";
    chinese.style.backgroundColor="#d9d9d9";
    chinese.style.color="black"
    math.style.backgroundColor="#d9d9d9";
    math.style.color="black"
    english.style.backgroundColor="#034A8C";
    english.style.color="white";
    natural.style.backgroundColor="#d9d9d9";
    natural.style.color="black"
    society.style.backgroundColor="#d9d9d9";
    society.style.color="black"
});

natural.addEventListener("click",function(){
    document.getElementById("tab-chinese").style.display="none";
    document.getElementById("tab-math").style.display="none";
    document.getElementById("tab-english").style.display="none";
    document.getElementById("tab-natural").style.display="flex";
    document.getElementById("tab-society").style.display="none";
    chinese.style.backgroundColor="#d9d9d9";
    chinese.style.color="black"
    math.style.backgroundColor="#d9d9d9";
    math.style.color="black"
    english.style.backgroundColor="#d9d9d9";
    english.style.color="black";
    natural.style.backgroundColor="#034A8C";
    natural.style.color="white";
    society.style.backgroundColor="#d9d9d9";
    society.style.color="black"
});

society.addEventListener("click",function(){
    document.getElementById("tab-chinese").style.display="none";
    document.getElementById("tab-math").style.display="none";
    document.getElementById("tab-english").style.display="none";
    document.getElementById("tab-natural").style.display="none";
    document.getElementById("tab-society").style.display="flex";
    chinese.style.backgroundColor="#d9d9d9";
    chinese.style.color="black"
    math.style.backgroundColor="#d9d9d9";
    math.style.color="black"
    english.style.backgroundColor="#d9d9d9";
    english.style.color="black";
    natural.style.backgroundColor="#d9d9d9";
    natural.style.color="black";
    society.style.backgroundColor="#034A8C";
    society.style.color="white";
});
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
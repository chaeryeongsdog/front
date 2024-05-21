//#region 登出
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
        localStorage.removeItem('quiz');
        // 可选：重定向到登录页面或其他页面
        window.location.href = '../html/login.html';
    })
    .catch(error => {
        // 处理请求中的错误
        console.error('登出操作中发生错误:', error);
    });
    }
    //#endregion


  //#region 展示資料
  var que = JSON.parse(localStorage.getItem('questions'));
  var quiz = JSON.parse(localStorage.getItem('quiz'));
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
  });
  //#endregion
  
  
//#region 取得隱藏題目

    var isDelete = true;
    var type = que.type;
    var year = que.year;
    var data ={
        isDelete,
        type,
        year
    }
    var jsondata = JSON.stringify(data);
    fetch('http://localhost:5062/api/question/AllHideQuiz',{
        method:'POST',
        headers: {
            'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
        },
        body: jsondata
    })
    .then(res => {
        if(!res.ok){
            throw new Error("錯誤")
        }
        return res.json()
    })
    .then(data => {
        var ABC = document.getElementById('cccc');
        ABC.innerHTML='';
                data.forEach(DD => {
                    if(DD.type == que.type && DD.year == que.year){
                      var productDiv = document.createElement('div');
                      productDiv.innerHTML=
                      `
                      <div class="test-block">
                            <div class="block-left">
                                <h2>${DD.content}</h2>
                            </div>
                            <div class="block-right">
                                <button class="dele" id="${DD.questionID}" onclick="UnHide(this)">開啟隱藏</button>
                            </div>
                        </div>
                      `
                        ABC.appendChild(productDiv);
                    }
                })
    })



//#region  取消隱藏
function UnHide(element){
var questionID = element.id;
var data ={
    questionID
}
var jsondata = JSON.stringify(data);
fetch('http://localhost:5062/api/question/Gethide',{
    method:'POST',
    headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
    },
    body:jsondata
})
.then(res => {
    if(!res.ok){
        throw new erorr("失敗")
    }
    return res.text();
})
.then(data => {
    alert("顯示題目成功");
    console.log(data);
    window.location.href = "../html/getHideQuestion.html";
})

}
//#endregion
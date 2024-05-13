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



var que = JSON.parse(localStorage.getItem('questions'));
var quiz = JSON.parse(localStorage.getItem('quiz'));

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
  var cartContainer = document.getElementById('AAAA');
  cartContainer.innerHTML='';

          quiz.forEach(DD => {
              if(DD.type == que.type && DD.year == que.year){
                var productDiv = document.createElement('div');
                productDiv.innerHTML=
                `
                <div class="test-block">
                      <div class="block-left">
                          <h2>${DD.content}</h2>
                      </div>
                      <div class="block-right">
                          <button class="modi" content="${DD.content}" onclick="openDialog(this)">修改</button>
                          <button class="dele">刪除</button>
                      </div>
                  </div>
                `
                  cartContainer.appendChild(productDiv);
              }
          })
});



function openDialog(element) {
    var cartContainer = document.getElementById('BBBB');
    cartContainer.innerHTML='';
    var content = element.getAttribute('content');
    var productDiv = document.createElement('div');
                productDiv.innerHTML=
                `
                <form action="" name="change">
                    <div class="dialog-block">
                        <h3>題目：</h3>
                        <textarea name="" id="">${content}</textarea>
                    </div>
                    <div class="dialog-block">
                        <h3>解答：</h3>
                        <div class="radio">
                            <label for="A">A</label>
                            <input type="radio" name="Ans" id="A">
                            <label for="B">B</label>
                            <input type="radio" name="Ans" id="B">
                            <label for="C">C</label>
                            <input type="radio" name="Ans" id="C">
                            <label for="D">D</label>
                            <input type="radio" name="Ans" id="D">
                        </div>
                    </div>
                </form>
                <div class="button">
                    <button onclick="closeDialog()">儲存</button>
                    <button onclick="closeDialog()">取消</button>
                </div>
                `
                  cartContainer.appendChild(productDiv);

    const dialog = document.querySelector('dialog');
    dialog.showModal(dialog);
    dialog.style.display="flex";
}
function closeDialog() {
  const dialog = document.querySelector('dialog');
  dialog.close();
  dialog.style.display="none"
}
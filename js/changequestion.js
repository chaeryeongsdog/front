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
    var quiz = JSON.parse(localStorage.getItem('aaa'));
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



  var isdelete = false;
var aa={
    isdelete
}
var jsondata = JSON.stringify(aa);
    fetch('http://localhost:5062/api/question/AllQuiz',{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body:jsondata
    })
    .then(res => {
        if(!res.ok){
            throw new Error('失败拉');
        }
        return res.json();
    })
    .then(data => {
        console.log(data);
        localStorage.setItem('aaa',JSON.stringify(data));

        var cartContainer = document.getElementById('AAAA');
        cartContainer.innerHTML='';
      
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
                                <button class="modi" content="${DD.content}" id="${DD.questionID}" onclick="openDialog(this)">修改</button>
                                <button class="dele" id="${DD.questionID}" onclick="HideQuestion(this)">隱藏</button>
                            </div>
                        </div>
                      `
                        cartContainer.appendChild(productDiv);
                    }
                })
    })
    .catch(error => {
        console.error('Error:', error);
    });

})

//#endregion


//#region 開啟個別題目對話框
function openDialog(element) {
    console.log(element.id);
    var cartContainer = document.getElementById('BBBB');
    cartContainer.innerHTML='';
    var content = element.getAttribute('content');
    var productDiv = document.createElement('div');
                productDiv.innerHTML=
                `
                <form action="" name="change">
                    <div class="dialog-block">
                        <h3>題目：</h3>
                        <textarea name="" id="contenT" DataidValue="${element.id}">${content}</textarea>
                    </div>
                    <div class="dialog-block">
                        <h3>解答：</h3>
                        <div class="radio" id="select">
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
                    <button onclick="saveDialog()">儲存</button>
                    <button onclick="closeDialog()">取消</button>
                </div>
                `
                  cartContainer.appendChild(productDiv);

    const dialog = document.querySelector('dialog');
    dialog.showModal(dialog);
    dialog.style.display="flex";
}
//#endregion
//#region 儲存題目修改
function saveDialog(){
    const dialog = document.querySelector('dialog');
    var content = document.getElementById('contenT').value;
    var Answer = document.querySelector('input[name="Ans"]:checked').id;
    var questionID = document.querySelector('#contenT').getAttribute('DataidValue');
    var Image = '';
    var question ={
        questionID,
        content,
        Answer
    }
    var finaldata = {
        question,
        Image
    }
    console.log(finaldata);
    var jsondata = JSON.stringify(finaldata);
    fetch('http://localhost:5062/api/question/edit',{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:jsondata
    }),
    then(res => {
        if(!res.ok){
            throw new Error('失敗');
        }
        return res
    }),
    then(data =>{
        console.log(data);
    })

    dialog.close();
    dialog.style.display="none"
}
//#endregion

//#region 退出對話框
function closeDialog() {
  const dialog = document.querySelector('dialog');
  dialog.close();
  dialog.style.display="none"
}
//#endregion



//#region 上傳檔案
function uploadFile() {
    // Select the file input element by its ID 'addpaper'
    const fileInput = document.getElementById('addpaper');

    // Define an event handler for when a file is selected
    fileInput.onchange = async function() {
        // Get the first file selected by the user
        const file = fileInput.files[0];

        // If no file is selected, alert the user and exit the function
        if (!file) {
            alert("請選擇一個文件");
            return;
        }

        // Create a new FormData object to hold the file data
        const formData = new FormData();
        // Append the selected file to the FormData object with the key 'file'
        formData.append('file', file);

        fetch ('http://localhost:5062/api/question/import',{
            method:'POST',
            headers:{
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(res => {
            if(!res.ok){
                throw new error('上船失敗')
            }
            return res.text()
        })
        .then(data => {
            alert('文件上傳成功');
            console.log(data);
        })
    };
}
//#endregion
//#region 隱藏題目
function HideQuestion(element){
    var questionID = element.id;
    var data ={
        questionID
    }
    var jsondata = JSON.stringify(data);
    fetch('http://localhost:5062/api/question/hide',{
        method:'POST',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type' : 'application/json'
        },
        body:jsondata
    })
    .then(res =>{
        if(!res.ok){
            throw new error("錯誤拉")
        }
        return res.text()
    })
    .then(data => {
        alert("成功隱藏");
        console.log(data);
        window.location.reload();
    })
}
//#endregion

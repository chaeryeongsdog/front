function sendData() {
    var Account = document.getElementById("username").value;
    var Password = document.getElementById("password").value;
    var confirmPass=document.getElementById("comfirm_password").value;
    var Email = document.getElementById("gmail").value;
    const url = "http://localhost:5062/api/member/Register";
    var Role = "string";
    var AuthCode = "string";
    var isDelete = true;
    // 创建一个包含用户输入数据的 JavaScript 对象
    var memberData = {
        Account,
        Password,
        Email,
        Role,
        isDelete,
        AuthCode
    };
    if(Password != confirmPass){
        return document.getElementById("result").innerHTML="確認密碼輸入不正確";
    }
    else
    {
    console.log(memberData);
    var jsondata= JSON.stringify(memberData);

    fetch("http://localhost:5062/api/member/Register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsondata
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Response from server:', data);
        window.location.href = 'http://127.0.0.1:5500/front/html/index.html';
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
    
    }
}
//我肏你媽
    
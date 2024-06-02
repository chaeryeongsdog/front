function keyRegister(event) {
    if (event.keyCode == 13) {
        document.getElementById("registerBtn").click();
    }
}

function sendData() {
    var Account = document.getElementById("username").value;
    var Password = document.getElementById("password").value;
    var confirmPass=document.getElementById("comfirm_password").value;
    var Email = document.getElementById("gmail").value;
    const url = "http://localhost:5062/api/member/Register";

    const radioButtons = document.querySelectorAll('input[name="iden"]');
    function gettt(){
    for(var i=0 ;i<radioButtons.length;i++){
        const radioButton = radioButtons[i];
        if (radioButton.checked) {
            // 返回选中单选按钮的 id 属性值
            return radioButton.id;
        }
    }}
    var Role = gettt(); 
    var AuthCode = "string";
    var isDelete = true;
    

    
    var memberData = {
        Account,
        Password,
        Email,
        Role,
        isDelete,
        AuthCode
    };
    console.log(memberData);
    if(Password != confirmPass){
        // return document.getElementById("result").innerHTML="確認密碼輸入不正確";
        window.alert("確認密碼輸入不正確");
    }
    else
    {
    console.log(memberData);
    var jsondata = JSON.stringify(memberData);

    fetch("http://localhost:5062/api/member/Register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsondata
    })
    .then(response => {
        if (!response.ok) {
            window.alert("註冊失敗")
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log('Response from server:', data);
        window.alert("請到信箱收取驗證信");
        window.location.href = '../html/login.html';
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
    
    }
}
//我肏你媽
    
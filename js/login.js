function sendData() {
    // 获取用户输入的账号和密码
    var Account = document.getElementById("username").value;
    var Password = document.getElementById("password").value;
    const url = 'http://localhost:5062/api/member/login';
    var Role = "string";
    var AuthCode = "string";
    var isDelete = true;
    var Email ="stirng";
    // 创建一个包含用户输入数据的 JavaScript 对象
    var memberData = {
        Account,
    Password,
    Email,
    Role,
    isDelete,
    AuthCode

    };
    console.log(memberData);
    var jsondata= JSON.stringify(memberData);
    // 然后，你可以使用 fetch() 或其他方法将 JSON 数据发送到后端
    // 例如：
    fetch(url, {
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
        return response.text();
    })
    .then(data => {
        console.log('Response from server:', data);
        window.location.href='http://127.0.0.1:5500/front/html/index.html';
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
    
    }
    
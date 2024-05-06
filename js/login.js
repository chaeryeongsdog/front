function sendData() {
    var Account = document.getElementById("username").value;
    var Password = document.getElementById("password").value;
    const url = 'http://localhost:5062/api/member/login';

    var memberData = {
        Account,
    Password
    };
    console.log(memberData);
    var jsondata= JSON.stringify(memberData);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsondata
    })
    .then(response => {
        if (!response.ok) {
            return Promise.reject(new Error('帳號或密碼輸入錯誤'))
        }
        return response.json();
    })
    .then(data => {
        var token = data.token;
        var members = data.members;
        localStorage.setItem('JwtToken',token);
        localStorage.setItem('userInfo',JSON.stringify(members));
        if(data.members.role == "student")
        window.location.href='../html/index.html';
        else
        window.location.href='../html/tea-index.html';
        
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById("error").innerHTML = error.message;
    });
    
}

    
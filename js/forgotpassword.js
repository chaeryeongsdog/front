function senddd(){
    var Account = document.getElementById('username').value;
    var Email = document.getElementById('email').value;

    var forgot = {
        Account,
        Email
    }

    var data = JSON.stringify(forgot);

    console.log(data);
    fetch('http://localhost:5062/api/member/forgetpassword',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(response => {
        if (!response.ok) {
            return Promise.reject(new Error('帳號或信箱輸入錯誤'))
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('TT').innerHTML=data;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById("TT").innerHTML = error.message;
    });
}
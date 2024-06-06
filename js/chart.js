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

const chart1 = document.getElementById("chart1");

var QuizLength = []
for (var i = 0; i < 5; i++){
    QuizLength.push("第"+(i+1)+"題")
}
var abc = ["True","True","True","False","False"] //T,T,F,T,F
var chart1Data = []
chart_1()
function chart_1(){
    var TrueLength = 0
    for (var i = 0; i < 5; i++){
        if (abc[i] == 'True'){
            TrueLength++
        }
    }
    console.log(TrueLength)
    chart1Data.push(TrueLength / abc.length)
}

new Chart(chart1, { //列出某張考卷所有題目，所有學生的答對比例 篩選：考卷
    type: 'bar', //pie, line,
    data: {
        labels: QuizLength,
        datasets: [{
            label: '答對比例',
            data: chart1Data,
            
        }
    ]
    }
});



const chart2 = document.getElementById("chart2")
new Chart(chart2, { //某道題所有學生的A.B.C.D比例 篩選：考卷/題目
    type: 'pie', //pie, line,
    data: {
        labels: ['第一個', '第二個', '第三個'],
        datasets: [{
            label: '我是種類',
            data: [1, 10, 5],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)", // 第一個 bar 顏色
                "rgba(54, 162, 235, 0.2)", // 第二個 bar 顏色
                "rgba(255, 206, 86, 0.2)", // 第三個 bar 顏色
            ],
        }
    ]
    }
});

const chart3 = document.getElementById("chart3")
new Chart(chart3, { //某學生某張考卷所有題目，對或錯 篩選：學生/考卷
    type: 'line', //pie, line,
    data: {
        labels: ['第一個', '第二個', '第三個'],
        datasets: [{
            label: '我是種類',
            data: [1, 10, 5],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)", // 第一個 bar 顏色
                "rgba(54, 162, 235, 0.2)", // 第二個 bar 顏色
                "rgba(255, 206, 86, 0.2)", // 第三個 bar 顏色
            ],
        }
    ]
    }
});

const chart4 = document.getElementById("chart4")
new Chart(chart4, { //某學生所有考卷的錯題數量 篩選：學生
    type: 'bar', //pie, line,
    data: {
        labels: ['第一個', '第二個', '第三個'],
        datasets: [{
            label: '我是種類',
            data: [1, 10, 5],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)", // 第一個 bar 顏色
                "rgba(54, 162, 235, 0.2)", // 第二個 bar 顏色
                "rgba(255, 206, 86, 0.2)", // 第三個 bar 顏色
            ],
        }
    ]
    }
});

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
    })
    const selectElement = document.getElementById('select');
    selectElement.addEventListener('change', function() {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const selectedId = selectedOption.id;
        var temp = localStorage.setItem('type',selectedId);
    });

    function create(){
        var price   = document.getElementById('lessonPrice').value;
        var content =document.getElementById('lessonContent').value;
        var video   = document.getElementById('lessonVideo').value;
        var year  = document.getElementById('lessonYear').value;
        var type = localStorage.getItem('type');
        localStorage.removeItem('type');
        var token = localStorage.getItem('JwtToken');
        var data={
            price,
            content,
            video,
            year,
            type
        }
        var jsondata = JSON.stringify(data);
        console.log(jsondata);
        fetch('http://localhost:5062/api/lesson/create',{
            method:'POST',
            headers:{
                'Authorization': `Bearer ${token}` ,
                'Content-Type' : 'application/json'
            },
            body : jsondata
        })
        .then(res =>{
            if(!res.ok){
                // window.alert("新增失敗");
                throw new Error('失敗拉幹');
            }
            return res.text();
        })
        .then(data => {
            console.log(data);
            window.alert("新增成功");
            window.location.href = '../html/tea-class.html';
        })

    }
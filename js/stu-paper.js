var chinese = document.getElementById("chinese");
var math = document.getElementById("math");
var english = document.getElementById("english");
var natural = document.getElementById("natural");
var society = document.getElementById("society");
var token = localStorage.getItem('JwtToken');
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
        localStorage.setItem('quiz',JSON.stringify(data));
    })
    .catch(error => {
        console.error('Error:', error);
    });
var quiz = JSON.parse(localStorage.getItem('quiz'));
const temp = new Set();
const temp1 = new Set();
quiz.forEach(DD => {
    temp.add(DD.year);
    temp1.add(DD.type);
});
var years = [...temp];
var types = [...temp1];
var quizLen = quiz.length;
chinese.addEventListener("click",function(){
    document.getElementById("tab-chinese").style.display="flex";
    document.getElementById("tab-math").style.display="none";
    document.getElementById("tab-english").style.display="none";
    document.getElementById("tab-natural").style.display="none";
    document.getElementById("tab-society").style.display="none";
    chinese.style.backgroundColor="#034A8C";
    chinese.style.color="white";
    math.style.backgroundColor="#d9d9d9";
    math.style.color="black"
    english.style.backgroundColor="#d9d9d9";
    english.style.color="black"
    natural.style.backgroundColor="#d9d9d9";
    natural.style.color="black"
    society.style.backgroundColor="#d9d9d9";
    society.style.color="black"
    var cartContainer = document.getElementById('tab-chinese');
    cartContainer.innerHTML='';
    types.forEach(types => {
        if(types == 1){
            years.forEach(DD => {
                var count = 0;
                for(var i=0 ; i<quizLen ; i++){
                    if(count == 0){
                        if(quiz[i].type == 1 && quiz[i].year == DD){
                        count++;
                        var productDiv = document.createElement('div');
                        productDiv.innerHTML=`
                        <div class="test-block">
                            <div class="block-left">
                                <h2>${DD}年歷屆試題</h2>
                                <div class="test-quan">40題</div>
                            </div>
                            <div class="block-right">
                                <div class="exam" year="${DD}" type="1" onclick="gotoExam(this)">測驗</div>
                            
                        </div>
                        </div>`
                        cartContainer.appendChild(productDiv);
                        }
                    }
                    else{
                        break;
                    }
                    
                }
                
            })
        } 
    })
});

math.addEventListener("click",function(){
    document.getElementById("tab-chinese").style.display="none";
    document.getElementById("tab-math").style.display="flex";
    document.getElementById("tab-english").style.display="none";
    document.getElementById("tab-natural").style.display="none";
    document.getElementById("tab-society").style.display="none";
    chinese.style.backgroundColor="#d9d9d9";
    chinese.style.color="black"
    math.style.backgroundColor="#034A8C";
    math.style.color="white";
    english.style.backgroundColor="#d9d9d9";
    english.style.color="black"
    natural.style.backgroundColor="#d9d9d9";
    natural.style.color="black"
    society.style.backgroundColor="#d9d9d9";
    society.style.color="black"

    var cartContainer = document.getElementById('tab-math');
    cartContainer.innerHTML='';
    types.forEach(types => {
        if(types == 3){
            years.forEach(DD => {
                var count = 0;
                for(var i=0 ; i<quizLen ; i++){
                    if(count == 0){
                        if(quiz[i].type == 3 && quiz[i].year == DD){
                        count++;
                        var productDiv = document.createElement('div');
                        productDiv.innerHTML=`
                        <div class="test-block">
                            <div class="block-left">
                                <h2>${DD}年歷屆試題</h2>
                                <div class="test-quan">40題</div>
                            </div>
                            <div class="block-right">
                                <div class="exam" year="${DD}" type="3" onclick="gotoExam(this)">測驗</div>
                            
                        </div>
                        </div>`
                        cartContainer.appendChild(productDiv);
                        }
                    }
                    else{
                        break;
                    }
                    
                }
                
            })
        } 
    })
});

english.addEventListener("click",function(){
    document.getElementById("tab-chinese").style.display="none";
    document.getElementById("tab-math").style.display="none";
    document.getElementById("tab-english").style.display="flex";
    document.getElementById("tab-natural").style.display="none";
    document.getElementById("tab-society").style.display="none";
    chinese.style.backgroundColor="#d9d9d9";
    chinese.style.color="black"
    math.style.backgroundColor="#d9d9d9";
    math.style.color="black"
    english.style.backgroundColor="#034A8C";
    english.style.color="white";
    natural.style.backgroundColor="#d9d9d9";
    natural.style.color="black"
    society.style.backgroundColor="#d9d9d9";
    society.style.color="black"

    var cartContainer = document.getElementById('tab-english');
    cartContainer.innerHTML='';
    types.forEach(types => {
        if(types == 2){
            years.forEach(DD => {
                var count = 0;
                for(var i=0 ; i<quizLen ; i++){
                    if(count == 0){
                        if(quiz[i].type == 2 && quiz[i].year == DD){
                        count++;
                        var productDiv = document.createElement('div');
                        productDiv.innerHTML=`
                        <div class="test-block">
                            <div class="block-left">
                                <h2>${DD}年歷屆試題</h2>
                                <div class="test-quan">40題</div>
                            </div>
                            <div class="block-right">
                                <div class="exam" year="${DD}" type="2" onclick="gotoExam(this)">測驗</div>
                            
                        </div>
                        </div>`
                        cartContainer.appendChild(productDiv);
                        }
                    }
                    else{
                        break;
                    }
                    
                }
                
            })
        } 
    })
});

natural.addEventListener("click",function(){
    document.getElementById("tab-chinese").style.display="none";
    document.getElementById("tab-math").style.display="none";
    document.getElementById("tab-english").style.display="none";
    document.getElementById("tab-natural").style.display="flex";
    document.getElementById("tab-society").style.display="none";
    chinese.style.backgroundColor="#d9d9d9";
    chinese.style.color="black"
    math.style.backgroundColor="#d9d9d9";
    math.style.color="black"
    english.style.backgroundColor="#d9d9d9";
    english.style.color="black";
    natural.style.backgroundColor="#034A8C";
    natural.style.color="white";
    society.style.backgroundColor="#d9d9d9";
    society.style.color="black"

    var cartContainer = document.getElementById('tab-natural');
    cartContainer.innerHTML='';
    types.forEach(types => {
        if(types == 4){
            years.forEach(DD => {
                var count = 0;
                for(var i=0 ; i<quizLen ; i++){
                    if(count == 0){
                        if(quiz[i].type == 4 && quiz[i].year == DD){
                        count++;
                        var productDiv = document.createElement('div');
                        productDiv.innerHTML=`
                        <div class="test-block">
                            <div class="block-left">
                                <h2>${DD}年歷屆試題</h2>
                                <div class="test-quan">40題</div>
                            </div>
                            <div class="block-right">
                                <div class="exam" year="${DD}" type="4" onclick="gotoExam(this)">測驗</div>
                            
                        </div>
                        </div>`
                        cartContainer.appendChild(productDiv);
                        }
                    }
                    else{
                        break;
                    }
                    
                }
                
            })
        } 
    })
});

society.addEventListener("click",function(){
    document.getElementById("tab-chinese").style.display="none";
    document.getElementById("tab-math").style.display="none";
    document.getElementById("tab-english").style.display="none";
    document.getElementById("tab-natural").style.display="none";
    document.getElementById("tab-society").style.display="flex";
    chinese.style.backgroundColor="#d9d9d9";
    chinese.style.color="black"
    math.style.backgroundColor="#d9d9d9";
    math.style.color="black"
    english.style.backgroundColor="#d9d9d9";
    english.style.color="black";
    natural.style.backgroundColor="#d9d9d9";
    natural.style.color="black";
    society.style.backgroundColor="#034A8C";
    society.style.color="white";

    var cartContainer = document.getElementById('tab-society');
    cartContainer.innerHTML='';
    types.forEach(types => {
        if(types == 5){
            years.forEach(DD => {
                var count = 0;
                for(var i=0 ; i<quizLen ; i++){
                    if(count == 0){
                        if(quiz[i].type == 5 && quiz[i].year == DD){
                        count++;
                        var productDiv = document.createElement('div');
                        productDiv.innerHTML=`
                        <div class="test-block">
                            <div class="block-left">
                                <h2>${DD}年歷屆試題</h2>
                                <div class="test-quan">40題</div>
                            </div>
                            <div class="block-right">
                                <div class="exam" year="${DD}" type="5" onclick="gotoExam(this)">測驗</div>
                            
                        </div>
                        </div>`
                        cartContainer.appendChild(productDiv);
                        }
                    }
                    else{
                        break;
                    }
                    
                }
                
            })
        } 
    })
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
        localStorage.removeItem('quiz');
        // 可选：重定向到登录页面或其他页面
        window.location.href = '../html/login.html';
    })
    .catch(error => {
        // 处理请求中的错误
        console.error('登出操作中发生错误:', error);
    });
    }



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

    document.getElementById("tab-chinese").style.display="flex";
    document.getElementById("tab-math").style.display="none";
    document.getElementById("tab-english").style.display="none";
    document.getElementById("tab-natural").style.display="none";
    document.getElementById("tab-society").style.display="none";
    chinese.style.backgroundColor="#034A8C";
    chinese.style.color="white";
    math.style.backgroundColor="#d9d9d9";
    math.style.color="black"
    english.style.backgroundColor="#d9d9d9";
    english.style.color="black"
    natural.style.backgroundColor="#d9d9d9";
    natural.style.color="black"
    society.style.backgroundColor="#d9d9d9";
    society.style.color="black"
    

        var cartContainer = document.getElementById('tab-chinese');
        cartContainer.innerHTML='';

        types.forEach(types => {
            if(types == 1){
                years.forEach(DD => {
                    var count = 0;
                    for(var i=0 ; i<quizLen ; i++){
                        if(count == 0){
                            if(quiz[i].type == 1 && quiz[i].year == DD){
                            count++;
                            var productDiv = document.createElement('div');
                            productDiv.innerHTML=`
                        <div class="test-block">
                            <div class="block-left">
                                <h2>${DD}年歷屆試題</h2>
                                <div class="test-quan">40題</div>
                            </div>
                            <div class="block-right">
                                <div class="exam" year="${DD}" type="1" onclick="gotoExam(this)">測驗</div>
                            
                        </div>
                        </div>`
                            cartContainer.appendChild(productDiv);
                            }
                        }
                        else{
                            break;
                        }
                        
                    }
                    
                })
            } 
        })
    
});



function gotoExam(element){
    var year = element.getAttribute('year');
    var type = element.getAttribute("type");
    var isdelete = false;
    console.log(element);
    var data ={
        year,
        type,
        isdelete
    }
    var jsondata = JSON.stringify(data);
    
    fetch('http://localhost:5062/api/question/Quiz',{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body:jsondata
    })
    .then(res => {
        if(!res.ok){
            throw new Error("錯誤囉")
        }
        return res.json();
    })
    .then(data => {
        localStorage.setItem("QUIZ",JSON.stringify(data));
        window.location.href="../html/exam.html";
    })
}
    // var cart = JSON.parse(localStorage.getItem("data"));
    // var mainContentHtml = '';        
    
    // for(var i=0;i<cart.length;i++){
    //     totalPrice = totalPrice +parseInt(cart[i].price);
    //     mainContentHtml = `
    //     <li class="main-content">
    //         <div class="main-content-left">
    //             <div class="item">
    //                 <div class="item-pic">
    //                     <img src="${cart[i].url}" alt="">
    //                 </div>
    //                 <div class="item-txt">
    //                     <p><b>${cart[i].name}</b></p>
    //                     <h3 style="text-align: left;">到期日:${cart[i].dueDate}</h3>
    //                 </div>
    //             </div>
    //         </div>
    //         <div class="main-content-right">
    //             <span class="item-pice price">
    //                 <b>NT$ ${cart[i].price}</b>
    //             </span>
    //         </div>
    //     </li>
    //     ` + mainContentHtml;
    // }
    // document.querySelector('.main-container').innerHTML = mainContentHtml;


    //第一個畫面
    
    getallcartItem()
    function getallcartItem(){
    var nowPage = 1;
    var itemNum = 5;
    var dataA ={
        nowPage,
        itemNum
    }
    var jsondataA = JSON.stringify(dataA);
        var token = localStorage.getItem('JwtToken');
    fetch('http://localhost:5062/api/Book/GetCart',{
        method:'POST',
        headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
        },
        body:jsondataA
    })
    .then(res => {
        if(!res.ok){
            throw new Error('失敗');
        }
        
        return res.json();
            
    })
    .then(cart => {
        fetch('http://localhost:5062/api/lesson/GetAllLessons',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            },
        })
        .then(res => {
            if (!res.ok)
            {
                throw new  Error('Failed to fetch lesson');
            }
            return res.json();
        })
        .then(lesson => {
            console.log("lesson:",lesson);
            console.log("cart:",cart);
            var cartt = cart.cartItems;
            const cartContainer = document.getElementById('main-container');
            var totalPrice = 0;
            cartt.forEach(cartt => {
                lesson.forEach(les =>{
                    if(cartt.lessonID == les.lessonID)
                    {
                        const productDiv = document.createElement('div');
                        totalPrice+=parseInt(les.price);  
                        productDiv.innerHTML = `
                        <li class="main-content" id="bookk">
                            <div class="checkbox">
                                <input type="checkbox">
                            </div>
                            <div class="item-pic">
                                <img src="../image/class.jpg" alt="">
                            </div>
                            <div class="item-txt">
                                <h2><b>${les.content}</b></h2>
                            </div>
                            <span class="item-price">
                                <b class="priceee">NT$ ${les.price}</b>
                            </span>
                            <div class="checkout-btn">
                                <button bookId="${cartt.bookID}" lessonID="${cartt.lessonID}" onclick="deletee(this)">刪除</button><br>
                            </div>
                        </li>
                        `;
                        cartContainer.appendChild(productDiv);
                    }
                })
                
            })
            document.querySelector('#price').innerHTML = 'NT' + totalPrice;
        })
        const forpaging = document.getElementById('paging');
        const pagingDiv = document.createElement('div');
        const leftcondition = cart.paginationInfo.nowPage > 1 ? true : false;
        const rightcondition = cart.paginationInfo.nowPage < cart.paginationInfo.totalPages ? true : false;
        let leftinnerHtmll;
        let rightinnerHtmll;
        
        if(leftcondition){
            leftinnerHtmll = `
                            <   
                        `;
                        
        }
        else {
            leftinnerHtmll =` `;
        }
        if(rightcondition){
            rightinnerHtmll= `
                    >
            `;
        }
        else {
            rightinnerHtmll =` `;
        }
        var temp = document.getElementById('paging');
        temp.innerHTML=`
        <table id="ChPaging">
            <tr>
                <td style="cursor:pointer;" onclick="gotoleft(${cart.paginationInfo.nowPage-1})">
                    ${leftinnerHtmll}
                </td>
                    
                <td style="padding: 0 20px;">    
                    ${cart.paginationInfo.nowPage}  
                </td>

                <td style="cursor:pointer;" onclick="gotoright(${cart.paginationInfo.nowPage+1})">
                    ${rightinnerHtmll}
                </td>
            </tr>
        </table>
        `;
    })
    .catch(error => {
        console.error('Problem:',error);
    })
}
    

//往右換頁
function gotoright(nowPage){
    var token = localStorage.getItem('JwtToken');
    var itemNum = 5;
    var data ={
        nowPage,
        itemNum
    }
    var jsondata = JSON.stringify(data);
    console.log(jsondata);
    const urll= `http://localhost:5062/api/Book/GetCart?NowPage=${nowPage}`
    fetch(urll,{
        method:'POST',
        headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
        },
        body:jsondata
    })
    .then(res => {
        if(!res.ok){
            throw new Error('失敗');
        }
        
        return res.json();
            
    })
    .then(cart => {
        fetch('http://localhost:5062/api/lesson/GetAllLessons',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            },
        })
        .then(res => {
            if (!res.ok)
            {
                throw new  Error('Failed to fetch lesson');
            }
            return res.json();
        })
        .then(lesson => {
            console.log("lesson:",lesson);
            console.log("cart:",cart);
            var cartt = cart.cartItems;
            const cartContainer = document.getElementById('main-container');
            var totalPrice = 0;
            cartContainer.innerHTML = '';
            cartt.forEach(cartt => {
                lesson.forEach(les =>{
                    if(cartt.lessonID == les.lessonID)
                    {   
                        
                        const productDiv = document.createElement('div');
                        totalPrice+=parseInt(les.price);  
                        productDiv.innerHTML = `
                        <li class="main-content" id="bookk">
                            <div class="checkbox">
                                <input type="checkbox">
                            </div>
                            <div class="item-pic">
                                <img src="../image/class.jpg" alt="">
                            </div>
                            <div class="item-txt">
                                <h2><b>${les.content}</b></h2>
                            </div>
                            <span class="item-price">
                                <b class="priceee">NT$ ${les.price}</b>
                            </span>
                            <div class="checkout-btn">
                                <button bookId="${cartt.bookID}" lessonID="${cartt.lessonID}" onclick="deletee(this)">刪除</button><br>
                            </div>
                        </li>
                        `;
                        cartContainer.appendChild(productDiv);
                    }
                })
                
            })
            document.querySelector('#price').innerHTML = 'NT' + totalPrice;
        })
        const forpaging = document.getElementById('paging');
        const pagingDiv = document.createElement('div');
        const leftcondition = cart.paginationInfo.nowPage > 1 ? true : false;
        const rightcondition = cart.paginationInfo.nowPage < cart.paginationInfo.totalPages ? true : false;
        let leftinnerHtmll;
        let rightinnerHtmll;
        
        if(leftcondition){
            leftinnerHtmll = `
                            <   
                        `;
                        
        }
        else {
            leftinnerHtmll =` `;
        }
        if(rightcondition){
            rightinnerHtmll= `
                    >
            `;
        }
        else {
            rightinnerHtmll =` `;
        }
        var temp = document.getElementById('paging');
        temp.innerHTML=`
        <table id="ChPaging">
            <tr>
                <td style="cursor: pointer;" onclick="gotoleft(${cart.paginationInfo.nowPage-1})">
                    ${leftinnerHtmll}
                </td>
                    
                <td style="padding: 0 20px;">    
                    ${cart.paginationInfo.nowPage}  
                </td>

                <td style="cursor: pointer;" onclick="gotoright(${cart.paginationInfo.nowPage+1})">
                    ${rightinnerHtmll}
                </td>
            </tr>
        </table>
        `;
    })
    .catch(error => {
        console.error('Problem:',error);
    })
}









//往左換頁
function gotoleft(nowPage){
    var token = localStorage.getItem('JwtToken');
    const urll= `http://localhost:5062/api/Book/GetCart?NowPage=${nowPage}`
    var itemNum = 5;
    var data ={
        nowPage,
        itemNum
    }
    var jsondata = JSON.stringify(data);
    fetch(urll,{
        method:'POST',
        headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
        },
        body:jsondata
    })
    .then(res => {
        if(!res.ok){
            throw new Error('失敗');
        }
        
        return res.json();
            
    })
    .then(cart => {
        fetch('http://localhost:5062/api/lesson/GetAllLessons',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            },
        })
        .then(res => {
            if (!res.ok)
            {
                throw new  Error('Failed to fetch lesson');
            }
            return res.json();
        })
        .then(lesson => {
            console.log("lesson:",lesson);
            console.log("cart:",cart);
            var cartt = cart.cartItems;
            const cartContainer = document.getElementById('main-container');
            var totalPrice = 0;
            cartContainer.innerHTML = '';
            cartt.forEach(cartt => {
                lesson.forEach(les =>{
                    if(cartt.lessonID == les.lessonID)
                    {   
                        const productDiv = document.createElement('div');
                        totalPrice+=parseInt(les.price);  
                        productDiv.innerHTML = `
                        <li class="main-content" id="bookk">
                            <div class="checkbox">
                                <input type="checkbox">
                            </div>
                            <div class="item-pic">
                                <img src="../image/class.jpg" alt="">
                            </div>
                            <div class="item-txt">
                                <h2><b>${les.content}</b></h2>
                            </div>
                            <span class="item-price">
                                <b class="priceee">NT$ ${les.price}</b>
                            </span>
                            <div class="checkout-btn">
                                <button bookId="${cartt.bookID}" lessonID="${cartt.lessonID}" onclick="deletee(this)">刪除</button><br>
                            </div>
                        </li>
                        `;
                        cartContainer.appendChild(productDiv);
                    }
                })
                
            })
            document.querySelector('#price').innerHTML = 'NT' + totalPrice;
        })
        const forpaging = document.getElementById('paging');
        const pagingDiv = document.createElement('div');
        const leftcondition = cart.paginationInfo.nowPage > 1 ? true : false;
        const rightcondition = cart.paginationInfo.nowPage < cart.paginationInfo.totalPages ? true : false;
        let leftinnerHtmll;
        let rightinnerHtmll;
        
        if(leftcondition){
            leftinnerHtmll = `
                            <   
                        `;
                        
        }
        else {
            leftinnerHtmll =` `;
        }
        if(rightcondition){
            rightinnerHtmll= `
                    >
            `;
        }
        else {
            rightinnerHtmll =` `;
        }
        var temp = document.getElementById('paging');
        temp.innerHTML=`
        <table id="ChPaging">
            <tr>
                <td style="cursor:pointer;" onclick="gotoleft(${cart.paginationInfo.nowPage-1})">
                    ${leftinnerHtmll}
                </td>
                    
                <td style="padding: 0 20px;">    
                    ${cart.paginationInfo.nowPage}  
                </td>

                <td style="cursor:pointer;" onclick="gotoright(${cart.paginationInfo.nowPage+1})">
                    ${rightinnerHtmll}
                </td>
            </tr>
        </table>
        `;
    })
    .catch(error => {
        console.error('Problem:',error);
    })
}







    // const cartData = JSON.parse(localStorage.getItem('aa')) || [];
    // const cartContainer = document.getElementById('main-container');
    // var totalPrice = 0;
    // var idd = localStorage.getItem('book');
    // cartData.forEach(product => {
    //     const productDiv = document.createElement('div');
    //     totalPrice+=parseInt(product.price);  
    //     productDiv.innerHTML = `
    //         <li class="main-content" id="bookk">
    //         <div class="main-content-left" style="border-bottom: 2px solid black;" >
    //             <div class="item">
    //                 <div class="item-pic">
    //                     <img src="${product.url}" alt="">
    //                 </div>
    //                 <div class="item-txt">
    //                     <h2><b>${product.name}</b></h2>
    //                     <h3 style="text-align: left;">到期日:${product.time}</h3>
    //                 </div>
    //             </div>
    //         </div>
    //         <div class="main-content-right" style="border-bottom: 2px solid black;">
    //             <span class="item-pice price">
    //                 <b>NT$ ${product.price}</b>
    //             </span>
                
    //         </div>
    //         <div>
    //         <a class="checkout-btn" id="delete-cart" style ="margin-top:85px;" onclick="deletee()">刪除</a><br>
    //         </div>
    //     </li>
    //     `;
    //     cartContainer.appendChild(productDiv);
    // });
    // document.querySelector('#price').innerHTML = 'NT' + totalPrice;


function deletee(aa){
    var token = localStorage.getItem('JwtToken');
    const BookID = aa.getAttribute('bookID');
    const LessonID = aa.getAttribute('lessonID');
    const data={
        BookID
    }
    var jsondata = JSON.stringify(data);
    console.log(jsondata);
fetch('http://localhost:5062/api/Book/RemoveFromCart',{
    method:'POST',
      headers:{
        'Content-Type' : 'application/json',
        'Authorization':`Bearer ${token}`
      },
      body: jsondata
    })
    .then(res => res.text())
    .then(data => {
        if(data == "已從購物車中移除課程"){
            console.log(data);
            alert("刪除成功!");
            fetch('http://localhost:5062/api/Book/GetCart?NowPage=1',{
                method:'POST',
                headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
                }
                })
                .then(res => {
                    if(!res.ok){
                        throw new Error('失敗');
                    }
                    
                    return res.json();
                        
                })
                .then(cart => {
                    if(cart.cartItems == null)
                    {
                        window.alert("購物車沒東西囉！");
                        window.location.href = '../html/stu-class.html';
                    }
                    else{
                        window.location.href="../html/cart.html";
                    }
                })
            
        }
        else{
            alert("移除失敗");
        }
 

    })
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
        document.getElementById('userid').innerHTML=("歡迎：")+user.account;
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

const dialog = document.querySelector('dialog');
function openDialog() {
  dialog.showModal(dialog);
  dialog.style.display="flex";
}
function closeDialog() {
  dialog.close();
  dialog.style.display="none"
}
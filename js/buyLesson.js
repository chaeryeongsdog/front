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

    
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('main-container');
    var totalPrice = 0;
    cartData.forEach(product => {
        const productDiv = document.createElement('div');
        totalPrice+=parseInt(product.price);
        productDiv.innerHTML = `
            <li class="main-content">
            <div class="main-content-left" style="border-bottom: 2px solid black;" >
                <div class="item">
                    <div class="item-pic">
                        <img src="${product.url}" alt="">
                    </div>
                    <div class="item-txt">
                        <h2><b>${product.name}</b></h2>
                        <h3 style="text-align: left;">到期日:${product.time}</h3>
                    </div>
                </div>
            </div>
            <div class="main-content-right" style="border-bottom: 2px solid black;">
                <span class="item-pice price">
                    <b>NT$ ${product.price}</b>
                </span>
            </div>
        </li>
        `;
        cartContainer.appendChild(productDiv);
    });
    document.querySelector('#price').innerHTML = 'NT' + totalPrice;


    
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



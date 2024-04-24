function send(ItemName,element){
    var name = ItemName;
    var tempprice = element.querySelector('.price');
    var price = tempprice.textContent.slice(2);
    var url ='./image/class.jpg';
    var time = new Date();
    var dueDate = new Date(time);
    dueDate.setFullYear(time.getFullYear()+1);
    var time = dueDate.toLocaleDateString();
    
    var product = {
        name,
        price,
        url,
        time};
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push(product);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    const max = 5;
    if(cart.length >5){
        localStorage.removeItem('cart');
    }
    window.location.href="../87/cart.html";
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

});

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
    window.location.href="http://127.0.0.1:5500/front/87/cart.html";
}

// function send(element){
//     const productName = element.getAttribute('data-name');
//     var tempprice = element.querySelector('.price');
// //     var price = tempprice.textContent.slice(2);
//     const productsrc = element.getAttribute('data-src');
//     const product = {
//         name: productName,
//         price: productPrice,
//         src: productsrc
//     };
//     let cart = JSON.parse(localStorage.getItem('cart')) || []; 
//     cart.push(product);
//     localStorage.setItem('cart', JSON.stringify(cart));
//     console.log(cart);
//     //window.location.href="http://127.0.0.1:5500/front/87/cart.html";
// }

const cartData = JSON.parse(localStorage.getItem('product')) ;
console.log("name:",cartData.name);
console.log("price",cartData.price);
document.getElementById('classname').innerHTML= cartData.name;
document.getElementById('price').innerHTML= cartData.price;

function send(){
    var name = document.getElementById('classname').innerText;
    var price = document.getElementById('price').innerText;
    var url ='../image/class.jpg';
    var time = new Date();
    var dueDate = new Date(time);
    dueDate.setFullYear(time.getFullYear()+1);
    var time = dueDate.toLocaleDateString();
    
    var abc = {
        name,
        price,
        url,
        time};
    let aa = JSON.parse(localStorage.getItem('aa')) || [];
        console.log(abc);
    aa.push(abc);
    
    localStorage.setItem('aa', JSON.stringify(aa));
    const max = 5;
    if(aa.length >5){
        localStorage.removeItem('aa');
    }
    window.location.href="cart.html";
}





// const cartContainer = document.getElementById('main-container');
// var totalPrice = 0;
// cartData.forEach(product => {
//     const productDiv = document.createElement('div');
//     totalPrice+=parseInt(product.price);
//     productDiv.innerHTML = `
//         <li class="main-content">
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
//     </li>
//     `;
//     cartContainer.appendChild(productDiv);
// });
// document.querySelector('#price').innerHTML = 'NT' + totalPrice;


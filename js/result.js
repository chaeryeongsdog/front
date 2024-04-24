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
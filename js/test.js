function get(){
fetch('http://localhost:5062/api/member/GetALLDATA')
.then(res => res.text())
.then(data => {
    console.log(data);
})
}
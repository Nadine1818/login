var emaillogin = document.getElementById('emaillogin');
var passlogin = document.getElementById('passlogin');
var namesignup = document.getElementById('namesignup');
var emailsignup = document.getElementById('emailsignup');
var passsignup = document.getElementById('passsignup');
var alert = document.getElementById('alertemailsignup');
var alert2 = document.getElementById('alertemptysignup');
var alert3 = document.getElementById('alertsuccesssignup');
var alert4 = document.getElementById('alertemaillogin');
var alert5 = document.getElementById('alertemptylogin');
var alert6 = document.getElementById('alertsuccesslogin');
var alert7 = document.getElementById('alertemailexistssignup');
var username = document.getElementById('username');
var usersList = [];


if(localStorage.getItem('users') == null)
{
    usersList=[];
}
else{
    usersList= JSON.parse(localStorage.getItem('users'));
}

function signUp(){ //for signup
    var name = namesignup.value.trim();
    var email = emailsignup.value.trim();
    var pass = passsignup.value.trim();
    var user={
        name:name,
        email: email,
        pass: pass,
    };

    for(var i=0;i<usersList.length;i++)
    {
        var foundUser=0;
        if(usersList[i].email==email)
        {
            foundUser=1;
        }
        
    }
    
    var emailRegex= /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
 
    if(name=="" || email=="" || pass=="")
        {
            alert.classList.add('d-none');
            alert2.classList.remove('d-none');
            alert3.classList.add('d-none');
            reset();
            return;
    
        }
    
    else if(!emailRegex.test(email))
        {
            alert.classList.remove('d-none');
            alert2.classList.add('d-none');
            alert3.classList.add('d-none');
            alert7.classList.add('d-none');
            reset();
            return;
        }

    else if (foundUser)
    {
        alert.classList.add('d-none');
        alert2.classList.add('d-none');
        alert3.classList.add('d-none');
        alert7.classList.remove('d-none');
        reset();
        return;

    }

    else{
        alert.classList.add('d-none');
        alert2.classList.add('d-none');
        alert3.classList.remove('d-none');
        alert7.classList.add('d-none');
        usersList.push(user);
        localStorage.setItem('users',JSON.stringify(usersList));
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
        reset();
    }
   
}

function reset(){
    namesignup.value="";
    emailsignup.value="";
    passsignup.value="";
}

function login() {
    var email = emaillogin.value.trim();
    var pass = passlogin.value.trim();
    var foundUser = 0;
    var userName = "";

    for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].email === email && usersList[i].pass === pass) {
            foundUser = 1;
            userName = usersList[i].name;
            break;
        }
    }

    if (email === "" || pass === "") {
        alert4.classList.add('d-none');
        alert5.classList.remove('d-none');
        alert6.classList.add('d-none');
        reset();
        return;
    }

    if (foundUser) {
        alert4.classList.add('d-none');
        alert5.classList.add('d-none');
        alert6.classList.remove('d-none');

        
        localStorage.setItem('loggedInUser', userName);

        
        // username.innerHTML = "Welcome " + userName;

        setTimeout(() => {
            window.location.href = 'home.html';
            
        }, 1000);

        reset();
    } else {
        alert4.classList.remove('d-none');
        alert5.classList.add('d-none');
        alert6.classList.add('d-none');
        reset();
    }
}


function logout(){
    window.location.href='login.html';
    reset();
}

window.onload = function () {
    var user = localStorage.getItem('loggedInUser');
    var username = document.getElementById('username');
    if (user && username) {
        username.textContent = "Welcome " + user;
    }
};


// active navbar
// let nav=document.querySelector(".navigation-wrap");
// window.onscroll = function (){
//     if(document.documentElement.scrollTop > 20){
//         nav.classList.add("scroll-on");
//     }else{
//         nav.classList.remove("scroll-on");
//     }

// }

// nav hide
let navbar = document.querySelectorAll('.nav-link');
let navCollapse = document.querySelector('.navbar-collapse.collapse');
navbar.forEach(function(a){
    a.addEventListener("click", function(){
        navCollapse.classList.remove("show");
    })
})

// counter design
document.addEventListener("DOMContentLoaded", () => {
    function counter(id, start, end, duration){
        let obj = document.getElementById(id), 
        current = start,
        range = end - start,
        increment = end > start ? 1 : -1,
        step = Math.abs(Math.floor(duration / range)),
        timer = setInterval(() => {
            current += increment;
            //obj.textContent = current;
            if(current == end){
                clearInterval(timer);
            }
        }, step);
    }
    counter("count1", 0, 1287, 3000);
    counter("count2", 300, 2287, 20);
    counter("count3", 0, 287, 3900);
    counter("count4", 0, 1, 30);
})

// Logic for email sending using JS 
const form = document.querySelector('form');

const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail() {
    Email.send({
        Host : "smtp.mailendo.com",
        Username : "username",
        Password : "password",
        To : 'them@website.com',
        From : "you@isp.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => {
        Swal.fire({
            title: "Message Sent !",
            text: "We will reach back to you in 2-3 business days",
            icon: "success",
            confirmButtonColor: '#0a673a',
            timer: 4000
          });
      }
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items){
        if (item.value == ""){
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if(items[1].value != ""){
            checkEmail();
        }

        items[1].addEventListener("keyup", () => {
            checkEmail();
        })

        item.addEventListener("keyup", () => {
            if(item.value != ""){
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

function checkEmail() {
    const emailRegex =  /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTextEmail = document.querySelector(".error-text.email")

    if (!email.value.match(emailRegex)){
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value != ""){
            errorTextEmail.innerText = "Enter a valid email address";
        } else {
            errorTextEmail.innerText = "Email Address can't be blank";
        }
    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}


const scriptURL = 'https://script.google.com/macros/s/AKfycbyoMQyIbepG5vMljxfNoFNRucDXPdIT0JvPpviHMpD0QMdfJtfI7THkWc92IrbAwdkL/exec';

const formQuery = document.forms['contact-form'];

form.addEventListener("submit", e => {
    e.preventDefault();
    checkInputs();

// Code for prompt: 
    if(!fullName.classList.contains("error") && !email.classList.contains("error") &&  
    !phone.classList.contains("error") && !subject.classList.contains("error") && 
    !mess.classList.contains("error")){
    console.log("OK");

     // Adding Query data to Google doc 
     console.log("Trying to send data");
    
    
     e.preventDefault()
     
     fetch(scriptURL, { method: 'POST', body: new FormData(formQuery)})
     .then(response => "SUCCESS")
     .then(() => { window.location.reload(); })
     .catch(error => console.error('Error!', error.message))

     
    sendEmail();

    form.reset();
    return false;
    }
})



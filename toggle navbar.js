let burger = document.querySelector('.harman');
let navbar = document.querySelector('.navbarr');
let navlist = document.querySelector('.ullist ');
let right = document.querySelector('.icons ');

burger.addEventListener('click',()=>{
    right.classList.toggle('visibal');
    navlist.classList.toggle('visibal');
    navbar.classList.toggle('navbarr')
})
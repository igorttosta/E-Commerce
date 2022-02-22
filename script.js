let navbar = document.querySelector('.navbar')
let userIsLogged = document.querySelector('.userIsLogged')

document.querySelector('#menu-bar').onclick = () =>{
    user = JSON.parse(localStorage.getItem('user'));

    if(!user){
        navbar.classList.toggle('active');
        shopping.classList.remove('active');
        signIn.classList.remove('active');
        login.classList.remove('active');
        userIsLogged.classList.remove('active');
    } else {
        userIsLogged.classList.toggle('active');
        navbar.classList.remove('active');
        shopping.classList.remove('active');
    }
}

document.querySelector('#close').onclick = () =>{
    navbar.classList.remove('active');
}

document.querySelector('#exit').onclick = () =>{
    userIsLogged.classList.remove('active');
}

let shopping = document.querySelector('.shopping')

document.querySelector('#shopping-cart').onclick = () =>{
    shopping.classList.toggle('active');
    navbar.classList.remove('active');
    signIn.classList.remove('active');
    login.classList.remove('active');
    userIsLogged.classList.remove('active');
}

document.querySelector('#closer').onclick = () =>{
    shopping.classList.remove('active');
}

let signIn = document.querySelector('.sign-in')

document.querySelector('#sign-in').onclick = () =>{
    signIn.classList.toggle('active');
    navbar.classList.remove('active');
    shopping.classList.remove('active');
}

document.querySelector('#closerr').onclick = () =>{
    signIn.classList.remove('active');
}

let login = document.querySelector('.login')

document.querySelector('#login').onclick = () =>{
    login.classList.toggle('active');
    navbar.classList.remove('active');
    shopping.classList.remove('active');
}

document.querySelector('#closerrr').onclick = () =>{
    login.classList.remove('active');
}

let address = document.querySelector('.address')

document.querySelector('#address').onclick = () =>{
    product = JSON.parse(localStorage.getItem('Produto'));

    if(!product){
        alert("Não há itens no carrinho!!")
    } else {
        address.classList.toggle('active');
        navbar.classList.remove('active');
        shopping.classList.remove('active');
        userIsLogged.classList.remove('active');
    }
}

document.querySelector('#exitt').onclick = () =>{
    address.classList.remove('active');
    shopping.classList.toggle('active');
}

document.querySelector('#logout').onclick = () =>{
    localStorage.removeItem('user');
    localStorage.removeItem('Produto');
    userIsLogged.classList.remove('active');
    window.location.reload();
}

document.querySelector('#delete').onclick = () =>{
    localStorage.removeItem('Produto');
    shopping.classList.remove('active');
    window.location.reload();
}

window.onscroll = () =>{
    navbar.classList.remove('active');

    if(window.scrollY > 100){
        document.querySelector('header').classList.add('active');
    }else{
        document.querySelector('header').classList.remove('active');
    }

}

let themeToggler = document.querySelector('#theme-toggler');

themeToggler.onclick = () =>{
    themeToggler.classList.toggle('fa-sun');
    if(themeToggler.classList.contains('fa-sun')){
        document.querySelector('body').classList.add('active');
    }else{
        document.querySelector('body').classList.remove('active');
    }
}

document.querySelectorAll('.small-image-1').forEach(images =>{
    images.onclick = () =>{
        document.querySelector('.big-image-1').src = images.getAttribute('src');
    }
});

document.querySelectorAll('.small-image-2').forEach(images =>{
    images.onclick = () =>{
        document.querySelector('.big-image-2').src = images.getAttribute('src');
    }
});

document.querySelectorAll('.small-image-3').forEach(images =>{
    images.onclick = () =>{
        document.querySelector('.big-image-3').src = images.getAttribute('src');
    }
});

var swiper = new Swiper(".product-slider", {
    slidesPerView: 3,
    loop:true,
    spaceBetween: 10,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        550: {
          slidesPerView: 1,
        },
        800: {
          slidesPerView: 3,
        },
        1000: {
            slidesPerView: 3,
        },
    },
});

function addUser(name, cpf, email, password) {
    let user = {
        "name": name,
        "cpf": cpf,
        "email": email,
        "password": password,
        "isLogged": false
    }

    user = localStorage.setItem('user', JSON.stringify(user))
    alert("Usuario cadastrado com sucesso!!")
    window.location.reload();
    signIn.classList.remove('active');
}

function auth(email, password){
    let user;
    user = JSON.parse(localStorage.getItem('user'))

    if(user.email === email && user.password === password){
        user.isLogged = true;
        localStorage.setItem('user', JSON.stringify(user));
    } else{
        alert("Credenciais Invalidas!")
    }
}

function addToCart(name, price, image) {
    user = localStorage.getItem('user')

    if (!user) {
        alert("Você precisa estar logado para adicionar itens ao carrinho!!");
        return;
    }

    let product = {"name": name, "price": price , "image": image}
    localStorage.setItem('Produto', JSON.stringify(product))
    product = localStorage.getItem('Produto')
    alert("Produto adicionado ao carrinho!!")
    window.location.reload();
}

function addAddress(cep, estado, cidade, bairro, rua, numero) {
    let address1 = {
        "cep": cep,
        "estado": estado,
        "cidade": cidade,
        "bairro": bairro,
        "rua": rua,
        "numero": numero
    }

    address1 = localStorage.setItem('address', JSON.stringify(address1))
    alert("Pagamento feito com sucesso!!")
    address.classList.remove('active');
    localStorage.removeItem('Produto');
    window.location.reload();
}
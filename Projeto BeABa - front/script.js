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
        productItem.classList.remove('active');
    }
}

let information = document.querySelector('.information')
document.querySelector('#info').onclick = () =>{
    information.classList.toggle('active');
    shopping.classList.remove('active');
    userIsLogged.classList.remove('active');
    productItem.classList.remove('active');
}

document.querySelector('#sair').onclick = () =>{
    information.classList.remove('active');
    userIsLogged.classList.toggle('active');
}

let requests = document.querySelector('.requests')
document.querySelector('#req').onclick = () =>{
    requests.classList.toggle('active');
    shopping.classList.remove('active');
    userIsLogged.classList.remove('active');
    productItem.classList.remove('active');
}

document.querySelector('#sairr').onclick = () =>{
    requests.classList.remove('active');
    userIsLogged.classList.toggle('active');
}

document.querySelector('#close').onclick = () =>{
    navbar.classList.remove('active');
}

document.querySelector('#exit').onclick = () =>{
    userIsLogged.classList.remove('active');
}

let shopping = document.querySelector('.shopping')

document.querySelector('#shopping-cart').onclick = () =>{
    user = JSON.parse(localStorage.getItem('user'));
    if(!user){
        alert("Precisa estar logado para acessar o carrinho!");
        return
    }
    shopping.classList.toggle('active');
    navbar.classList.remove('active');
    signIn.classList.remove('active');
    login.classList.remove('active');
    userIsLogged.classList.remove('active');
    information.classList.remove('active');
    requests.classList.remove('active');
    productItem.classList.remove('active');
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
    navbar.classList.toggle('active');
}

let login = document.querySelector('.login')

document.querySelector('#login').onclick = () =>{
    login.classList.toggle('active');
    navbar.classList.remove('active');
    shopping.classList.remove('active');
}

document.querySelector('#closerrr').onclick = () =>{
    login.classList.remove('active');
    navbar.classList.toggle('active');
}

document.querySelector('#back').onclick = () =>{
    productItem.classList.remove('active');
}

let address = document.querySelector('.address')

document.querySelector('#address').onclick = () =>{
    user = JSON.parse(localStorage.getItem('user'));
    let id_user = user.id;

    axios.get(`http://localhost:5000/shopping_cart_verify/${id_user}`)
    .then(response => {
        console.log(response.data.message)
        if(!response.data.message){
            alert("Não há itens no carrinho!!")
        }
        else {
            address.classList.toggle('active');
            navbar.classList.remove('active');
            shopping.classList.remove('active');
            userIsLogged.classList.remove('active');
        }
    })
    .catch(error => console.log(error))
}

document.querySelector('#exitt').onclick = () =>{
    address.classList.remove('active');
    shopping.classList.toggle('active');
}

document.querySelector('#logout').onclick = () =>{
    localStorage.removeItem('user');
    // localStorage.removeItem('Produto');
    userIsLogged.classList.remove('active');
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
    loop:false,
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

function addUser(name, cpf, email, password, cep, estado, cidade, bairro, rua, numero) {
    let client = {
        "name": name,
        "cpf": cpf,
        "email": email,
        "password": password,
        "cep": cep,
        "estado": estado,
        "cidade": cidade,
        "bairro": bairro,
        "rua": rua,
        "numero": numero
    }

    axios.post('http://localhost:5000/verify', client)
    .then(response => {
        if(name == "" || cpf == "" || email == "" || password == ""){
            alert('Algum campo na sessão usuário está vazio!!');
            return false;
        }
        if(cep == "" || estado == "" || cidade == "" || bairro == "" || rua =="" || numero == ""){
            alert('Algum campo na sessão endereço está vazio!!');
            return false;
        }

        if(response.data){
            alert("E-mail ou CPF existente");
            return
        }
        else {
            axios.post('http://localhost:5000/client', client)
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error))

            window.location.reload();
        }
    })
    .catch(error => console.log(error))
}

function auth(email, password){
    let loginData = {
        "email": email,
        "password": password
    }
    axios.post('http://localhost:5000/login', loginData)
    .then(response => {
      if(!response.data){
        alert("E-mail ou Senha inválidos");
        return
      }
      let data = JSON.stringify(response.data)
      localStorage.setItem('user', data);
      login.classList.remove('active');
      window.location.reload();
    })
    .catch(error => console.log(error))
}

window.addEventListener('load', (event) => {
    user = JSON.parse(localStorage.getItem('user'));
    let userId = {
        "fk_client_id": user.id
    }
    console.log
    axios.post('http://localhost:5000/getUser', userId)
    .catch(error => console.log(error))
  });

function addToCart(fk_product_id) {
    user = JSON.parse(localStorage.getItem('user'));

    let shopping_cart = {
        "fk_product_id": fk_product_id,
        "fk_client_id": user.id
    }
    axios.post('http://localhost:5000/shopping_cart', shopping_cart)
          .then(response => {
              console.log(response)
          })
          .catch(error => console.log(error))

    window.location.reload();
}

function deleteCartItem(id){
    axios.delete(`http://localhost:5000/shopping_cart/${id}`)
        .then(response => {
            console.log(response)
    })
    .catch(error => console.log(error))

    window.location.reload();
}

function deleteAll(){
    user = JSON.parse(localStorage.getItem('user'));
    user_id = user.id

    let total_price = document.getElementById('total').value
    total_price = total_price.substring(total_price.indexOf('$')+1, total_price.length)
    total_price = parseFloat(total_price)

    let request = {
        "total_price": total_price,
        "fk_client_id": user.id
    }
    axios.post('http://localhost:5000/request', request)
        .then(response => {
            console.log(response)
        })
        .catch(error => console.log(error))

    axios.delete(`http://localhost:5000/shopping_cart_all/${user_id}`)
        .then(response => {
            console.log(response)
    })
    .catch(error => console.log(error))

    window.location.reload();
}
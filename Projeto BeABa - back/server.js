const express = require('express');
const app = express();
const pool = require("./db");

app.use(express.json());
const cors = require('cors');
app.use(cors());

let user_id = -1

//-------------------------------------------------------------- Routes -----------------------------------------------------------//
const date = () => {
    let current = new Date();
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    let dateTime = cDate + ' ' + cTime;
    return dateTime;
}

const generateRequestId = async () => {
    const requestId = await pool.query("select id from request order by id desc limit 1");
    if(requestId?.rows[0]){
        return requestId.rows[0].id + 1
    }
    return 1
}

const genereteCartId = async () => {
    const ShoppingCartId = await pool.query("select id from shopping_cart order by id desc limit 1");
    if(ShoppingCartId?.rows[0]){
        return ShoppingCartId.rows[0].id + 1
    }
    return 1
}

//--------------------------------------------------- Inicio Shopping_Cart -----------------------------------------------//
//Get All
app.get("/shopping_cart/:id", async (req, res) => {
    const id_user = req.params.id;
    try {
        const allShopping_cart = await pool.query('select image, name, price, shopping_cart.id from product inner join shopping_cart on product.id = shopping_cart.fk_product_id where shopping_cart.fk_client_id = $1', [id_user]);

        res.json(allShopping_cart.rows);
    } catch (err) {
        console.error(err.message)
    }
})

//Get
app.get("/shopping_cart_verify/:id_user", async (req, res) => {
    const id_user = req.params.id_user;

    let message;
    try {
        const oneShopping_cart = await pool.query('select id from shopping_cart where fk_client_id = $1', [id_user]);
        if(oneShopping_cart.rowCount){
            message = true;
        } else {
            message = false;
        }

        res.json({"message": message});
    } catch (err) {
        console.error(err.message)
    }
})
async function addProductToCart(clientId, productId) {
    const cartId = await genereteCartId();
    // const { fk_client_id,  fk_product_id } = req.body;

    let retorno =  await pool.query("Insert into shopping_cart values ($1, $2, $3) returning *", [cartId, clientId,  productId]);
    return retorno.rows[0]
}
//Create
app.post("/shopping_cart", async (req, res) => {
    try {
        // const id = await genereteCartId();
        const { fk_client_id,  fk_product_id } = req.body;

        // const newShoppingCart = await pool.query("Insert into shopping_cart values ($1, $2, $3) returning *", [id, fk_client_id,  fk_product_id]);
        // const newShoppingCart = addProductToCart(fk_client_id,  fk_product_id)
        await addProductToCart(fk_client_id, fk_product_id);

        res.json("ff");
    } catch (err) {
        console.error(err.message)
    }
})
//Delete item
app.delete("/shopping_cart/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const deleteShopping_cart = await pool.query("delete from shopping_cart where id = $1", [id]);

        res.json("Shopping_cart deletado!!");
    } catch (err) {
        console.error(err.message)
    }
})
//Delete All
app.delete("/shopping_cart_all/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const deleteAllShopping_cart = await pool.query("delete from shopping_cart where fk_client_id = $1", [id]);

    } catch (err) {
        console.error(err.message)
    }
})
//--------------------------------------------------- Final Shopping_Cart -----------------------------------------------//
//--------------------------------------------------- incio request -----------------------------------------------//
//Create
app.post("/request", async (req, res) => {
    try {
        const bought_at = date();
        const id = await generateRequestId();
        const {total_price , fk_client_id} = req.body;

        const newRequest = await pool.query("Insert into request values ($1, $2, $3, $4) returning *", [id, total_price, bought_at, fk_client_id]);

        res.json(newRequest.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})
//get all
app.get("/request/:id", async (req, res) => {
    const id_user = req.params.id;
    try {
        const allRequest = await pool.query('select * from request where fk_client_id = $1', [id_user]);
        res.json(allRequest.rows);
    } catch (err) {
        console.error(err.message)
    }
})
//--------------------------------------------------- final request -----------------------------------------------//
//--------------------------------------------------- Inicio Address -----------------------------------------------//
//Get one address
app.get("/address/:address_user", async (req, res) => {
    const address_user = req.params.address_user
    try {
        const address = await pool.query("select * from address where id = ($1)", [address_user]);
        res.json(address.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})
// //Update item
// app.put("/address/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { cidade, estado, rua, numero, cep, bairro } = req.body;

//         const updateAddress = await pool.query("update address set cidade = $1, estado = $2, rua = $3, numero = $4, cep = $5, bairro = $6 where id = $7", [cidade, estado, rua, numero, cep, bairro, id]);

//         res.json("Address atualizado!!");
//     } catch (err) {
//         console.error(err.message)
//     }
// })
//--------------------------------------------------- Final Address -----------------------------------------------//

//--------------------------------------------------- Inicio Client -----------------------------------------------//
//Get All
app.get("/client", async (req, res) => {
    try {
        const allClient = await pool.query("select * from client");

        res.json(allClient.rows);
    } catch (err) {
        console.error(err.message)
    }
})
//Create
app.post("/client", async (req, res) => {
    try {
        const created_at = date();
        const { name, email, password, cpf, cidade, estado, rua, numero, cep, bairro } = req.body;
        const newAddress = await pool.query("Insert into address (cidade, estado, rua, numero, cep, bairro) values ($1, $2, $3, $4, $5, $6) returning id", [cidade, estado, rua, numero, cep, bairro]);
        const idAddress = newAddress.rows[0]["id"]
        const newClient = await pool.query("Insert into client (name, email, password, cpf, created_at, fk_address_id) values ($1, $2, $3, $4, $5, $6)", [name, email, password, cpf, created_at, idAddress]);

        res.json(newAddress.rows[0]);
        res.json(newClient.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})
//Get one Client
app.get("/client/:id", async (req, res) => {
    const { id } = req.params
    try {
        const client = await pool.query("select * from client where id = ($1)", [id]);

        res.json(client.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})
//Update client
app.put("/client/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, cpf } = req.body;
        const updateClient = await pool.query("update client set name = $1, email = $2, password = $3, cpf = $4 where id = $5", [name, email, password, cpf, id]);

        res.json("User atualizado!!");
    } catch (err) {
        console.error(err.message)
    }
})
//Delete client
app.delete("/client/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteClient = await pool.query("delete from client where id = $1", [id]);

        res.json("Client deletado!!");
    } catch (err) {
        console.error(err.message)
    }
})
//--------------------------------------------------- Final User -----------------------------------------------//
//--------------------------------------------------- Inicio Product -----------------------------------------------//
//Get All
app.get("/products/:id", async (req, res) => {
    try {
        const id = req.params.id;

        if(id == 0){
            allProduct = await pool.query("select * from product");
        } else {
            allProduct = await pool.query("select * from product where fk_category_id = $1", [id]);
        }
        res.json(allProduct.rows);
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/getUser", async(req, res) => {
    try {
        user_id = req.body.fk_client_id
    }  catch (err) {
        console.error(err.message)
    }
})

//Get
app.get("/product/:id", async (req, res) => {
    try {
        const id = req.params.id;

        oneProduct = await pool.query("select * from product where id = $1", [id]);

        res.json(oneProduct.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})
//--------------------------------------------------- Final Product -----------------------------------------------//
app.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const login = await pool.query("select * from client where email = $1 and password = $2", [email, password]);
        res.json(login.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/verify", async (req, res) => {
    const { email, cpf } = req.body
    try {
        const verify = await pool.query("select * from client where email = $1 or cpf = $2", [email, cpf]);
        res.json(verify.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/uploadCSV", async (req, res) => {
    console.log("req", req.body)
    // user_id = req.body.fk_client_id
    try {
        // const id = await genereteCartId();
        // const { fk_client_id } = req.body;
        //     let fk_product_id = arr[i]
        //     const newShoppingCart = await pool.query("Insert into shopping_cart values ($1, $2, $3) returning *", [id, fk_client_id,  fk_product_id]);
        //     res.json(newShoppingCart.rows[0]);

    } catch (err) {
        console.error(err.message)
    }
})

const formidable = require('formidable');
const fs = require('fs');
const { json } = require('express');

app.post('/upload', (req, res) => {

    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        const path = require('path');
        const oldpath = files.meucsv.filepath;
        const newpath = path.join(__dirname, '/uploads', files.meucsv.newFilename);

        fs.renameSync(oldpath, newpath);

        const { spawn } = require('child_process');
        const childPython = spawn('python', ['python.py', files.meucsv.newFilename])

        let data1
        let produtosCSV = []

        childPython.stdout.on('data', function(data){
            data1 = data;
            produtosCSV += data
        })

        childPython.on('close', (code) => {
            res.send(data1)
        })
        childPython.stdout.on("end", () => {
            let teste = produtosCSV
            formatarCsv(teste)
        })
    });
});

async function formatarCsv(teste) {
    teste = teste.replace(/,/gm, "")
    teste = teste.replace('[', "")
    teste = teste.replace(']', "")
    while (teste.includes(' ')) {
        teste = teste.replace(' ', "")
    }

    split = teste.split('', 5)
    let arr = []
    for(let i = 0; i < split.length; i++){
        arr[i] = parseInt(split[i])
    }

    for(let i = 0; i < arr.length; i++){
        await addProductToCart(user_id, arr[i]);
    }
}

app.listen(5000, () => {
    console.log("Server iniciado na porta 5000")
})
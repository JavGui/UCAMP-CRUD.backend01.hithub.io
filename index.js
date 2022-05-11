const express = require('express');
const app = express();
const bodyParser = require('body-parser');


let usuarios= [
    { id: 0, nombre: "Juan"},
    { id: 1, nombre: "Gaby"},
    { id: 2, nombre: "Javier"},
    { id: 3, nombre: "Lucía"}, 
];

app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', 'Authorization, X-APPI-KEY, x-Request-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTION, PUT, DELETE')
    res.header('Allow', 'GET, POST, OPTION, PUT, DELETE')
    next()
});

// ENVIAR TODOS LOS REGISTROS
app.get("/usuarios",(req, res) => {
    res.send(usuarios);
});

// LEE FILTRA Y ENVIA ALGUNOS REGISTROS
// app.get("/usuarios",(req, res) => {
//     const filtro = usuarios.filter(user => user.id === 0)
//     res.send(filtro);
// });

// QUERY PARAMS, RECIBE POR HTML EL PARÁMETRO DEL DATO DEL REGISTRO QUE SE REQUIERE MANDAR
// app.get("/usuarios",(req, res) => {
//     const idFront = req.query.id
//     console.log("idFront: ", idFront)
//     const filtro = usuarios.filter(user => user.id == idFront)
//     res.send(filtro);
// });


// CREAR REGISTROS
app.post("/usuarios", (req, res) => {
    const { nombre } = req.body;
    console.log("Nombre: ", nombre);
    const id = usuarios.length;
    usuarios.push({id, nombre});
    console.log(usuarios);
    res.json(usuarios);
})

// MODIFICAR DATOS
app.put("/usuarios", (req, res) => {  
    const { id, nombre } = req.body;
    const filtro = usuarios.map((e) => {
        return e.id == id ? { id, nombre } : e }
)
    usuarios = (filtro);
    res.json(usuarios);
})

//BORRAR REGISTRO
app.delete("/usuarios", (req, res) => {  
    const { id } = req.body;
    const filtro = usuarios.filter((e) => e.id != id);
    usuarios = filtro;
    res.json(usuarios);
})


// ----------------- Inicialización del Servidor -----------------

app.listen("5000", ()=>{
    console.log("El servidor está corriendo en el puerto 5000");
});

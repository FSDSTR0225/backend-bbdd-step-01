const express = require('express');
const app = express();
const port = 3000;

// Middleware para procesar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base de datos en memoria para usuarios
const usuarios = [
    { id: 1, nombre: 'Juan', password: '1234' },
    { id: 2, nombre: 'Ana', password: '5678' },
    { id: 3, nombre: 'Pedro', password: 'abcd' },
    { id: 4, nombre: 'María', password: 'efgh' }
];

// GET /usuarios - Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// GET /usuarios/:id - Obtener un usuario específico
app.get('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    
    if (!usuario) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    
    res.json(usuario);
});

// POST /usuarios - Crear un nuevo usuario
app.post('/usuarios', (req, res) => {
    const { nombre, password } = req.body;
    
    if (!nombre || !password) {
        return res.status(400).json({ msg: "Falta nombre o password" });
    }
    
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        password
    };
    
    usuarios.push(nuevoUsuario);
    res.status(201).json({ msg: "Usuario creado", id: nuevoUsuario.id });
});

// PUT /usuarios/:id - Actualizar un usuario
app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, password } = req.body;
    
    if (!nombre || !password) {
        return res.status(400).json({ msg: "Falta nombre o password" });
    }
    
    const usuario = usuarios.find(u => u.id === id);
    
    if (!usuario) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    
    usuario.nombre = nombre;
    usuario.password = password;
    
    res.json({ msg: "Usuario actualizado" });
});

// PATCH /usuarios/:id - Actualizar parcialmente un usuario
app.patch('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre } = req.body;
    
    if (!nombre) {
        return res.status(400).json({ msg: "Falta nombre" });
    }
    
    const usuario = usuarios.find(u => u.id === id);
    
    if (!usuario) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    
    usuario.nombre = nombre;
    
    res.json(usuario);
});

// DELETE /usuarios/:id - Eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);
    
    if (index === -1) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    
    usuarios.splice(index, 1);
    res.json({ msg: "Usuario eliminado" });
});

// POST /login - Inicio de sesión
app.post('/login', (req, res) => {
    const { nombre, password } = req.body;
    
    if (!nombre || !password) {
        return res.status(400).json({ msg: "Falta nombre o password" });
    }
    
    const usuario = usuarios.find(u => u.nombre === nombre && u.password === password);
    
    if (!usuario) {
        return res.status(403).json({ msg: "Credenciales incorrectas" });
    }
    
    res.json({ msg: "Login exitoso", usuario: usuario.nombre });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Aplicación ejecutándose en http://localhost:${port}`);
});
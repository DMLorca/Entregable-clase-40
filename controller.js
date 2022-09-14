
module.exports = {
    renderLogin: (req, res) => {
        res.render('login');
    },
    renderRegister: (req, res) => {
    res.render('register');
    },
    renderLogout: (req, res) => {

        req.session.destroy((err) =>{
            if(!err) res.render('logout', { credencial });
            else res.send({status: 'Logout ERROR', body: err})
        })
    },
    renderAutenticado: (req, res) => {
    
        console.log("autenticado correctamente");
        credencial = {name: req.body.username};
        res.sendFile('index.html', { root: __dirname });
    },
    renderRegistrado: (req, res) => {
    
        console.log("registrado correctamente");
        res.redirect('/')
    },
    randomNumbers: (req, res) => {
        let cantDatos = parseInt(req.query.cant);
        const forked = fork('randomNumbers');
    
        forked.on('message', numbers => {
            res.send(numbers);
        })
        forked.send(cantDatos);
        console.log("random succesful")
    },
    info: (req, res) =>{
        const info = {
            args: argv,
            sistema: process.platform,
            nodeVersion: process.version,
            memory: process.memoryUsage(),
            path: process.cwd(),
            processId: process.pid,
            file: __dirname,
            numberCPUs: numberCPUs
        }
        res.send(info)
    }
}
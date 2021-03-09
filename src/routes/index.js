const  { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');

// metodo de la documentacion
// var serviceAccount = require("../../test-firestore-db-f9e46-firebase-adminsdk-vyfvv-6ce8a0092b.json");

admin.initializeApp({
    // credential: admin.credential.cert(serviceAccount),
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://test-firestore-db-f9e46-default-rtdb.firebaseio.com/'
})

// 1
const db = admin.database();


router.get('/', (req, res) => {
    db.ref('contactos').once('value', (snapshot) => {         // consultar toda la collecccion
        const data = snapshot.val();
        res.render('index', {contactos: data})
    });
    
})

router.post('/new-contact',(req, res) => {
    console.log(req.body)
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }
    db.ref('contactos').push(newContact)                       // nombre de la tabla - collections
    res.redirect('/')
})

// TODO: router.put('update-contact/:id)

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contactos/' + req.params.id).remove();
    console.log(req.params.id)
    res.redirect('/')
})

module.exports = router;


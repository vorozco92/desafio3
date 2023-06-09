import express from 'express'
import ProductManager from '../src/ProductManager.js'

const app = new express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PM =  new ProductManager('list.json');

app.get('/products', (req, res)=>{
    let limit = req.query.limit ?? 0;
    PM.getProducts().
        then(resultado => { 
            let products = JSON.parse(resultado);
            if (limit)
                products = products.filter( (a ,index ) =>{ if (index < limit) return a})
            res.send({products});
         })
        .catch(error => { 
            res.send({status:'error', msg: error});
        });
    
})

app.get('/products/:id', (req, res)=>{
    let pid = req.params.id;

    PM.getProducts().
        then(resultado => { 
            let products = JSON.parse(resultado);
            let product = products.find(a => a.id == pid)
            res.send({product});
         })
        .catch(error => { 
            res.send({status:'error', msg: error});
        });
    
})

const servidor = app.listen(8080, ()=>{console.log('Server up');})


const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')

let models = require('./models')

app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

app.use(express.static('public'))


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',function(req,res){
    res.redirect("index")
})

app.get('/index',function(req,res){
    res.render('index')
})





app.post('/addshoppinglists',function(req,res){

    let shopName = req.body.shopName
    let street = req.body.street
    let city = req.body.city
    let state = req.body.state

    //building the shoplist using build function

    let shoplist = models.shoppinglists.build({
        name : shopName,
        street : street,
        city : city,
        state: state
        }) 

    // save the shoplist in the database

    shoplist.save().then(function(savedShopList){
        console.log(savedShopList)
    }) 

      res.redirect('shoppingLists')


 })

app.get('/shoppingLists',function(req,res){

    models.shoppinglists.findAll().then(function(shoplists){

        res.render('shoppingLists',{shoplists:shoplists})

        console.log(shoplists)

    })
    
  })
  app.post('/deleteshop',function(req,res){
        let shopId =   parseInt(req.body.shopId)
      models.shoppinglists.destroy({
        where: {
            id : shopId
          }
         }) .then(function(shoplist){

          res.redirect('shoppingLists')
        })
  })
app.listen(3000, () => console.log('app listening on port 3000!'))

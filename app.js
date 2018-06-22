
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
        //console.log(savedShopList)
    }) 

      res.redirect('shoppingLists')

})

app.get('/shoppinglists',function(req,res){

    models.shoppinglists.findAll().then(function(shoplists){

        res.render('shoppingLists',{shoplists:shoplists})

        //console.log(shoplists)
    })  
})
  

// shoppinglists/4
app.get('/shoppinglists/:id',function(req,res){

    let shopId = parseInt(req.params.id)
    //console.log(shopId)
    

    models.shoppinglists.findOne({
        where : {
          id : shopId
        },
          include :[
            {
              model : models.GroceryItem,
              as : 'groceryitems'
            }
          ]
      }).then(function(shoppinglist){
      
        // console.log(shoppinglist.groceryitems)

        res.render('groceryItems',{shoppingListId:shopId,groceryItemsList:shoppinglist.groceryitems})

      })    
})

app.post('/addgroceryitems',function(req,res){

    let groceryItemName = req.body.groceryItemName
    let quantity = parseInt(req.body.quantity)
    let price = parseFloat(req.body.price)
    let shoppingListId = parseInt(req.body.shoppingListId)

    // console.log(groceryItemName)
    // console.log(quantity)
    // console.log(price)
    // console.log(shoppingListId)

    let groceryItem = models.GroceryItem.build({
        name : groceryItemName,
        quantity : quantity,
        price   : price,
        shopid:shoppingListId
        }) 

    // save the shoplist in the database

    groceryItem.save().then(function(savedGroceryItem){
       // console.log(savedGroceryItem)
       res.redirect(`/shoppinglists/${shoppingListId}`)

    }) 

})  

app.post('/deletegroceryitem',function(req,res){

        let groceryItemId =   parseInt(req.body.groceryItemId)
        let shopId =   parseInt(req.body.shopId)
        console.log(shopId)
        console.log(groceryItemId)

        models.GroceryItem.destroy({
            where : {
              id : groceryItemId
            }
          }).then(function(deletedgroceryitem){
                console.log(deletedgroceryitem)
                res.redirect(`/shoppinglists/${shopId}`)
        })        
       
   })

// app.get('/groceryitems',function(req,res){

//     res.render('groceryItems',{groceryItemsList:groceryItemsList})    
   
// })     
    
app.listen(3000, () => console.log('app listening on port 3000!'))



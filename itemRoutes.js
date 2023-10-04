const express = require("express");
const items = require("./fakeDb");
const ExpressError = require("./expressError");
const router = express.Router();

router.use(express.json());


router.get("/", (req, res, next) => {
    return res.send(items);
});

router.post("/", (req, res, next) => {
    const json = req.body;
    if (json.name && json.price){
        items.push({name: json.name, price: json.price});
        return res.status(201).send({added: {name: json.name, price: json.price}});
    }
    else {
        return next(new ExpressError("Bad Request", 400));
    }
});

router.get("/:name", (req, res, next) => {
    for (let item of items){
        if (item.name === req.params.name){
            return res.send(item);
        }
    }
    next();
});

router.patch("/:name", (req, res, next) => {
    const json = req.body;
    for (let i = 0; i < items.length; i++){
        if (items[i].name === req.params.name){
            if (json.name && json.price){
                items[i] = {name: json.name, price: json.price};
                return res.send({updated: {name: json.name, price: json.price}});
            }
            else {
                return next(new ExpressError("Bad Request", 400));
            }
        }
    }
    next();
});

router.delete("/:name", (req, res, next) => {
    for (let item of items){
        if (item.name === req.params.name){
            let _items = items.filter(c => c !== item);
            items.length = 0;
            items.concat(_items);
            return res.send({message: "Deleted"});
        }
    }
    next();
});

module.exports = router;
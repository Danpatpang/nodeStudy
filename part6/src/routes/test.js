var express = require('express');
var router = express.Router();

// router.get(`/`, function(req, res, next) {
//     next('route');
// }, function(req, res, next){
//     console.log("실행 X");
//     next();
// }, function(req, res) {
//     console.log("실행 X");
//     next();
// });
//
// router.get(`/`, function(req, res) {
//     console.log(`실행`);
//     res.render(`index`, {title: `Express`});
// });

router.get(`/`, function(req, res){
    res.render('test', {title: "express"});
})
module.exports = router;
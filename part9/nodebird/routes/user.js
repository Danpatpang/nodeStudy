const express = require('express');

const {isLoggedIn} = require('./middlewares');
const {User}= require('../models');
const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    try {
        // follow할 사용자 조회 후 현재 로그인한 사용자와의 관계 지정
        const user = await User.find({where : {id:req.user.id}});
        await user.addFollowing(parseInt(req.params.id, 10));
        res.send('success');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
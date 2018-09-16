function findAndSaveUser(Users){
    // 첫 번째 콜백
    Users.findOne({}, (err, user) => {
        if(err){
            return console.error(err);
        }
        user.name = `zero`;
        // 두 번째 콜백
        user.save((err) => {
            if(err){
                return console.error(err);
            }
            // 세 번째 콜백
            Users.findOne({gender: `m`}, (errr, user) => {

            });
        });
    });
}

function findAndSaveUser2(Users){
    Users.findOne({})
    .then((user) => {
        user.name = `zero`;
        return user.save();
    })
    .then((user) => {
        return User.findOne({gender:`m`});
    })
    .then((user) => {})
    .catch(err => {
        console.error(err);
    });
}
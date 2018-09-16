var relationship1 = {
    name: 'zero',
    friend: [`nero`, `hero`, `xero`],
    logFriends: function() {
        var that = this;
        this.friend.forEach(function(friend){
            console.log(that.name, friend);
        });
    },
};
relationship1.logFriends();

const relationship2 = {
    name:'zero',
    friend: [`nero`, `hero`, `xero`],
    logFriends: function(){
        this.friend.forEach(friend => {
            console.log(this.name, friend);
        });
    }
};
relationship2.logFriends();
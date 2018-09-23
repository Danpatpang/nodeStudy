setInterval(() => {
    console.log(`시작`);
    try {
        throw new Error(`서버를 고장낼거야`);
    } catch(err) {
        console.error(err);
    }
}, 1000);
var fortunes = [
    "1번 포츈",
    "2번 포츈",
    "3번 포츈",
    "4번 포츈",
    "5번 포츈"
];

exports.getFortune = () => {
    var randomFortune = Math.floor(Math.random() * fortunes.length);
    return fortunes[randomFortune];
}
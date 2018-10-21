const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {Post, Hashtag, User} = require('../models');
const {isLoggedIn} = require('./middlewares');

const router = express.Router();

fs.readdir('uploads', (err) => {
    if (err) {
        console.error("uploads 폴더가 없어서 폴더 생성");
        // 동기로 처리
        fs.mkdirSync('uploads');
    }
});

const upload = multer(
    {
        // 파일 저장 설정
        storage: multer.diskStorage(
            {
                // 저장위치 지정
                destination(req, file, cb) {
                    cb(null, 'uploads/');
                },
                // 파일이름 지정
                filename(req, file, cb) {
                    // 파일 확장자
                    const ext = path.extname(file.originalname);
                    cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
                }
            }
        ),
        // 파일 용량 설정 10MB
        limits: {fileSize: 5 * 1024 * 1024}
    });

// 이미지 저장 후 저장 주소 반환
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({url: `/img/${req.file.filename}`});
});

const upload2 = multer();

// 이미지가 없을 경우
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
    try {
        // 데이터 생성 및 추가 시도
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            userId: req.user.id
        });

        const hashtags = req.body.content.match(/#[^\s]*/g);
        if (hashtags) {
            // 이해 어려움!!!!
            // 검색 후 없으면 생성?
            const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
                where: {title: tag.slice(1).toLowerCase()}
            })));
            // 추가
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 해시태그 기능
router.get('/hashtag', async (req, res, next) => {
    const query = req.query.hashtag;
    if (!query) {
        return res.redirect('/');
    }
    try {
        const hashtag = await Hashtag.find({where: {title: query}});
        let posts = [];
        if (hashtag) {
            // 해시태그로 가져온 포스트, 작성자 정보 join
            // 왜 작성자 join 하는가?
            posts = await hashtag.getPosts({include: [{model: User}]});
        }
        return res.render('main', {
            title: `${query} | Nodebird`,
            user: req.user,
            twits: posts,
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
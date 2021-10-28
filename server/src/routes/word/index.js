const express = require('express')
const WordRouter = express.Router()

const Word = require('../../models/Word') // 경로

WordRouter.route('/(:word)?').get( async (req, res) => {
                 // => /api/words/학원
    let words = []
    const { word } = req.params
    // const queries = word.split(',') 
    // console.log(queries)
    
    if(word !== "undefined" && word !== undefined){   // => 검색어(쿼리)가  있으면
        // console.log(queries)
        try {   // async-await문을 쓸땐 try-catch문을 쓰는게 좋음
            // words = await Word.find({ r_des: {$in: [
            //     {$regex: "법규"},
            //     {$regex: "계속"}
            // ]}})
            // words = await Word.find({ r_word: word })
            // words = await Word.find({ r_word: { $regex : `^${word}` } }) // 검색어로 시작하는 단어가 검색됨
            // words = await Word.find({ r_word: { $regex : `${word}$` } }) // 검색어로 끝나는 단어가 검색됨
            // words = await Word.find({ r_des : { $regex : `${word}` } })    // 설명부분에 검색어가 포함된 단어가 검색됨
            words = await Word.find( { 
                $or : [
                    {r_word : {$regex : `${word}`}},
                    {r_des : {$regex : `${word}`}}
                ]   // 검색어가 단어와 검색어중에 포함되어 있는 단어가 검색됨
             } ).sort({"_id":-1})   // -1: 최신순(내림차순), 1: 과거순(오름차순)
                .limit(6)   // 6개까지만 출력
        } catch (e) {
            console.log(e)
        }


    }else{  // 검색어(쿼리)가 없으면 전체 단어 검색
        try{    
            words = await Word.find()
        }catch(e){
            console.log(e)
        }
    } 
    res.json({status: 200, words}) // 밖으로 뺌
})

module.exports = WordRouter
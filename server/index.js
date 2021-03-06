var express = require('express')   // node_modules 내 express 관련 코드를 가져온다
var app = express()
var cors = require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')
var routes = require('./src/routes')

var corsOptions = { // CORS 옵션
    origin : '*',   // 모든 브라우저에서 접근 허용
    Credentials: true
}

const CONNECT_URL = 'mongodb://localhost:27017/kor_dic_db'
mongoose.connect(CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("mongodb connected..."))
  .catch(e => console.log('failed to connect mongodb: ${e}'))


app.use(cors(corsOptions))   // cors 설정
app.use(express.json()) // request body 파싱
app.use(logger('tiny')) // Logger 설정
app.use("/api",routes)  // api 라우팅

app.get('/hello', (req, res) => {   // URL 응답 테스트 ,위치 주의
    res.send('hello world!')
})

app.get('/', (req,res) => {     
    res.send('root url')
})

app.use((req, res, next) => {   // 사용자가 요청한 페이지가 없는 경우 에러처리
    res.status(404).send("Sorry can't find page")
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("somthing is broken on server !")
})

app.listen(5001, () => {    // 5001 포트로 서버 오픈
    console.log('server is running on port 5001... - nodemon')
})


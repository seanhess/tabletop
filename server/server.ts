///<reference path='def/node.d.ts' />
///<reference path='def/express.d.ts'/>
///<reference path='def/rethinkdb.d.ts'/>

var PORT = process.env.PORT || 3000
import exp = module('express')
import http = module('http')
var stylus = require('stylus')
var nib = require('nib')
var path = require('path')
var connect = require('connect')

function ignoreError(err) {}

export var app:exp.ServerApplication = exp()

app.configure("test", () => {
  console.log("TEST")
})

app.configure("development", () => {
  console.log("DEVELOPMENT")
  app.use(stylus.middleware({src: path.join(__dirname,'..','public')}))
})

app.configure("production", () => {
  console.log("PRODUCTION")
})

app.configure(() => {
  console.log("CONFIGURE")
  app.use(connect.static(__dirname + '/../public'))
  app.use(connect.cookieParser())
  app.use(connect.multipart())
  app.use(connect.bodyParser())
  //app.use(connect.session({secret: 'funky monkey', key: 'blah', store:new connect.session.MemoryStore()}))
})

app.get('/gogogo', function(req, res) {
  res.send({name:"sean"})
})


/// APP ///////////////////////////////////////////
// public/index.html is loaded by default
// or explicitly for any route with no extension
app.get(/\/[\w\-]+$/, function(req, res) {
  res.sendfile(path.join(__dirname,'..','public','index.html'))
})

if (module == (<any>require).main) {
  var server = http.createServer(app)
  server.listen(PORT, () => {
    console.log("RUNNING " + PORT)
  })
}




































/// PROMISE HELPERS


// TODO validation
function send(res:exp.ServerResponse) {
  return function(value:any) {
    if (value) res.json(value)
    else res.send(404)
  }
}

function code(res:exp.ServerResponse, code:number) {
  return function() {
    res.send(code)
  }
}

function ok(res:exp.ServerResponse) {
  return function() {
    res.send(200)
  }
}

function err(res:exp.ServerResponse) {
  return function(err:Error) {
    res.send(500, err.message)
  }
}




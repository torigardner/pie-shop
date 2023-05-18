let express = require('express');
let app = express();
let router = express.Router();
let pieRepo = require('./repos/pieRepo')


router.get('/', function(req,res,next){
    pieRepo.get(
        function(data){
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "All pies retrieved",
                "data": data
            })
        },
        function(err){
            next(err )
        }
    )
})

router.get('/search', function(req,res,next){
        let searchObject = {
            "id": req.query.id,
            "name": req.query.name
        }

        pieRepo.search(
            searchObject, 
            function(data){
                if(data.length){
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "Search results found",
                        "data": data
                    })
                }else{
                    res.status(404).json({
                        "status": 404,
                        "statusText": "Pie Not Found",
                        "message": "No pies were found with those parameters.",
                        "error": {
                            "code": "NOT_FOUND",
                            "message": "No pies were found with those parameters.",
                        }
                    })
                }
            },
            function(err){
                next(err)
            }
        )
    }
)

router.get('/:id', function(req,res,next){
    pieRepo.getById(
        req.params.id,
        function(data){
            if(data){
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Pie with ID: '" + req.params.id + "' was found.",
                    "data": data
                })
            }else{
                res.status(404).json({
                    "status": 404,
                    "statusText": "Pie Not Found",
                    "message": "Pie with ID: '" + req.params.id + "' was not found.",
                    "error": {
                        "code": "NOT_FOUND",
                        "message": "Pie with ID: '" + req.params.id + "' was not found."
                    }
                })
            } 
        },
        function(err){
            next(err )
        }
    )
})

app.use('/api/', router)

var server = app.listen(5000, function(){
    console.log('Node server is running')
})
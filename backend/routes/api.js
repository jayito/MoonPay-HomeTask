var express = require('express');
var { cheapestOrder } = require('../controllers/controll');
var router = express.Router();

router.get('/exchange-routing', function(req, res, next) {
  cheapestOrder(req.query, (err, re) => {
    if(err) {
      return res.status(500).json({error: err})
    } else {
      return res.status(200).json(re)
    }
  });
});

module.exports = router;

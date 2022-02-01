const express = require('express')
const router = express.Router()

require('./routes/transfers/dashboard-routes')(router)

router.get('/transfers/outgoing-trust-search', (req, res) => {
  if (req.query['outgoing-trust-id']) {
    req.session.data['outgoing-trust-id'] = req.query['outgoing-trust-id']
    req.session.data['autocompleted-outgoing-trust-id'] = true
    res.redirect('/transfers/trust-details')
  } else {
    res.render('transfers/outgoing-trust-search')
  }
})

router.get('/transfers/incoming-trust-search', (req, res) => {
  if (req.query['incoming-trust-id']) {
    req.session.data['incoming-trust-id'] = req.query['incoming-trust-id']
    req.session.data['autocompleted-incoming-trust-id'] = true
    res.redirect('/transfers/summary')
  } else {
    res.render('transfers/incoming-trust-search')
  }
})

module.exports = router

// Run this code when a form is submitted to 'risks-branching'
router.post('/decide-risks-branch', function (req, res) {

  var howManyBalls = req.session.data['risks-branching']
  
  if (howManyBalls == "Yes"){
    // Send user to risks page
    res.redirect('/version-4/pre-htb/school-1/benefits-and-other-factors/question-b-risks')
  } else {
    // Send user to benefits and risks summary page
    res.redirect('/version-4/pre-htb/school-1/benefits-and-other-factors')
  }

})

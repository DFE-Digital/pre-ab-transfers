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

// Run this code when a form is submitted to 'risks-details'
router.post('/associated-risks-for-transfer', function (req, res) {

  var associatedRisksForTransfer = req.session.data['risks-issues']

  if (associatedRisksForTransfer.includes("This is a high profile transfer (ministers and media could be involved)")) {
    res.redirect('/version-4/pre-htb/school-1/benefits-and-other-factors/question-b-details-high-profile-transfer')
  }
  else {
    if (associatedRisksForTransfer.includes("There are complex land and building issues")) {
      res.redirect('/version-4/pre-htb/school-1/benefits-and-other-factors/question-b-details-complex-land-and-building-detail')
    }
    else {
      if (associatedRisksForTransfer.includes("There are finance and debt concerns")) {
        res.redirect('/version-4/pre-htb/school-1/benefits-and-other-factors/question-b-details-finance-and-debt-concerns-detail')
      }
      else {
        if (associatedRisksForTransfer.includes("Other risks")) {
          res.redirect('/version-4/pre-htb/school-1/benefits-and-other-factors/question-b-details-other-risks')
        }
      }
    }
  }

})

router.post('/submit-high-profile', function (req, res) {

  var associatedRisksForTransfer = req.session.data['risks-issues']
    if (associatedRisksForTransfer.includes("There are complex land and building issues")) {
      res.redirect('/version-4/pre-htb/school-1/benefits-and-other-factors/question-b-details-complex-land-and-building-detail')
    }
    else {
      if (associatedRisksForTransfer.includes("There are finance and debt concerns")) {
        res.redirect('/version-4/pre-htb/school-1/benefits-and-other-factors/question-b-details-finance-and-debt-concerns-detail')
      }
      else {
        if (associatedRisksForTransfer.includes("Other risks")) {
          res.redirect('/version-4/pre-htb/school-1/benefits-and-other-factors/question-b-details-other-risks')
        }
        else {
          // Send user to benefits and risks summary page
          res.redirect('/version-4/pre-htb/school-1/benefits-and-other-factors')
        }
      }
    }
})

router.post('/submit-land-and-building-issues', function (req, res) {

  var associatedRisksForTransfer = req.session.data['risks-issues']
    if (associatedRisksForTransfer.includes("There are finance and debt concerns")) {
      res.redirect('/version-4/pre-htb/school-1/benefits-and-other-factors/question-b-details-finance-and-debt-concerns-detail')
    }
    else {
      if (associatedRisksForTransfer.includes("Other risks")) {
        res.redirect('/version-4/pre-htb/school-1/benefits-and-other-factors/question-b-details-other-risks')
      }
      else {
        // Send user to benefits and risks summary page
        res.redirect('/version-4/pre-htb/school-1/benefits-and-other-factors')
      }
    }
})

router.post('/submit-finance-debt-concern', function (req, res) {

  var associatedRisksForTransfer = req.session.data['risks-issues']
    if (associatedRisksForTransfer.includes("Other risks")) {
      res.redirect('/version-4/pre-htb/school-1/benefits-and-other-factors/question-b-details-other-risks')
    }
    else {
      // Send user to benefits and risks summary page
      res.redirect('/version-4/pre-htb/school-1/benefits-and-other-factors')
    }
})

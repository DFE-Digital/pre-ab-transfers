const faker = require('faker')
const path = require('path')
const moment = require('moment')
const filters = require('./../filters.js')()
const _ = require('lodash')
const utils = require('./../lib/utils')

module.exports = router => {

  // Delete data when starting new
  router.get(['/new-record/new', '/new-record'], function (req, res) {
    const data = req.session.data
    utils.deleteTempData(data)
    _.set(data, 'record', { status: 'Draft' })
    _.set(data, 'record.events.items', [])
    // If multiple providers, users must pick one as thier first action
    if (data.signedInProviders.length > 1){
      res.redirect('/new-record/pick-provider')
    }
    else {
      // If single provider, directly assign them to the record
      data.record.provider = data.signedInProviders[0]
      res.redirect('/new-record/overview')
    }
  })

  // Show error if route is not assessment only
  router.post('/new-record/record-setup', function (req, res) {
    const data = req.session.data
    let recordType = _.get(data, 'record.route') // Assessment only or not
    let referrer = utils.getReferrer(req.query.referrer)

    // No data, return to page
    if (!recordType){
      res.redirect(`/new-record/record-setup${referrer}`)
    }
    // Route not supported
    else if (recordType == "Other") {
      res.redirect(`/new-record/route-not-supported${referrer}`)
    }
    else {
      // Coming from the check answers page
      if (referrer){
        res.redirect(req.query.referrer)
      }
      else {
        res.redirect(`/new-record/overview`)
      }
    }
   
  })

  // We *really* need the provider to get set, so don't let users past
  // the page without picking one
  // Only relevant where users belong to multiple providers
  router.post('/new-record/pick-provider-answer', function (req, res) {
    const data = req.session.data
    const record = data.record
    let provider = record?.provider
    let referrer = utils.getReferrer(req.query.referrer)
    // No data, return to page
    if (!provider){
      res.redirect(`/new-record/pick-provider${referrer}`)
    }
    else {
      // Coming from the check answers page
      if (referrer){
        res.redirect(req.query.referrer)
      }
      else {
        res.redirect(`/new-record/overview`)
      }
    }
  })

  // Task list confirmation page - pass errors to page
  // Todo: use flash messages or something to pass real errors in
  router.get('/new-record/check-record', function (req, res) {
    const data = req.session.data
    let errors = req.query.errors
    let newRecord = _.get(data, 'record') // copy record
    let isComplete = utils.recordIsComplete(newRecord)
    let errorList = (errors) ? true : false
    res.render('new-record/check-record', {errorList, recordIsComplete: isComplete})
  })

  // Delete draft
  router.get('/new-record/delete-draft/delete', (req, res) => {
    const data = req.session.data
    const records = data.records
    let newRecord = data.record
    if (newRecord.id){
      let recordIndex = records.findIndex(record => record.id == newRecord.id)
      _.pullAt(records, [recordIndex]) // delete item at index
    }
    utils.deleteTempData(data)
    req.flash('success', 'Draft deleted')
    res.redirect('/records')
  })

  // Save a record and put in data store
  router.get('/new-record/save-as-draft', (req, res) => {
    const data = req.session.data
    // const records = data.records
    let newRecord = data.record
    // No data, return to page
    if (!newRecord){
      res.redirect('/new-record/overview')
    }
    else {
      newRecord.status = "Draft" // just in case
      utils.deleteTempData(data)
      utils.updateRecord(data, newRecord)
      req.flash('success', 'Record saved as draft')
      res.redirect('/records')
    }
  })

  // Submit for TRN
  router.post('/new-record/save', (req, res) => {
    const data = req.session.data
    let newRecord = _.get(data, 'record') // copy record
    if (!utils.recordIsComplete(newRecord)){
      console.log('Record is incomplete, returning to check record')
      res.redirect('/new-record/check-record?errors=true')
    }
    else {
      utils.registerForTRN(newRecord)
      utils.deleteTempData(data)
      utils.updateRecord(data, newRecord, false)
      // Temporarily store the id so that we can look it up on the submitted page
      req.session.data.submittedRecordId = newRecord.id 
      res.redirect('/new-record/submitted')
    }
  })


}

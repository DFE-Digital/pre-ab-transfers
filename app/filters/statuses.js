// -------------------------------------------------------------------
// Imports and setup
// -------------------------------------------------------------------

// Leave this filters line
var filters = {}


/*
  ====================================================================
  filterName
  --------------------------------------------------------------------
  Short description for the filter
  ====================================================================

  Usage:

  [Usage here]

  filters.sayHi = (name) => {
    return 'Hi ' + name + '!'
  }

*/

filters.getStatusText = (data) => {
  if (!data) return "Not started"
  if (data.status) return data.status
  else return "In progress"
}

filters.getStatusClass = (status) => {
  switch (status) {
    // States that currently use the default tag style
    // - 'Enrolled'
    // - 'Conditions met'
    // - 'Conditions not met'
    // - 'Completed'

    // Application phases
    case 'Not started':
      return 'govuk-tag--grey'
    case 'In progress':
      return 'govuk-tag--grey'
    case 'Completed':
      return 'govuk-tag--blue'

    // Record statuses
    case '':
      return 'govuk-tag--grey'
      // return 'govuk-tag--yellow'
    case 'Pending TRN':
      return 'govuk-tag--turquoise'
    case 'TRN received':
      return 'govuk-tag--blue'
    case 'QTS recommended':
      // return 'govuk-tag--green'
      return 'govuk-tag--purple'
    case 'QTS awarded':
      return
      // return 'govuk-tag--purple'
    case 'Deferred':
      return 'govuk-tag--yellow'
      // return 'govuk-tag--orange'
    case 'Withdrawn':
      return 'govuk-tag--red'

    default:
      return 'govuk-tag--blue'
  }
}

filters.sectionIsInProgress = data =>{
  return (data)
}

filters.sectionIsCompleted = data =>{
  return (data && data.status == "Completed")
}

filters.reviewIfInProgress = (url, data, path) => {
  if (!filters.sectionIsInProgress(data)){
    return url
  }
  else {
    if (path) return path + '/confirm'
    else return url + "/confirm"
  }
}

filters.getAmendsAllowed = status => {
  let statusesThatCanAmend = [
    '',
    'Pending TRN',
    'TRN received',
    'Deferred'
  ]
  return statusesThatCanAmend.includes(status)
}

filters.getCanRecommendForQts = status => {
  let statusesThatShowQtsTabs = [
    'TRN received'
  ]
  return statusesThatShowQtsTabs.includes(status)
}

filters.getCanDefer = status => {
  let statusesThatAllowDeferral = [
    'Pending TRN',
    'TRN received'
  ]
  return statusesThatAllowDeferral.includes(status)
}

filters.getCanReinstate = status => {
  let statusesThatAllowReinstating = [
    'Deferred'
  ]
  return statusesThatAllowReinstating.includes(status)
}


// -------------------------------------------------------------------
// keep the following line to return your filters to the app
// -------------------------------------------------------------------
exports.filters = filters

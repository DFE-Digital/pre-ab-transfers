// -------------------------------------------------------------------
// Imports and setup
// -------------------------------------------------------------------

// Leave this filters line
var filters = {}

filters.displayNumberOfWords = (data, numberOfWords) => {
  const htmlTagOpenings = /<(ol|ul|b|i|u|div|li)>/g
  const htmlTagClosings = /<\/(ol|ul|b|i|u|div|li)>/g

  const splitData = data.split(' ')
  const dataToDisplay = splitData.slice(0, numberOfWords)

  let tagsToClose = []
  dataToDisplay.forEach(word => {
    const openingTags = word.match(htmlTagOpenings)
    const closingTags = word.match(htmlTagClosings)

    if (openingTags) {
      openingTags.forEach(tag => tagsToClose.push(tag))
    }

    if (closingTags) {
      const tagsToRemove = closingTags.map(tag => tag.replace('/', ''))
      tagsToRemove.forEach(tagToRemove => {
        const indexToReplace = tagsToClose.findIndex((tag) => tag === tagToRemove)
        tagsToClose.splice(indexToReplace, 1)
      })
    }
  })

  tagsToClose = tagsToClose.map(tag => tag.replace('<', '</'))
  return dataToDisplay.join(' ') + '...' + tagsToClose.join('')
}

exports.filters = filters

var filters = {}

filters.getProjectById = (projects, id) => {
  return projects.find(project => parseInt(project.id) === parseInt(id))
}

exports.filters = filters

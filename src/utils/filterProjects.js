export function filterProjects(projects, category) {
  if (category === 'All') return projects
  return projects.filter(p => p.category.includes(category))
}

import { render, screen } from '@testing-library/react'
import { ProjectCard } from '../src/components/ProjectCard'

const mockProject = {
  id: 'test-project',
  title: 'Test Project',
  tagline: 'A test tagline.',
  category: ['AI/Automation'],
  outcome: 'Saved 10 hours per week.',
  skills: ['n8n', 'OpenAI API'],
  link: 'https://example.com',
  image: '/assets/projects/test.png',
  featured: false,
  colSpan: 1,
}

describe('ProjectCard', () => {
  it('renders the project title', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('A test tagline.')).toBeInTheDocument()
  })

  it('renders skill tags', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('n8n')).toBeInTheDocument()
    expect(screen.getByText('OpenAI API')).toBeInTheDocument()
  })

  it('renders the first category as a label', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('AI/Automation')).toBeInTheDocument()
  })
})

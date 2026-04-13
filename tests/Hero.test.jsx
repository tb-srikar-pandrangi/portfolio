import { render, screen } from '@testing-library/react'
import { Hero } from '../src/components/Hero'

describe('Hero', () => {
  it('renders the h1 headline', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the AI agents outcome badge', () => {
    render(<Hero />)
    expect(screen.getByText(/AI agents/i)).toBeInTheDocument()
  })

  it('renders the View Work link', () => {
    render(<Hero />)
    expect(screen.getByText(/View Work/i)).toBeInTheDocument()
  })

  it('renders the Download Resume link', () => {
    render(<Hero />)
    expect(screen.getByText(/Download Resume/i)).toBeInTheDocument()
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import RankGroup from './RankGroup'

describe('RankGroup', () => {
  it('renders the rank name as a heading', () => {
    render(
      <RankGroup rankName="Officers">
        <div>child</div>
      </RankGroup>,
    )
    expect(screen.getByRole('heading', { name: /Officers/i })).toBeInTheDocument()
  })

  it('renders children inside the component', () => {
    render(
      <RankGroup rankName="Officers">
        <div data-testid="child-1">Alice</div>
        <div data-testid="child-2">Bob</div>
      </RankGroup>,
    )
    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
  })

  it('does not render when children is null', () => {
    const { container } = render(
      <RankGroup rankName="Officers">{null}</RankGroup>,
    )
    expect(container.innerHTML).toBe('')
  })

  it('does not render when children is empty', () => {
    const { container } = render(
      <RankGroup rankName="Officers">{undefined}</RankGroup>,
    )
    expect(container.innerHTML).toBe('')
  })

  it('applies opacity style when opacity prop is provided', () => {
    render(
      <RankGroup rankName="Officers" opacity={0.4}>
        <div>child</div>
      </RankGroup>,
    )
    const wrapper = screen.getByRole('heading', { name: /Officers/i }).closest('[style]')
    expect(wrapper).toHaveStyle({ opacity: '0.4' })
  })

  it('defaults opacity to 1 when not provided', () => {
    render(
      <RankGroup rankName="Officers">
        <div>child</div>
      </RankGroup>,
    )
    const wrapper = screen.getByRole('heading', { name: /Officers/i }).closest('[style]')
    expect(wrapper).toHaveStyle({ opacity: '1' })
  })

  it('contains ornamental diamond character', () => {
    render(
      <RankGroup rankName="Officers">
        <div>child</div>
      </RankGroup>,
    )
    const diamonds = screen.getAllByText('♦')
    expect(diamonds.length).toBeGreaterThanOrEqual(1)
  })

  it('rank name uses uppercase styling', () => {
    render(
      <RankGroup rankName="Officers">
        <div>child</div>
      </RankGroup>,
    )
    const heading = screen.getByRole('heading', { name: /Officers/i })
    expect(heading.className).toMatch(/uppercase/)
  })
})

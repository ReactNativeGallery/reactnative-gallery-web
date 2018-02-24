import React, { PureComponent } from 'react'

class CircularProgressBar extends PureComponent {
  render() {
    // Size of the enclosing square
    const sqSize = this.props.sqSize
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (this.props.sqSize - this.props.strokeWidth) / 2
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * this.props.percentage / 100

    return (
      <svg width={this.props.sqSize} height={this.props.sqSize} viewBox={viewBox}>
        <circle
          style={{ fill: 'none' }}
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`}
        />
        <circle
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${this.props.sqSize / 2} ${this.props.sqSize / 2})`}
          stroke="#00a651"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            stroke: '#00a651',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            fill: 'none'
          }}
        />
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          style={{
            fontSize: '3em',
            fontWeight: 'bold',
            fill: '#333'
          }}
        >
          {`${this.props.percentage}%`}
        </text>
      </svg>
    )
  }
}

CircularProgressBar.defaultProps = {
  sqSize: 200,
  percentage: 0,
  strokeWidth: 10
}

export default CircularProgressBar

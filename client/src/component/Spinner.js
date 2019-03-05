import React, { Component } from 'react';

export default class Spinner extends Component {
  render() {
    return (
        <div 
            style={{ 
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                justifyContent: 'center', alignItems: 'center', zIndex: 9999,
                backgroundColor: '#000', opacity: .3, display: 'flex' 
            }}
        >
            <div className="spinner-border text-primary" />
        </div> 
    )
  }
}

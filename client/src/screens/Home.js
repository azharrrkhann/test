import React, { Component } from 'react';
import $ from 'jquery'

export default class Home extends Component {
  state = {
    name: ''
  }
  onMouseDown = name => this.setState({ name }, () => $('#myModal').modal('toggle'))
  render() {
    return (
        <div className="container"  style={{ display: 'flex', flexDirection: 'row' }}>

            <div className="card" style={{ width: '300px', margin: '10px' }}>
              <img className="card-img-top" alt="My Awesome akshdjkashd" src="https://www.w3schools.com/bootstrap4/img_avatar5.png" style={{ width: '100%' }} />
              <div className="card-body">
                <h4 className="card-title">Scarlet Johnshon</h4>
                <p className="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                <button type="button" className="btn btn-primary" onMouseDown={() => this.onMouseDown('Scarlet Johnshon')}>
                  See Profile
                </button>
              </div>
            </div>

            <div className="card" style={{ width: '300px', margin: '10px' }}>
              <img className="card-img-top" alt="My Awesome" src="https://www.w3schools.com/bootstrap4/img_avatar1.png" style={{ width: '100%' }} />
              <div className="card-body">
                <h4 className="card-title">John Snow</h4>
                <p className="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                <button type="button" className="btn btn-primary" onMouseDown={() => this.onMouseDown('John Snow')}>
                  See Profile
                </button>
              </div>
            </div>

            <div className="card" style={{ width: '300px', margin: '10px' }}>
              <img className="card-img-top" alt="My Awesome akshdjkashd" src="https://www.w3schools.com/bootstrap4/img_avatar5.png" style={{ width: '100%' }} />
              <div className="card-body">
                <h4 className="card-title">Lady Gaga</h4>
                <p className="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                <button type="button" className="btn btn-primary" onMouseDown={() => this.onMouseDown('Lady Gaga')}>
                  See Profile
                </button>
              </div>
            </div>

            <div className="modal fade" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">

                  <div className="modal-header">
                    <h4 className="modal-title">User Detail</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>

                  <div className="modal-body">
                    <h4 className="card-title">{ this.state.name || '' }</h4>
                    <p className="card-text">
                      A user is a person who utilizes a computer or network service. 
                      Users of computer systems and software products generally lack the technical expertise required to fully understand how they work
                    </p>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                  </div>

                </div>
              </div>
            </div>
        </div>
    );
  }
}

import React from 'react';
import ReactDOM from 'react-dom';
import D3Container from './react/components/d3_chart_react';
import ControlPanel from './react/components/control_panel';
import Modal from 'react-modal';
import ModalParams from './react/util/modal_params';
import WelcomeMessage from './react/components/welcome_message';
import AceEditor from './react/components/ace_editor';
import Footer from './react/components/footer';

const App = React.createClass({
  getInitialState() {
    return {modalIsOpen: true };
  },

  componentWillMount(){
    const appElement = document.getElementById('content');
    Modal.setAppElement(appElement);
  },


  openModal() {
    this.setState({modalIsOpen: true});
  },

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  },

  closeModal() {
    this.setState({modalIsOpen: false});
  },

  render(){
    return(
      <div className='app-container'>
        <div className="welcome-modal-div">
          <Modal
            key="reservationModal"
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={ModalParams.modalStyle}
            id="welcome-modal">
            <WelcomeMessage closeModal={this.closeModal}/>
          </Modal>
        </div>
        <div className='upper-container' >
          <AceEditor n={1}/>
          <D3Container />
          <AceEditor n={2} />
        </div>
        <div className='lower-container'>
          <ControlPanel openInstructionModal={this.openModal}/>
        </div>
        <Footer/>
      </div>
    );
  }

});

document.addEventListener('DOMContentLoaded', () =>{
  const content = document.getElementById('content');
  ReactDOM.render(<App />, content);
});

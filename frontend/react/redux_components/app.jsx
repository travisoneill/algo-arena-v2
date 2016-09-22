import React from 'react';
import D3Container from './d3/d3_chart_container';
import ControlPanelContainer from './control_panel/control_panel_container';
import Modal from 'react-modal';
import { ModalParams } from '../redux_util/modal_params';
import WelcomeMessageContainer from './welcome_message/welcome_message_container';
import AceEditor from './ace_editor';
import { Footer } from './footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(){
    this.setState({modalIsOpen: true});
  }

  afterOpenModal(){
    this.refs.subtitle.style.color = "#f00";
  }

  closeModal(){
    this.setState({modalIsOpen: false});
  }

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
            <WelcomeMessageContainer closeModal={this.closeModal}/>
          </Modal>
        </div>
        <div className='upper-container' >
          <AceEditor n={1}/>
          <D3Container />
          <AceEditor n={2} />
        </div>
        <div className='lower-container'>
          <ControlPanelContainer openInstructionModal={this.openModal}/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;

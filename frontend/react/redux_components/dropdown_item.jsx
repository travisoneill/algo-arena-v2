import React  from 'react';

class DropdownItem extends React.Component{
  constructor(props){
    super(props);
    this.setLanguage = this.setLanguage.bind(this);
    this.disabledCheck = this.disabledCheck.bind(this);
  }

  setLanguage(){
    this.props.action(this.props.language);
    this.props.update();
  }

  disabledCheck(){
    return this.props.language === this.props.selected;
  }

  render(){
    return (
      <button
        className='language-button'
        id={this.props.language}
        onClick={this.setLanguage}
        disabled={this.disabledCheck()}>
          {this.props.txt}
      </button>
    );
  }
}

export default DropdownItem;

import * as React from 'react';


const LanguageDropdown = React.createClass({

  getInitialState(){
    return {disabled: 'javascript',}
  },

  updateSelection(){
    const el = document.getElementById(`editor-${this.props.n}`);
    const selected = ace.edit(el).getSession().getMode().$id.match(/\w*$/)[0];
    this.setState({disabled: selected})
  },

  render(){
    const languages = ['javascript', 'python'];
    const lang_text = ['JavaScript', 'Python'];
    const act = this.props.action;
    const el = document.getElementById(`editor-${this.props.n}`);
    const selected = ace.edit(el).getSession().getMode().$id.match(/\w*$/)[0];
    const updater = () => {this.updateSelection()}
    const dropdown = languages.map( (lang, idx) => {
      return <DropdownItem
        language={lang}
        key={idx}
        txt={lang_text[idx]}
        action={act}
        selected={this.state.disabled}
        update={updater}/>
    });


    return(
      <div className='language-selectors'>
        <div className='language-button'></div>
        {dropdown}
      </div>
    );
  }
});

const DropdownItem = React.createClass({

  // getInitialState(){
  //   const disabled = this.props.language === 'javascript'
  //   return { disabled: disabled }
  // },

  setLanguage(){
    this.props.action(this.props.language);
    this.props.update();
  },

  disabledCheck(){
    return this.props.language === this.props.selected;
  },

  render(){
    return(
      <button
        className='language-button'
        id={this.props.language}
        onClick={this.setLanguage}
        disabled={this.disabledCheck()}>
        {this.props.txt}
      </button>
    );
  }
});



module.exports = LanguageDropdown;

import React from 'react';
import DropdownItem from './dropdown_item';
import * as Selectors from '../redux_util/select_handlers';

class LanguageDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: 'javascript'
    };
  }

  updateSelection(){
    const el = document.getElementById(`editor-${this.props.n}`);
    const selected = ace.edit(el).getSession().getMode().$id.match(/\w*$/)[0];
    Selectors.selectButton(this.props.n);
    Selectors.focusPane(this.props.n);
    this.setState({disabled: selected});
  }

  render(){
    const languages = ['javascript', 'python', 'ruby'];
    const langText = ['JavaScript', 'Python', 'Ruby'];
    const act = this.props.action;
    const el = document.getElementById(`editor-${this.props.n}`);
    const selected = ace.edit(el).getSession().getMode().$id.match(/\w*$/)[0];
    const updater = () => this.updateSelection();
    const dropdown = languages.map( (lang, idx) => (
      <DropdownItem
        language={lang}
        key={idx}
        txt={langText[idx]}
        action={act}
        selected={this.state.disabled}
        update={updater}/>
    ));


    return(
      <div className='language-selectors'>
        <div className='language-button'></div>
        {dropdown}
      </div>
    );
  }
}


export default LanguageDropdown;

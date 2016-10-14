import React from 'react';
import LanguageDropdown from './language_dropdown';
import * as Selectors from '../redux_util/select_handlers';

const DefaultText = 'function name(array){\n\n//enter your code here\n//you may change the function name \n//but otherwise do not modify the first line\n\n}';
const DefaultText2 = 'function name(array){\n\n}';


class AceEditor extends React.Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount(){
    this.editor = ace.edit(`editor-${this.props.n}`);
    this.editor.setTheme("ace/theme/twilight");
    this.editor.getSession().setMode("ace/mode/javascript");
    this.editor.getSession().on('change', this.handleChange);
    this.editor.$blockScrolling = Infinity; //disables deprecated functionality
    this.editor.setValue(DefaultText);
  }

  handleChange(e){
    let val = this.editor.getSession().getValue();
  }

  handleFocus(event){
    const side = event.target.parentElement.id.slice(-1);
    Selectors.selectButton(side);
  }

  render(){
    const setLanguage = (lang) => {
      this.editor.getSession().setMode(`ace/mode/${lang}`);
    };
    return(
      <div className='editor-container'>
        <LanguageDropdown action={setLanguage} n={this.props.n} />
        <div className='editor' id={`editor-${this.props.n}`} onFocus={this.handleFocus}/>
      </div>
    );
  }
}

export default AceEditor;

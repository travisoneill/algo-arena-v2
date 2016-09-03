module.exports = {
  modalStyle: {
    overlay : {
      position          : 'fixed',
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(255, 255, 255, 0.75)',
      zIndex            : 1000
    },
    content : {
      position                   : 'absolute',
      top                        : '10%',
      left                       : '50%',
      right                      : 'auto',
      bottom                     : 'auto',
      border                     : '2px solid #6a51a3',
      background                 : '#fff',
      overflow                   : 'auto',
      WebkitOverflowScrolling    : 'touch',
      borderRadius               : '10px',
      outline                    : 'none',
      padding                    : '20px',
      transform                  : 'translateX(-50%) translateY(-5%)',
      minWidth                   : '80%',
      maxHeight                  : '80%'

    }
  }
};

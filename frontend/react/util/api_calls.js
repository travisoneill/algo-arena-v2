module.exports = {

  sendMethods(data, action, errorAction){
    $.ajax({
      url: "api/algos",
      type: "POST",
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data),
      dataType: 'json',
      success(resp){
        action(resp);
      },
      error(resp){
        errorAction(resp);
      }
    });
  }
};

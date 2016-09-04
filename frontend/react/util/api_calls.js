module.exports = {

  sendMethods(data, action, errorAction){
    $.ajax({
      url: "api/algos",
      type: "POST",
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data),
      dataType: 'json',
      success(resp){
        console.log(resp);
        action(resp);
      },
      error(resp){
        errorAction(resp);
      }
    });
  }
};

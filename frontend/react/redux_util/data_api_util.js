export const postData = (data, success, error) => {
  data.timestamps = [{frontend_out: new Date()}];
  data.errors = {};
  console.log(data);
  $.ajax({
    url: 'api/algos',
    type: 'POST',
    contentType: 'application/json; charset=UTF-8',
    data: JSON.stringify(data),
    dataType: 'json',
    success,
    error
  });
};

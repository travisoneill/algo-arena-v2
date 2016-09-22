export const postData = (data, success, error) => {
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

function setTplToHtml (tpl, data) {
  return tpl.replace(new RegExp(/{{(.*?)}}/, 'gim'), function (node, key) {
    return data[key];
  })
}

/**
 * 需结合jquery
 * @param {*} opt 
 */
function ajaxReturn(opt) {
  $.ajax({
    url: opt.url,
    timeout: 100000,
    type: 'POST',
    dataType: 'JSON',
    data: opt.data,
    success: opt.success,
    error: opt.error
  });
}
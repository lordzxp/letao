/**
 * Created by zxp on 2018/5/14.
 */
function getSearch(key) {
  var search = location.search;
  search = search.slice(1);
  var arr = search.split('&');
  var obj = {};
  arr.forEach(function (item, index) {
    var temparr = item.split('=');
      obj[temparr[0]] = temparr[1];
  })
  return obj[key];
}

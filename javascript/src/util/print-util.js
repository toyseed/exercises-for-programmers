function rpad(src, pad, length) {
  if (src.length > length) {
    return src;
  }

  while (src.length < length) {
    src += pad;
  }

  return src;
}

// 이름 짓기 너무 어렵다.
function printTable(data) {
  let columns = [];

  for (let column in data[0]) {
    if (data[0].hasOwnProperty(column))
      columns.push({ name: column, length: column.length });
  }

  // find max length
  for (let each of data) {
    for (let column of columns) {
      if (column.length < each[column.name].length) {
        column.length = each[column.name].length;
      }
    }
  }

  // print title
  let head = '';
  let divider = '';
  for (let column of columns) {
    head += rpad(column.name, ' ', column.length + 1);
    divider += rpad('', '-', column.length + 1);
  }
  console.log(head);
  console.log(divider);

  // print data
  for (let each of data) {
    let row = '';
    for (let column of columns) {
      row += rpad(each[column.name], ' ', column.length + 1);
    }
    console.log(row);
  }
}

module.exports = {
  printTable
};

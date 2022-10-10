const range = document.getElementById("range");



range.addEventListener("input", (e) => {
  let Ivalue = +e.target.value;
  const label = e.target.nextElementSibling;
  const range_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +range_width.substring(0, range_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;

  label.innerHTML = '$' + Ivalue;

});

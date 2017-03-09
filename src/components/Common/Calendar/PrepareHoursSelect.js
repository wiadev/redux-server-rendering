
export default function prepareHoursSelect() {
  let selectOptions = {};
  let hours;
  let minutes;

  for (let i = 0; i <= 24; i += 0.5) {
    hours = Math.floor(i);
    hours = hours < 10 ? '0' + hours : hours;
    if (i == 24)
      hours = 11;
    else
      hours = hours > 12 ? hours - 12 : hours;
    if (i == 24)
      minutes = 59;
    else
      minutes = i % 1 === 0 ? '00' : '30';
    selectOptions['h_' + i] = hours + ':' + minutes + ' ' + (i < 12 ? 'AM' : 'PM');
  }

  return selectOptions;
}

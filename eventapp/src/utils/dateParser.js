const months = ['JAN', 'FEB','MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const getShortDateTime = (fulldate) => {
  let d = new Date(fulldate);
  let dateTime = {};
  
  dateTime.date = `${days[d.getDay() - 1]},${months[d.getMonth()+1]} ${d.getFullYear()}`;

  return dateTime;
};

export const getShortDate = (date) => {
  let d = new Date(date).toLocaleDateString()
  return d;
}

export const getUtcDate = (date) => {
  const d = new Date(date);
  return d.toUTCString()
};
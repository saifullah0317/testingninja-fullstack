export function convertDateFormat(mongodbDateFormat) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let year = mongodbDateFormat.slice(0, 4);
  let month = months[Number(mongodbDateFormat.slice(5, 7)) - 1];
  let date = mongodbDateFormat.slice(8, 10);
  return month + " " + date + ", " + year;
}

export function convertEmails(respondentsList, maxLength) {
  let emails = [];
  respondentsList.map((respondent) => {
    emails.push(respondent.email);
  });
  let emailsString = "", index = 0;
  while (index < emails.length) {
    emailsString += '"' + emails[index] + '", ';
    if (emailsString.length > maxLength) {
      emailsString = emailsString.slice(0, maxLength);
      break;
    }
    index++;
  }
  emailsString += "...";
  return emailsString;
}
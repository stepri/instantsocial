Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});


UI.registerHelper("formatDate", function(datetime, format) {
	var DateFormats = {
		short: "DD MMMM - YYYY",
		long: "dddd DD.MM.YYYY HH:mm"
	};

  if (moment) {
    // can use other formats like 'lll' too
    format = DateFormats[format] || format;
		if (format == 'ago') {
			return moment(datetime).fromNow();
		} else {
			return moment(datetime).format(format);
		}

  }
  else {
    return datetime;
  }
});

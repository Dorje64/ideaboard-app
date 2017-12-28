// import React, { Component } from 'react'
import moment from 'moment'
import MomentTimeZone from 'moment-timezone';

export default class DateTimeHelper{
  constructor(date, timezone = MomentTimeZone.tz.guess(), format = moment.HTML5_FMT.DATETIME_LOCAL_MS ){
    this.date = date;
    this.timezone = timezone;
    this.format = format;
  }

  formatToLocalZone(){
    return MomentTimeZone.tz(this.date, this.timezone);
  }

  timeAgo(){
    const formated_date = this.formatToLocalZone();
    return moment(formated_date,this.format).fromNow();
  }

}

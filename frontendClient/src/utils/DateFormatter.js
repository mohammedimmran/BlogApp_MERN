import React from 'react'
import  Moment from 'react-moment'
// import { date } from 'yup/lib/locale'
const DateFormatter = ({ date}) => {
    // console.log(date)
  return (
  <Moment format= 'DD MMM YYYY' withTitle>
    {date}
   
  </Moment>
  )
}

export default DateFormatter
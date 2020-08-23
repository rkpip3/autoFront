/**
 *
 * You can write your JS code here, DO NOT touch the default style file
 * because it will make it harder for you to update.
 *
 */

"use strict";
// date with time get function
// $(function() {
//     $('input[name="datetimes"]').daterangepicker({
//       timePicker: true,
//       startDate: moment().startOf('hour'),
//       endDate: moment().startOf('hour').add(32, 'hour'),
//       locale: {
//         format: 'M/DD hh:mm A'
//       }
//     });
// });

// Date get FUnctioin
$(function() {
    $('input[name="datetimes"]').daterangepicker({
      opens: 'left'
    }, function(start, end, label) {
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
}); 
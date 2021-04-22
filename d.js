const moment = require('moment');

let offset = 12;
let months = [];
while (offset > 0) {
    months.push(
        moment()
            .add(offset--, "month")
            .format("MMMM")
    );
}


console.log(months)

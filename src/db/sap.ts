// THIS FILE WAS CREATED FOR TESTING SOLUTIONS FOR 
// THE RECURRING AND SIMILAR USERS PROBLEMS.


import TransactionRepository from '../repositories/transaction.repo';
import * as _ from 'lodash';


var hrstart = process.hrtime();
(async () => {
    const id = '415';
    const MAX_TREND_SIMILARITIES = 2; // SHOULD BE 3 THO.
    const repo = new TransactionRepository();


    const userTrends = ['isusu & contribution', 'travel'];

    const users = await repo.getSimilarUsers(id);

    // console.log(users);


    const similar: any[] = []
    for (const user of users) {
        // console.log(user)
        const intersection = _.intersection(userTrends, user.categories)
        if(intersection.length >= MAX_TREND_SIMILARITIES) similar.push(user.user_id)
    }

    console.log(similar)

    var hrend = process.hrtime(hrstart);
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
})()

// console.timeEnd('The End of The Fuction')
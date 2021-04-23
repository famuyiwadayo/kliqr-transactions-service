// THIS FILE WAS CREATED FOR TESTING SOLUTIONS FOR 
// THE RECURRING AND SIMILAR USERS PROBLEM.


import TransactionRepository from '../repositories/transaction.repo';


var hrstart = process.hrtime();
(async () => {
    const id = '415';
    const repo = new TransactionRepository();


    const userTrends = [ 'isusu & contribution', 'travel' ];

    const similarUserIds = await repo.getSimilarUsers(id, userTrends);

    console.log(similarUserIds);

    var hrend = process.hrtime(hrstart);
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
})()

// console.timeEnd('The End of The Fuction')
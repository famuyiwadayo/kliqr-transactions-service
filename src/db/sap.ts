import moment from 'moment';
import {query} from './db'

var hrstart = process.hrtime();
(async () => {
    const start_time =  Date.now()
    const oneYearData = await query(`
        SELECT category, TO_CHAR(date_time, 'month') AS "month"
        FROM transactions
        WHERE date_time >= NOW() - '1 YEAR'::INTERVAL
        AND user_id = $1
    `, [101]);

    let offset = 12;
    let months: string[] = [];
    while (offset > 0) {
        months.push(
            moment()
                .add(offset--, "month")
                .format("MMMM")
        );
    }

    const categories = (await query(
        `SELECT DISTINCT category, icon_url FROM transactions`
    )).rows;
    let w: any = {};
    categories.forEach((e) => {
        w[e.category] = 0;
    });
    const twelveMonthsData = JSON.parse(
        JSON.stringify(
            Array(12).fill({
                ...w,
            })
        )
    );
    ''.trim()
    oneYearData.rows.forEach((e, i) => {
        let x = 0;
        months.forEach((f, j) => {
            if ((e.month.toLowerCase()).trim() === f.toLowerCase()) {
                x = j;
                // console.log(j, f)
                return;
            }
        });
        categories.forEach((i) => {
            if (i.category === e.category) {
                twelveMonthsData[x][i.category]++;
            }
        });
    });

    let result: any = {};
    Object.keys(twelveMonthsData[0]).forEach((d) => {
        result[d] = {
            times: 0,
            total: 0,
        };
    });
    twelveMonthsData.forEach((e: any) => {
        categories.forEach((h) => {
            if (e[h.category] > 0) {
                result[h.category].total += e[h.category];
                result[h.category].times++;
            }
        });
    });
    let final = Object.keys(result).filter((g) => {
        if (result[g].times >= 7) {
            return g;
        }
    });
    let p = final.map(j => {
        let d ;
        categories.filter(g => {
            if (g.category === j){
                d = g
            }
        })
        return d
    })


    console.log(result)
    var hrend = process.hrtime(hrstart);
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
})()

// console.timeEnd('The End of The Fuction')
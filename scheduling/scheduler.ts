const onSchedule = (s, r) => {
    console.log(s, r)
}

let exports: any = {}

import { Period, User } from '../types.d'

// Schedule function to run on a weekly interval.

exports.scheduleWeekly = onSchedule(
    'every week 00:00',
    async (ev) => {
        // get users with weekly schedule task
        const weeklyUsers = await getUsersByPeriod(Period.weekly)

        // run job on each user
        weeklyUsers.forEach(runJob)
    }
)


const runJob = (user: User) => {
    // get user template

    // run the llm on their data

    // send email
}

const getUsersByPeriod = async (period: Period): Promise<User[]> => {
    const ref = collection(db, 'users')
    const q = query(ref, where('period', '==', period))

    let collection = []

    const snap = await getDocs(q)
    snap.forEach(doc => {
        collection.push(doc.data())
    })

    return collection
}

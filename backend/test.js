import sb from './libs/createClient.js'
import sbs from './libs/createAuth.js'
const data = async () => {
    const { data, error } = await sb.from('test').select('*')
    const d = data
    console.log(d)
}

const deleteUser = async () => {
    // const res = await sbs.auth.admin.listUsers()
    // const ids = res.data.users.map(user => user.id)
    // console.log()
    const id = 'f628ef98-cc89-4b72-9047-f38bde7a8632'
    const { data, error } = await sbs.auth.admin.deleteUser(id)
    console.log(data)
    if (error) {
        console.log(error)
    }

}
// deleteUser()
const checkUser = async () => {
    const res = await sb.auth.getUser('eyJhbGciOiJIUzI1NiIsImtpZCI6ImsrM1RaVW80OXJoUTAra3QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3hjZGJyb3h4eGJsbGJzb2l4c3BvLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJmNjI4ZWY5OC1jYzg5LTRiNzItOTA0Ny1mMzhiZGU3YTg2MzIiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzU1MjQxNjE0LCJpYXQiOjE3NTUyMzgwMTQsImVtYWlsIjoicmFkaGlrYWtsZ0BnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvdHAiLCJ0aW1lc3RhbXAiOjE3NTUyMzgwMTR9XSwic2Vzc2lvbl9pZCI6IjQyOWE0MTFlLWE2MjQtNDNkMi05NjIzLWRhZDU2ZGRjNTkwNCIsImlzX2Fub255bW91cyI6ZmFsc2V9.pfwFHkZh8kJwUyE6o2KRsTufHD2lp3Jcxdde9_yHPUg')

    console.log(res.data, res.error)
}

checkUser()

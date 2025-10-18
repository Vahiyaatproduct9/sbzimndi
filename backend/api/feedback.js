import sbs from '../libs/createClient.js'
import getUserfromAccessToken from './../functions/getUserfromAccessToken.js'
export default async ({ access_token, body, stars }) => {
  const { success, id } = await getUserfromAccessToken(access_token)
  const { error } = await sbs.from('feedback')
    .insert({
      user_id: success ? id : null,
      body,
      stars
    })
  if (!error) return {
    success: true,
    message: 'Feedback pushed.'
  }
  else return {
    success: false,
    message: 'Submission failed!'
  }
}


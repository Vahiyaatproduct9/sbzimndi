import path from './path'
interface notification {
  success: boolean;
  message: null | string;
  error: any;
}
export default async (props: {
  enabled: boolean;
  access_token: string;
}) => {
  console.log('Running toggleNOtification;.')
  const res = await fetch(`${path}/toggle-notification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      access_token: props.access_token ?? '',
      notification_on: props.enabled ?? true,
    })
  })
  const response: notification = await res.json()
  return response
}

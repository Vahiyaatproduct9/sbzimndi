import sb from '../libs/createClient.js'
import fuse from 'fuse.js'
export default async ({ latitude, longitude, query }) => {
  console.log({ latitude, longitude, query })
  const { data, error } = await sb.rpc('find_nearest_items', {
    p_latitude: latitude,
    p_longitude: longitude,
    p_limit_count: 100
  })
  if (data && !error) {
    const searchPlatform = new fuse(data, {
      includeScore: true,
      keys: [{
        name: 'name',
        weight: 4
      },
      {
        name: 'price',
        weight: 1
      },
      {
        name: 'expiry_date',
        weight: 2
      }]
    })
    const result = searchPlatform.search(query)
    console.log(result)
    return {
      result: result,
      error: null,
      message: null,
      success: true
    }
  } else {
    console.log('err ->', error)
    return {
      result: null,
      error,
      message: 'Internal Server Error.',
      success: true
    }
  }
}

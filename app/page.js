import restaurants from './data/restaurants.json'
import RestaurantDirectory from '@/components/RestaurantDirectory'

export const metadata = {
  title: 'Chicago Halal Restaurants | Every Zabihah Halal Spot, One Page',
  description: 'Search all Zabihah halal restaurants in Chicago and the suburbs by name or cuisine, all on one page.',
}

export default function Home() {
  return <RestaurantDirectory restaurants={restaurants} />
}

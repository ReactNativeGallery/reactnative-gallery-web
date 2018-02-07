import { Heart } from 'react-feather'
import Clickable from '../Clickable'

const Love = props => (
  <Clickable onClick={() => console.log('click')}>
    <Heart {...props} />
  </Clickable>
)

export default Love

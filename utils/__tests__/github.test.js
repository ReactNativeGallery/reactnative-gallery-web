import { getFullNameFormUrl } from '../github'
import pkg from '../../package.json'

it('should get fullname from github url', () => {
  const fullname = 'ReactNativeGallery/reactnative-gallery-web'
  expect(getFullNameFormUrl(pkg.repository.url)).toBe(fullname)
})

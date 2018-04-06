/* eslint
  no-unused-expressions: 0,
  import/no-webpack-loader-syntax: 0,
  import/no-unresolved: 0
*/

import { injectGlobal } from 'styled-components'

import normalize from '!!raw-loader!normalize.css/normalize.css'

injectGlobal`${normalize}`

injectGlobal`
  body {
    margin: 0;
    background: #be93c5;
    background: -webkit-linear-gradient(to right, #7bc6cc, #be93c5);
    background: linear-gradient(to right, #7bc6cc, #be93c5);
    -webkit-overflow-scrolling: touch;
}`

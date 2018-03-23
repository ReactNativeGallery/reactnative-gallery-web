import styled from 'styled-components'

const Smartphone = styled.div`
  position: relative;
  padding: 65px 12px;
  background: rgba(49, 49, 49, 0.8);
  border-radius: 38px;
  box-shadow: inset 0 0 3px 0 rgb(79, 86, 95, 0.2);
  border: solid 1px rgb(79, 86, 95, 0.2);
  max-width: 275px;
  min-width: 170px;
  min-height: 250px;
  cursor: ${({ cursorPointer }) =>
    (cursorPointer ? 'pointer' : 'url(/static/images/play-circle.svg), auto;')};
`

export default Smartphone

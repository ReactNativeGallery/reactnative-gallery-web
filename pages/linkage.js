import React from 'react'

import { Check, Save } from 'react-feather'

import Wrapper from '../components/Wrapper'
import { renderIcon, Next } from '../components/Icon'
import Subtitle from '../components/Subtitle'
import { NumberItem, NumberList } from '../components/NumberList'

const Linkage = () => (
  <Wrapper footer>
    <Subtitle>Create gif from gfycat</Subtitle>

    <NumberList>
      <NumberItem focus onClick={() => {}}>
        {renderIcon(Check)} Check it
      </NumberItem>
      <Next />
      <NumberItem onClick={() => {}}>{renderIcon(Save)} Create it</NumberItem>
    </NumberList>
  </Wrapper>
)

Linkage.propTypes = {}

Linkage.defaultProps = {}

Linkage.getInitialProps = () => ({})

// [
//   'FlatThickArkshell',
//   'ThatSlimyBeardedcollie',
//   'DimwittedUnrealisticChrysalis',
//   'AstonishingKnobbyDutchsmoushond',
//   'SmoggyWetCicada',
//   'AlarmedCapitalBoubou',
//   'HandsomeInnocentAnura',
//   'IlliterateSecondDassie',
//   'TemptingTimelyBeauceron'
// ]
export default Linkage

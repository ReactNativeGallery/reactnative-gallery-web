#!/usr/bin/env node
/* eslint no-console: 0 */
const { createGifAsync } = require('../utils/uploadFile')

// FlatThickArkshell,ThatSlimyBeardedcollie,DimwittedUnrealisticChrysalis,
// AstonishingKnobbyDutchsmoushond,SmoggyWetCicada,AlarmedCapitalBoubou,
// HandsomeInnocentAnura,IlliterateSecondDassie,TemptingTimelyBeauceron

const [_, __, gifIds, base] = process.argv;
(async () => {
  try {
    console.log(_, '\r\n', '\r\n', __, '\r\n')
    if (!gifIds) {
      console.warn('No gifs found in command arguments')
      return
    }
    const ids = gifIds.split(',')
    const baseUrl = base || 'http://localhost:3000'
    const response = await Promise.all(ids.map(id => createGifAsync(id, baseUrl)))
    console.log(`create all gifs: ${gifIds} succeeded`, response)
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
})()

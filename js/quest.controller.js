'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)

function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {
  // TODO: hide the game-start section - DONE
  $('.game-start').hide()
  renderQuest()
  // TODO: show the quest section - DONE
  $('.quest').show()
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update - DONE
  // its text by the currQuest text - DONE
  $('.quest h2').text(getQuestText())
}

function onUserResponse(ev) {
  // console.log('ev', ev)
  const res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.quest h2').text('Yes, I knew it!')
      // alert('Yes, I knew it!')
      // TODO: improve UX
    } else {
      // $('.quest h2').text('I dont know...teach me!')
      alert('I dont know...teach me!')
      // TODO: hide and show new-quest section - DONE
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    // TODO: update the lastRes global var - DONE
    gLastRes = res
    moveToNextQuest(gLastRes)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()
  // TODO: Get the inputs' values -DONE
  // TODO: Call the service addGuess -DONE
  addGuess(newQuest, newGuess, gLastRes)
  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.game-start').show()
  createQuestsTree()
  gLastRes = null
}


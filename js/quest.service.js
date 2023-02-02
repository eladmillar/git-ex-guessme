'use strict'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null
const STORAGE_KEY = 'questDB'

function createQuestsTree() {
  gQuestsTree = loadFromStorage(STORAGE_KEY, gQuestsTree)
  // console.log('DB' ,loadFromStorage(STORAGE_KEY, gQuestsTree));
  if (!gQuestsTree) {
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
  }
  gCurrQuest = gQuestsTree
  gPrevQuest = null
  console.log('gQuestsTree', gQuestsTree)
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function getQuestText() {
  return gCurrQuest.txt
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // TODO: update the gPrevQuest, gCurrQuest global vars - DONE
  gPrevQuest = gCurrQuest
  gCurrQuest = gCurrQuest[res]
  console.log('gCurrQuest', gCurrQuest)
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the questions tree - DONE
  var newQuest = createQuest(newQuestTxt)
  var newGuess = createQuest(newGuessTxt)
  newQuest.yes = newGuess
  gPrevQuest[lastRes] = newQuest
  newQuest.no = gCurrQuest
  saveToStorage(STORAGE_KEY, gQuestsTree)
}

function getCurrQuest() {
  return gCurrQuest
}

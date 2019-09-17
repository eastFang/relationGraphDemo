function onScale(scale) {
  const newZoom = cy.zoom() + scale
  cy.zoom(newZoom)
}
function dowloadImg(base64) {
  const [contentType, encodeStr] = base64.split(';base64,')
  const decodeStr = atob(encodeStr) // 解码base64字符串
  const decodeStrLength = decodeStr.length
  const uInt8Array = new Uint8Array(decodeStrLength)
  for(let i = 0; i < decodeStrLength; i++) {
    uInt8Array[i]  = decodeStr.charCodeAt(i) //
  }
  const blob = new Blob([uInt8Array], { //
    type: contentType
  })
  const aEl = document.createElement('a')
  // const evt = document.createEvent('HTMLEvents')
  // evt.initEvent('click', true, true)
  aEl.download = '你好.png'
  const imgSrc = URL.createObjectURL(blob)
  aEl.href = imgSrc
  aEl.click()
  URL.revokeObjectURL(imgSrc)
}
function onExport() {
  const png64 = cy.png()
  dowloadImg(png64)
}
function highlight(node)  {
  cy.collection('node')
    .removeClass('node__focus')
    .addClass('opacity')
    .lock()
  cy.collection('edge')
    .removeClass('edge__active')
    .addClass('opacity')
    .lock()
  node.addClass('node__focus')
    .removeClass('opacity')
    .unlock()
  const neiEdges = node.neighborhood('edge')
  neiEdges
    .addClass('edge__active')
    .removeClass('opacity')
  neiEdges.connectedNodes()
    .removeClass('opacity')
    .unlock()
}
function cancelHighlight() {
  cy.collection('node')
    .removeClass('node__focus')
    .removeClass('opacity')
  cy
    .collection('edge')
    .removeClass('edge__active')
    .removeClass('opacity')
}

const dialogEl = document.querySelector('.dialog')
let _isFocus = false
cy.on('tap mouseover mouseout', 'node', function(el) {
  const { type, target } = el
  if (type === 'tap') {
    const { text } = target._private.data
    dialogEl.classList.add('visible')
    dialogEl.innerHTML = text
    highlight(target)
    _isFocus = true
  } else if (type === 'mouseover') {
    if (_isFocus) return
    highlight(target)
  } else if (type === 'mouseout') {
    if (_isFocus) return
    cancelHighlight()
  }
})
cy.on('mouseover mouseout', 'edge', function(el) {
  const { target, type } = el
  if (_isFocus) return // focus的情况不考虑鼠标的交互

  if (type === 'mouseover') {
    target.addClass('edge__active')
  } else if (type === 'mouseout') {
    target.removeClass('edge__active')
  }
})
cy.on('tap', function(el) {
  if (el.target === cy) {
    dialogEl.classList.remove('visible')
    cancelHighlight()
    _isFocus = false
  }
})
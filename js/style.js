function isPerson(el) {
  return el.data('type') === 'person'
}

const style = [
  {
    selector: 'node',
    style: {
      width: 50,
      height: 50,
      'text-wrap': 'ellipsis',
      'text-max-width': 50,
      'font-size': 12,
      'background-color': '#4FA2F0',
      'label': (el) => {
        return isPerson(el) ? '' : el.data('text')
      },
      'text-valign': 'center',
      'background-image': (el) => {
        return isPerson(el) ? el.data('avatar') : 'none'
      },
      'background-fit': 'cover',
      'border-color': (el) => {
        return isPerson(el) ? 'red' : '#4FA2F0'
      },
      'border-width': 2,
      'overlay-color': '#fff', // 覆盖点击的默认灰色样式
    }
  },
  {
    selector: 'edge',
    style: {
      width: 0.3,
      'curve-style': 'bezier', // required, 否则箭头无法显示; 且一般设置未bezier，如果节点有两根线的话，label不会重叠
      label: function(el) {
        return el.data('text')
      },
      'line-style': 'solid',
      'line-color': '#999999',
      'target-arrow-color': '#999999',
      'target-arrow-shape': 'triangle-backcurve',
      'font-size': 12,
      'overlay-color': '#fff'
    }
  },
  {
    selector: '.edge__active',
    style: {
      width: 1,
      'line-color': '#4FA2F0',
      'target-arrow-color': '#4FA2F0'
    }
  },
  {
    selector: '.node__focus',
    style: {
      'border-width': 10,
      'border-opacity': 0.5
    }
  },
  {
    selector: '.opacity',
    style: {
      opacity: .2
    }
  }
]
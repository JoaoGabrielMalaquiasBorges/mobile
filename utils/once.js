var _ = require('lodash')
var once

export default function runOnce (callback) {
  if (once === undefined) {
    once = _.once(callback)
  }
  once()
}

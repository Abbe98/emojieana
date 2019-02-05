'use strict';

class ImageIncomplete {
  constructor(key) {
    this.key = key;
  }

  getKey() {
    return this.key;
  }

  toString() {
    return 'Tyvärr! 🤔😞😬 Kanske hittar du något på https://digitaltmuseum.se?';
  }
}

module.exports = ImageIncomplete;

(function () {
    'use strict';

    window.app = {
        ninja: null,
        bodyPart: {},
        ninjaAnimTimer: null,
        tappyTappyCounter: null,

        init: function () {
            this.loadNinja(function () {
                this.toggleFrame('#keyboard-type', true);
                window.setTimeout(this.tappyTappy.bind(this), 1000);

                this.ninja.addEventListener('click', this.tappyTappy.bind(this, null));
            }.bind(this));
        },

        loadNinja: function (callback) {
            var ninja = document.querySelector('.ninja');

            ninja.addEventListener('load', function () {
                this.ninja = ninja.contentDocument.getElementById('ninja-dojo');

                if (callback) {
                    callback();
                }
            }.bind(this));
        },

        tappyTappy: function (frameNum) {
            if (!frameNum || frameNum > 3) {
                frameNum = 1;
            }

            if (this.tappyTappyCounter === null) {
                this.tappyTappyCounter = 12;
            }

            this.tappyTappyCounter--;

            var wait = 150;

            clearTimeout(this.ninjaAnimTimer);
            this.ninjaAnimTimer = setTimeout(function () {
                switch (frameNum) {
                    case 1:
                        this.toggleFrame('#frame-1', true);
                        this.toggleFrame('#frame-2', false);
                        this.toggleFrame('#frame-3', false);
                        break;

                    case 2:
                        this.toggleFrame('#frame-1', false);
                        this.toggleFrame('#frame-2', true);
                        this.toggleFrame('#frame-3', false);
                        break;

                    case 3:
                        this.toggleFrame('#frame-1', false);
                        this.toggleFrame('#frame-2', false);
                        this.toggleFrame('#frame-3', true);
                        break;
                }

                if (this.tappyTappyCounter > 0) {
                    this.tappyTappy(frameNum + 1);
                }
                else {
                    this.tappyTappyCounter = null;
                }
            }.bind(this), wait);
        },

        toggleFrame: function (frame, state) {
            if (!this.bodyPart[frame]) {
                this.bodyPart[frame] = this.ninja.querySelector(frame);
            }

            this.bodyPart[frame].style.display = state ? 'inline' : 'none';
        }
    };
})();
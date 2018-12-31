(function(window, videojs) {
  var defaults = {
      image_url: null,
      click_url:     '',
      start_time: null,
      end_time: null,
      opacity: 0.7,
      height: '100%',
      width: '100%'
  },
  imgModal = function(options) {
    var player = this,
        settings = videojs.mergeOptions(defaults, options),
        showingImg = false;

    if (settings.start_time === null)
      settings.start_time = 0;

    overlay = {
      checkEndTime: function() {
        if (settings.end_time === null) {
          settings.end_time = player.duration() + 1;
        }
      },
      checkModal: function() {
        if ((player.currentTime() >= settings.start_time) && (player.currentTime() < settings.end_time)) {
          modal.showImg();
        } else {
          modal.hideImg();
        }
      },
      showImg: function() {
        if (showingImg) {
          return;
        }
        showingImage = true;
        var holderDiv = document.createElement('a');
        holderDiv.id = 'vjs-img-modal-holder';
        holderDiv.style.height = settings.height;
        holderDiv.style.width = settings.width;

        if (settings.image_url) {
            var modalImg = document.createElement('img');
            modalImg.src = settings.image_url;
            modalImg.style.opacity = settings.opacity;
            holderDiv.appendChild(modalImg);
        }

        holderDiv.onclick = function() {
          player.pause();
          window.open(settings.click_url);
        };

        player.el().appendChild(holderDiv);
      },
      hideImage: function() {
        if (!showingImage) {
          return;
        }
        showingImage = false;
        player.el().removeChild(document.getElementById('vjs-img-modal-holder'));
      }
    };

    player.on('timeupdate', modal.checkModal);
    player.on('loadedmetadata', modal.checkEndTime);
  };

  videojs.plugin('imgmodal', imgmodal);
}(window, window.videojs));

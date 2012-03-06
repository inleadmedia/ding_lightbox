(function ($) {
  // Extract image name from src.
  Drupal.extract_image_hash = function(e) {
    var link = e.attr('src');
    var image = link.split('/');
    var file = image[image.length - 1];
    
    return file;
  };

  Drupal.init_lightbox = function() {
    var module_path = Drupal.settings.basePath + Drupal.settings.ding_lightbox.module_path;
    
    $('.ting-cover a.ding-lightbox').lightBox({
      imageLoading : module_path + '/images/lightbox-ico-loading.gif',
      imageBtnClose : module_path + '/images/lightbox-btn-close.gif',
      imageBtnPrev : module_path + '/images/lightbox-btn-prev.gif',
      imageBtnNext : module_path + '/images/lightbox-btn-next.gif',
      containerResizeSpeed : 350
    });
  }

  // Occur on page load.
  Drupal.behaviors.ding_lightbox = {
    attach : function(context) {
      var enabled_on_item_page = Drupal.settings.ding_lightbox.visible_on_landing_page;
      var enabled_on_search_page = Drupal.settings.ding_lightbox.visible_on_search_page;
      var image_path = Drupal.settings.ding_lightbox.image_cache_path;

      if ((enabled_on_item_page && $('body').hasClass('page-ting-object')) || (enabled_on_search_page && $('body').hasClass('page-search-ting'))) {
        $('.ting-cover img', context).each(function() {
          var file = Drupal.extract_image_hash($(this));

          $(this).wrap('<a class="ding-lightbox" href="' + image_path + '/' + file + '" />');
        });

        Drupal.init_lightbox();

        // For dynamic elements
        $('.ting-cover img', context).live('click', function() {
          var parent = $(this).parent();
          var file = Drupal.extract_image_hash($(this));

          // Wrap the image with lightbox link, and simulate a click -
          // this time, on a lightbox active element.
          if (!parent.hasClass('ding-lightbox')) {
            $(this).wrap('<a class="ding-lightbox" href="' + image_path + '/' + file + '" />');
            Drupal.init_lightbox();
            $(this).parent().click();
          }

        });
      }
    }
  }
})(jQuery);

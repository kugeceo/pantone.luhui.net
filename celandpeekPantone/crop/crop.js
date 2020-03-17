var resizeableImage = function(image_target) {
    var $container,
    orig_src = new Image(),
    image_target = $(image_target).get(0),
    event_state = {},
    constrain = false,
    min_width = 60,
    min_height = 60,
    max_width = 800,
    max_height = 900,
    resize_canvas = document.createElement('canvas');
    
    init = function(){
 
        // Create a new image with a copy of the original src
        // When resizing, we will always use this original copy as the base
        orig_src.src=image_target.src;
 
        // Add resize handles
        $(image_target).wrap('<div class="resize-container"></div>')
        .before('<span class="resize-handle resize-handle-nw"></span>')
        .before('<span class="resize-handle resize-handle-ne"></span>')
        .after('<span class="resize-handle resize-handle-se"></span>')
        .after('<span class="resize-handle resize-handle-sw"></span>');
 
        // Get a variable for the container
        $container =  $(image_target).parent('.resize-container');
 
        // Add events
        $container.on('mousedown', '.resize-handle', startResize);
    };
    init();

};
 
resizeableImage($('.resize-image'));

 

 
    
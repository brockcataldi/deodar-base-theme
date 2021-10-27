<?php 
add_action('admin_init', function(){
	add_editor_style('editor-style.css');
});

add_action('after_setup_theme', function(){
    // Testing to run a basic walker
    // error_log( var_export( class_exists( 'Basic_Walker' ), true ) );
});

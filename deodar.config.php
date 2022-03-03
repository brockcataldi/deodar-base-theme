<?php
define( 'CHILD_THEME', 'deodar-theme' );

define( 'DEODAR_CONFIGURATION', array(
    ///
    /// Block Loading
    ///
    'blocks' => array(
        'acf'   => 'auto',
        'core'  => 'auto'
    ),
    ///
    /// External Stylesheets
    ///
    'styles' => array(
        array( 
            'name' => 'google-fonts', 
            'uri'  => 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap' 
        ),
        array( 
            'name' => 'index', 
            'file' => 'build/index.build.css' 
        ),
        array( 
            'name' => 'single-post', 
            'template' => 'single-post.php',
            'file' => 'build/single-post.build.css' 
        ),
    ),
    ///
    /// External JavaScript Files
    ///
    'scripts' => array(
        array(
            'name'  => 'gsap',
            'uri'   => 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js'
        ),
        array( 
            'name' => 'components', 
            'file' => 'build/index.build.js',
            'dependencies' => array('jquery', 'gsap')
        ),
    ),
    ///
    /// Theme Supports
    ///
    'supports'   => array(
        'title-tag',
	'editor-styles',
        'html5' => array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'style', 'script' ),
        'post-thumbnails' => array('post', 'page'),
    ),
    ///
    /// Navigation Menus
    ///
    'menus' => array(
        'primary_menu' => __( 'Primary Menu', CHILD_THEME ),
        'footer_menu' => __( 'Footer Menu', CHILD_THEME ),
    ),
    ///
    /// Sidebars
    ///
    'sidebars' => array(
        array(
            'before_widget' => '<div class="widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<h2 class="widgettitle">',
            'after_title' => '</h2>',        
            'name'=> __( 'My sidebar 1', CHILD_THEME ),  
        )
    ),
    ///
    /// Post Type Loading
    ///
    'post-types' => 'auto',
    ///
    /// Taxonomies Loading
    ///
    'taxonomies' => 'auto',
    ///
    /// Customizations
    ///
    'customizations' => 'auto',
    ///
    /// Bundles
    ///
    'bundles' => 'auto'
) );

<?php

define('SPRUCE_CONFIGURATION', array(
    'blocks' => array(
        'acf'   => 'auto',
        'core'  => 'auto'
    ),
    'styles' => array(
        array( 
            'name' => 'google-fonts', 
            'uri'  => 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap' 
        ),
        array( 
            'name' => 'components', 
            'file' => 'build/components.css' 
        ),
    )
));
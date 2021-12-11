<?php 

class Header_Customization extends Deodar_Customization{
	
	public function __construct(){
		parent::__construct();
	}

	public function register($wp_customize){
		$wp_customize->add_section('section_header',array(
		    'title' =>  __('Header'),
		    'priority'=> 118,
		    'panel' => '',
        ));
        
        $wp_customize->add_setting(
			'settings_header_logo',
			array(
				'default'    => '',
				'type'       => 'theme_mod',
				'capability' => 'edit_theme_options',
			)
	    );

		$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 
			'settings_header_logo', 
			array(
				'label'    => __( 'Header Logo'),
				'description' => 'Logo to be displayed in the header',
				'settings' => 'settings_header_logo',
				'priority' => 10,
				'section'  => 'section_header',
			)
		) );

    }
}
<?php 

class Disable_Comments_Bundle extends Deodar_Bundle {

	public function __construct(){
		parent::__construct();
	}

	public function register(){
		add_action( 'admin_init', array($this, 'disable_post_types_support'));
        add_action( 'admin_menu', array($this, 'disable_admin_menu') );
        add_action( 'admin_init', array($this, 'disable_menu_redirect') );
        add_action( 'admin_init', array($this, 'disable_dashboard') );
        add_action( 'init', array($this, 'disable_admin_bar') );
        add_filter( 'comments_open', array($this, 'disable_status'), 20, 2 );
        add_filter( 'pings_open', array($this, 'disable_status'), 20, 2 );
        add_filter( 'comments_array', array($this, 'hide_existing_comments') , 10, 2 );        
	}


	public function disable_post_types_support(){
		$post_types = get_post_types();
	    foreach ($post_types as $post_type) {
	        if (post_type_supports($post_type, 'comments')) {
	            remove_post_type_support($post_type, 'comments');
	            remove_post_type_support($post_type, 'trackbacks');
	        }
	    }
	}

	public function disable_status(){
		return false;
	}

	public function hide_existing_comments($comments){
		return array();
	}

	public function disable_admin_bar(){
 		if (is_admin_bar_showing()) {
        	remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
   		}
	}

	public function disable_admin_menu(){
		remove_menu_page('edit-comments.php');
	}

	public function disable_dashboard(){
 		remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
	}

	public function disable_menu_redirect(){
		global $pagenow;
	    if ($pagenow === 'edit-comments.php') {
	        wp_redirect(admin_url());
	        exit;
	    }
	}
}



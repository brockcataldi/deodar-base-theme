<?php 

class Enable_Svg_Bundle extends Deodar_Bundle {

	public function __construct(){
		parent::__construct();
	}

	public function register(){
		add_filter('upload_mimes', array($this, 'mimes'));
		add_action('admin_head', array($this, 'thumbnails'));
	}	

	public function mimes($mimes){
		$mimes['svg'] = 'image/svg+xml';
		return $mimes;		
	}

	public function thumbnails($mimes){
		?>
		<style>
			td.media-icon img[src$=".svg"],
			img[src$=".svg"].attachment-post-thumbnail {
				width: 100% !important;
				height: auto !important;
			}
		</style>
		<?php
	}

}	



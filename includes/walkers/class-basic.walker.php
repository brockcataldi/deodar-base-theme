<?php 

class Basic_Walker extends Walker_Nav_Menu{

    public function start_lvl( &$output, $depth = 0, $args = null ) {
        $output .= '<ul>';
    }

	public function end_lvl( &$output, $depth = 0, $args = null ) {
        $output .= '</ul>';
    }

	public function start_el(&$output, $item, $depth = 0, $args=array(), $id = 0) {
		$output.= '<li>'.esc_attr($item->title);
	}

    public function end_el( &$output, $item, $depth = 0, $args = null ) {
		$output .= '</li>';
    }
}
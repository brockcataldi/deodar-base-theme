<?php 

class Genre_Taxonomy extends Deodar_Taxonomy{

    public static string $taxon = 'genre';

	public static $post_types = array( 'book' );

    public static function arguments(){
        return array(
            'labels'            => self::create_labels('Genre', 'Genres'),
            'hierarchical'      => true,
            'public'            => true,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => self::$taxon ),
            'show_in_rest'      => true
        );
    }
}
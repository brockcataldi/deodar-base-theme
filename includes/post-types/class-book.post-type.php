<?php 

class Book_Post_Type extends Deodar_Post_Type{

    public static string $post_type = 'book';

    public static function arguments(){
        return array(
            'labels'             => self::create_labels('Book', 'Books'),
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => array( 'slug' => self::$post_type ),
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => null,
            'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ),
        );
    }
}
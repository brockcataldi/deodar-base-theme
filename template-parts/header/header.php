<header class="header">
    <nav>
        <?php wp_nav_menu( array( 
            'menu' => 'primary_menu',
            'walker' => new Basic_Walker() 
		) ); ?>
    </nav>
</header>
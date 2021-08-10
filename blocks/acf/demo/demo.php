<?php 
    $body = get_field('body');
?>
<div class="demo">
    <h1>Hi I'm the demo block, my body is: <?php echo esc_html( $body ); ?></h1>
    <InnerBlocks/>
</div>
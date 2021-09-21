( ($, gsap) => {

    class Demo{
        constructor($block){
            this.$block = $block;

            this.bind();
        }

        bind(){
            this.$block.on('mouseover', this.onMouseOver.bind(this));
            this.$block.on('mouseout', this.onMouseOut.bind(this));
        }

        onMouseOver(event){
            gsap.to(this.$block, {
                backgroundColor:'#00FF00'
            });
        }

        onMouseOut(event){
            gsap.to(this.$block, {
                backgroundColor:'#FFA500'
            });
        }

        static initialize($block){
            new Demo($block);
            new Demo2($block);
        }
    }

    $( function(){
        Demo.initialize( $(".demo") );
    } );

} )
(jQuery, gsap);
$(window).load(function(){
		var current = 0,
			html = '',
			TIMEOUT = 6000,
			artsModel = {arts:[{title:'Wearing Blanket',artist:'Navajo',image:'img/picture3.jpg',},{title:'The Ameya',artist:'Robert Frederick Blum',image:'img/picture4.jpg',},{title:'Cremorne Gardens',artist:'John William Casilear',image:'img/picture5.jpg',},{title:'Lake George',artist:'James McNeill Whistler',image:'img/picture6.jpg',}]},
			currentPage, nextPage, timeoutID, i, l, node, arts, pages;

		var ART_TEMPLATE = [
			"<div class='img' style='background-image: url(#{IMAGE})'>",
				"<div class='info-container-wrapper #{SLIDE_IN}'>",
					"<div class='info-container'>",
						"<div class='info'>",
							"<div class='title'>#{TITLE}</div>",
							"<div class='artist'>by #{ARTIST}</div>",
						"</div>",
						"<div class='qr-code'><a href='http://artifyteam.github.io/artify/'><img src='img/qr_code_artify.png' rel='nofollow' alt='qr code'></a></div>",
					"</div>",
				"</div>",
			"</div>",
		].join( '' );

		arts = artsModel.arts;
		for ( i = -1, l = arts.length; ++i < l; ) {
			node = arts[ i ];

			html += ART_TEMPLATE.replace( '#{SLIDE_IN}', i == 0 ? 'slide-in' : '' )
				.replace( '#{IMAGE}', node.image )
				.replace( '#{TITLE}', node.title )
				.replace( '#{ARTIST}', node.artist )
		}

		$( '#container' ).html( html );
		pages = $( '#container .img' );

		var handler2=function(){
			currentPage= pages.eq(current);

			if (current >= pages.length-1)
				current=0;
			else
				current=current+1;
			nextPage = pages.eq(current);
			currentPage.find( '.info-container-wrapper' ).removeClass( 'slide-in' );
			currentPage.fadeTo('slow',0.8,function(){
				nextPage.fadeIn('slow',function(){
					nextPage.css("opacity",1);
					nextPage.find( '.info-container-wrapper' ).addClass( 'slide-in' );
					currentPage.hide();
					currentPage.css("opacity",1);
				});
			});
			timeoutID=setTimeout(function(){
				handler2();
			}, TIMEOUT );
		}

		timeoutID=setTimeout(function(){
			handler2();
			}, TIMEOUT );
});
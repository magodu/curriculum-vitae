/* global angular, $, google */

'use strict';

var directives = angular.module('directives', []);

/**
 * parallax directive. Logic to move a parallax effect into an angular directive
   Example:
   <div parallax id="wrapper">
*/
directives.directive('parallax', ['$window', '$timeout', function($window, $timeout) {

    return {
        restrict: 'A',
        link: function(scope) {
            var windowWidth = $(window).width(),
                MOBILE_WIDTH = 760,
                FixedHeader;

            function resetValues() {
                $('article').find('.progress-bar').css('width', '0%');
            }

            function skillsHandler() {
                var section3Top = $('#skills').offset().top - 1,
                    $article = $('.skills-section').find('article').find('.progress-bar');

                if ($(document).scrollTop() >= section3Top) {
                    $article.each(function() {
                        $(this).css('width', $(this).find('span').text());
                    });
                }
            }

            function languagesHandler() {
                var section6Top = $('#languages').offset().top - 1,
                    $article = $('.languages-section').find('article').find('.progress-bar');
                if ($(document).scrollTop() >= section6Top) {
                    $article.each(function() {
                        $(this).css('width', $(this).find('span').text());
                    });
                }
            }

            function photographHandler(scroll) {
                var $photograph = $('#photograph'),
                    $document = $(document),
                    startPhotograph = $('#experience').offset().top / 5,
                    endPhotograph = $('#skills').offset().top - ($('#experience').offset().top / 2);

                if (windowWidth <= MOBILE_WIDTH) {
                    return;
                }

                if (scroll && $photograph.hasClass('photograph')) {
                    $photograph.css('visibility', 'visible');
                    $photograph.removeClass('photograph');
                    $photograph.addClass('photographFixed');

                } else if (!scroll && $photograph.hasClass('photographFixed')) {
                    $photograph.removeClass('photographFixed');
                    $photograph.addClass('photograph');
                }

                if (($document.scrollTop() >= startPhotograph) && ($document.scrollTop() <= endPhotograph)) {
                    $('#photograph img').addClass('fade-in');
                    $('#photograph img').removeClass('fade-out');
                } else {
                    $('#photograph img').addClass('fade-out');
                    $('#photograph img').removeClass('fade-in');
                }
            }

            /* Set navigation dots to an active state as the user scrolls */
            function redrawDotNav() {
                var section1Top = 0;
                // The top of each section is offset by half the distance to the previous section.
                var section2Top = $('#experience').offset().top - 1;
                var section3Top = $('#skills').offset().top - 1;
                var section4Top = $('#training').offset().top - 1;
                var section5Top = $('#languages').offset().top - 1;
                var section6Top = $('#contact').offset().top - 1;

                $('nav#primary a').removeClass('active');
                $('#main-nav li').removeClass('current_page_item');

                if ($(document).scrollTop() >= section1Top && $(document).scrollTop() <= section1Top) {
                    $('nav#primary a.main').addClass('active');
                    $('#main-nav li.menu-item-main').addClass('current_page_item');
                } else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top) {
                    $('nav#primary a.experience').addClass('active');
                    $('#main-nav li.menu-item-experience').addClass('current_page_item');
                } else if ($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top) {
                    $('nav#primary a.skills').addClass('active');
                    $('#main-nav li.menu-item-skills').addClass('current_page_item');
                } else if ($(document).scrollTop() >= section4Top && $(document).scrollTop() < section5Top) {
                    $('nav#primary a.training').addClass('active');
                    $('#main-nav li.menu-item-training').addClass('current_page_item');
                } else if ($(document).scrollTop() >= section5Top && $(document).scrollTop() < section6Top) {
                    $('nav#primary a.languages').addClass('active');
                    $('#main-nav li.menu-item-languages').addClass('current_page_item');
                } else if ($(document).scrollTop() >= section6Top) {
                    $('nav#primary a.contact').addClass('active');
                    $('#main-nav li.menu-item-contact').addClass('current_page_item');
                }

            }

            function _onScroll() {
                redrawDotNav();
            }

            // Fixed Header
            FixedHeader = {
                init: function() {
                    this.headerHeight = $('#header hgroup').outerHeight() - $('#nav-bar').outerHeight();
                    if ($('body').hasClass('ie')) {
                        $('html, body').addClass('iefix');
                    }

                    $(window).scroll(this.activate);

                },
                activate: function() {
                    if ($(window).scrollTop() <= FixedHeader.headerHeight) {
                        FixedHeader.scrollDisabled();
                    } else {
                        FixedHeader.scrollEnabled();
                    }
                },
                scrollDisabled: function() {
                    $('#nav-bar').removeClass('fixed-nav-bar');
                    $('body').removeClass('fixed-header-on');
                    photographHandler(false);
                    resetValues();

                },
                scrollEnabled: function() {
                    $('#nav-bar').addClass('fixed-nav-bar');
                    $('body').addClass('fixed-header-on');
                    photographHandler(true);
                    skillsHandler();
                    languagesHandler();
                }
            };

            function hideMenu() {
                if (windowWidth > MOBILE_WIDTH) {
                    return;
                }

                $('#main-nav').fadeOut();
                $('#wrapper #top-nav').hide();
                $('body #menu-icon').removeClass('active');
            }


            /* Main Menu */
            $('body #menu-icon').click(function(event) {
                event.preventDefault();
                $('#main-nav').fadeToggle();
                $('#wrapper #top-nav').hide();
                $(this).toggleClass('active');
            });

            /* Next/prev and primary nav btn click handlers */
            $('a.main').click(function() {
                hideMenu();
                $('html, body').animate({
                    scrollTop: 0
                }, 1000);
                return false;
            });
            $('a.experience').click(function() {
                hideMenu();
                $('html, body').animate({
                    scrollTop: $('#experience').offset().top
                }, 1000);
                return false;
            });
            $('a.skills').click(function() {
                hideMenu();
                $('html, body').animate({
                    scrollTop: $('#skills').offset().top
                }, 1000);
                return false;
            });
            $('a.training').click(function() {
                hideMenu();
                $('html, body').animate({
                    scrollTop: $('#training').offset().top
                }, 1000);
                return false;
            });
            $('a.languages').click(function() {
                hideMenu();
                $('html, body').animate({
                    scrollTop: $('#languages').offset().top
                }, 1000);
                return false;
            });
            $('a.contact').click(function() {
                hideMenu();
                $('html, body').animate({
                    scrollTop: $('#contact').offset().top
                }, 1000);
                return false;
            });

            /* Show/hide dot lav labels on hover */
            $('nav#primary a').hover(
                function() {
                    $(this).prev('h1').show();
                },
                function() {
                    $(this).prev('h1').hide();
                }
            );

            /* Scroll event handler */
            $window.addEventListener('scroll', _onScroll);

            function init() {
                redrawDotNav();
                FixedHeader.init();
            }

            scope.$watch('cvData', function(value) {
                if (value) {
                    init();
                }
            }, true);

        }
    };
}]);



/**
 * background directive. It Preloads a background image
   Just call to the directive in the HTML tag you want to show a background
*/

directives.directive('background', function ($q) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            var urlBase = '../../images/',
                images = ['background1.jpg', 'background2.png', 'background4.jpg'],
                num = Math.floor(Math.random() * images.length),
                randomImage = images[num],
                backgroundImage = urlBase + randomImage;
            
            scope.preload = function(url) {
                var deffered = $q.defer(),
                    image = new Image();

                image.src = url;

                if (image.complete) {

                    deffered.resolve();

                } else {

                    image.addEventListener('load', function() {
                        deffered.resolve();
                    });

                    image.addEventListener('error', function() {
                        deffered.reject();
                    });
                }

                return deffered.promise;
            };

            scope.preload(backgroundImage).then(function() {
                element.css({
                    'background-image': 'url("' + backgroundImage + '")'
                });
                element.fadeIn();
            });
        }
    };
});




/**
 * include templates directive
   Example:
   <includetmpl template="page.html"></includetmpl>
   <includetmpl template="page.html" ng-show="true"></includetmpl>
*/

directives.directive('includetmpl', ['$compile', '$http', '$templateCache', function($compile, $http, $templateCache) {

    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var tmpl,
                tplURL = attrs.template,
                templateLoader = $http.get(tplURL, {
                    cache: $templateCache
                });

            templateLoader.success(function(html) {
                tmpl = $compile(html)(scope);
                element.empty();
                element.append(tmpl);
            });
        }
    };
}]);





/**
 * googleMaps directive
   optional map-options param: object to extend the maps options. See all availble options in https://developers.google.com/maps/documentation/javascript/
   optional markers param: objects array with markers info. Every object has this properties
        {
            city: '',
            desc: '',
            lat: 41.3133735,     // Latitude
            long: -71.0571571    // Longitude
        }
   Example:
   <div google-maps map-options="mapOptions" markers="cities"></div>
*/
directives.directive('googleMaps', ['$parse', function($parse) {

    return {
        restrict: 'A',
        template: '<div id="map"></div>',
        link: function(scope, element, attrs) {
            var i,
                cities = $parse(attrs.markers)(scope) || [],
                mapOptions = $parse(attrs.mapOptions)(scope) || {},
                mapOptionsDefaults = {
                    zoom: 1,
                    center: new google.maps.LatLng(40.0000, -66.0000), //39.4107137,-66.6334351,4.75z
                    mapTypeId: google.maps.MapTypeId.TERRAIN,
                    streetViewControl: false,
                    mapTypeControl: false
                },
                markers = [],
                infoWindow = new google.maps.InfoWindow();

            angular.extend(mapOptionsDefaults, mapOptions);

            scope.map = new google.maps.Map(document.getElementById('map'), mapOptionsDefaults);

            scope.openInfoWindow = function(e, selectedMarker) {
                e.preventDefault();
                google.maps.event.trigger(selectedMarker, 'click');
            };

            function createMarker(info) {
                var marker = new google.maps.Marker({
                    map: scope.map,
                    position: new google.maps.LatLng(info.lat, info.long),
                    title: info.city
                });
                marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

                google.maps.event.addListener(marker, 'click', function() {
                    infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                    infoWindow.open(scope.map, marker);
                });

                markers.push(marker);

            }

            for (i = 0; i < cities.length; i++) {
                createMarker(cities[i]);
            }
        }
    };
}]);




/**
 * animatedPhoneDiv directive
   
   Example:
   <div animated-phone-div></div>
*/
directives.directive('animatedPhoneDiv', ['$timeout', function($timeout) {

    return {
        restrict: 'A',
        template: '<div class="phone_container" id="flip-toggle">' +
            '<div class="phone_card">' +
            '<div class="front"></div>' +
            '<div class="back">' +
            '<div id="phone-wrapper"></div>' +
            '</div>' +
            '</div>' +
            '</div>',
        link: function(scope, element) {

            function addContent(model) {
                var content = '';

                angular.forEach(model.personalData.phones, function(phone) {
                    content += '<span>' + phone + '</span><br />';
                });

                element.find('#phone-wrapper').html(content);
            }


            function addAnimate() {
                $timeout(function() {
                    $('.phone-link').attr('onclick', 'document.querySelector("#flip-toggle").classList.toggle("hover")');
                }, 0);
            }

            scope.$watch('cvData', function(value) {
                if (value) {
                    addContent(value);
                    addAnimate();
                }
            }, true);

        }
    };
}]);

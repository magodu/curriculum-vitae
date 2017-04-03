'use strict';


/**
 * @ngdoc overview
 * @name cvparallaxAngularApp
 * @description
 * # cvparallaxAngularApp
 *
 * Main module of the application.
 */
 

/* App Module */
var marioApp = angular.module('cvparallaxAngularApp', ['directives', 'ui.bootstrap', 'ngRoute', 'ngSanitize', 'ngTouch', 'pascalprecht.translate']);


marioApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'ctrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});

//TODO: move to i18n and load dinamically
var translations_EN = {
    language_english: 'English',
    language_spanish: 'Spanish',
    buttonToTop: 'Back to top',
    menu: 'Menu',
    title_main: 'Main',
    title_experience: 'Experience',
    title_skills: 'Skills',
    title_training: 'Training',
    title_languages: 'Languages',
    title_contact: 'Contact',
    title_idiom: 'Idiom',
    linkDescription: 'View',
    education: 'Education',
    courses: 'Courses',
    maps: {
        boston: 'Currently working and living here.',
        madrid: 'Last city where I\'ve lived.'
    },
    dates: {
        today: 'Today',
        month: ' month',
        months: ' months',
        year: ' year',
        years: ' years'
    },
    contactTextWarning: 'Notice:',
    loading: 'Loading',
    loadingError: 'Error loading data has occurred. Try to reload the site.'
};


var translations_ES = {
    language_english: 'Inglés',
    language_spanish: 'Español',
    buttonToTop: 'Inicio',
    menu: 'Menú',
    title_main: 'Inicio',
    title_experience: 'Experiencia',
    title_skills: 'Conocimientos',
    title_training: 'Formación',
    title_languages: 'Idiomas',
    title_contact: 'Contacto',
    title_idiom: 'Idioma',
    linkDescription: 'Ver',
    education: 'Educación',
    courses: 'Cursos',
    maps: {
        boston: 'Actualmente trabajando y viviendo aquí.',
        madrid: 'última ciudad donde he vivido.'
    },
    dates: {
        today: 'Fecha actual',
        month: ' mes',
        months: ' meses',
        year: ' año',
        years: ' años'
    },
    contactTextWarning: 'Nota:',
    loading: 'Cargando',
    loadingError: 'Ha ocurrido un error al cargar los datos. Intente recargar la página.'
};




marioApp.config(function($translateProvider) {
    $translateProvider.translations('en', translations_EN)
    .translations('es', translations_ES);

    $translateProvider.preferredLanguage('en');

    $translateProvider.useSanitizeValueStrategy('escapeParameters');
});

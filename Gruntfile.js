/**
 * @author Zeeshan Raza
 * @since 22/11/2013
 * @version 1.0
 */

var projectScript = ["www/*.js"];

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                force: true
            },
            all: projectScript.concat(['Gruntfile.js'])
        },

        watch: {
            scripts: { // watch application and init script
                files: projectScript,
                tasks: ['jshint']
            },
            grunt: {
                files: 'Gruntfile.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', ['jshint', 'watch']);
};

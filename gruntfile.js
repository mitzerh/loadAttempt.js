module.exports = function(grunt) {

    var conf = grunt.file.readJSON('package.json');

    // comment banner
    var comment = [
        '/**',
        conf.name + ' v' + conf.version + ' | ' + grunt.template.today("yyyy-mm-dd"),
        conf.description + ' - ' + conf.repository.url,
        'by ' + conf.author,
        conf.license
    ].join('\n* ') + '\n**/';


    var config = {

        pkg: conf,

        clean: {
            'dest': 'js/*'
        },

        copy: {

            browser: {
                options: {
                    process: function(content, path) {
                        return [comment, content].join('\n');
                    }
                },
                src: 'src/loadAttempt.js',
                dest: 'js/loadAttempt.js'
            }

        },

        uglify: {

            original: {

                options: {
                    mangle: true,
                    banner: comment + '\n'
                },
                expand: true,
                files: {
                    'js/loadAttempt.min.js': 'js/loadAttempt.js'
                }

            }

        }

    };

    // load npm's
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', ['clean', 'copy', 'uglify']);

    grunt.initConfig(config);

};
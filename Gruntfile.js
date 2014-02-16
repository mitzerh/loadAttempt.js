module.exports = function(grunt) {

    var config = {

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            'dest': 'js/*'
        },

        copy: {

            browser: {
                options: {
                    process: function(content, path) {
                        var banner = '(function(){\n\n';

                        var footer = '\n\n' +
                            '/* attach to jQuery */\n' +
                            'if (typeof jQuery!=="undefined" && jQuery.extend && !jQuery.loadAttempt) {\n' +
                            '   jQuery.extend({ loadAttempt: LoadAttempt });\n' +
                            '} else if (!window.LoadAttempt) {\n' +
                            '   window.LoadAttempt = LoadAttempt;\n' +
                            '}\n\n' +
                            '}());'

                        return banner + content + footer;
                    }
                },
                src: 'src/loadAttempt.js',
                dest: 'js/loadAttempt.js'
            },

            node: {
                options: {
                    process: function(content, path) {
                        var banner = 'module.exports = function() {\n\n',
                            footer = '\n\nreturn LoadAttempt;\n};';

                        return banner + content + footer;
                    }
                },
                src: 'src/loadAttempt.js',
                dest: 'js/loadAttempt.node.js'
            },

            amd: {
                options: {
                    process: function(content, path) {
                        var banner = 'define("LoadAttempt", [], function() {\n\n',
                            footer = '\n\nreturn LoadAttempt;\n\n});';

                        return banner + content + footer;
                    }
                },
                src: 'src/loadAttempt.js',
                dest: 'js/loadAttempt.amd.js'
            }

        },

        uglify: {

            original: {

                options: {
                    mangle: true
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

//use grunt.cmd in windows

module.exports = function (grunt) {
    grunt.initConfig({
        injector: {
            options: { ignorePath: 'public/', addRootSlash: true },
            local_dependencies: {
                files: {
                    'src/views/user/home.html': ['bower.json', 'public/js/*.js', 'public/css/*.css','public/js/lib/ngwidgets/styles/**/*.css']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-injector');
    grunt.registerTask('default', 'injector');
};


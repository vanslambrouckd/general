module.exports = function(grunt){
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		coffee: {
			compile: {
				files: [{
					expand: true,
					cwd: 'js/',
					src: ['**/*.coffee.js'],
					dest: 'js/',
					ext: '.coffee.min.js',
					extDot: 'first' 
				}]
			}
		},
		watch: {
            coffee: {
                files: ['js/**/*.coffee.js'],
                tasks: ['coffee']
            }           			
        }
    });
	
	//uitvoeren via grunt dist (dist = taskname, daar wordt eerst de concat.dist code uitgevoerd, en dan uglify.dist)
	grunt.registerTask('default', ['coffee']);
	grunt.event.on('watch', function(action, filepath, target) {
		console.log('ja');
		grunt.task.run('coffee');
	});
};
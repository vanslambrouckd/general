module.exports = function(grunt){
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		htmlhint: {
			build: {
				options: {
					'tag-pair': true,
					'tagname-lowercase': true,
					'attr-lowercase': true,
					'attr-value-double-quotes': true,
					'doctype-first': true,
					'spec-char-escape': true,
					'id-unique': true,
					'head-script-disabled': true,
					'style-disabled': true
				},
				src: ['index.html']
			}
		},
		concat: {
			options: {
				separator: ';'				
			},
			dist: {
				src: ['build/**/*.js'],
				dest: 'tmp/build/js/main.js'
			}
		},
		uglify: {
			dist: {
				src: 'tmp/build/js/main.js',
      			dest: 'js/main.min.js',
			},
			test: {
				files: [{
						expand: true,
						cwd: 'build/',
						src: ['**/*.js'],
						dest: 'js/',
						ext: '.min.js',
						extDot: 'first' 
				}]
			}
		},
		clean: ["tmp/build"],
		coffee: {
			compile: {
				files: [{
					expand: true,
					cwd: 'build/',
					src: ['**/*.coffee.js'],
					dest: 'js/',
					ext: '.coffee.min.js',
					extDot: 'first' 
				}]
			}
		},
		watch: {
            html: {
                files: ['index.html'],
                tasks: ['htmlhint']
            },
            js: {
                files: ['build/**/*.js'],
                tasks: ['concat', 'uglify:dist']
            },
			/*
			uglify: {
				files: ['js/main.min.js'],
				tasks: ['uglify:dist']
			},
			*/
            coffee: {
                files: ['build/**/*.coffee.js'],
                tasks: ['coffee']
            }           			
        }
    });
	
	//uitvoeren via grunt dist (dist = taskname, daar wordt eerst de concat.dist code uitgevoerd, en dan uglify.dist)
	grunt.registerTask('dist', ['concat:dist', 'uglify:dist', 'coffee']);
	grunt.event.on('watch', function(action, filepath, target) {
		 grunt.task.run('concat:dist');
		 grunt.task.run('uglify:dist');	
		 grunt.task.run('clean');	
	});
	/*
    grunt.registerTask('default', ['concat']);
	grunt.registerTask('concat', 'My "foo" task.', function() {
	  // Enqueue "bar" and "baz" tasks, to run after "foo" finishes, in-order.
	  //grunt.task.run('concat');
	  console.log('done');
	  //grunt.task.run('uglify');
	});
	*/
};
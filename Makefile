all:
	browserify test.js > bundle.js;

o: all
	open test.html;

console.error("SyntaxError: {\n  \"name\": \"voutre.com\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"main\": \"index.js\",\n  \"scripts\": {\n    \"dev\": \"browser-sync start --files \"app/css/*.css\" --server \"app\",\n    \"dev_ol\": \"watchify src/index.js -d -o public/bundle.js -v\",\n    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\n  },\n  \"repository\": {\n    \"type\": \"git\",\n    \"url\": \"git+https://github.com/homfrie/voutre.git\"\n  },\n  \"author\": \"\",\n  \"license\": \"ISC\",\n  \"bugs\": {\n    \"url\": \"https://github.com/homfrie/voutre/issues\"\n  },\n  \"homepage\": \"https://github.com/homfrie/voutre#readme\",\n  \"dependencies\": {\n    \"fastclick\": \"^1.0.6\",\n    \"jquery\": \"^2.2.1\",\n    \"lodash\": \"^4.6.1\",\n    \"react\": \"^0.14.7\",\n    \"react-dom\": \"^0.14.7\"\n  },\n  \"devDependencies\": {\n    \"babel-preset-es2015\": \"^6.6.0\",\n    \"babel-preset-react\": \"^6.5.0\",\n    \"babelify\": \"^5.0.3\",\n    \"browser-sync\": \"^2.11.1\",\n    \"browserify\": \"^8.1.1\",\n    \"browserify-shim\": \"^3.8.2\",\n    \"browserify-swap\": \"^0.2.2\",\n    \"connect\": \"^3.4.1\",\n    \"exorcist\": \"^0.4.0\",\n    \"finalhandler\": \"^0.4.1\",\n    \"serve-static\": \"^1.10.2\",\n    \"watchify\": \"^2.2.1\"\n  },\n  \"browserify-shim\": {},\n  \"browserify-swap\": {\n    \"@packages\": [\n      \"underscore\"\n    ],\n    \"dist\": {\n      \"underscore.js$\": \"lodash\"\n    }\n  },\n  \"browserify\": {\n    \"transform\": [\n      [\n        \"babelify\",\n        {\n          \"presets\": [\n            \"es2015\",\n            \"react\"\n          ]\n        }\n      ],\n      \"browserify-swap\",\n      \"browserify-shim\"\n    ]\n  }\n}\n : Unexpected token a");
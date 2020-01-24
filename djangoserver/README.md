This provide server, with no-cache policy to prevent browser cache our scripts.
this way edited script will loaded instantly without having to open browser inspector & specify its disable cache

these script can be loaded instantly on content_script.js, so that you won't need server. at the cost of the need to reload the chrome extension everytime script is edited


server is using django. conda environment is available at environment.yaml
run:

`conda env create`

or if you are using your already installed python3
`pip install django`



your script goes in `static` folder

for extra, this also host the example page. http://127.0.0.1:8012/example

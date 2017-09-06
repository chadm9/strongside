var casper = require('casper').create({
    pageSettings: {
        loadImages:  false,
        loadPlugins: false
    }
});

casper.start();

casper.thenOpen('https://the-strongside.com/weeklywod/', function () {
    this.echo(this.getTitle());
    if (this.exists('div.sidebar-wod')) {
        //this.echo('success');
        var wodLinks = this.getElementsAttribute('a.sidebar-readmore', 'href');

        for(var i = 0; i < wodLinks.length; i++){

            casper.thenOpen(wodLinks[i], function () {

                if (this.exists('div.entry-content')) {
                    var title = this.getTitle();
                    var wod = this.getHTML('div.entry-content');

                    console.log(title);
                    console.log(wod);

                    casper.thenOpen('http://wchadmckee.com:4050/setWODs', {

                        method: 'POST',
                        data: {
                            'Title': title,
                            'WOD': wod,
                        }
                    });

                }

            })
        }
    }
    // else{
    //    this.echo('failure')
    // }

});

casper.run();

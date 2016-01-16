//LA COLLECTION
var DuoCollection = Backbone.Collection.extend({

    model: Duo,

    url: "http://dcamilleri.com/wsf/api",

    parse: function(response) {
        return response.results;
    },

    sync: function(method, model, options) {
        var that = this;
        var params = _.extend({
            type: 'GET',
            dataType: 'jsonp',
            url: that.url,
            processData: false
        }, options);

        return $.ajax(params);

        // Il faut installer un serveur avec httpserver -> extension npm
        // Là on est sur une piste pour récupérer le Json
    }

});

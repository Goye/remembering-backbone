
var Backbone = require('backbone');

/**
 * Example Backbone Colletion
 */
var CollectionTest = Backbone.Collection.extend({
	url: '',
	function: function(){
		/** Do something when you did the request */
	},
	parse: function(response){
		/** Return the specific value of the object  */
		return response.data;
	},
});

/**
 * Example Backbone View using render
 */
var CollectionRender = Backbone.View.extend({
	/** Render function */
	render: function(){
		var template = _.template($('#template').html());
		this.$el.html(template( { data: this.model.toJSON()} ));
		return this;
	}
});

/**
 * Example Backbone View with almost all options
 */
var CollectionView = Backbone.View.extend({
	initialize: function(){
		/** instantiate the collection */
		this.collection = new CollectionTest();
		/** recreate the render object */
		this.collection.bind("reset", this.render, this);
		this.collection.bind("destroy", this.render, this);
		/** fetch additional information */
		this.collection.fetch({
			type: 'POST',
			data: {
				sortby: sortby
			}
		});
		
	},
	/** Scope view */
	el: '#template-container',
	render: function(){
		/** TODO changes self to bind */
		var self = this;
		/** All the logic goes here :D, example backbone.ajax */
		Backbone.ajax({
      type: "POST",
      url: "",
      data: $('#data').serialize(),
      success: function(data){
      }
    });	
		/** Call the initialize */
		initialize();
		return this;
	},
	events: {
		/** put the events as click, mouseenter, mouseleave, etc */
		"click #getMore":"loadMore",
	},
	addOne: function(model){
    /** Example add only one item to the view */
		var collectionRender = new CollectionRender({model : model});
		this.container.append(collectionRender.render().el);
	},
	loadMore: function(event){
		/** Or use stopPropagation */
		event.preventDefault();
		/** More logic here */
		this.loadPage(data);
	},
	loadPage:function(page){

    /** Clear the collection and gets new data using fetch */
		collectionView.collection.clear();
		collectionView.collection.fetch({
			type: 'POST',
			form: this.options.el,
			data: data,
			success: function(){
				/** Logic on success */
			},	
		});
		
	},
});

var CollectionView = new CollectionView();
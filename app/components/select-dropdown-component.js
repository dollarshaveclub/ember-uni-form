
require('../mixins/responds-to-esc-keypress');

App.SelectDropdownComponent = Ember.Component.extend(App.RespondsToEscKeypress, {

  tagName: 'div',
  classNameBindings: [ 'active' ],
  attributeBindings:["data-select-dropdown"],
  "data-select-dropdown" : 1,

  click: function(e) {
    var value = $(e.target).attr('value');

    if (value) {
      this.unhighlightAll();
      this.set('selection', value);
      this.highlightSelected();
    }

    this.toggleProperty('active');
  },

  active: false,

  didInsertElement: function() {
    this.highlightSelected();
    this._super();
  },

  highlightSelected: function() {
    this.$().find('[value="'+ this.get('selection') +'"]').attr("selected", "selected");
  }.observes('value'),

  unhighlightAll: function() {
    this.$().find('[data-option-list] >').removeAttr("selected");
  }

});

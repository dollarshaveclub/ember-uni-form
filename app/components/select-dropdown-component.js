
require('../mixins/responds-to-esc-keypress');

App.SelectDropdownComponent = Ember.Component.extend(App.RespondsToEscKeypress, {

  tagName: 'div',
  classNameBindings: [ 'active' ],
  attributeBindings:["data-select-dropdown"],
  "data-select-dropdown" : 1,

  click: function (e) {
    var value       = $(e.target).attr('value');
    var isSelection = $(e.target).attr('data-selection');

    if ( value && !isSelection ) {
      this.unhighlightAll();
      this.set('selection', value);
      this.highlightSelected();
    }

    this.toggleProperty('active');
  },

  active: false,

  selectedOption: function () {
    var selection = this.get('selection');
    return (this.get('options').filter(function (option) {
      return (option.value.toString() === selection.toString()); // N.B. html element attribute values are strings
    }))[0];
  }.property('selection', 'options'),

  didInsertElement: function () {
    this._super();
    this.set('$list', this.$().find('[data-option-list]') );
    this.optionizeChildren();
    this.set('isRendered', 1);
  },

  length: function () {
    return this.get('$list').find('[data-option]').length;
  }.property('isRendered'),

  itemHeight: function () {
    return this.get('$list').find('[data-option]').first().outerHeight();
  }.property('isRendered'),

  listHeightMax: function () {
    return this.get('itemHeight') * this.get('length');
  }.property('itemHeight'),

  setListHeight: function () {
    var height = this.get('active') ? this.get('listHeightMax') : this.get('itemHeight');
    this.get('$list').height(height);
  }.observes('isRendered', 'active'),

  highlightSelected: function () {
    this.$().find('[value="'+ this.get('selection') +'"]').attr('selected', 'selected');
  }.observes('value', 'isRendered'),

  optionizeChildren: function () {
    this.get('$list').find('div').attr('data-option', 1);
  },

  unhighlightAll: function () {
    this.get('$list').find('[data-option]').removeAttr('selected');
  }.observes('isRendered')

});

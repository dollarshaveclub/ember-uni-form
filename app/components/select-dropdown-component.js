require('../mixins/responds-to-esc-keydown');

App.SelectDropdownComponent = Ember.Component.extend(App.RespondsToEscKeydown, {

  tagName: 'div',
  classNameBindings: [ 'active' ],
  attributeBindings:[ 'data-select-dropdown' ],
  'data-select-dropdown' : 1,

  trackedActions: {
    select: true
  },

  click: function (e) {
    var value       = $(e.target).attr('value');
    var isSelection = $(e.target).attr('data-selection');
    var isOverlay   = $(e.target).hasClass('select-dropdown-overlay');

    if (isOverlay) {
      return this.dismiss();
    }

    if (value && !isSelection) {
      this.send('select');
      this.unhighlightAll();
      this.set('selection', value);
    }

    this.toggleProperty('active');
  },

  active: false,

  selectedOption: function () {
    var selection = this.get('selection');
    return this.get('options').filter(function (option) {
      return option.value.toString() === selection.toString(); // N.B. html element attribute values are strings
    })[0];
  }.property('selection', 'options'),

  didInsertElement: function () {
    this._super();
    this.set('$list', this.$().find('[data-option-list]'));
    this.optionizeChildren();
    this.bindClickAway();
    this.set('isRendered', 1);
  },

  willDestroyElement: function () {
    $('body').off('click', this.clickAwayFn);
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
    this.$().find('[value="' + this.get('selection') + '"]').attr('selected', 'selected');
  }.observes('isRendered', 'selection'),

  optionizeChildren: function () {
    this.get('$list').find('div').attr('data-option', 1);
  },

  bindClickAway: function () {
    // Select Dropdown has 2 types of 'click-away' dismissal.
    // One bound to the body, and one bound to a dismissal overlay.
    this.clickAwayFn = function(e){
      if ( this.get('isDestroyed') ) return;
      var isClickAway = $(e.target).parents('[data-select-dropdown]').length < 1;
      if ( isClickAway ) this.dismiss();
    };

    $('body').on('click', this.clickAwayFn.bind(this));
  },

  unhighlightAll: function () {
    this.get('$list').find('[data-option]').removeAttr('selected');
  }.observes('isRendered'),

  dismiss: function() {
    this.set('active', false);
  },

  // @return {boolean} stopPropagation
  escKeydown: function () {
    if (this.get('active')) {
      this.dismiss();
      return true;
    }
  }
});


The description below is a sketch of where I think this is headed. The reality is:

* v0.0.1: README.md
* v0.0.2: input, checkbox and radio components
* v0.0.3: select component
* v0.0.4: forked ember-validations

# Ember-uni-form

The Ember Uni Form addon clears up confusion between:

 * client-side and server-side errors
 * field-specific and form-level messages
 * error messages, warnings and other feedback

It helps you manage multiple sources of user feedback messages—[DS.Errors](http://emberjs.com/api/data/classes/DS.Errors.html), [Ember Validations](https://github.com/dockyard/ember-validations) and your code—without creating a maintenance nightmare.

## Usage

```handlebars
{{!-- templates/user/new.hbs --}}
{{#uni-form
  form=uniForm
  cancel=(action 'cancel')
  submit=(action 'submit')
}}
  {{ uni-form-input property='email' type='email' }}
  {{ uni-form-input property='password' type='password' }}
  {{ uni-form-messages }}
  {{ uni-form-buttons }}
{{/uni-form}}
```

```javascript
// controllers/user/new.js
import Ember from 'ember';

export default Ember.Controller.extend({

  uniForm: function () {
    return this.store.createRecord('uni-form', { model: this.get('model') });
  }.property('model'),

  actions: {

    cancel: function () {
      this.send('exitRouteLayer'); // addon: ember-route-layers
    },

    submit: function () {
      this.get('model').save()
      .then(() => this.transitionTo('user', this.get('model')))
      .fail(() => {
        // Set a form-level error message
        this.get('uniForm').addMessage({
          body: 'The internet gods are angry. Connection failed.',
          tone: 'error'
        });
      });
    }

  }
}
```

## How It Works

A `model:uni-form` has a data model, fields and messages.

A `message` has a field, body, source, and tone.

```javascript
var msg = {
  field: 'email',
  body: 'Please enter a valid email address.',
  source: 'client',
  tone: 'error',
};
```

## Notes

* This addon requires prototype extensions.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at [localhost:4200](http://localhost:4200).

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

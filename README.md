
[![Build Status](https://travis-ci.org/dollarshaveclub/ember-uni-form.svg)](https://travis-ci.org/dollarshaveclub/ember-uni-form)
[![Coverage Status](https://coveralls.io/repos/dollarshaveclub/ember-uni-form/badge.svg)](https://coveralls.io/github/dollarshaveclub/ember-uni-form)
[![Ember Observer Score](http://emberobserver.com/badges/ember-uni-form.svg)](http://emberobserver.com/addons/ember-uni-form)

# Ember-uni-form

Find this readme insufficient? It is! This is just an overview.
The real documentation is the example code in `/tests/dummy/app`!

The Ember Uni Form addon clears up confusion between:

 * client-side and server-side errors
 * field-specific and form-level messages
 * error messages, warnings and other feedback

Uni-Form helps you manage multiple sources of user feedback messages—[DS.Errors](http://emberjs.com/api/data/classes/DS.Errors.html), [Ember Validations](https://github.com/dockyard/ember-validations) and your code—without creating a maintenance nightmare.

## Usage

```handlebars
{{!-- templates/user/new.hbs --}}
{{#uni-form
  action=(action 'submit')
  form=uniForm
}}
  {{ uni-form-input payloadKey='email' type='email' }}
  {{ uni-form-input payloadKey='password' type='password' }}
  {{#if uniForm.submitFailed }}
    {{ uni-form-messages }}
  {{/if}}
  <input type="submit" value="Save">
{{/uni-form}}
```

```javascript
// controllers/user/new.js
import Ember from 'ember';

export default Ember.Controller.extend({

  uniForm: function () {
    return this.store.createRecord('uni-form', { payload: this.get('model') });
  }.property('model'),

  actions: {

    submit: function () {
      this.get('model').save()
      .then(() => this.transitionTo('user', this.get('model')))
      .fail(() => {
        // Set a form-level error message
        this.get('uniForm').addMessage({
          body: 'The internet gods are angry. Connection failed.',
          tone: 'error'
        });
        // Show errors
        this.get('uniForm').set('submitFailed', true);
      });
    }

  }

}
```

## How It Works

A `model:uni-form` has a payload model, fieldsByName (a hash of field models) and messages.

A `model:uni-form-field` has a value alias and computed properties for message, tone, required, etc.

A `message` has a field, path, body, source, and tone.

```javascript
// Client error for form.payload.user.email
var msg = {
  field: 'email',
  path: 'user',
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

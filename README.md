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
  {{ uni-form-input form=uniForm property='email' type='email' }}
  {{ uni-form-input form=uniForm property='password' type='password' }}
  {{ uni-form-messages form=uniForm }}
  {{ uni-form-buttons form=uniForm cancel=(action 'cancel') submit=(action 'submit') }}
{{/uni-form}}
```

```javascript
// controllers/user/new.js
import Ember from 'ember';
import HasUniForm from 'ember-uni-forms/mixins/has-uni-form';

export default Ember.Controller.extend(
  HasUniForm, // this.get('uniForm') is a `model:uni-form` for this.get('model')
{
  uniFormOptions: {
    clientErrors: 'model.validator.errors', // default
    serverErrors: 'model.errors',           // default
  },

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

A `model:uni-form-message` has a body, field, source, and tone.

```javascript
// addon/models/uni-form-message.js
import DS from 'ember-data';
export default DS.Model.extend({
  body: DS.attr('string'),              // Please enter a valid email address.
  field: DS.attr('string'),             // null, email, password, firstName
  source: DS.attr('string'),            // null, client, server
  tone: DS.attr('string'),              // null, error, warning, success, info, muted
});
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

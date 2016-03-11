
[![Build Status](https://travis-ci.org/dollarshaveclub/ember-uni-form.svg)](https://travis-ci.org/dollarshaveclub/ember-uni-form)
[![Coverage Status](https://coveralls.io/repos/dollarshaveclub/ember-uni-form/badge.svg)](https://coveralls.io/github/dollarshaveclub/ember-uni-form)
[![Ember Observer Score](http://emberobserver.com/badges/ember-uni-form.svg)](http://emberobserver.com/addons/ember-uni-form)

# Ember-uni-form

The Ember Uni-Form addon makes it easy to wire up complex, validated forms.

Uni-Form
* minimizes boilerplate with sensible defaults
* provides a conventional structure for your form code
* supports validation of nested models within the payload

## Usage

```handlebars
{{#uni-form action=(action 'mySubmit') form=myForm }}
  {{ uni-form-input payloadKey='email' type='email' }}
  {{ uni-form-input payloadKey='password' type='password' }}
  {{#if myForm.submitFailed }} {{ uni-form-messages }} {{/if}}
  <input type="submit" value="Save">
{{/uni-form}}
```

```javascript
import Ember from 'ember';
export default Ember.Controller.extend({

  myForm: Ember.computed('model', function () {
    return this.store.createRecord('uni-form', { payload: this.get('model') });
  }),

  actions: {
    mySubmit: function () {
      this.get('model').save()
      .then(() => this.transitionTo('user', this.get('model')))
      .catch(() => {
        // Set a form-level error message
        this.get('myForm').addMessage({
          body: 'The internet gods are angry. Connection failed.',
          tone: 'error'
        });
        // Show uni-form-messages
        this.get('myForm').set('submitFailed', true);
      });
    }
  }
}
```

_Find this example insufficient? It is! The real documentation is the example code in `/tests/dummy/app`!_

## How It Works

Uni-Form provides a conventional structure for your form code.

The data:
* form model
* field models
* message objects

The views:
* form component
* field components

You provide:
* payload model
* submit action

You can directly bind a `value` to an input (e.g. a checkbox for a controller property), but Uni-Form really shines when you put your fields within a form and specify the `payloadKey`.

Uni-Form field components will take the `payloadKey` and parse validations and error messages on `parentFormView.form.payload` to give you:
* `field.label`
* `field.maxlength`
* `field.messages`
* `field.name`
* `field.optional`
* `field.prompt`
* `field.required`
* `field.status`
* `field.tone`
* `field.value`

Binding by `payloadKey` works with nested models in the payload. __Check out the example in the dummy app.__

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

Uni-Form is the one form library to rule them all. And in the darkness, bind them.

* This addon requires prototype extensions.
* __You should really read the code in the dummy app.__

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

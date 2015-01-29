import Ember from 'ember';
import config from '../config/environment';

export default Ember.Mixin.create({

  setVerifiability: function () {
    Ember.run.next(this, function () {
      var zipAndLine1 = this.get('errors.addressLine_1.length') < 1 &&
                        this.get('errors.zipCode.length') < 1;

      var cityStateAndLine1 = this.get('errors.addressLine_1.length') < 1 &&
                              this.get('errors.city.length') < 1 &&
                              this.get('errors.state.length') < 1;

      this.set('isVerifiable', zipAndLine1 || cityStateAndLine1);
    });
  }.observes('addressLine_1', 'zipCode', 'city', 'state'),

  verify: function () {
    var self = this;

    Ember.run.cancel(this.verificationTimer);

    if (!this.get('isVerifiable')) return;
    if (this.get('addressString') === this.get('verifyString')) return;

    this.verificationTimer = Ember.run.later(this, function () {

      console.info('[SmartyStreets] Verifying address with ID:', this.get('id'));
      var verifyString = this.get('addressString');

      Ember.$.ajax({
        url: 'https://api.smartystreets.com/street-address',
        data: {
          'auth-token': config.APP.smartystreets['auth-token'],
          'street': verifyString
        },
        success: function (data) {
          self.set('verifyResult', data.length > 0);
          self.set('smartyPayload', data);
        },
        error: function (jqXHR) {
          self.set('verifyResult', false);
          self.set('smartyPayload', null);
        },
        complete: function () {
          self.set('verifyString', verifyString);
        }
      });

    }, 1000);

  }.observes('addressLine_1', 'zipCode', 'city', 'state', 'isVerifiable'),

  verifyFailed: function () {
    return this.get('verifyResult') === false && this.get('verifyString') === this.get('addressString');
  }.property('verifyResult', 'verifyString', 'addressString'),

});

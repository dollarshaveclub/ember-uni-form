
App.Address = DS.Model.extend(
  Ember.Validations.Mixin,
{
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  addressLine_1: DS.attr('string'),
  addressLine_2: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  zipCode: DS.attr('string'),
  userId: DS.attr('string'),
  countryId: DS.attr('string'),
  smartyPayload: DS.attr(),

  verifyResult: null,
  verifyString: '',

  name: function () {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName'),

  addressString: function () {
    return '%@ %@ %@, %@ %@'.fmt(
        this.get('addressLine_1'),
        this.get('addressLine_2'),
        this.get('city'),
        this.get('state'),
        this.get('zipCode')
      );
  }.property('addressLine_1', 'addressLine_2', 'city', 'state', 'zipCode'),

  isVerifiable: function () {
    var zipAndLine1 = this.get('errors.addressLine_1.length') < 1 &&
                      this.get('errors.zipCode.length') < 1;

    var cityStateAndLine1 = this.get('errors.addressLine_1.length') < 1 &&
                            this.get('errors.city.length') < 1 &&
                            this.get('errors.state.length') < 1;

    return zipAndLine1 || cityStateAndLine1;
  }.property('errors.addressLine_1', 'errors.zipCode'),

  verify: function () {
    var self = this;

    Ember.run.cancel(this.verificationTimer);

    if (!this.get('isVerifiable')) return;
    if (this.get('addressString') === this.get('verifyString')) return;

    this.verificationTimer = Ember.run.later(this, function () {

      // console.info('[SmartyStreets] Verifying address with ID:', this.get('id'));
      var verifyString = this.get('addressString');

      $.ajax({
        url: 'https://api.smartystreets.com/street-address',
        data: {
          'auth-token': DSC.CONF.smartystreets['auth-token'],
          'street': verifyString
        },
        success: function (response) {
          self.set('verifyResult', response.length > 0);
          self.set('smartyPayload', response);
        },
        error: function () {
          self.set('verifyResult', false);
          self.set('smartyPayload', null);
        },
        complete: function () {
          self.set('verifyString', verifyString);
        }
      });

    }, 1000);

  }.observes('addressString'),

  verifyFailed: function () {
    return this.get('verifyResult') === false && this.get('verifyString') === this.get('addressString');
  }.property('verifyResult', 'verifyString', 'addressString'),

  validations: {
    firstName: {
      length: { maximum: 25 },
      presence: true
    },
    lastName: {
      length: { maximum: 25 },
      presence: true
    },
    addressLine_1: {
      length: { maximum: 35 },
      presence: true
    },
    addressLine_2: {
      length: { maximum: 35 }
    },
    city: {
      length: { maximum: 40 },
      presence: true
    },
    state: {
      presence: true
    },
    zipCode: {
      numericality: true,
      presence: true
    }
  }

});

// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { IonInput } from '@ionic/vue';
import { MsChoosePasswordInput } from '@lib';
import { VueWrapper, mount } from '@vue/test-utils';

describe('Choose password', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(MsChoosePasswordInput, {});
  });

  it('Validate the fields', async () => {
    // Fields are empty, obviously not valid
    expect(await wrapper.vm.areFieldsCorrect()).to.be.false;

    const ionInputs = wrapper.findAllComponents(IonInput);
    ionInputs[0].vm.$emit('ionInput', { target: { value: 'P@ssw0rd.' } });
    expect(wrapper.vm.password).to.equal('P@ssw0rd.');

    // Confirmation is not filled, not valid
    expect(await wrapper.vm.areFieldsCorrect()).to.be.false;

    ionInputs[1].vm.$emit('ionInput', { target: { value: 'P@ssw0rd.' } });
    expect(wrapper.vm.passwordConfirm).to.equal('P@ssw0rd.');

    // P@ssw0rd is not strong enough
    expect(await wrapper.vm.areFieldsCorrect()).to.be.false;

    ionInputs[0].vm.$emit('ionInput', {
      target: { value: 'ABiggerSaferPassword123!!' },
    });
    expect(wrapper.vm.password).to.equal('ABiggerSaferPassword123!!');

    // Password is strong enough but password and confirmation don't match
    expect(await wrapper.vm.areFieldsCorrect()).to.be.false;

    ionInputs[1].vm.$emit('ionInput', {
      target: { value: 'ABiggerSaferPassword123!!' },
    });
    expect(wrapper.vm.passwordConfirm).to.equal('ABiggerSaferPassword123!!');
    expect(await wrapper.vm.areFieldsCorrect()).to.be.true;
  });
});

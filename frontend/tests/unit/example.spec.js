import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import HelloWorld from '@/components/HelloWorld.vue';

Vue.use(Vuetify);

describe('HelloWorld.vue', () => {
  let wrp;
  const msg = 'new message';

  beforeEach(() => {
    wrp = shallowMount(HelloWorld, { propsData: { msg } });
  });

  it('renders props.msg when passed', () => {
    expect(wrp.vm.msg).toMatch(msg);
  });
});

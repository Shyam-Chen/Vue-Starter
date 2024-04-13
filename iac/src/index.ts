import * as pulumi from '@pulumi/pulumi';
import * as googleNative from '@pulumi/google-native';

// https://www.pulumi.com/registry/packages/google-native/api-docs/run/v2/service/
const service = new googleNative.run.v2.Service('vue-starter', {
  serviceId: 'vue',
  template: {
    containers: [
      {
        image: 'us-central1-docker.pkg.dev/xxx/xxx/vue-starter',
      },
    ],
  },
});

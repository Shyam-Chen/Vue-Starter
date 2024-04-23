import * as azureNative from '@pulumi/azure-native';

// Create an Azure resource group
const resourceGroup = new azureNative.resources.ResourceGroup('myResourceGroup');

// Define the container app environment
const containerAppEnv = new azureNative.app.ManagedEnvironment('myContainerAppEnv', {
  resourceGroupName: resourceGroup.name,
});

// Create the Azure Container App
const containerApp = new azureNative.app.ContainerApp('myContainerApp', {
  resourceGroupName: resourceGroup.name,
  managedEnvironmentId: containerAppEnv.id,
  configuration: {
    ingress: {
      // Ingress settings can be customized as needed
      external: true,
      targetPort: 80,
    },
  },
  template: {
    containers: [
      {
        name: 'myfrontendcontainer',
        image: 'vue-starter', // Replace with your front-end container image
        resources: {
          cpu: 0.5,
          memory: '250Mb',
        },
      },
    ],
  },
});

// Export the URL of the container app
export const url = containerApp.configuration.apply((config) => config?.ingress?.fqdn);

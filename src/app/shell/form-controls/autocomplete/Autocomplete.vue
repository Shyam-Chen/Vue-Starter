<template>
  <v-container id="autocomplete" class="shell-container" fluid>
    <v-combobox v-autocomplete v-model="countryOrArea" :items="countryOrAreaList" label="Country or Area"></v-combobox>
  </v-container>
</template>

<script>
export default {
  directives: {
    autocomplete: {
      bind(el) {
        const appendInner = el.querySelector('.v-input__append-inner');
        appendInner.style.display = 'none';
      },
    },
  },
  data() {
    return {
      countryOrArea: '',
      countryOrAreaList: [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan',
        'Bahamas, The', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi',
        'Cambodia', 'Cameroon', 'Canada', 'Cabo Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Costa Rica', "Cote d'Ivoire", 'Croatia', 'Cuba', 'Curacao', 'Cyprus', 'Czechia',
      ],
    };
  },
};
</script>

<style scoped>
</style>

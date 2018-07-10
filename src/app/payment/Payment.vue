<template>
  <v-container fluid>
    <div class="headline">Payment (TODO)</div>

    <v-container fluid grid-list-md class="women">
      <v-layout row wrap>
        <v-flex v-for="item in commodity" :key="item.number" xs4>
          <v-card>
            <v-layout row>
              <v-flex xs8>
                <v-card-title>
                  <div>
                    <div>{{ item.name }}</div>
                    <div>${{ item.price }}</div>
                  </div>
                </v-card-title>
              </v-flex>

              <v-flex xs4>
                <v-card-media :src="item.image" height="100%" contain></v-card-media>
              </v-flex>
            </v-layout>

            <v-card-actions>
              <v-btn flat color="orange">Add to Cart</v-btn>
              <v-btn flat color="orange">Buy Now</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
// @flow

export default {
  data() {
    return {
      commodity: [
        { number: 1, name: 'Hands-On Data Structures and Algorithms with JavaScript', image: 'https://d1ldz4te4covpm.cloudfront.net/sites/default/files/imagecache/ppv4_main_book_cover/cover_8016_0.png', price: 44.99 },
        { number: 2, name: '1', price: 120 },
        { number: 3, name: '1', price: 120 },
        { number: 4, name: '1', price: 120 },
        { number: 5, name: '1', price: 120 },
        { number: 6, name: '1', price: 120 },
        { number: 7, name: '1', price: 120 },
        { number: 8, name: '1', price: 120 },
        { number: 9, name: '1', price: 120 },
        { number: 10, name: '1', price: 120 },
      ],
    };
  },
};
</script>

<style scoped>
.women {
  max-width: 1024px;
}
</style>

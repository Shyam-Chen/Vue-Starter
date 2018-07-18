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

            <v-divider></v-divider>

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
        { number: 1, name: 'Hands-On Data Structures and Algorithms with JavaScript', image: 'https://d1ldz4te4covpm.cloudfront.net/sites/default/files/imagecache/ppv4_main_book_cover/cover_8016_0.png', price: 25.20 },
        { number: 2, name: 'Mastering JavaScript Functional Programming', image: 'https://d1ldz4te4covpm.cloudfront.net/sites/default/files/imagecache/ppv4_main_book_cover/9781787287440.png', price: 25.20 },
        { number: 3, name: 'Isomorphic JavaScript Web Development', image: 'https://dz13w8afd47il.cloudfront.net/sites/default/files/imagecache/ppv4_main_book_cover/B05226_0.png', price: 19.60 },
        { number: 4, name: 'JavaScript by Example', image: 'https://d255esdrn735hr.cloudfront.net/sites/default/files/imagecache/ppv4_main_book_cover/9781788293969.png', price: 19.60 },
        { number: 5, name: 'Mastering Reactive JavaScript', image: 'https://d1ldz4te4covpm.cloudfront.net/sites/default/files/imagecache/ppv4_main_book_cover/9781786463388.png', price: 22.40 },
        { number: 6, name: 'Mastering JavaScript Single Page Application Development', image: 'https://d255esdrn735hr.cloudfront.net/sites/default/files/imagecache/ppv4_main_book_cover/1640_5228_Mastering%20JavaScript%20Single%20Page%20Application%20Development.png', price: 25.20 },
        { number: 7, name: 'Mastering JavaScript Design Patterns - Third Edition', image: 'https://d255esdrn735hr.cloudfront.net/sites/default/files/imagecache/ppv4_main_book_cover/B09381_MockupCover.png', price: 25.20 },
        { number: 8, name: 'Learning JavaScript Data Structures and Algorithms - Third Edition', image: 'https://d1ldz4te4covpm.cloudfront.net/sites/default/files/imagecache/ppv4_main_book_cover/B09377.png', price: 25.20 },
        { number: 9, name: 'JavaScript and JSON Essentials - Second Edition', image: 'https://d255esdrn735hr.cloudfront.net/sites/default/files/imagecache/ppv4_main_book_cover/B09376_0.png', price: 16.80 },
        { number: 10, name: 'Object-Oriented JavaScript - Third Edition', image: 'https://d1ldz4te4covpm.cloudfront.net/sites/default/files/imagecache/ppv4_main_book_cover/0568%20OS_B05239_Object-Oriented%20JavaScript.jpg', price: 25.20 },
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

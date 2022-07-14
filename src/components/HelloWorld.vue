<script setup>
import { ref, onMounted } from 'vue';
import Button from './Button.vue';





defineProps({
  msg: String
});
//
const count = ref(0);
const name = ref("");
const posts = ref([]);
const loading = ref(false);
// const db = await fetch('./server');


async function getData() {
  loading.value = true;
  const repsponse = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await repsponse.json();
  posts.value = data;

  setTimeout(() => {
    loading.value = false;
  }, 1500);
}

function onClick() {
  console.log("Click");
}

onMounted(async () => {
  await getData();
})



 


</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>

  <h1>{{ msg }}</h1>

  Name is: {{ name }}

  <div>
    <input type="text" v-model="name">
  </div>

  <Button 
    @click="getData" 
    :variant="'success'" 
    :disabled="loading"
  >
    Get data
  </Button>

  <Button @click="onClick">
    Upload
  </Button>

  <Button>
    Delete
  </Button>

  <div v-if="loading"> 
    <h3>Загузка</h3>
  </div>
  <div v-else>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>User id</th>
          <th>id</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="post in posts">
          <td>{{ post.userId }}</td>
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.body }}</td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>

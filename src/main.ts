import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';
import Paginate from 'vuejs-paginate';
import VueMarkdown from 'vue-markdown';
import ArticlesList from '@/components/ArticlesList.vue';
import CommentsList from '@/components/CommentsList.vue';
import SectionsList from '@/components/SectionsList.vue'
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

Vue.use(Vuetify, {
  iconfont: 'md',
});

Vue.component('paginate', Paginate);
Vue.component('vue-markdown', VueMarkdown);
Vue.component('articles-list', ArticlesList);
Vue.component('comments-list', CommentsList);
Vue.component('sections-list', SectionsList);

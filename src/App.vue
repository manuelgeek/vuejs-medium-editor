<template>
  <div id="app">
    <medium-editor
      v-model="content"
      :prefill="defaultValue"
      :options="options"
      :on-change="onChange"
      :hide-gist="false"
      :hide-image="false"
      :hide-video="false"
      @uploaded="uploadCallback"
    >
    </medium-editor>
  </div>
</template>

<script lang="ts">
import Editor from './Editor.vue'
// import 'medium-editor/dist/css/medium-editor.css'

export default {
  name: 'App',
  components: {
    'medium-editor': Editor,
  },
  data() {
    return {
      content: ``,
      defaultValue: `<h1>Vuejs <b>Medium Editor</b></h1>
          <div class="editor-image is-full"><img src="https://source.unsplash.com/yxNURc8he3o/2000x600"></div>
          <pre>axios.interceptors.response.use(function (response) {<br>  return response;<br>}, function (error) {<br>  const originalRequest = error.config;<br>  if (error.response.status === 401 &amp;&amp; !originalRequest._retry) {<br>    originalRequest._retry = true;<br>    const refreshToken = window.localStorage.getItem('refreshToken');<br>    return axios.post('http://localhost:8000/auth/refresh', { refreshToken })<br>      .then(({data}) =&gt; {<br>        window.localStorage.setItem('token', data.token);<br>        window.localStorage.setItem('refreshToken', data.refreshToken);<br>        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;<br>        originalRequest.headers['Authorization'] = 'Bearer ' + data.token;<br>        return axios(originalRequest);<br>      });<br>  }<br>  return Promise.reject(error);<br>});</pre>
          <div class="editor-image-description">righteous indignation and dislike</div>
          <p>But I must explain to you how all this mistaken idea of denouncing <b>pleasure and praising pain was born and I will give you</b> a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes</p><p class="editor-embed">
            <a href="https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44">https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44</a>
            <div class="gist-embed-iframe"><iframe id="A8Tm2Y76Cuy9dtVRdxnaIRKgI2weZB8R" height="573px"></iframe></div>
            </p><p class="editor-embed"><br></p><p></p><ul><li>But I must explain to you how all this mistaken idea of denouncing</li><li>of pleasure of the moment, so blinded by desire</li></ul><p></p>
          <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will</p><p class="editor-embed">
            <a href="https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44">https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44</a>
            <div class="gist-embed-iframe"><iframe id="QnJ6PY8hYZAdPw4ynC0ryAYsl9oVnZYr" height="573px"></iframe></div>
            </p>
            <p></p>
            <p></p><p class="editor-embed"><br></p>
          <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariaturasdasdasdasd<br></p>
          <h2>Section 1.10.33</h2>
          <div class="editor-image is-normal"><img src="https://source.unsplash.com/DKnXlH_r3x4/2000x800"></div>
          <div class="editor-image-description">you how all this mistaken idea of denouncing pleasure</div>
          <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus</p><p class="editor-embed">
            <a href="https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44">https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44</a>
            <div class="gist-embed-iframe"><iframe id="JbGNtl0kDTqJ1x1D4bNghxdFKNqpmuGJ" height="573px"></iframe></div>
            </p>
            <p></p>
            <p></p><p class="editor-embed"><br></p><p></p><ol><li>cum soluta nobis est eligendi optio cumque</li><li>righteous indignation and dislike</li></ol><p></p><h3>odio dignissimos ducimus</h3>
          <p></p>
          <div class="editor-image is-expand"><img src="https://source.unsplash.com/-g7axSVst6Y/1600x600">
          </div>
          <div class="editor-image-description">I will give you a complete account of the system</div>
          <p></p>
          <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of wills</p>
          <p class="editor-video">
            <div class="video-embed-iframe"><iframe id="IHW3m64yRzV5ZJ6HiIKrB40TuH5pjBt1" height="500" title="Video IHW3m64yRzV5ZJ6HiIKrB40TuH5pjBt1" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" src="https://www.youtube.com/embed/OrT0tHGXyqE"></iframe></div>
            </p>
            <p class="editor-video"><br></p>`,
      options: {
        uploadUrl: 'https://api.imgur.com/3/image',
        uploadUrlHeader: { Authorization: 'Client-ID db856b43cc7f441' },
        file_input_name: 'image',
        file_size: 1024 * 1024 * 10,
        imgur: true,
        toolbar: {
          buttons: [
            'bold',
            'italic',
            {
              name: 'anchor',
              action: 'createLink',
              aria: 'link',
              tagNames: ['a'],
              contentDefault: '<b>🔗</b>',
              contentFA: '<i class="fa fa-link"></i>',
            },
            'underline',
            'quote',
            'h1',
            'h2',
            'h3',
            'h4',
            {
              name: 'pre',
              action: 'append-pre',
              aria: 'code highlight',
              tagNames: ['pre'],
              contentDefault: '<b><\\></b>',
              contentFA: '<i class="fa fa-code fa-lg"></i>',
            },
            'unorderedlist',
            'orderedlist',
            {
              name: 'image',
              action: 'image',
              aria: 'insert image from url',
              tagNames: ['img'],
              contentDefault: '<b>image</b>',
              contentFA: '<i class="fa fa-picture-o"></i>',
            },
          ],
        },
      },
    }
  },
  methods: {
    onChange() {
      console.log(this.content)
    },
    uploadCallback(url: string) {
      console.log('uploaded url', url)
    },
  },
}
</script>

<style>
/* @import "~bulma/css/bulma.css"; */
@import 'medium-editor/dist/css/medium-editor.css';
@import './assets/themes/default.css';
/*@import '~highlight.js/styles/github.css';*/
/* @import 'highlight.js/styles/ocean.css'; */
@import 'highlight.js/styles/androidstudio.css';
</style>
